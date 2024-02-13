import { Component, inject, input } from '@angular/core';
import { StarterKitCardsComponent } from './starter-kit-cards.component';
import { StarterKitsStore } from '../stores/starter-kits.store';
import { Tag } from '../models/tag';

@Component({
  selector: 'app-similar-kits',
  standalone: true,
  providers: [StarterKitsStore],
  template: `
    <div class="container mx-auto">
      <h2 class="text-2xl font-bold tracking-tighter sm:text-3xl my-6">Similar Kits</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-6 mb-20">
        @for (starterKit of store.staterKits(); track $index) {
        <app-starter-kit-cards [starterKit]="starterKit"></app-starter-kit-cards>
        }
      </div>
    </div>
  `,
  styles: ``,
  imports: [StarterKitCardsComponent],
})
export class SimilarKitsComponent {
  tags = input.required<Tag[]>();
  readonly store = inject(StarterKitsStore);
  starterKits = this.store.loadStarterKits();
}
