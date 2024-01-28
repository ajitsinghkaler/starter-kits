import { Component } from '@angular/core';
import { ReviewsCardComponent } from './reviews-card.component';

@Component({
  selector: 'app-reviews',
  standalone: true,

  template: `
    <div class="container mx-auto">
      <div>
        <h1>Reviews</h1>
      </div>
      <div class="grid grid-cols-3 gap-6">
        @for (review of reviewData; track $index) {
        <app-reviews-card [reviewData]="review"></app-reviews-card>
        }
      </div>
    </div>
  `,
  imports: [ReviewsCardComponent],
})
export class ReviewsComponent {
  reviewData = [
    {
      id: 1,
      userName: 'Alice123',
      rating: 4,
      review:
        'Great product, fast delivery, but packaging was slightly damaged.',
    },
    {
      id: 2,
      userName: 'BobTheBuilder',
      rating: 5,
      review: 'Excellent service and quality. Highly recommend!',
    },
    {
      id: 3,
      userName: 'Cathy_Cat',
      rating: 3,
      review:
        'Average experience. The product works as expected, but nothing extraordinary.',
    },
    {
      id: 4,
      userName: 'DavidDoe',
      rating: 2,
      review: 'The item arrived late and customer support was not helpful.',
    },
    {
      id: 5,
      userName: 'Eve_Adventurer',
      rating: 1,
      review: "Poor quality and not as described. I'm very disappointed.",
    },
    {
      id: 6,
      userName: 'FrankieFast',
      rating: 5,
      review: 'Superb experience! The product exceeded my expectations.',
    },
  ];
}
