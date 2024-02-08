import { Injectable, inject } from '@angular/core';
import { StarterKit } from '../models/starter-kit';
import { SupabaseService } from './supabase.service';
import { NgForm } from '@angular/forms';
import { Tables } from '../../../types/supabase';

type kitsState = {
  starterkits: StarterKit[];
  isLoading: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class StarterKitsService {
  supabaseService = inject(SupabaseService);

  constructor() {}

  async getStarterKits() {
    const { data, error } = await this.supabaseService.supabase
      .from('starter_kits')
      .select()
      .returns<StarterKit[]>();
    if (error) {
      console.error('Error fetching users:', error);
      return;
    }
    return data;
  }

  async createStarterKit(form: NgForm) {
    const value = form.value;
    return this.supabaseService.supabase.from('starter_kits').insert({
      name: value.name,
      website: value.website,
      description: value.description,
      short_description: value.description,
      price: 10,
      pricing_type: 'Paid',
      kit_image: value.image,
      user: '46b2f980-9a28-484c-8177-d39e4748e949',
    });
  }

  getStarterKitById(id: number) {
    return this.supabaseService.supabase
      .from('starter_kits')
      .select(
        `
      *, 
      tags(*), 
      reviews(
        *,
        profile(avatar_url, full_name)
        )`
      )
      .eq('id', id)
      .single<StarterKit>();
  }
}
