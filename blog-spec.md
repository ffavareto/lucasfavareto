# Especificação — Blog estático em `/blog`

## 0. Decisões já tomadas (não rediscutir)

- **Sem `/admin`, sem login, sem backend.** Publicar post = escrever `.md` + `git push`. Isso elimina toda superfície de autenticação/segurança que existiria num painel logado.
- **Hospedagem:** Vercel ou Netlify (estático, free tier).
- **Conteúdo:** arquivos Markdown versionados no próprio repo.
- **Stack:** mantém Angular 22 standalone + Nx, sem introduzir framework novo.

Se no futuro você quiser um `/admin` de fato (ex: ver rascunhos antes de mergear, métricas), isso é um projeto separado que exigirá backend — não está nesta spec.

---

## 1. Objetivo

Adicionar uma seção de blog em `/blog` ao site pessoal existente, para posts sobre IA, programação etc. Zero custo, zero backend, máxima simplicidade, acessibilidade WCAG 2.2 AA.

---

## 2. Arquitetura de conteúdo

### 2.1 Onde os posts vivem

```plaintext
src/content/posts/
  2026-06-16-titulo-do-post.md
  2026-07-01-outro-post.md
```

Convenção de nome de arquivo: `YYYY-MM-DD-slug-em-kebab-case.md`. A data no nome é só organizacional; a data real de publicação vem do frontmatter.

### 2.2 Frontmatter (YAML) de cada post

```yaml
---
title: 'Título do post'
slug: 'titulo-do-post'
date: '2026-06-16'
updated: '2026-06-20' # opcional, só se editar depois de publicar
description: 'Resumo de 1-2 frases para meta description e card de listagem.'
tags: ['IA', 'Angular']
draft: false # true = não aparece em build de produção
readingTime: 6 # minutos, calculado por script (ver seção 5)
---
Corpo do post em **Markdown** normal.
```

Campos obrigatórios: `title`, `slug`, `date`, `description`, `tags`, `draft`.
`readingTime` é gerado automaticamente, não escrito manualmente.

### 2.3 Por que build-time, não runtime

Os `.md` são processados **durante o build** (script Node que roda antes do `nx build`), gerando um JSON estático (`src/assets/blog/posts.json` + um arquivo por post em `src/assets/blog/content/<slug>.json` com o HTML já convertido). O Angular em runtime só consome JSON estático via `fetch`/`HttpClient`. Vantagens:

- Sem parser markdown no bundle do navegador (menor payload).
- Sem nenhuma chamada de rede a serviço externo.
- Funciona 100% em hospedagem estática (Vercel/Netlify), sem function nenhuma.
- `draft: true` simplesmente não entra no JSON gerado — não existe risco de expor rascunho em produção.

---

## 3. Rotas e estrutura de páginas

| Rota             | Componente                                  | Descrição                                                                                                  |
| ---------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `/blog`          | `BlogListComponent`                         | Lista todos os posts publicados, mais recentes primeiro. Suporta filtro por tag via query param `?tag=ia`. |
| `/blog/:slug`    | `BlogPostComponent`                         | Página de um post individual.                                                                              |
| `/blog/tag/:tag` | (pode reusar `BlogListComponent` com input) | Lista posts filtrados por tag, opcional — pode ser só `?tag=` na v1.                                       |

Adicionar ao `app.routes.ts`:

```ts
{
  path: 'blog',
  loadComponent: () => import('./pages/blog-list/blog-list.component').then(m => m.BlogListComponent),
  title: 'Blog — Lucas Favareto',
},
{
  path: 'blog/:slug',
  loadComponent: () => import('./pages/blog-post/blog-post.component').then(m => m.BlogPostComponent),
  // title dinâmico via resolver, ver seção 7.3
},
```

Manter o `redirectTo` de `/curriculum` existente. Adicionar rota wildcard `**` para 404 (ver seção 8).

---

## 4. Estrutura de pastas proposta (novos arquivos)

