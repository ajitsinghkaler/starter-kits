import { Component, inject, input } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { Review } from '../models/review';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reviews-card',
  standalone: true,
  imports: [AvatarModule, RatingModule, FormsModule],
  template: `
    <div class="rounded-lg bg-white p-6 shadow-md border-gray-100 border">
      <div class="flex items-center">
        <p-avatar
          styleClass="mr-2"
          size="large"
          label="{{ reviewData().profile.full_name?.charAt(0) || 'R' }}"
        ></p-avatar>
        <div class="flex">
          <p-rating
            [ngModel]="reviewData().rating"
            [readonly]="true"
            [cancel]="false"
          ></p-rating>
          <span class="text-gray-700 ml-2 text-lg font-bold leading-none	mt-[2px]"
            >({{ reviewData().rating }})</span
          >
        </div>
      </div>
      <div class="mt-6">
        {{ reviewData().review_text }}
      </div>
    </div>
  `,
  styles: ``,
})
export class ReviewsCardComponent {
  reviewData = input.required<Review>();
}
