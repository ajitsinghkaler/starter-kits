import { Component, input } from '@angular/core';
import { StarterKit } from '../models/starter-kit';
import { ChipModule } from 'primeng/chip';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-starter-kit-cards',
  standalone: true,
  imports: [ChipModule, RouterLink],
  template: `
    <div
      class="h-full border rounded-lg overflow-hidden text-black max-w-sm mx-auto"
    >
      <img
        class="w-full h-64 cursor-pointer"
        alt="{{ starterKit().name }} image"
        [src]="starterKit().kit_image"
        routerLink="/details/{{ starterKit().id }}"
      />
      <div class="p-4">
        <h3
          routerLink="/details/{{ starterKit().id }}"
          class="text-xl font-bold line-clamp-2 mx-1 mb-2 cursor-pointer hover:text-zinc-700 md:text-2xl lg:text-3xl"
        >
          {{ starterKit().name }}
        </h3>
        <div class="flex flow gap-2 py-2">
          @for (tag of starterKit().tags; track $index) {
          <p-chip styleClass="text-sm" [label]="tag.name"></p-chip>
          }
        </div>
        <p class="text-sm mt-2 mx-1">
          {{ starterKit().short_description }}
        </p>
      </div>
    </div>
  `,
  styles: ``,
})
export class StarterKitCardsComponent {
  starterKit = input.required<StarterKit>();
}
