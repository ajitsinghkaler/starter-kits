import { Injectable, inject } from '@angular/core';
import { StarterKit } from '../models/starter-kit';
import { SupabaseService } from './supabase.service';
import { NgForm } from '@angular/forms';
import { Bookmark, ReviewsCount } from '../stores/starter-kit.store';

export interface Filters {
  name: string;
  tags: string;
  pricing_type: 'Free' | 'Paid';
  featured: boolean;
  new: boolean;
  page: number;
  limit: number;
}

@Injectable({
  providedIn: 'root',
})
export class StarterKitsService {
  supabaseService = inject(SupabaseService);

  constructor() {}

  async getStarterKits(filters: Partial<Filters> = { page: 1 }) {
    console.log('filters', filters);
    let ids: number[] = [];
    if (filters.tags) {
      filters.tags = filters.tags.toString();
      const { data: taggedKits, error: tagError } =
        await this.supabaseService.supabase
          .from('starter_kit_tags')
          .select('starter_kit')
          .eq('tags', filters.tags);

      if (tagError || !taggedKits.length) {
        console.error('Error fetching starter kits or no kits found', tagError);
        return;
      }

      ids = taggedKits.map((kit) => kit.starter_kit);
    }
    console.log('ids', ids);
    let query = this.supabaseService.supabase
      .from('starter_kits')
      .select(`*,   tags(*)`);

    Object.keys(filters).forEach((key) => {
      const filterKey = key as keyof Filters;
      const filterValue = filters[filterKey];

      if (filterValue) {
        switch (filterKey) {
          case 'name':
            query = query.filter(filterKey, 'ilike', `%${filterValue}%`);
            break;
          case 'tags':
            query = query.in('id', ids);
            break;
          case 'pricing_type':
            query = query.filter('pricing_type', 'eq', filterValue);
            break;
          case 'featured':
            query = query.filter('featured', 'eq', filterValue);
            break;
          case 'new':
            query = query.order('id', { ascending: false });
            break;
          default:
            break;
        }
      }
    });

    if (filters.page && filters.limit) {
      query = query.range(
        Number((filters.page - 1) * filters.limit),
        Number(filters.page * filters.limit)
      );
    }

    console.log('query', query);
    const { data, error } = await query.returns<StarterKit[]>();
    console.log('data', data);

    if (error) {
      console.error('Error fetching users:', error);
      return;
    }
    return data;
  }

  async createStarterKit(form: NgForm) {
    form.form.markAllAsTouched();
    if (form.invalid) return;
    const value = form.value;
    return this.supabaseService.supabase.from('starter_kits').insert({
      name: value.name,
      website: value.website,
      description: value.description,
      short_description: value.description,
      price: value.price,
      pricing_type: value.pricing_type,
      kit_image: value.image,
    });
  }

  async getStarterKitsTags(tags: number[], starterKitId: number, limit=8) {
    return this.supabaseService.supabase
      .from('starter_kit_tags')
      .select(`starter_kits(*, tags(*))`)
      .neq('starter_kit', starterKitId.toString())
      .filter('tags', 'in', `(${tags.join(',')})`)
      .limit(limit)
      .returns<{ starter_kits: StarterKit }[]>();
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
        ),
      bookmarks: profile!saved_starter_kits(count),
      reviewsCount: reviews(count)`
      )
      .eq('id', id)
      .single<StarterKit & Bookmark & ReviewsCount>();
  }

  bookmarkStarterKit(starterKitId: number) {
    return this.supabaseService.supabase
      .from('saved_starter_kits')
      .insert({ starter_kit_id: starterKitId })
      .select();
  }

  deleteBookmark(starterKitId: number) {
    return this.supabaseService.supabase
      .from('saved_starter_kits')
      .delete()
      .eq('starter_kit_id', starterKitId);
  }

  getBookmarkStarterKits(profileId: string, staterKitId: number) {
    return this.supabaseService.supabase
      .from('saved_starter_kits')
      .select('starter_kit_id')
      .eq('user_id', profileId)
      .eq('starter_kit_id', staterKitId);
  }
}
