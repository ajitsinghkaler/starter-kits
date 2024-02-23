import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Tag } from '../models/tag';
import { NgForm } from '@angular/forms';

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

  async createTag(form: NgForm) {
    const value = form.value;
    console.log('value', value);

    const tags = value.tags.map((tag:string) => ({ name: tag }));
    return this.supabaseService.supabase
      .from('tags')
      .insert(tags).returns<Tag[]>()
  }
}
