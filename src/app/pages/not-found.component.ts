import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="flex items-center justify-center py-20 text-gray-900">
  <div class="container">
    <div class="text-center">
      <h1 class="text-9xl font-bold text-primary">404</h1>
      <p class="text-2xl md:text-3xl font-light leading-normal">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <p class="mb-8">
        But don't worry, you can find plenty of other things on our homepage.
      </p>
      <a routerLink="/" class="btn btn-primary btn-lg">
        <i class="pi pi-home"></i> Back to homepage
      </a>
    </div>
  </div>
</div>
  `,
  styles: ``
})
export class NotFoundComponent {

}
