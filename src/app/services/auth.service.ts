import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { NgForm } from '@angular/forms';
import { AuthChangeEvent, Session, User } from '@supabase/supabase-js';
import { patchState, signalState } from '@ngrx/signals';
import { Router } from '@angular/router';
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

  constructor() {
    this.authChanges((_, session) => {
      // console.log('session', session, _);
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
    const { data, error } = await this.supabaseService.supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      return;
    }
    const { data: loginData, error: loginError } =
      await this.supabaseService.supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
    if (loginError) {
      return;
    }
    this.router.navigate(['/']);
  }

  async loginEmail(form: NgForm) {
    form.form.markAllAsTouched();
    if (form.invalid) return;
    const { email, password } = form.value;
    const { data, error } =
      await this.supabaseService.supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
    if (error) {
      return;
    }
    this.router.navigate(['/']);
  }

  signOut() {
    return this.supabaseService.supabase.auth.signOut().then(() => {
      patchState(this.userState, () => ({ user: null }));
      const currentUrl = this.router.url;
      if (currentUrl === '/profile' || currentUrl === '/submit') {
        this.router.navigate(['/auth/login']);
      }
    });
  }

  resetPassword(form: NgForm) {
    form.form.markAllAsTouched();
    if (form.invalid) return;
    const { email } = form.value;

    return this.supabaseService.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:4200/reset-password',
    });
  }

  newPassword(form: NgForm) {
    form.form.markAllAsTouched();
    if (form.invalid) return;
    const { password, repeatPassword } = form.value;

    if (password !== repeatPassword) {
      return;
    }
    return this.supabaseService.supabase.auth.updateUser({
      password: password,
    });
  }
}
