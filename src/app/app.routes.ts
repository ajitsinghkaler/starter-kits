import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'details',
    loadComponent: () =>
      import('./pages/details.component').then((c) => c.DetailsComponent),
  },
];
