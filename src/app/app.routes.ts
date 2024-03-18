import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { loggedOutGuard } from './guards/logged-out.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home.component').then((c) => c.HomeComponent),
    title: 'StarterKitHub: Launch Your Project in Record Time!',
  },
  {
    path: 'auth',
    canActivateChild: [loggedOutGuard],
    loadComponent: () =>
      import('./pages/auth.component').then((c) => c.AuthComponent),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./components/login.component').then((c) => c.LoginComponent),
        title: 'StarterKitHub: Login into your account!',
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./components/signup.component').then(
            (c) => c.SignupComponent
          ),
        title: 'StarterKitHub: Signup for an account!',
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./components/forgot-password.component').then(
            (c) => c.ForgotPasswordComponent
          ),
        title: 'StarterKitHub: Forgot password!',
      },
    ],
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./pages/reset-password.component').then(
        (c) => c.ResetPasswordComponent
      ),
    title: 'StarterKitHub: Reset and get a new password',
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
    title: 'StarterKitHub: Submit a new boilerplate',
  },
  {
    path: 'tos',
    loadComponent: () =>
      import('./pages/tos.component').then((c) => c.TosComponent),
    title: 'Terms of Service for staterkithub',
  },
  {
    path: 'privacy',
    loadComponent: () =>
      import('./pages/privacy.component').then((c) => c.PrivacyComponent),
    title: 'Privacy policy for starterKitHub',
  },
  {
    path: 'submit/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/edit-kit.component').then((c) => c.EditKitComponent),
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/profile.component').then((c) => c.ProfileComponent),
    title: 'StarterKitHub profile check out your saved boilerplates.',
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact.component').then((c) => c.ContactComponent),
    title: 'Contact staterkithub for any help', 
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found.component').then((c) => c.NotFoundComponent),
    title: 'Page not found',
  },
];
