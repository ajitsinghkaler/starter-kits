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
  providers: [ReviewService],
  template: `
    <div class="max-w-3xl mb-20 mt-6 mx-auto">
      <form
        #submitReviewForm="ngForm"
        (ngSubmit)="
          reviewService.createReview(
            submitReviewForm,
            starterKitStore.starterKit()?.id
          )
        "
        class="flex flex-col gap-4 "
      >
        <div>
          <div class="flex items-center">
          Your Star Rating:
          <p-rating
            class="ml-4"
            name="rating"
            [cancel]="false"
            required
            ngModel
            #rating="ngModel"
          ></p-rating>
          </div>
          @if(rating.touched && rating.invalid){
        <div class="text-red-500 text-sm mt-2">
          Please give a rating to the boiler plate.
        </div>
        }
        </div>
        

        <div class="flex flex-col">
          <textarea
            ngModel
            rows="5"
            pInputTextarea
            #reviewText="ngModel"
            required
            id="review"
            name="review_text"
            placeholder="Write your review here..."
          ></textarea>
          @if(reviewText.touched && reviewText.invalid){
          <div class="text-red-500 text-sm mt-2">
            Please write some review text before submitting.
          </div>
          }
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