```plaintext
src/app/
  pages/
    blog-list/
      blog-list.component.ts
      blog-list.component.html
      blog-list.component.scss
      blog-list.component.spec.ts
    blog-post/
      blog-post.component.ts
      blog-post.component.html
      blog-post.component.scss
      blog-post.component.spec.ts
    not-found/
      not-found.component.ts
      not-found.component.html
      not-found.component.scss
  components/
    post-card/
      post-card.component.ts
      post-card.component.html
      post-card.component.scss
      post-card.component.spec.ts
    tag-list/
      tag-list.component.ts
      tag-list.component.html
      tag-list.component.scss
  services/
    blog.service.ts
    blog.service.spec.ts
  interfaces/
    post.ts
    post-meta.ts
  resolvers/
    blog-post-title.resolver.ts

scripts/
  build-blog.mjs        # gera os JSON a partir dos .md

src/content/posts/
  *.md

src/assets/blog/
  posts.json             # gerado, não editar manualmente
  content/
    <slug>.json           # gerado, não editar manualmente
```

---

## 5. Pipeline de build do conteúdo

### 5.1 Dependências novas (dev only, sem custo)

```plaintext
gray-matter      # parse de frontmatter YAML
marked            # markdown -> HTML
reading-time      # cálculo de tempo de leitura
sanitize-html     # sanitização do HTML gerado (defesa em profundidade)
```

### 5.2 Script `scripts/build-blog.mjs`

Responsabilidades:

1. Ler todos os `.md` em `src/content/posts/`.
2. Fazer parse do frontmatter com `gray-matter`.
3. Validar campos obrigatórios; se faltar algo, **falhar o build** com mensagem clara (fail fast, não publicar post malformado).
4. Validar `slug` único entre todos os posts (falha o build se duplicado).
5. Pular (não incluir no JSON) qualquer post com `draft: true`.
6. Converter o corpo Markdown para HTML com `marked`.
7. Sanitizar o HTML resultante com `sanitize-html` (mesmo sendo conteúdo só seu, é defesa em profundidade — evita que um post colado de outro lugar injete `<script>` por acidente).
8. Calcular `readingTime` com a lib `reading-time`.
9. Gerar slugs de heading (para âncoras de `##`/`###`) e adicionar IDs no HTML, para permitir link direto a uma seção.
10. Escrever:
    - `src/assets/blog/posts.json`: array de metadados (sem o corpo HTML) ordenado por `date` desc — usado pela listagem.
    - `src/assets/blog/content/<slug>.json`: `{ meta, html, headings }` por post — usado pela página individual (lazy, só carrega o post acessado).
11. Gerar também `src/assets/sitemap-blog.json` (lista de slugs + datas) para alimentar o sitemap.xml (seção 9).

### 5.3 Integração com Nx/Angular CLI

Em `project.json`, adicionar um target `build-blog`:

```json
"build-blog": {
  "executor": "nx:run-commands",
  "options": {
    "command": "node scripts/build-blog.mjs"
  }
}
```

E encadear como dependência do `build` e do `serve`:

```json
"build": {
  ...
  "dependsOn": ["build-blog"]
},
"serve": {
  ...
  "dependsOn": ["build-blog"]
}
```

Isso garante que `nx serve` e `nx build` sempre regeneram o JSON a partir dos `.md` antes de rodar — você nunca esquece de rodar o script manualmente.

Opcional (qualidade de vida): um script `watch` com `chokidar` para regenerar em hot-reload durante `nx serve`. Pode ficar para uma v2 se quiser; não é essencial.

---

## 6. Modelos de dados (TypeScript)

```ts
// src/app/interfaces/post-meta.ts
export interface PostMeta {
  title: string;
  slug: string;
  date: string; // ISO 8601, ex: "2026-06-16"
  updated?: string;
  description: string;
  tags: string[];
  readingTime: number; // minutos
}

// src/app/interfaces/post.ts
import { PostMeta } from './post-meta';

export interface PostHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface Post {
  meta: PostMeta;
  html: string; // já sanitizado em build-time
  headings: PostHeading[];
}
```

---

## 7. Componentes

### 7.1 `BlogService`

```ts
@Injectable({ providedIn: 'root' })
export class BlogService {
  private http = inject(HttpClient);

  getAllPosts(): Observable<PostMeta[]> {
    return this.http.get<PostMeta[]>('/assets/blog/posts.json');
  }

  getPostBySlug(slug: string): Observable<Post> {
    return this.http.get<Post>(`/assets/blog/content/${slug}.json`);
  }
}
```

