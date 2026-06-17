---
title: 'Sobre este blog'
slug: 'sobre-este-blog'
date: '2026-06-17'
description: 'Por que criei este blog, como ele funciona tecnicamente e o que pretendo escrever por aqui.'
tags: ['Angular', 'blog']
draft: false
---

Depois de um tempo adiando, finalmente coloquei um blog no ar. Este primeiro post é sobre o porquê — e sobre como a coisa toda funciona por baixo.

## Por que um blog?

Tenho o costume de anotar coisas que aprendo: snippets, decisões de arquitetura, soluções que levei horas para encontrar. A maioria disso fica em arquivos locais que nunca vejo de novo.

Um blog resolve isso de um jeito simples: me força a organizar o pensamento antes de publicar, e o resultado fica acessível de qualquer lugar. Nada mais do que isso.

## Como funciona

O site é feito com [Angular](https://angular.dev) e publicado na Vercel. O blog em si é completamente estático: cada post é um arquivo `.md` no repositório, e um script Node converte esses arquivos em JSON durante o build. Sem banco de dados, sem backend, sem painel de admin.

Publicar um post é fazer um `git push`.

### O pipeline de build

```javascript
// scripts/build-blog.mjs (simplificado)
const { data, content } = matter(rawMarkdown);
const html = marked(content);
const safe = sanitizeHtml(html, options);
writeFileSync(
  `src/assets/blog/content/${data.slug}.json`,
  JSON.stringify({ meta, html: safe, headings }),
);
```

Os JSONs gerados ficam em `src/assets/blog/` e são servidos como assets estáticos. O Angular carrega só o JSON do post que está sendo acessado — sem baixar tudo de uma vez.

## O que vem por aqui

Pretendo escrever sobre IA aplicada a desenvolvimento, Angular, e decisões de arquitetura que me pareceram não-óbvias na época. Sem calendário fixo — publico quando tenho algo útil para dizer.
