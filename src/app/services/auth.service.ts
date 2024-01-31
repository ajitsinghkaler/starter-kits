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
  _session: AuthSession | null = null;

  session() {
    this.supabaseService.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }

  profile(user: User) {
    return this.supabaseService.supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single();
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabaseService.supabase.auth.onAuthStateChange(callback);
  }

  signIn(email: string) {
    return this.supabaseService.supabase.auth.signInWithOtp({ email });
  }

  signOut() {
    return this.supabaseService.supabase.auth.signOut();
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      updated_at: new Date(),
    };

    return this.supabaseService.supabase.from('profiles').upsert(update);
  }

  downLoadImage(path: string) {
    return this.supabaseService.supabase.storage.from('avatars').download(path);
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabaseService.supabase.storage
      .from('avatars')
      .upload(filePath, file);
  }
}
