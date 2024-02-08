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
    // console.log(this.authService.userState.user());
    const value = form.value;
    value.name

    console.log('value', value, starter_kit_id);

    return this.supabaseService.supabase.from('reviews').insert({
      review_text: value.review_text,
      rating: 5,
      starter_kit: starter_kit_id,
    });
  }
}
