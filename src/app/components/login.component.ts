import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    PasswordModule,
    DividerModule,
    RouterLink,
  ],
  template: `
    <form class="block" #loginForm="ngForm" (ngSubmit)="authService.loginEmail(loginForm)">
      <h2 class="text-center text-2xl py-4	font-semibold">Login to Continue</h2>
      <div class="flex flex-col gap-2">
        <label class="text-slate-700 text-sm" for="email">Email</label>

        <input id="email" name="email" placeholder="Email" pInputText ngModel />
      </div>
      <div class="flex flex-col gap-2 mt-4">
        <label class="text-slate-700 text-sm" for="password">Password</label>
        <p-password
          name="password"
          inputId="password"
          placeholder="Password"
          ngModel
          [toggleMask]="true"
          styleClass="w-full"
          [inputStyle]="{ width: '100%' }"
          [feedback]="false"
        ></p-password>
      </div>
      <button
        class="bg-black text-white rounded shadow py-3 w-full font-bold mt-6 hover:bg-gray-800"
        type="submit"
      >
        Login
      </button>
    </form>

    <div class="flex mt-4">
      <a
        class="text-center text-sm hover:underline mx-auto"
        routerLink="/auth/forgot-password"
        >Forgot Password?</a
      >
    </div>
    <p-divider layout="horizontal" class="flex" [align]="'center'"
      ><b>OR</b></p-divider
    >
    <button
      class="flex items-center justify-center text-black hover:bg-zinc-100 border shadow rounded py-3 w-full font-bold mt-2"
    >
      <span class="pi pi-google mr-3"></span>

      Login with Google
    </button>
    <div class="flex justify-center mt-4 text-sm items-center">
      Don't have an account? &nbsp;
      <a
        class="hover:underline font-semibold text-base"
        routerLink="/auth/signup"
      >
        Sign Up
      </a>
    </div>
  `,
  styles: ``,
})
export class LoginComponent {
  authService = inject(AuthService);
}
