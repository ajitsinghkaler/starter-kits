import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { AuthService } from './auth.service';
import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  supabaseService = inject(SupabaseService);
  authService = inject(AuthService);
  getProfile(id: string) {
    return this.supabaseService.supabase
      .from('profile')
      .select('*, starter_kits(*, tags(*))')
      .eq('id', id)
      .single<Profile>();
  }
}
