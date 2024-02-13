import { Component, inject, input } from '@angular/core';
import { ReviewsCardComponent } from './reviews-card.component';
import { Review } from '../models/review';
import { SubmitReviewComponent } from './submit-review.component';
import { StarterKitStore } from '../stores/starter-kit.store';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-reviews',
  standalone: true,
  template: `
    <div class="container mx-auto">
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
          (click)="starterKitStore.startWritingReview()"
        >
          Write a review
        </button>
        }
      </div>
      @if (starterKitStore.writeReview()) {
      <app-submit-review></app-submit-review>
      }
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 mb-20"
      >
        @for (review of reviews(); track $index) {
        <app-reviews-card [reviewData]="review"></app-reviews-card>
        }
      </div>
    </div>
  `,
  imports: [ReviewsCardComponent, SubmitReviewComponent, TitleCasePipe],
})
export class ReviewsComponent {
  reviews = input.required<Review[]>();
  starterKitStore = inject(StarterKitStore);
}
