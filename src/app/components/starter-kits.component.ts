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
      <p-tabView (activeIndexChange)="changeTab($event)">
        <p-tabPanel header="Featured">
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
            }}
          </div>
        </p-tabPanel>
        @defer (on immediate; prefetch on idle) {
        <p-tabPanel header="Latest">
          <ng-template pTemplate="content">
            <div
              class="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              [class.grid]="store.starterKits().length || store.isLoading()"
            >
              @if(store.isLoading()){
              <app-card-skeleton></app-card-skeleton>
              } @else{ @for (starterKit of store.starterKits(); track $index) {
              <app-starter-kit-cards
                [starterKit]="starterKit"
              ></app-starter-kit-cards>
              }@empty {
              <p class="text-lg text-center font-bold">
                There are no boilerplates for your search criteria.
              </p>
              }}
            </div>
          </ng-template>
        </p-tabPanel>
        }
      </p-tabView>
    </div>
  `,
  imports: [TabViewModule, StarterKitCardsComponent, CardSkeletonComponent],
})
export class StarterKitsComponent {
  readonly store = inject(StarterKitsStore);
  starterKits = this.store.starterKitFiltered({ featured: true });

  changeTab(event: number) {
    const filters = this.store.filters();
    if (event === 0) {
      filters.featured = true;
      delete filters.new;
    } else {
      filters.new = true;
      delete filters.featured;
    }
    this.store.starterKitFiltered({ ...filters });
  }
}
