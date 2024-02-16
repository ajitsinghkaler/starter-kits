import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GlobalStore } from '../stores/global.store';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="border-b">
      <nav
        class="container mx-auto flex items-center justify-between flex-wrap py-2 px-4"
      >
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
            class="flex items-center px-3 py-2 border rounded text-slate-700 border-slate-200 hover:bg-zinc-100"
            (click)="globalStore.isMenuOpen = !globalStore.isMenuOpen"
          >
            <i class="pi pi-bars"></i>
          </button>
        </div>
        <div
          class="w-full block md:grow-0 grow  lg:flex lg:items-center lg:w-auto font-semibold"
          [class]="{
            hidden: !globalStore.isMenuOpen,
            block: globalStore.isMenuOpen
          }"
        >
          <div class="text-sm">
            @if (!authService.isAuthenticated()) {
            <a
              routerLink="/auth/login"
              class="block mt-4 lg:inline-block lg:mt-0 hover:bg-zinc-100 px-4 py-2 rounded mr-4"
            >
              Login
            </a>
            } @else{
            <a
              routerLink="/profile"
              class="block mt-4 lg:inline-block lg:mt-0 hover:bg-zinc-100 px-4 py-2 rounded mr-4"
            >
              Profile
            </a>
            
            <button
              (click)="authService.signOut()"
              class="text-left w-full block mt-4 lg:inline-block lg:mt-0 hover:bg-zinc-100 px-4 py-2 rounded mr-4 lg:w-min"
            >
              Logout
            </button>
            }
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
  globalStore = inject(GlobalStore);
  authService = inject(AuthService);
}