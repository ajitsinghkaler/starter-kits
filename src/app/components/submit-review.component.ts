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
    <div class="max-w-3xl mb-20 mt-6 mx-auto">
      <form
        #submitReviewForm="ngForm"
        (ngSubmit)="
          reviewService.createReview(
            submitReviewForm,
            this.starterKitStore.starterKit()?.id
          );
          starterKitStore.stopWritingReview()
        "
        class="flex flex-col gap-4 "
      >
        <div class="flex ">
          Your Star Rating:
          <p-rating
            class="ml-4"
            name="rating"
            [cancel]="false"
            ngModel
          ></p-rating>
        </div>

        <div class="flex flex-col">
          <textarea
            ngModel
            rows="5"
            pInputTextarea
            id="review"
            name="review_text"
            placeholder="Write your review here..."
          ></textarea>
        </div>
        <button
          class="bg-black text-white px-4 py-2 hover:bg-gray-900 transition rounded max-w-32 w-full self-end	"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  `,
  styles: ``,
})
export class SubmitReviewComponent {
  starterKitStore = inject(StarterKitStore);
  reviewService = inject(ReviewService);
}
