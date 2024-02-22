import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Tag } from '../models/tag';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  supabaseService = inject(SupabaseService);

  async getTags() {
    return this.supabaseService.supabase
      .from('tags')
      .select('*', { count: 'exact'}).returns<Tag[]>()
  }
}
