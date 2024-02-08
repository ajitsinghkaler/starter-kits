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
      <h1>Similar Kits</h1>
      <div class="grid grid-cols-4 gap-6">
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
