import { Injectable, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SupabaseService } from './supabase.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  supabaseService = inject(SupabaseService);
  authService = inject(AuthService);
  async createReview(form: NgForm, starter_kit_id: number | undefined) {

    const value = form.value;

    console.log('value', value, starter_kit_id);

    return this.supabaseService.supabase.from('reviews').insert({
      review_text: value.review_text,
      rating: value.rating,
      starter_kit: starter_kit_id,
    }).then(() => {

    });
  }
}
