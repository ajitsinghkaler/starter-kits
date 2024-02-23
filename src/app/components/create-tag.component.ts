import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChipsModule } from 'primeng/chips';
import { TagsService } from '../services/tags.service';

@Component({
  selector: 'app-create-tag',
  standalone: true,
  imports: [ChipsModule, FormsModule],
  template: `
    <form #tags="ngForm" (ngSubmit)="tagsService.createTag(tags)">
      <p class="my-4">Press "Enter" to add a tag</p>
      <p-chips
      name="tags"
        class="w-full block mb-6"
        styleClass="w-full block"
        [(ngModel)]="tagValues"
      ></p-chips>
      <button
        type="submit"
        class="bg-black text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:bg-gray-800 transition duration-300 ease-in-out"
      >
        Create
      </button>
    </form>
  `,
})
export class CreateTagComponent {
  tagsService = inject(TagsService);
  tagValues: string[] = [];
}
