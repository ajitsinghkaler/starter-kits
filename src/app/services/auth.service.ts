import { Injectable, inject } from '@angular/core';
// import {
//   AuthChangeEvent,
//   AuthSession,
//   Session,
//   User,
// } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';
import { NgForm } from '@angular/forms';
import {
  AuthChangeEvent,
  AuthSession,
  Session,
  User,
  UserResponse,
} from '@supabase/supabase-js';
import { patchState, signalState } from '@ngrx/signals';
type UserState = {
  user: User | null;
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userState = signalState<UserState>({ user: null });
  supabaseService = inject(SupabaseService);

  constructor() {
    this.getUser();
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabaseService.supabase.auth.onAuthStateChange(callback);
  }

  signUpEmail(form: NgForm) {
    const { email, password, repeatPassword } = form.value;
    if (password !== repeatPassword) {
      return;
    }
    return this.supabaseService.supabase.auth.signUp({
      email: email,
      password: password,
    });
  }

  loginEmail(form: NgForm) {
    const { email, password } = form.value;
    return this.supabaseService.supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
  }

  signOut() {
    return this.supabaseService.supabase.auth.signOut();
  }

  resetPassword(form: NgForm) {
    const { email } = form.value;

    return this.supabaseService.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:4200/reset-password',
    });
  }

  newPassword(form: NgForm) {
    const { password, repeatPassword } = form.value;

    if (password !== repeatPassword) {
      return;
    }
    return this.supabaseService.supabase.auth.updateUser({
      password: password,
    });
  }

  /**
   * Retrieves the currently authenticated user.
   * @returns {Promise<SupabaseUser | null>} A promise that resolves to the authenticated user or null if no user is authenticated.
   */
  async getUser() {
    return await this.supabaseService.supabase.auth
      .getUser()
      .then((user) => {
        patchState(this.userState, () => ({ user: user.data.user }));
        return user;
      });
  }
}
