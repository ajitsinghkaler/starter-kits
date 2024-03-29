import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    PasswordModule,
    DividerModule,
    RouterLink,
    ToastModule,
  ],
  template: `
    <form
      class="block"
      #loginForm="ngForm"
      (ngSubmit)="authService.loginEmail(loginForm)"
    >
      <h2 class="text-center text-2xl py-4	font-semibold">Login to Continue</h2>
      <div class="flex flex-col gap-2">
        <label class="text-slate-700 text-sm" for="email">Email</label>
        <div>
          <input
            #email="ngModel"
            pattern="[a-z0-9._%+\\-]+@[a-z0-9.\\-]+[.][a-z]{2,}$"
            id="email"
            required
            name="email"
            placeholder="Email"
            class="w-full"
            pInputText
            ngModel
          />
          @if(email.touched && email.errors?.["pattern"]){
          <div class="text-red-500 text-sm mt-2">
            Please enter a valid email address.
          </div>
          } @if(email.touched && email.errors?.["required"]){
          <div class="text-red-500 text-sm mt-2">
            Email is required for login.
          </div>
          }
        </div>
      </div>
      <div class="flex flex-col gap-2 mt-4">
        <label class="text-slate-700 text-sm" for="password">Password</label>
        <div>
        <p-password
          name="password"
          inputId="password"
          placeholder="Password"
          ngModel
          [required]="true"
          [toggleMask]="true"
          styleClass="w-full"
          [inputStyle]="{ width: '100%' }"
          [feedback]="false"
        ></p-password>
        @if(email.touched && email.invalid){
          <div class="text-red-500 text-sm mt-2">
            Please enter a password.
          </div>
          }
        </div>
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
    <button (click)="authService.loginWithGoogle()"
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
  })
export class LoginComponent {
  authService = inject(AuthService);
}
