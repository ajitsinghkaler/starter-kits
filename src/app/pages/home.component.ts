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
    @defer (on viewport; prefetch on idle) {
    <app-filters></app-filters>
    <app-starter-kits></app-starter-kits>
    } @placeholder {
    <p>Loading...</p>
    }
  `,
  styles: ``,
  imports: [
    HeroComponent,
    StarterKitsComponent,
    FiltersComponent,
  ],
})
export class HomeComponent {}