Necessário adicionar `provideHttpClient()` em `app.config.ts` (não existe ainda no projeto).

### 7.2 `BlogListComponent`

- Consome `BlogService.getAllPosts()`.
- Renderiza `PostCardComponent` para cada post.
- Suporta filtro por `?tag=` via `ActivatedRoute.queryParamMap`.
- Estado vazio: se não houver posts (ou nenhum bater com o filtro), mostrar mensagem amigável, não tela branca.
- `<h1>` da página: "Blog".
- Lista de tags únicas (via `TagListComponent`) acima ou ao lado da listagem, cada tag é um link para `?tag=valor`.

### 7.3 `BlogPostComponent`

- Lê `slug` da rota (`ActivatedRoute.paramMap`).
- Busca post via `BlogService.getPostBySlug(slug)`.
- Se não encontrado (404 do `HttpClient` ao buscar o JSON), redireciona para a rota de not-found (seção 8).
- Renderiza:
  - `<h1>` com o título.
  - Metadados: data formatada (`DatePipe`, locale `pt-BR`), tempo de leitura, tags.
  - Corpo: usar `[innerHTML]` com o HTML **já sanitizado em build-time**. Como é conteúdo gerado a partir de arquivos que só você escreve e que já passou por `sanitize-html` no pipeline, o risco de XSS é mínimo — mas documentar isso explicitamente no código (comentário) para deixar claro que não é innerHTML de input de usuário.
  - Sumário (table of contents) opcional gerado a partir de `headings`, com links âncora.
- Título dinâmico da aba: usar um `resolver` (`blog-post-title.resolver.ts`) que busca o post e seta o `title` da rota antes de ativar — ou alternativa mais simples: setar `document.title` no `ngOnInit` do componente via `Title` service do Angular. Recomendo a alternativa simples (Title service) para não adicionar complexidade de resolver nesta v1.
- Meta description dinâmica: usar `Meta` service do Angular (`@angular/platform-browser`) para atualizar a tag `<meta name="description">` com a `description` do post, e restaurar ao sair (ou pelo menos atualizar ao entrar em outro post).

### 7.4 `PostCardComponent`

- Input: `meta: PostMeta` (usar `input()` signal, como já é o padrão no `ProfileLinksComponent`).
- Renderiza título (link para `/blog/:slug`), descrição, data, tags, tempo de leitura.
- O card inteiro deve ter uma única área de toque/clique acessível (ver seção 10.4 sobre "cartão clicável acessível").

### 7.5 `TagListComponent`

- Input: `tags: string[]`, `activeTag?: string`.
- Renderiza cada tag como link, com indicação visual (não só cor) de qual está ativa.

---

## 8. Página 404 / not-found

- Componente `NotFoundComponent` simples: título, mensagem, link para Home e para `/blog`.
- Rota wildcard no final de `app.routes.ts`:

  ```ts
  { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent), title: 'Página não encontrada' }
  ```

- Importante: em hospedagem estática (Vercel/Netlify) configurar rewrite SPA (`vercel.json` ou `netlify.toml` com `/* -> /index.html` status 200) para que rotas profundas (`/blog/algum-slug`) não deem 404 do servidor antes do Angular Router assumir.

---

## 9. SEO e descoberta

- `sitemap.xml` gerado também pelo `build-blog.mjs` (ou um segundo script `scripts/build-sitemap.mjs`), incluindo `/`, `/blog` e `/blog/:slug` de cada post publicado, com `lastmod` vindo de `updated` ou `date`. Salvar em `public/sitemap.xml` para ser servido na raiz.
- `robots.txt` em `public/robots.txt` apontando para o sitemap.
- Cada post já tem `description` (meta description) e `title` (seção 7.3).
- Opcional, baixo custo de implementação, alto valor: tags Open Graph (`og:title`, `og:description`, `og:type=article`) atualizadas dinamicamente por post, e RSS feed (`public/rss.xml` ou gerado) — pode ficar de fora da v1 e entrar depois se quiser.

---

## 10. Acessibilidade (WCAG 2.2 nível AA)

