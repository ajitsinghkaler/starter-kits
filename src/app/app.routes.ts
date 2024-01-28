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
  {
    path: 'submit',
    loadComponent: () =>
      import('./pages/submit.component').then((c) => c.SubmitComponent),
  },
  {
    path:'profile',
    loadComponent: () =>
      import('./pages/profile.component').then((c) => c.ProfileComponent),
  },
  {
    path:'**',
    loadComponent: () =>
      import('./pages/not-found.component').then((c) => c.NotFoundComponent),
  }
];
