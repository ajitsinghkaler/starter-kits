import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const messageService = inject(MessageService);
  return authService.session
    .then(({ data, error }) => {
      if (error || !data.session) {
        messageService.add({
          severity: 'error',
          summary: 'Access Denied',
          detail: 'You must be logged in to access this page',
        });
        router.navigate(['/auth/login']);
        return false;
      }
      return true;
    })
    .catch(() => {
      router.navigate(['/auth/login']);
      return false;
    });
};