Requisitos concretos a aplicar em todo HTML novo:

1. **Estrutura semântica de heading única por página**: cada página tem exatamente um `<h1>`; listagem usa `<h2>` para título de cada card; post usa `<h2>`/`<h3>` reais para subtítulos (preservando a hierarquia que vier do markdown).
2. **Landmarks**: usar `<nav>` para qualquer navegação (ex: lista de tags, paginação), `<main>` já existe no `AppComponent` — garantir que as novas páginas não criem `<main>` duplicado.
3. **Foco visível**: já existe `:focus-visible` global em `styles.scss` — reaproveitar, não remover outline em nenhum elemento novo.
4. **Contraste de cor**: qualquer cor nova (ex: badge de tag, estado ativo) deve atingir contraste mínimo 4.5:1 para texto normal e 3:1 para texto grande/ícones, conferido contra a paleta existente (`--color-text-muted` sobre `--color-bg`, etc.) — validar com ferramenta (ex: WebAIM contrast checker) antes de fechar a paleta de tags.
5. **Links com nome acessível claro**: nunca "clique aqui"; o texto do link do card de post deve conter o título do post (pode usar `aria-label` se o texto visível for truncado).
6. **Cartão clicável acessível**: em vez de `<div onclick>`, o `PostCardComponent` deve ter um único link real (`<a>`) cobrindo a área clicável (via CSS, `<a>` com `::before`/posicionamento absoluto, ou estrutura "block link") — nunca interativo sem ser elemento focável nativo.
7. **Skip link**: já existe (`.skip-link` no `index.html`) — confirmar que continua funcionando com as novas rotas (o `id="conteudo-principal"` está no `<main>` do `AppComponent`, que envolve o `router-outlet`, então funciona automaticamente).
8. **`lang` correto**: `<html lang="pt-BR">` já está certo; se algum post tiver trechos em inglês (ex: nome de tecnologia), não precisa marcar palavras isoladas, mas blocos de código não devem ser lidos como prosa — usar `<pre><code>` semanticamente correto (o `marked` já gera isso).
9. **Blocos de código acessíveis**: garantir que `<pre>` tenha `tabindex="0"` quando o conteúdo overflow horizontal (para permitir navegação por teclado dentro do bloco), e que a cor de syntax highlight (se adicionado) mantenha contraste mínimo.
10. **Imagens em posts**: se o markdown de um post incluir imagem, exigir (por convenção pessoal, documentada no README) que todo `![alt](...)` tenha alt text descritivo — o pipeline pode opcionalmente _falhar o build_ se encontrar uma imagem com alt vazio (`sanitize-html`/regex check simples no script).
11. **Idioma e leitura por teclado do sumário (TOC)**: se implementar TOC com âncoras, garantir que `tabindex` e ordem de foco sigam a ordem visual/lógica.
12. **Estados de carregamento e erro anunciados**: ao buscar posts (`BlogService`), usar uma região com `aria-live="polite"` para mensagens de carregamento/erro/vazio, para leitores de tela serem notificados sem precisar de foco manual.
13. **Zoom e reflow**: não fixar larguras em `px` que impeçam reflow até 400% de zoom (WCAG 1.4.10) — usar unidades relativas (`rem`/`%`) como já é o padrão no projeto.
14. **`prefers-reduced-motion`**: se adicionar qualquer transição/animação nova (ex: hover do card), respeitar `@media (prefers-reduced-motion: reduce)`.

Checklist de validação antes de considerar pronto: rodar `axe-core` (via extensão de navegador ou `@axe-core/cli`) em `/blog` e em uma página de post, e testar navegação 100% por teclado (Tab, Enter, Esc) nas duas páginas.

---

## 11. Segurança

Como não há backend nem `/admin`, a superfície de risco é pequena, mas ainda vale fixar:

