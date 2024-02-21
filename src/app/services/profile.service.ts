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

  updateName(name: string) {
    return this.supabaseService.supabase
      .from('profile')
      .update({ full_name: name })
      .eq('id', this.authService.userState().user?.id);
  }

  updateWebsite(website: string) {
    return this.supabaseService.supabase
      .from('profile')
      .update({ website })
      .eq('id', this.authService.userState().user?.id);
  }
  updateEmail(email: string) {
    return this.supabaseService.supabase
      .from('profile')
      .update({ email })
      .eq('id', this.authService.userState().user?.id);
  }
}
