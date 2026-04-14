import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    title: 'Lucas Favareto — Engenheiro de Software',
    loadComponent: () =>
      import('./pages/profile/profile.component').then(
        (m) => m.ProfileComponent
      ),
  },
  {
    path: 'curriculum',
    redirectTo: '',
    pathMatch: 'full',
  },
];
