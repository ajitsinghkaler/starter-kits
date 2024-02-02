import { Injectable, inject } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  Session,
  User,
} from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';
export interface Profile {
  id?: string;
  username: string;
  website: string;
  avatar_url: string;
}

@Injectable()
export class AuthService {
  supabaseService = inject(SupabaseService);

  loginEmail(email: string, password: string) {
    return this.supabaseService.supabase.auth.signUp({
      email: email,
      password: password,
    });
  }

  signOut() {
    return this.supabaseService.supabase.auth.signOut();
  }
}
