import { Component, inject } from '@angular/core';
import { StarterKitStore } from '../stores/starter-kit.store';
import { FormsModule } from '@angular/forms';
import { ReviewService } from '../services/review.service';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-submit-review',
  standalone: true,
  imports: [FormsModule, InputTextareaModule, RatingModule],
  template: `
    <div class="container mx-auto">
      <div>
        <h1>Submit a Review</h1>
      </div>
      <form
        #submitReviewForm="ngForm"
        (ngSubmit)="
          reviewService.createReview(
            submitReviewForm,
            this.starterKitStore.starterKit()?.id
          )
        "
        class="flex flex-col gap-4"
      >
        <p-rating name="rating" [cancel]="false" ngModel></p-rating>

        <div class="flex flex-col">
          <label for="review">Review</label>
          <textarea
            ngModel
            rows="5"
            pInputTextarea
            id="review"
            name="review_text"
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  `,
  styles: ``,
})
export class SubmitReviewComponent {
  starterKitStore = inject(StarterKitStore);
  reviewService = inject(ReviewService);
}
