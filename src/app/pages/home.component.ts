import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header.component';
import { HeroComponent } from '../components/hero.component';
import { StarterKitsComponent } from '../components/starter-kits.component';
import { FiltersComponent } from '../components/filters.component';
import { FooterComponent } from '../components/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
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
    HeaderComponent,
    HeroComponent,
    StarterKitsComponent,
    FiltersComponent,
    FooterComponent,
  ],
})
export class HomeComponent {}
