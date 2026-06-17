import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { marked, Renderer } from 'marked';
import readingTime from 'reading-time';
import sanitizeHtml from 'sanitize-html';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const POSTS_DIR = join(ROOT, 'src/content/posts');
const ASSETS_DIR = join(ROOT, 'src/assets/blog');
const CONTENT_DIR = join(ASSETS_DIR, 'content');
const PUBLIC_DIR = join(ROOT, 'public');

const REQUIRED_FIELDS = ['title', 'slug', 'date', 'description', 'tags', 'draft'];

const SANITIZE_OPTIONS = {
  allowedTags: [
    ...sanitizeHtml.defaults.allowedTags,
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'pre',
    'code',
    'img',
    'figure',
    'figcaption',
  ],
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    '*': ['id', 'class', 'tabindex'],
    a: ['href', 'title', 'target', 'rel', 'aria-label'],
    img: ['src', 'alt', 'width', 'height', 'loading'],
    pre: ['tabindex'],
    code: ['class'],
  },
};

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function buildRenderer() {
  const renderer = new Renderer();
  const headings = [];

  renderer.heading = ({ text, depth }) => {
    if (depth === 2 || depth === 3) {
      const id = slugify(text);
      headings.push({ id, text, level: depth });
      return `<h${depth} id="${id}">${text}</h${depth}>\n`;
    }
    return `<h${depth}>${text}</h${depth}>\n`;
  };

  renderer.link = ({ href, title, text }) => {
    const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'));
    const titleAttr = title ? ` title="${title}"` : '';
    const externalAttrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
    return `<a href="${href}"${titleAttr}${externalAttrs}>${text}</a>`;
  };

  renderer.image = ({ href, title, text }) => {
    if (!text || text.trim() === '') {
      throw new Error(
        `Imagem sem alt text: src="${href}". Todo ![alt](url) deve ter alt descritivo.`,
      );
    }
    const titleAttr = title ? ` title="${title}"` : '';
    return `<img src="${href}" alt="${text}"${titleAttr} loading="lazy">`;
  };

  renderer.code = ({ text, lang }) => {
    const langAttr = lang ? ` class="language-${lang}"` : '';
    const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<pre tabindex="0"><code${langAttr}>${escaped}</code></pre>\n`;
  };

  return { renderer, headings };
}

function validateFrontmatter(data, filename) {
  for (const field of REQUIRED_FIELDS) {
    if (data[field] === undefined || data[field] === null || data[field] === '') {
      throw new Error(`Post "${filename}" está faltando campo obrigatório: "${field}"`);
    }
  }
  if (!Array.isArray(data.tags) || data.tags.length === 0) {
    throw new Error(`Post "${filename}": "tags" deve ser um array não vazio`);
  }
}

function processPost(filename) {
  const filePath = join(POSTS_DIR, filename);
  const raw = readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  validateFrontmatter(data, filename);

  if (data.draft === true) return null;

  const { renderer, headings } = buildRenderer();
  marked.use({ renderer });

  const rawHtml = marked(content);
  const html = sanitizeHtml(rawHtml, SANITIZE_OPTIONS);

  const stats = readingTime(content);
  const readingTimeMinutes = Math.ceil(stats.minutes);

  const meta = {
    title: String(data.title),
    slug: String(data.slug),
    date: String(data.date),
    ...(data.updated ? { updated: String(data.updated) } : {}),
    description: String(data.description),
    tags: data.tags.map(String),
    readingTime: readingTimeMinutes,
  };

  return { meta, html, headings };
}

function run() {
  if (!existsSync(POSTS_DIR)) {
    console.log('Nenhum diretório de posts encontrado. Saindo sem gerar JSON.');
    return;
  }

  mkdirSync(ASSETS_DIR, { recursive: true });
  mkdirSync(CONTENT_DIR, { recursive: true });

  const files = readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));

  if (files.length === 0) {
    console.log('Nenhum post encontrado. Gerando posts.json vazio.');
    writeFileSync(join(ASSETS_DIR, 'posts.json'), '[]', 'utf-8');
    return;
  }

  const posts = [];
  const slugsSeen = new Set();

  for (const filename of files) {
    const result = processPost(filename);
    if (!result) {
      console.log(`Pulando rascunho: ${filename}`);
      continue;
    }

    const { meta, html, headings } = result;

    if (slugsSeen.has(meta.slug)) {
      throw new Error(`Slug duplicado: "${meta.slug}" (arquivo: ${filename})`);
    }
    slugsSeen.add(meta.slug);

    posts.push(meta);

    const postJson = JSON.stringify({ meta, html, headings }, null, 2);
    writeFileSync(join(CONTENT_DIR, `${meta.slug}.json`), postJson, 'utf-8');
    console.log(`✓ ${meta.slug}`);
  }

  posts.sort((a, b) => b.date.localeCompare(a.date));

  writeFileSync(join(ASSETS_DIR, 'posts.json'), JSON.stringify(posts, null, 2), 'utf-8');
  console.log(`\n${posts.length} post(s) publicado(s) em src/assets/blog/posts.json`);

  const sitemapBlog = posts.map((p) => ({
    slug: p.slug,
    date: p.updated ?? p.date,
  }));
  writeFileSync(
    join(ASSETS_DIR, 'sitemap-blog.json'),
    JSON.stringify(sitemapBlog, null, 2),
    'utf-8',
  );

  const baseUrl = 'https://lucasfavareto.com.br';
  const today = new Date().toISOString().split('T')[0];

  const postEntries = posts
    .map(
      (p) =>
        `  <url>\n    <loc>${baseUrl}/blog/${p.slug}</loc>\n    <lastmod>${
          p.updated ?? p.date
        }</lastmod>\n  </url>`,
    )
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${today}</lastmod>
  </url>
${postEntries}
</urlset>`;

  writeFileSync(join(PUBLIC_DIR, 'sitemap.xml'), sitemap, 'utf-8');
  console.log('✓ public/sitemap.xml gerado');

  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;
  writeFileSync(join(PUBLIC_DIR, 'robots.txt'), robotsTxt, 'utf-8');
  console.log('✓ public/robots.txt gerado');
}

run();
