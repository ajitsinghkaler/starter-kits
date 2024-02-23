import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, InputTextModule, PasswordModule, RouterLink],
  template: `
    <form #signUpForm="ngForm" (ngSubmit)="authService.signUpEmail(signUpForm)">
      <h2 class="text-center text-2xl py-4	font-semibold">
        Sign Up to Continue
      </h2>
      <div class="flex flex-col gap-2">
        <label class="text-slate-700 font-medium text-sm" for="email">Email</label>
        <div>
          <input
            required
            pattern="[a-z0-9._%+\\-]+@[a-z0-9.\\-]+[.][a-z]{2,}$"
            id="email"
            name="email"
            placeholder="Email"
            #email="ngModel"
            class="w-full"
            required
            pInputText
            ngModel
          />
          @if(email.touched && email.errors?.["pattern"]){
          <div class="text-red-500 text-sm mt-2">
            Please enter a valid email address.
          </div>
          } @if(email.touched && email.errors?.["required"]){
          <div class="text-red-500 text-sm mt-2">
            Email is required for sign up.
          </div>
          }
        </div>
      </div>
      <div class="flex flex-col gap-2 mt-4">
        <label class="text-slate-700 font-medium text-sm" for="password"
          >Password</label
        >
        <div>
          <p-password
            name="password"
            inputId="password"
            placeholder="Password"
            ngModel
            minLength="8"
            pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*])[a-zA-Z0-9!@#$%&*]{8,}"
            required
            #password="ngModel"
            [toggleMask]="true"
            [feedback]="false"
            styleClass="w-full"
            [inputStyle]="{ width: '100%' }"
          ></p-password>
          @if(password.touched && password.errors?.["required"]){
          <div class="text-red-500 text-sm mt-2">
            Password is required for signup.
          </div>
          } @if(password.touched && password.errors?.["pattern"]){
          <div class="text-red-500 text-sm mt-2">
            Password should contain at least 8 characters, one lowercase, one
            uppercase, one number and one special character.
          </div>
          }
        </div>
      </div>
      <div class="flex flex-col gap-2 mt-4">
        <label class="text-slate-700 font-medium text-sm" for="repeat-password"
          >Repeat Password</label
        >
        <div>
          <p-password
            name="repeatPassword"
            inputId="repeat-password"
            placeholder="Repeat Password"
            ngModel
            required
            #repeatPassword="ngModel"
            [toggleMask]="true"
            styleClass="w-full"
            [inputStyle]="{ width: '100%' }"
            [feedback]="false"
          ></p-password>
          @if(repeatPassword.touched && password.value !==
          repeatPassword.value){
          <div class="text-red-500 text-sm mt-2">
            Password and Repeat Password should match.
          </div>
          }
        </div>
      </div>
      <button
        class="bg-black text-white rounded py-3 w-full font-bold mt-6 hover:bg-gray-800"
        type="submit"
      >
        Sign Up
      </button>
    </form>
    <div class="flex justify-center mt-4 text-sm items-center">
      Already have an account? &nbsp;
      <a
        class="hover:underline font-semibold text-base"
        routerLink="/auth/login"
      >
        Login
      </a>
    </div>
  `,
  })
export class SignupComponent {
  authService = inject(AuthService);
}
