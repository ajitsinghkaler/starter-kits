import { Component, input } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { Review } from '../models/review';
import { RatingModule } from 'primeng/rating';


@Component({
  selector: 'app-reviews-card',
  standalone: true,
  imports: [AvatarModule, RatingModule],
  template: `
    <div class="rounded-lg bg-white p-6 shadow-md border-gray-100 border">
      <div class="flex items-center">
        <p-avatar label="A" styleClass="mr-2" size="large"></p-avatar>
        <div class="flex">
            <p-rating [stars]="reviewData().rating" [readonly]="true" [cancel]="false"></p-rating>
            <span class="text-gray-700 ml-3">({{reviewData().rating}})</span>
        </div>
      </div>
      <div>
        {{reviewData().review}}
      </div>
    </div>
  `,
  styles: ``
})
export class ReviewsCardComponent {
  reviewData = input.required<Review>();
}
