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
        [styleClass]="
          tag.id.toString() === starterKitsStore.filters().tags
            ? 'bg-gray-900 text-white'
            : ''
        "
        (click)="filterByTag(tag.id)"
        [label]="tag.name | titlecase"
      ></p-chip>

      } @if (tagStore.tagsCount()>10) {
        @if (!tagStore.showAllTags()) {
      <p-chip
        class="cursor-pointer"
        label="Show More"
        (click)="tagStore.showTagsAll()"
      ></p-chip>
        } @else {
          <p-chip
            class="cursor-pointer"
            label="Show Less"
            (click)="tagStore.showTagsLess()"
          ></p-chip>
        }
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
