import { Component, inject } from '@angular/core';
import { HeroComponent } from '../components/hero.component';
import { StarterKitsComponent } from '../components/starter-kits.component';
import { FiltersComponent } from '../components/filters.component';
import { StarterKitsStore } from '../stores/starter-kits.store';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [StarterKitsStore],
  template: `
    <app-hero></app-hero>
    <app-filters class="mb-4 block"></app-filters>
    <app-starter-kits class="block mb-40"></app-starter-kits>

  `,
    imports: [HeroComponent, StarterKitsComponent, FiltersComponent],
})
export class HomeComponent {
  meta = inject(Meta);
  constructor() {
    this.meta.addTags([
      { name: 'keywords', content: 'Angular, Universal, Example' },
      { name: 'description', content: 'Angular Universal Example' },
    ]);
  }
}
