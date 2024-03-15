import { Component, inject, input } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { StarterKit } from '../models/starter-kit';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ChipModule } from 'primeng/chip';
import { EditKitStore } from '../stores/edit-kit.store';
import { Router } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-profile-kits',
  standalone: true,
  imports: [DataViewModule, RatingModule, FormsModule, ChipModule, NgOptimizedImage],
  template: `
    <p-dataView [emptyMessage]="emptyMessage()" #dv [value]="starterKits()">
      <ng-template let-starterKits pTemplate="list">
        @for (starterKit of starterKits; track $index) {
        <div class="flex p-4 border-b min-h-40 text-black flex-wrap	">
          <div class="mb-4 sm:mb-0 h-64 sm:h-auto w-full sm:w-1/3 relative rounded overflow-hidden" >
            <img
            fill
              class="object-cover w-full"
              [ngSrc]="starterKit.kit_image|| 'assets/500.png'"
              alt="Starter Kit Image"
            />
          </div>
          <div class="w-full sm:w-2/3 flex">
          <div class="grow px-4">
            <h3 class="text-2xl font-semibold">{{ starterKit.name }}</h3>
            <div class="my-4">
              <p-rating
                [ngModel]="starterKit.rating"
                [readonly]="true"
                [cancel]="false"
              ></p-rating>
            </div>
            <div class="flex flow gap-2 py-4">
              @for (tag of starterKit.tags; track $index) {
              <p-chip styleClass="text-sm" [label]="tag.name"></p-chip>
              }
            </div>
            <p>{{ starterKit.short_description }}</p>
          </div>
          <div class="flex flex-col">
            <p class="text-slate-800">{{ starterKit.pricing_type }}</p>
            <strong>{{ starterKit.price }}</strong>
            @if(myKits()){
            <div class="mt-auto">
              <button
                (click)="setKit(starterKit)"
                class="py-2 px-3 mr-2 rounded-full border bg-white hover:bg-black hover:text-white"
              >
                <i class="pi pi-pencil"></i>
              </button>
            </div>
            }
          </div>
          </div>
        </div>
        }
      </ng-template>
    </p-dataView>
  `,
})
export class ProfileKitsComponent {
  starterKits = input.required<StarterKit[]>();
  myKits = input(false);
  editKitStore = inject(EditKitStore);
  router = inject(Router);
  emptyMessage = input.required<string>();

  setKit(kit: StarterKit) {
    this.editKitStore.setKit(kit);
    this.router.navigate([`/submit/${kit.id}`]);
  }
}
