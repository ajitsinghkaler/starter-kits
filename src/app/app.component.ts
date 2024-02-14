import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header.component';
import { FooterComponent } from './components/footer.component';
import { GlobalStore } from './stores/global.store';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<div class="flex flex-col min-h-screen">
    <app-header></app-header>
    <!-- eslint-disable-next-line @angular-eslint/template/interactive-supports-focus, @angular-eslint/template/click-events-have-key-events -->
    <div (click)="globalStore.closeMenu()">
      <router-outlet></router-outlet>
      @defer (on immediate; prefetch on idle) {
      <app-footer class="block"></app-footer>

      }
    </div>
  </div>`,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
})
export class AppComponent {
  globalStore = inject(GlobalStore);
}