1. **Nenhum dado sensível no repo**: nenhuma chave de API, e-mail interno, telefone, ou dado pessoal de terceiros em nenhum `.md` de post. Adicionar isso como nota no README de `src/content/posts/`.
2. **Sanitização do HTML gerado** (já coberto na seção 5.2, passo 7) como defesa em profundidade contra XSS, mesmo sendo conteúdo próprio.
3. **`rel="noopener noreferrer"`** em todo link externo dentro do corpo dos posts — o `sanitize-html`/transformador do `marked` deve forçar isso automaticamente em todos os `<a target="_blank">` gerados (configurar um _renderer_ customizado do `marked` para isso, não depender de lembrar manualmente em cada post).
4. **Cabeçalhos de segurança HTTP** via `vercel.json` ou `netlify.toml`: `Content-Security-Policy` (ao menos restringindo `script-src 'self'`), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` mínima. Isso é grátis e de baixo esforço, vale incluir.
5. **Dependências**: como `marked`, `gray-matter`, `sanitize-html` etc. são _devDependencies_ usadas só no build (não vão para o bundle do navegador), o risco de supply chain no runtime do site é zero; ainda assim, manter `npm audit` limpo antes de cada release.

---

## 12. Performance / custo

- Sem backend = sem custo de servidor. Vercel/Netlify free tier cobre tranquilamente um blog pessoal de baixo tráfego.
- JSON estático servido como asset = cacheável via CDN da própria hospedagem, sem configuração extra.
- Lazy loading: cada página de post carrega só o seu próprio `<slug>.json` (não o conteúdo de todos os posts), e as rotas já usam `loadComponent` (lazy) como o padrão existente no projeto.
- Imagens de posts (se houver): recomendar formato `webp`/`avif` e dimensões explícitas (`width`/`height` no markdown via HTML inline, se necessário) para evitar layout shift (CLS) — pode ser nota de boas práticas no README, não precisa de pipeline de otimização de imagem agora.

---

## 13. Testes

Seguindo o padrão já existente (Jest + `TestBed`), criar specs para:

- `BlogService`: mocka `HttpClient`, testa `getAllPosts` e `getPostBySlug` (sucesso e erro 404).
- `BlogListComponent`: renderiza N cards a partir de posts mockados; filtra por tag; mostra estado vazio.
- `BlogPostComponent`: renderiza post mockado; trata erro de slug inexistente (redirect/estado de not-found).
- `PostCardComponent`: renderiza dados recebidos via `input()`, link aponta para a rota certa.
- `NotFoundComponent`: smoke test (já existe padrão simples no projeto, replicar).
- Teste de build do script `build-blog.mjs` (opcional, fora do Jest): pode ser um teste Node simples (`node --test`) que roda o script contra uma pasta `fixtures/` de markdown de exemplo e valida o JSON gerado (campos obrigatórios, draft excluído, slug duplicado falha).

---

## 14. Conteúdo inicial (seed)

Criar 1 post de exemplo em `src/content/posts/` já no PR inicial, para validar o pipeline ponta a ponta (ex: "Sobre este blog" ou similar), com frontmatter completo e ao menos um heading `##`, um bloco de código, e um link externo — para exercitar todas as regras de acessibilidade/segurança da seção 10/11 de uma vez.

---

## 15. Fora de escopo nesta v1 (anotado para não esquecer, não implementar agora)

- `/admin` ou qualquer autenticação.
- Comentários em posts (exigiria backend/serviço terceiro).
- Busca full-text.
- RSS/Atom feed (fácil de adicionar depois, reaproveitando o `posts.json`).
- Paginação (só relevante quando houver muitos posts; lista simples basta por enquanto).
- Internacionalização (site é pt-BR).

---

## 16. Ordem de implementação sugerida (para o Claude Code seguir)

1. Modelos (`interfaces/post.ts`, `post-meta.ts`).
2. Script `scripts/build-blog.mjs` + post seed + target `build-blog` no `project.json`.
3. `provideHttpClient()` no `app.config.ts`.
4. `BlogService` + specs.
5. `PostCardComponent` + `TagListComponent` + specs.
6. `BlogListComponent` + specs + rota `/blog`.
7. `BlogPostComponent` + specs + rota `/blog/:slug`.
8. `NotFoundComponent` + rota wildcard.
9. `sitemap.xml`/`robots.txt`.
10. `vercel.json`/`netlify.toml` (rewrites SPA + headers de segurança).
11. Passe de acessibilidade (checklist da seção 10) + `axe-core` manual.
12. Revisão final de segurança (checklist da seção 11).
