import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { loggedOutGuard } from './guards/logged-out.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home.component').then((c) => c.HomeComponent),
  },
  {
    path:'auth',
    canActivateChild: [loggedOutGuard],
    loadComponent: () =>
      import('./pages/auth.component').then((c) => c.AuthComponent),
      children: [
        {
          path: 'login',
          loadComponent: () =>
            import('./components/login.component').then((c) => c.LoginComponent),
        },
        {
          path: 'signup',
          loadComponent: () =>
            import('./components/signup.component').then((c) => c.SignupComponent),
        },
        {
          path: 'forgot-password',
          loadComponent: () =>
            import('./components/forgot-password.component').then((c) => c.ForgotPasswordComponent),
        },
      ]
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./pages/reset-password.component').then((c) => c.ResetPasswordComponent),
  },
  {
    path: 'details/:starterKitId',
    loadComponent: () =>
      import('./pages/details.component').then((c) => c.DetailsComponent),
  },
  {
    path: 'submit',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/submit.component').then((c) => c.SubmitComponent),
    
  },
  {
    path:'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/profile.component').then((c) => c.ProfileComponent),
  },
  {
    path:'contact',
    loadComponent: () =>
      import('./pages/contact.component').then((c) => c.ContactComponent),
  },
  {
    path:'**',
    loadComponent: () =>
      import('./pages/not-found.component').then((c) => c.NotFoundComponent),
  }
];
