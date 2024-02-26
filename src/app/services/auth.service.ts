import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { NgForm } from '@angular/forms';
import { AuthChangeEvent, Session, User } from '@supabase/supabase-js';
import { patchState, signalState } from '@ngrx/signals';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
type UserState = {
  user: User | null;
  authError: string | null;
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  router = inject(Router);
  userState = signalState<UserState>({ user: null, authError: null });
  supabaseService = inject(SupabaseService);
  messageService = inject(MessageService);

  constructor() {
    this.authChanges((_, session) => {
      patchState(this.userState, () => ({ user: session?.user }));
    });
  }

  get session() {
    return this.supabaseService.supabase.auth.getSession();
  }

  isAuthenticated() {
    return !!this.userState().user;
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabaseService.supabase.auth.onAuthStateChange(callback);
  }

  async signUpEmail(form: NgForm) {
    form.form.markAllAsTouched();
    if (form.invalid) return;
    const { email, password, repeatPassword } = form.value;
    if (password !== repeatPassword) {
      return;
    }
    const { error } = await this.supabaseService.supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'SignUp Error',
        detail: error.message || 'An error occurred while signing up.',
      });
      return;
    }
    const { error: loginError } =
      await this.supabaseService.supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
    if (loginError) {
      this.messageService.add({
        severity: 'error',
        summary: 'Login Error',
        detail: loginError.message || 'An error occurred while signing in.',
      });
      return;
    }
    this.router.navigate(['/']);
  }

  async loginEmail(form: NgForm) {
    form.form.markAllAsTouched();
    if (form.invalid) return;
    const { email, password } = form.value;
    const { error } =
      await this.supabaseService.supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
    if (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Login Error',
        detail: error.message || 'An error occurred while logging in.',
      });
      return;
    }

    this.router.navigate(['/']);
  }

  async signOut() {
    const { error } = await this.supabaseService.supabase.auth.signOut();
    if (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Logout Error',
        detail: error.message || 'An error occurred while logging out.',
      });
    }

    patchState(this.userState, () => ({ user: null }));
    const currentUrl = this.router.url;
    if (currentUrl === '/profile' || currentUrl === '/submit') {
      this.router.navigate(['/auth/login']);
    }
    this.messageService.add({
      severity: 'Info',
      summary: 'Logged Out',
      detail: "You've been logged out successfully.",
    });
  }

  async resetPassword(form: NgForm) {
    form.form.markAllAsTouched();
    if (form.invalid) return;
    const { email } = form.value;

    const { error } =
      await this.supabaseService.supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:4200/reset-password',
      });

    if (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Logout Error',
        detail:
          error.message ||
          'An error occurred while sending reset password email.',
      });
      return;
    }
    this.messageService.add({
      severity: 'Info',
      summary: 'Success',
      detail: 'Reset password email sent successfully.',
    });
  }

  async newPassword(form: NgForm) {
    form.form.markAllAsTouched();
    if (form.invalid) return;
    const { password, repeatPassword } = form.value;

    if (password !== repeatPassword) {
      return;
    }
    const { error } = await this.supabaseService.supabase.auth.updateUser({
      password: password,
    });

    if(error){
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: error.message || 'An error occurred while updating the password.',
      });
      return;
    }
    this.messageService.add({
      severity: 'Info',
      summary: 'Success',
      detail: 'Password updated successfully.',
    });

    this.router.navigate(['/']);
  }

  async loginWithGoogle() {
    const { error } = await this.supabaseService.supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: error.message || 'An error occurred while logging in with Google.',
      });
      return;
    }
  }
}
