import { type Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    title: 'Lucas Favareto — Engenheiro de Software',
    loadComponent: () =>
      import('./pages/profile/profile.component').then((m) => m.ProfileComponent),
  },
  {
    path: 'curriculum',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'blog',
    title: 'Blog — Lucas Favareto',
    loadComponent: () =>
      import('./pages/blog-list/blog-list.component').then((m) => m.BlogListComponent),
  },
  {
    path: 'blog/:slug',
    loadComponent: () =>
      import('./pages/blog-post/blog-post.component').then((m) => m.BlogPostComponent),
  },
  {
    path: 'not-found',
    title: 'Página não encontrada — Lucas Favareto',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
  {
    path: '**',
    title: 'Página não encontrada — Lucas Favareto',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
