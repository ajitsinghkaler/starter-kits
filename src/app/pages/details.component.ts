import { Component, OnInit, inject, input } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { RatingModule } from 'primeng/rating';
import { ReviewsComponent } from '../components/reviews.component';
import { SimilarKitsComponent } from '../components/similar-kits.component';
import { StarterKitStore } from '../stores/starter-kit.store';
import { SkeletonModule } from 'primeng/skeleton';
import { NgPlural, NgPluralCase, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
        <div class="w-1/2 px-4">
          <div class="flex items-center">
            <p-avatar
              [label]="starterKitStore.starterKit()?.name?.charAt(0)"
              styleClass="mr-2"
              size="xlarge"
            ></p-avatar>
            <div class="ml-4 flex justify-between">
              <h2 class="text-3xl font-bold tracking-tighter sm:text-5xl mr-5">
                {{ starterKitStore.starterKit()?.name }}
              </h2>
            </div>
          </div>
          <div class="flex flex-wrap gap-y-2 my-4">
            @for (tag of starterKitStore.starterKit()?.tags; track $index) {
            <span
              class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
              >{{ tag.name | titlecase }}</span
            >
            }
          </div>

          <p
            class="text-gray-900 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 my-"
          >
            {{ starterKitStore.starterKit()?.short_description }}
          </p>
          <div class="flex justify-between my-2">
            <div class="flex items-center">
              <span
                [ngPlural]="starterKitStore.starterKit()?.reviewsCount?.[0]?.count || 0"
              >
                <ng-template ngPluralCase="=0"
                  ><span>No reviews</span></ng-template
                >
                <ng-template ngPluralCase="=1">
                  <span class="font-semibold text-lg"
                    >Rating: &nbsp;&nbsp;</span
                  >
                  <span class="text-lg"
                    >{{ starterKitStore.avgRating() }}/5</span
                  >
                  from a review</ng-template
                >
                <ng-template ngPluralCase="other">
                  <span class="font-semibold text-lg"
                    >Rating: &nbsp;&nbsp;</span
                  >
                  <span class="text-lg font-bold"
                    >{{ starterKitStore.avgRating() }}/5</span
                  >
                  from
                  {{ starterKitStore.starterKit()?.reviewsCount?.[0]?.count }}
                  reviews</ng-template
                >
              </span>
            </div>
            @if(starterKitStore.starterKit()?.website){
            <a
              class="hover:underline font-semibold"
              [href]="starterKitStore.starterKit()?.website"
              >{{ starterKitStore.starterKit()?.website }}</a
            >
            }
          </div>
          <p class="font-semibold text-lg">
            <span>Pricing: &nbsp;</span>

            {{ starterKitStore.starterKit()?.pricing_type }}
            @if(starterKitStore.starterKit()?.pricing_type==='Paid'){<span>{{
              starterKitStore.starterKit()?.price
            }}</span
            >}
          </p>
          <div class="flex items-center mt-4">
            <button
              class="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition flex items-center"
            >
              <i class="pi pi-bookmark mr-2"></i>
              {{ starterKitStore.starterKit()?.bookmarks?.[0]?.count }}
            </button>
          </div>
        </div>
        <div class="w-1/2 px-4 h-96 overflow-hidden">
          <img
            class="object-cover w-full h-full rounded-lg"
            [src]="
              starterKitStore.starterKit()?.kit_image ||
              'https://via.placeholder.com/500'
            "
            alt="Boilerplate Image"
          />
        </div>
      </div>
      <div class="mx-auto w-full max-w-7xl px-4 mb-40">
        <p class="my-8">
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
    TitleCasePipe,
    FormsModule,
  ],
})
export class DetailsComponent implements OnInit {
  starterKitId = input<number>(0);
  starterKitStore = inject(StarterKitStore);
  ngOnInit() {
    this.starterKitStore.loadStarterKit(this.starterKitId());
  }
}
