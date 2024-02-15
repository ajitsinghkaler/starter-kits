import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return authService.session
    .then(({ data, error }) => {
      if (error || !data.session) {
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
