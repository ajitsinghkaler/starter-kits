import { Injectable, inject } from '@angular/core';
// import {
//   AuthChangeEvent,
//   AuthSession,
//   Session,
//   User,
// } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';
import { NgForm } from '@angular/forms';
import { AuthChangeEvent, Session, User } from '@supabase/supabase-js';
import { patchState, signalState } from '@ngrx/signals';
type UserState = {
  user: User | null;
  authError: string | null;
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
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
    return this.supabaseService.supabase.auth.signOut().then(()=>{
      patchState(this.userState, () => ({ user: null }));
    });
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

}
