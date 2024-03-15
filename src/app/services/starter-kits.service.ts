import { Injectable, inject } from '@angular/core';
import { StarterKit } from '../models/starter-kit';
import { SupabaseService } from './supabase.service';
import { NgForm } from '@angular/forms';
import { Bookmark, ReviewsCount } from '../stores/starter-kit.store';
import { Tag } from '../models/tag';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

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
  authService = inject(AuthService);
  router = inject(Router);
  messageService = inject(MessageService)

  constructor() {}

  async getStarterKits(filters: Partial<Filters> = { page: 1 }) {
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

    const { data, error } = await query.returns<StarterKit[]>();

    if (error) {
      console.error('Error fetching users:', error);
      return;
    }
    return data;
  }

  async createStarterKit(form: NgForm, file: FileList | null) {
    form.form.markAllAsTouched();
    if (form.invalid) return;
    if (!file) return;
    const value = form.value;
    try {
      const { data, error: starterKitError } =
        await this.supabaseService.supabase
          .from('starter_kits')
          .insert({
            name: value.name,
            website: value.website,
            short_description: value.description,
            description: value.description,
            kit_image:
              `${environment.supabaseUrl}/storage/v1/object/public/starterKitImages/` +
              (await this.uploadImage(
                file,
                this.authService.userState.getValue().user!.id
              )),
            // tags: value.tags,
            price: value.price,
            pricing_type: value.pricing_type,
          })
          .select()
          .single<StarterKit>();
      if (starterKitError) throw starterKitError;

      const starterkit_id = data.id;

      const { error: tagsError } =
        await this.supabaseService.supabase.from('starter_kit_tags').insert(
          value.tags.map((tag: Tag) => ({
            tags: tag.id,
            starter_kit: starterkit_id,
          }))
        );
      if (tagsError) throw tagsError;
      this.router.navigate(['/']);
      this.messageService.add({
        severity: 'success',
        summary: 'Successfully Added',
        detail: "Your boilerplate has been added",
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async editStarterKit(
    form: NgForm,
    file: FileList | null,
    kitId: number | undefined
  ) {
    form.form.markAllAsTouched();
    if (form.invalid) return;
    // if (!file) return;
    const value = form.value;
    try {
      const { data, error: starterKitError } =
        await this.supabaseService.supabase
          .from('starter_kits')
          .update({
            name: value.name,
            website: value.website,
            short_description: value.description,
            description: value.description,
            ...(file && {
              kit_image:
                `${environment.supabaseUrl}/storage/v1/object/public/starterKitImages/` +
                (await this.uploadImage(
                  file,
                  this.authService.userState.getValue().user!.id
                )),
            }),
            // tags: value.tags,
            price: value.price,
            pricing_type: value.pricing_type,
          })
          .match({ id: kitId||0 })
          .select()
          .single<StarterKit>();
      if (starterKitError) throw starterKitError;

      const starterkit_id = data.id;

      const {  error: tagsError } =
        await this.supabaseService.supabase.from('starter_kit_tags').upsert(
          value.tags.map((tag: Tag) => ({
            tags: tag.id,
            starter_kit: starterkit_id,
          })),
          { ignoreDuplicates: true }
        );
      if (tagsError) throw tagsError;
      this.router.navigate(['/profile']);
      this.messageService.add({
        severity: 'success',
        summary: 'Successfully edited',
        detail: "The boilerplate you changed has been edited successfully",
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async getStarterKitsTags(tags: number[], starterKitId: number, limit = 8) {
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

  async uploadImage(files: FileList, userId: string) {
    if (!files?.length) return;
    const file = files[0];
    const timeStamp = Date.now();
    const filePath = `starter_kits/${userId}/${timeStamp}-${file.name}`;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, error } = await this.supabaseService.supabase.storage
      .from('starterKitImages')
      .upload(filePath, file);

    if (error) {
      console.error('Error uploading the file', error);
      return;
    }

    return data.path;
  }
}
