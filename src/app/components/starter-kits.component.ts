import { Component, inject } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { StarterKitCardsComponent } from './starter-kit-cards.component';
import { StarterKitsStore } from '../stores/starter-kits.store';

@Component({
  selector: 'app-starter-kits',
  standalone: true,
  imports: [TabViewModule, StarterKitCardsComponent],
  template: `
    <div class="container mx-auto">
      <p-tabView (activeIndexChange)="changeTab($event)">
        <p-tabPanel header="Featured">
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            @if(store.isLoading()){
            <p>Loading...</p>
            } @else{ @for (starterKit of store.starterKits(); track $index) {
            <app-starter-kit-cards
              [starterKit]="starterKit"
            ></app-starter-kit-cards>
            } }
          </div>
        </p-tabPanel>
        @defer (on immediate; prefetch on idle) {
        <p-tabPanel header="Latest">
          <ng-template pTemplate="content">
            <div
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              @if(store.isLoading()){
              <p>Loading...</p>
              } @else{ @for (starterKit of store.starterKits(); track $index) {
              <app-starter-kit-cards
                [starterKit]="starterKit"
              ></app-starter-kit-cards>
              }}
            </div>
          </ng-template>
        </p-tabPanel>
        }
      </p-tabView>
    </div>
  `,
  styles: ``,
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
