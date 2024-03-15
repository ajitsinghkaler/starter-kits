import { Component, inject } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { StarterKitCardsComponent } from './starter-kit-cards.component';
import { StarterKitsStore } from '../stores/starter-kits.store';
import { CardSkeletonComponent } from './card-skeleton.component';

@Component({
  selector: 'app-starter-kits',
  standalone: true,
  template: `
    <div class="container mx-auto">
      <!-- <p-tabView (activeIndexChange)="changeTab($event)"> -->
        <!-- <p-tabPanel header="Featured">
          <div
            class="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            [class.grid]="store.starterKits().length || store.isLoading()"
          >
            @if(store.isLoading()){ @for (i of [1, 2, 3]; track $index) {
            <app-card-skeleton></app-card-skeleton>

            }} @else{ @for (starterKit of store.starterKits(); track $index) {
            <app-starter-kit-cards
              [starterKit]="starterKit"
            ></app-starter-kit-cards>
            } @empty {
            <p class="text-lg text-center font-bold">
              There are no featured boilerplates for your search criteria.
            </p>
            } }
          </div>
          @if(store.starterKits().length> (store.filters().page||1)*24){
          <div class="w-full flex justify-center mt-8">
            <button
              (click)="loadMore()"
              class="flex items-center justify-center text-black hover:bg-zinc-100 border shadow rounded py-2 px-8 font-bold mt-2"
            >
              Load More
            </button>
          </div>
          }
        </p-tabPanel> -->
        <!-- @defer (on immediate; prefetch on idle) { -->
        <!-- <p-tabPanel header="Latest"> -->
          <div
            class="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            [class.grid]="store.starterKits().length || store.isLoading()"
          >
            @if(store.isLoading() && store.starterKits().length === 0){
            @if(store.isLoading()){ @for (i of [1, 2, 3]; track $index) {
            <app-card-skeleton></app-card-skeleton>
            }} } @else{ @for (starterKit of store.starterKits(); track $index) {
            <app-starter-kit-cards
              [starterKit]="starterKit"
            ></app-starter-kit-cards>
            }@empty {
            <p class="text-lg text-center font-bold">
              There are no boilerplates for your search criteria.
            </p>
            }}
          </div>
          @if(store.starterKitsCount()> (store.filters().page||1)*24){
          <div class="w-full flex justify-center mt-8">
            <button
              (click)="loadMore()"
              class="flex items-center justify-center text-black hover:bg-zinc-100 border shadow rounded py-2 px-8 font-bold mt-2"
            >
              Load More
            </button>
          </div>
          }
        <!-- </p-tabPanel>
        }
      </p-tabView> -->
    </div>
  `,
  imports: [TabViewModule, StarterKitCardsComponent, CardSkeletonComponent],
})
export class StarterKitsComponent {
  readonly store = inject(StarterKitsStore);
  starterKits = this.store.starterKitFiltered({
    new: true,
    page: 1,
    limit: 23,
  });

  // changeTab(event: number) {
  //   const filters = this.store.filters();
  //   if (event === 0) {
  //     filters.featured = true;
  //     delete filters.new;
  //   } else {
  //     filters.new = true;
  //     delete filters.featured;
  //   }
  //   this.store.starterKitFiltered({ ...filters, page: 1, limit: 23 });
  // }

  loadMore() {
    const filters = this.store.filters();
    this.store.starterKitFiltered({
      ...filters,
      page: (filters.page || 0) + 1,
    });
  }
}
