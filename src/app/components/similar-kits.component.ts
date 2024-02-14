import { Component, OnInit, inject, input } from '@angular/core';
import { StarterKitCardsComponent } from './starter-kit-cards.component';
import { StarterKitsStore } from '../stores/starter-kits.store';
import { Tag } from '../models/tag';

@Component({
  selector: 'app-similar-kits',
  standalone: true,
  providers: [StarterKitsStore],
  template: `
    <div class="container mx-auto">
      <h2 class="text-2xl font-bold tracking-tighter sm:text-3xl my-6">
        Similar Kits
      </h2>
      <div
        class="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-6 mb-20"
        [class.grid]="store.starterKits().length"
      >
        @for (starterKit of store.starterKits(); track $index) {
        <app-starter-kit-cards
          [starterKit]="starterKit"
        ></app-starter-kit-cards>
        } @empty {
        <p class="text-lg">
          There are no boilerplates similar to this yet.
        </p>
        }
      </div>
    </div>
  `,
  styles: ``,
  imports: [StarterKitCardsComponent],
})
export class SimilarKitsComponent implements OnInit{
  tags = input.required<Tag[]>();
  starterKitId= input.required<number>();
  readonly store = inject(StarterKitsStore);
  ngOnInit() {
    this.store.loadStarterKitsTags(this.tags(), this.starterKitId());
  }
}
