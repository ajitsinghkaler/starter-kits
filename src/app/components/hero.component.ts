import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { HeroTagsComponent } from './hero-tags.component';
import { StarterKitsStore } from '../stores/starter-kits.store';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section class="text-gray-900 container px-4 text-center py-20 mx-auto">
      <h1 class="text-4xl font-bold">Launch Your Project in Record Time!</h1>
      <p class="mt-4 text-lg">
      Discover Top Boilerplates to Launch Fast and Save Hours of Development Time.
      </p>
      <div class="gap-3 pt-12">
        <span class="p-input-icon-right w-full max-w-2xl">
          <i class="pi pi-search mr-2 cursor-pointer"></i>
          <input
            #search
            class="rounded-full pl-6 w-full"
            (input)="searchKits(search.value)"
            type="text"
            name="search"
            pInputText
            ngModel
            placeholder="Search for boiler plates"
          />
        </span>
      </div>
      <app-hero-tags></app-hero-tags>
    </section>
  `,
    imports: [InputTextModule, FormsModule, HeroTagsComponent],
})
export class HeroComponent {
  starterKitsStore = inject(StarterKitsStore);

  searchKits(search: string) {
    this.starterKitsStore.starterKitFiltered({
      ...this.starterKitsStore.filters(),
      name: search,
    });
  }
}
