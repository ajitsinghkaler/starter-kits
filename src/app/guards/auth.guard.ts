import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';

export async function authGuard() {
  const router = inject(Router);
  const authService = inject(AuthService);
  const messageService = inject(MessageService);
  const { data, error } = await authService.session;
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
}
