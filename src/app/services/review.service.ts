import { Injectable, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SupabaseService } from './supabase.service';
import { StarterKitStore } from '../stores/starter-kit.store';

@Injectable()
export class ReviewService {
  supabaseService = inject(SupabaseService);
  starterKitStore = inject(StarterKitStore);
  async createReview(form: NgForm, starter_kit_id: number | undefined) {
    const value = form.value;

    console.log('value', value, starter_kit_id);

    return this.supabaseService.supabase
      .from('reviews')
      .insert({
        review_text: value.review_text,
        rating: value.rating,
        starter_kit: starter_kit_id,
      })
      .then(() => {
        this.starterKitStore.loadStarterKit(starter_kit_id || 0);
        this.starterKitStore.stopWritingReview();
      });
  }
}
