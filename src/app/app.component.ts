import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header.component';
import { FooterComponent } from './components/footer.component';
import { SupabaseService } from './services/supabase.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<div class="flex flex-col min-h-screen">
    <app-header></app-header>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  </div>`,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
})
export class AppComponent {
  title = 'starter-kits';
  authService = inject(AuthService);
  ngOnInit() {
    this.authService.getUser().then((user) => {
      if (user) {
        console.log('User is logged in', user);
      } else {
        console.log('User is not logged in');
      }
    });
  }
}
