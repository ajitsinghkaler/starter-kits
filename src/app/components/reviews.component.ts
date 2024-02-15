import { Component, inject, input } from '@angular/core';
import { ReviewsCardComponent } from './reviews-card.component';
import { Review } from '../models/review';
import { SubmitReviewComponent } from './submit-review.component';
import { StarterKitStore } from '../stores/starter-kit.store';
import { TitleCasePipe } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reviews',
  standalone: true,
  template: `
    <div>
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold tracking-tighter sm:text-3xl my-6">
          {{ starterKitStore.starterKit()?.name | titlecase }} Reviews
        </h2>
        @if (starterKitStore.writeReview()) {
        <button
          class="bg-red-600 text-white px-4 py-2 hover:bg-red-700 transition flex items-center rounded"
          (click)="starterKitStore.stopWritingReview()"
        >
          Cancel
        </button>
        } @else {
        <button
          class="bg-black text-white px-4 py-2 hover:bg-gray-900 transition flex items-center rounded"
          (click)="writeReview()"
        >
          Write a review
        </button>
        }
      </div>
      @if (starterKitStore.writeReview()) {
      <app-submit-review></app-submit-review>
      }
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-20">
        @for (review of reviews(); track $index) {
        <app-reviews-card [reviewData]="review"></app-reviews-card>
        } @empty {
        <p class="text-lg">
          There are no reviews yet. Be the
          <span
            (click)="starterKitStore.startWritingReview()"
            (keyup.enter)="starterKitStore.startWritingReview()"
            tabindex="0"
            role="button"
            class="font-bold hover:underline cursor-pointer"
            >first</span
          >
          to write a review
        </p>
        }
      </div>
    </div>
  `,
  imports: [
    ReviewsCardComponent,
    SubmitReviewComponent,
    TitleCasePipe,
  ],
})
export class ReviewsComponent {
  reviews = input.required<Review[]>();
  starterKitStore = inject(StarterKitStore);
  authService = inject(AuthService);

  writeReview() {
    if (this.authService.userState().user) {
      this.starterKitStore.startWritingReview();
    } else {
      // this.messageService.add({
      //   severity: 'error',
      //   summary: 'Not Logged In',
      //   detail: 'Please login to write a review.',
      // });
    }
  }
}
