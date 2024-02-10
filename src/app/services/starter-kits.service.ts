import { Injectable, inject } from '@angular/core';
import { StarterKit } from '../models/starter-kit';
import { SupabaseService } from './supabase.service';
import { NgForm } from '@angular/forms';

export interface Filters {
  name: string;
  tags: string;
  pricing_type: string;
}

interface AppliedFilters {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: (value: string) => any
  ;
}

@Injectable({
  providedIn: 'root',
})
export class StarterKitsService {
  supabaseService = inject(SupabaseService);

  constructor() {}

  async getStarterKits(filters: Partial<Filters> = {}) {
    let query = this.supabaseService.supabase.from('starter_kits').select('*');

    const appliedFilters: AppliedFilters = {
      name: (value: string) => query.ilike('name', `%${value}%`),
      tags: (value: string) => query.in('tags.id', [value.split(',')]),
      pricing_type: (value: string) => query.eq('pricing_type', value),
    };
    
    Object.keys(filters).forEach((key) => {
      const filterKey = key as keyof Filters; // Assert key is a keyof Filters
      const filterValue = filters[filterKey];
      if (filterValue !== undefined) {
        query = appliedFilters[filterKey](filterValue);
      }
    });

    // Execute the query

    const { data, error } = await query.returns<StarterKit[]>();

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
