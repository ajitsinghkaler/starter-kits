import { Component, OnInit, inject, input } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { RatingModule } from 'primeng/rating';
import { ReviewsComponent } from '../components/reviews.component';
import { SimilarKitsComponent } from '../components/similar-kits.component';
import { StarterKitStore } from '../stores/starter-kit.store';
import { SkeletonModule } from 'primeng/skeleton';
import { NgPlural, NgPluralCase } from '@angular/common';
@Component({
  selector: 'app-details',
  standalone: true,
  providers: [StarterKitStore],
  template: `
    <div class="container mx-auto py-20">
      @if (starterKitStore.isLoading()) {
      <div class="border-round border-1 surface-border p-4 surface-card">
        <div class="flex mb-3">
          <p-skeleton shape="circle" size="4rem" styleClass="mr-2"></p-skeleton>
          <div>
            <p-skeleton width="10rem" styleClass="mb-2"></p-skeleton>
            <p-skeleton width="5rem" styleClass="mb-2"></p-skeleton>
            <p-skeleton height=".5rem"></p-skeleton>
          </div>
        </div>
        <p-skeleton width="100%" height="200px"></p-skeleton>
        <p-skeleton width="100%" height="200px"></p-skeleton>

        <div class="flex justify-between mt-3">
          <p-skeleton width="100%" height="2rem"></p-skeleton>
        </div>
      </div>
      } @else{
      <div class="flex">
        <div class="w-1/2">
          <div class="flex items-center">
            <p-avatar label="P" styleClass="mr-2" size="xlarge"></p-avatar>
            <div class="ml-4 flex justify-between">
              <h2 class="text-3xl font-bold tracking-tighter sm:text-5xl mr-5">
                {{ starterKitStore.starterKit()?.name }}
              </h2>
            </div>
          </div>
          @for (tag of starterKitStore.starterKit()?.tags; track $index) {
          <span
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
            ># {{ tag.name }}</span
          >
          }
          <div class="flex justify-between">
            <span
              [ngPlural]="starterKitStore.starterKit()?.reviews?.length || 0"
            >
              <ng-template ngPluralCase="=0">No reviews</ng-template>
              <ng-template ngPluralCase="=1"
                ><p-rating [readonly]="true" [cancel]="false"></p-rating> from
                {{ starterKitStore.starterKit()?.reviews?.length }}
                review</ng-template
              >
              <ng-template ngPluralCase="other"
                ><p-rating [readonly]="true" [cancel]="false"></p-rating> from
                {{ starterKitStore.starterKit()?.reviews?.length }}
                reviews</ng-template
              >
            </span>
            <a href="#">{{ starterKitStore.starterKit()?.website }}</a>
          </div>
          <p
            class="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400"
          >
            {{ starterKitStore.starterKit()?.short_description }}
          </p>
          <div class="flex items-center mt-4">
            <button
              class="bg-black text-white px-4 py-2 hover:bg-gray-900 transition flex items-center rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-5 w-5 mr-2"
              >
                <polygon
                  points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                ></polygon>
              </svg>
              Write a Review
            </button>
            <button
              class="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition ml-4 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#fff"
                stroke="#349eeb"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-6 w-6 mr-2"
              >
                <path
                  d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"
                ></path>
              </svg>
              324
            </button>
          </div>
        </div>
        <div class="w-1/2 h-96 overflow-hidden">
          <img
            [src]="starterKitStore.starterKit()?.image || 'https://via.placeholder.com/500'"
            alt="Boilerplate Image"
          />
        </div>
      </div>
      <div class="mx-auto w-full max-w-7xl px-4">
        <p class="my-2">
          {{ starterKitStore.starterKit()?.description }}
        </p>
      </div>
      @defer (on viewport; prefetch on idle) {
      <app-reviews
        [reviews]="starterKitStore.starterKit()?.reviews || []"
      ></app-reviews>
      <app-similar-kits
        [tags]="starterKitStore.starterKit()?.tags || []"
      ></app-similar-kits>
      } @placeholder {
      <p>Loading...</p>
      } }
    </div>
  `,
  styles: ``,
  imports: [
    AvatarModule,
    RatingModule,
    ReviewsComponent,
    SimilarKitsComponent,
    SkeletonModule,
    NgPluralCase,
    NgPlural,
  ],
})
export class DetailsComponent implements OnInit {
  starterKitId = input<number>(0);
  starterKitStore = inject(StarterKitStore);
  reviewCount = 10;
  ngOnInit() {
    this.starterKitStore.loadStarterKit(this.starterKitId());
  }
}
