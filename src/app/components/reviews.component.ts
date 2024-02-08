import { Component, input } from '@angular/core';
import { ReviewsCardComponent } from './reviews-card.component';
import { Review } from '../models/review';
import { SubmitReviewComponent } from "./submit-review.component";

@Component({
    selector: 'app-reviews',
    standalone: true,
    template: `
    <div class="container mx-auto">
      <div>
        <h1>Reviews</h1>
      </div>

      <app-submit-review></app-submit-review>
      <div class="grid grid-cols-3 gap-6">
        @for (review of reviews(); track $index) {
        <app-reviews-card [reviewData]="review"></app-reviews-card>
        }
      </div>
    </div>
  `,
    imports: [ReviewsCardComponent, SubmitReviewComponent]
})
export class ReviewsComponent {
  reviews = input.required<Review[]>();
}
