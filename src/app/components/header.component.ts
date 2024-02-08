import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="border-b">
      <nav class="container mx-auto flex items-center justify-between flex-wrap py-2 px-4">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <a
            routerLink="/"
            class="text-xl sm:text-2xl font-semibold text-gray-800"
          >
            <img
              src="https://primefaces.org/cdn/primeng/images/primeng.svg"
              alt="PrimeNG Logo"
              class="h-12"
            />
          </a>
        </div>
        <div class="block lg:hidden">
          <button
            class="flex items-center px-3 py-2 border rounded text-slate-400 border-slate-200 hover:text-white hover:bg-zinc-100"
            (click)="isMenuOpen = !isMenuOpen"
          >
            <svg
              class="h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/8000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v15z" />
            </svg>
          </button>
        </div>
        <div
          class="w-full block md:grow-0 grow  lg:flex lg:items-center lg:w-auto font-semibold"
          [class]="{ hidden: !isMenuOpen, block: isMenuOpen }"
        >
          <div class="text-sm">
            <a
              routerLink="/contact"
              class="block mt-4 lg:inline-block lg:mt-0 hover:bg-zinc-100 px-4 py-2 rounded mr-4"
            >
              Contact
            </a>
            <a
              routerLink="/profile"
              class="block mt-4 lg:inline-block lg:mt-0 hover:bg-zinc-100 px-4 py-2 rounded mr-4"
            >
              Profile
            </a>
            <a
              routerLink="/auth/login"
              class="block mt-4 lg:inline-block lg:mt-0 hover:bg-zinc-100 px-4 py-2 rounded mr-4"
            >
              Login
            </a>
            <a
              routerLink="/submit"
              class="block mt-4 lg:inline-block lg:mt-0 lg:bg-slate-950 lg:hover:bg-zinc-800 hover:bg-zinc-100 lg:text-white px-4 py-2 rounded"
            >
              Submit
            </a>
          </div>
        </div>
      </nav>
    </header>
  `,
  styles: ``,
})
export class HeaderComponent {
  isMenuOpen = false;

  items = [
    {
      label: 'File',
      icon: 'pi pi-fw pi-file',
    },
  ];
}
