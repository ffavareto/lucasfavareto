import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    title: 'Lucas Santos',
    loadComponent: () =>
      import('./pages/profile/profile.component').then(
        (m) => m.ProfileComponent
      ),
  },
  {
    path: 'curriculum',
    title: 'Currículo',
    loadComponent: () =>
      import('./pages/curriculum/curriculum.component').then(
        (m) => m.CurriculumComponent
      ),
  },
];
