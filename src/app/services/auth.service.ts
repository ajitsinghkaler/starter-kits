import { Injectable, inject } from '@angular/core';
// import {
//   AuthChangeEvent,
//   AuthSession,
//   Session,
//   User,
// } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';
import { NgForm } from '@angular/forms';
import { AuthChangeEvent, AuthSession, Session } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  supabaseService = inject(SupabaseService);

  _session: AuthSession | null = null;

  get session() {
    this.supabaseService.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }

  authChanges(
    callback: (
      event: AuthChangeEvent,
      session: Session | null
    ) => void
  ) {
    return this.supabaseService.supabase.auth.onAuthStateChange(callback);
  }

  signUpEmail(form: NgForm) {
    const { email, password, repeatPassword } = form.value;
    if (password !== repeatPassword) {
      return 
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

    return this.supabaseService.supabase.auth.resetPasswordForEmail(email,{
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
}
