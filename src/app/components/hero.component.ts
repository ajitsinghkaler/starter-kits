import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { HeroTagsComponent } from "./hero-tags.component";
import { StarterKitsStore } from '../stores/starter-kits.store';

@Component({
    selector: 'app-hero',
    standalone: true,
    template: `
    <section class="text-gray-900 container px-4 text-center py-20 mx-auto">
      <h1 class="text-4xl font-bold">Welcome to the Starter Kit!</h1>
      <p class="mt-4 text-lg">
        SaaS AI Tools is your source for new AI tools & daily AI news to help
        supercharge your creativity to the next level.
      </p>
      <div class="gap-3 pt-12">
        <span class="p-input-icon-right w-full max-w-2xl">
          <i class="pi pi-search mr-2 cursor-pointer"></i>
          <input
            class="rounded-full pl-6 w-full"
            type="text"
            name="search"
            pInputText
            [(ngModel)]="value"
          />
        </span>
      </div>
      <app-hero-tags></app-hero-tags>
    </section>
  `,
    styles: ``,
    imports: [InputTextModule, FormsModule, HeroTagsComponent]
})
export class HeroComponent {
  value: string = '';
  starterKitsStore = inject(StarterKitsStore);
}
