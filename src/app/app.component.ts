import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header.component';
import { FooterComponent } from './components/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<div class="flex flex-col min-h-screen">
    <app-header></app-header>
    <router-outlet></router-outlet>
    @defer (on immediate; prefetch on idle) {
    <app-footer></app-footer>
    }
  </div>`,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
})
export class AppComponent {
  title = 'starter-kits';
}
