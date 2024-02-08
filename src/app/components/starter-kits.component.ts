import { Component, inject } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { StarterKitCardsComponent } from './starter-kit-cards.component';
import { StarterKitsService } from '../services/starter-kits.service';
import { StarterKitsStore } from '../stores/starter-kits.store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-starter-kits',
  standalone: true,
  providers: [StarterKitsStore],
  imports: [TabViewModule, StarterKitCardsComponent,RouterLink],
  template: `
    <div class="container mx-auto">
      <p-tabView>
        <p-tabPanel header="Features">
          <div class="grid grid-cols-4 gap-6">
            @if(store.isLoading()){
            <p>Loading...</p>
            } @else{ @for (starterKit of store.staterKits(); track $index) {
            <app-starter-kit-cards routerLink="/details/{{ starterKit.id }}"
              [starterKit]="starterKit"
            ></app-starter-kit-cards>
            } }
          </div>
        </p-tabPanel>
        @defer (on immediate; prefetch on idle) {
        <p-tabPanel header="New">
          <div class="grid grid-cols-4 gap-6">
            @for (starterKit of store.staterKits(); track $index) {
            <app-starter-kit-cards
              [starterKit]="starterKit"
            ></app-starter-kit-cards>
            }
          </div>
        </p-tabPanel>
        }
      </p-tabView>
    </div>
  `,
  styles: ``,
})
export class StarterKitsComponent {
  readonly store = inject(StarterKitsStore);
  starterKits = this.store.loadStarterKits();
}
