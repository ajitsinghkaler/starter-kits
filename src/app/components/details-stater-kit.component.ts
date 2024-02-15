import { Component, input } from '@angular/core';
import { NgPlural, NgPluralCase, TitleCasePipe } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { StarterKit } from '../models/starter-kit';
import { Bookmark, ReviewsCount } from '../stores/starter-kit.store';

@Component({
  selector: 'app-details-stater-kit',
  standalone: true,
  imports: [
    NgPluralCase,
    NgPlural,
    TitleCasePipe,
    AvatarModule,
  ],
  template: `
    <div class="flex gap-x-4 flex-wrap">
      <div class="w-full lg:w-[calc(50%-.5rem)]">
        <div class="flex items-center">
          <p-avatar
            [label]="starterKit()?.name?.charAt(0)"
            styleClass="mr-2"
            size="xlarge"
          ></p-avatar>
          <div class="ml-4 flex justify-between">
            <h2 class="text-3xl font-bold tracking-tighter sm:text-5xl mr-5">
              {{ starterKit()?.name }}
            </h2>
          </div>
        </div>
        <div class="flex flex-wrap gap-y-2 my-4">
          @for (tag of starterKit()?.tags; track $index) {
          <span
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
            >{{ tag.name | titlecase }}</span
          >
          }
        </div>
        <img
          class="object-cover w-full rounded-lg lg:hidden  max-h-96 overflow-hidden mb-6"
          [src]="starterKit()?.kit_image || 'https://via.placeholder.com/500'"
          alt="Boilerplate Image"
        />
        <p
          class="text-gray-900 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 my-"
        >
          {{ starterKit()?.short_description }}
        </p>
        <div class="flex justify-between my-2">
          <div class="flex items-center">
            <span [ngPlural]="starterKit()?.reviewsCount?.[0]?.count || 0">
              <ng-template ngPluralCase="0"
                ><span>There are no reviews yet.</span></ng-template
              >
              <ng-template ngPluralCase="1">
                <span class="font-semibold text-lg">Rating: &nbsp;&nbsp;</span>
                <span class="text-lg">{{ avgRating() }}/5</span>
                from a review</ng-template
              >
              <ng-template ngPluralCase="other">
                <span class="font-semibold text-lg">Rating: &nbsp;&nbsp;</span>
                <span class="text-lg font-bold">{{ avgRating() }}/5</span>
                from
                {{ starterKit()?.reviewsCount?.[0]?.count }}
                reviews</ng-template
              >
            </span>
          </div>
        </div>
        <p class="font-semibold text-lg">
          <span>Pricing: &nbsp;</span>

          {{ starterKit()?.pricing_type }}
          @if(starterKit()?.pricing_type==='Paid'){<span>{{
            starterKit()?.price
          }}</span
          >}
        </p>
        <div class="flex items-center mt-4">
          @if(starterKit()?.website){
          <!-- Black button -->
          <a target="_blank" rel="noopener" href="{{ starterKit()?.website }}">
            <button
              class="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition flex items-center mr-4"
            >
              <i class="pi pi-external-link mr-2"></i>
              Visit Website
            </button>
          </a>
          }
          <button
            class="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition flex items-center border"
          >
            <i class="pi pi-bookmark mr-2"></i>
            {{ starterKit()?.bookmarks?.[0]?.count }}
          </button>
        </div>
      </div>
      <div
        class="w-full lg:w-[calc(50%-.5rem)] hidden lg:block max-h-96 overflow-hidden"
      >
        <img
          class="object-cover w-full h-full rounded-lg"
          [src]="starterKit()?.kit_image || 'https://via.placeholder.com/500'"
          alt="Boilerplate Image"
        />
      </div>
    </div>
    <div class="mx-auto w-full mb-40">
      <p class="my-8">
        {{ starterKit()?.description }}
      </p>
    </div>
  `,
  styles: ``,
})
export class DetailsStaterKitComponent {
  starterKit = input.required<(StarterKit & Bookmark & ReviewsCount) | null>();
  avgRating = input.required<number>();
}
