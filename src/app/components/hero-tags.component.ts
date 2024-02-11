import { Component, inject } from '@angular/core';
import { ChipModule } from 'primeng/chip';
import { TagStore } from '../stores/tag.store';
import { TitleCasePipe } from '@angular/common';
import { StarterKitsStore } from '../stores/starter-kits.store';

@Component({
  selector: 'app-hero-tags',
  standalone: true,
  imports: [ChipModule, TitleCasePipe],
  providers: [TagStore],
  template: `
    <div class="flex flex-wrap gap-2 mt-6 justify-center items-stretch	">
      @for (tag of tagStore.topTags(); track $index) {
      <p-chip
        class="cursor-pointer"
        (click)="filterByTag(tag.id)"
        [label]="tag.name | titlecase"
      ></p-chip>
      }
    </div>
  `,
  styles: ``,
})
export class HeroTagsComponent {
  tagStore = inject(TagStore);
  starterKitsStore = inject(StarterKitsStore);
  tags = this.tagStore.loadTags();
  filterByTag(tags: number) {
    this.starterKitsStore.starterKitFiltered({
      ...this.starterKitsStore.filters(), 
      tags: tags.toString(),

    });
  }
}
