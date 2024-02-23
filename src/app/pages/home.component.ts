import { Component } from '@angular/core';
import { HeroComponent } from '../components/hero.component';
import { StarterKitsComponent } from '../components/starter-kits.component';
import { FiltersComponent } from '../components/filters.component';
import { StarterKitsStore } from '../stores/starter-kits.store';

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [StarterKitsStore],
  template: `
    <app-hero></app-hero>
    @defer (on immediate; prefetch on idle) {
    <app-filters class="mb-4 block"></app-filters>
    <app-starter-kits class="block mb-40"></app-starter-kits>
    }
  `,
    imports: [HeroComponent, StarterKitsComponent, FiltersComponent],
})
export class HomeComponent {}
