import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  template: ` <div class="container mx-auto py-16">
    <div class="flex flex-col border max-w-md px-8 py-6 mx-auto rounded-lg">
      <router-outlet></router-outlet>
    </div>
  </div>`,
  styles: ``,
  imports: [RouterOutlet],
})
export class AuthComponent {}
