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
      .select(
        '*, myKits: starter_kits!starter_kits_user_fkey(*, tags(*)), savedKits: starter_kits!saved_starter_kits(*, tags(*))'
      )
      .eq('id', id)
      .single<Profile>();
  }

  updateProfile(profile: Profile, id: string) {
    return this.supabaseService.supabase
      .from('profile')
      .update({...profile, id})
      .match({ id }).select()
      .single<Profile>();
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
