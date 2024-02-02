import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    PasswordModule,
    DividerModule,
    RouterLink,
  ],
  template: `
      <form #f="ngForm">
          <h2 class="text-center text-2xl py-4	font-semibold">
            Sign Up to Continue
          </h2>
          <div class="flex flex-col gap-2">
            <label class="text-slate-700 font-medium" for="email">Email</label>

            <input
              id="email"
              name="email"
              placeholder="Email"
              pInputText
              ngModel
            />
          </div>
          <div class="flex flex-col gap-2 mt-4">
            <label class="text-slate-700 font-medium" for="password"
              >Password</label
            >
            <p-password
              name="password"
              id="password"
              placeholder="Password"
              ngModel
              [toggleMask]="true"
              styleClass="w-full"
              [inputStyle]="{ width: '100%' }"
              [feedback]="false"
            ></p-password>
          </div>
          <div class="flex flex-col gap-2 mt-4">
            <label class="text-slate-700 font-medium" for="password"
              >Repeat Password</label
            >
            <p-password
              name="password"
              id="password"
              placeholder="Password"
              ngModel
              [toggleMask]="true"
              styleClass="w-full"
              [inputStyle]="{ width: '100%' }"
              [feedback]="false"
            ></p-password>
          </div>
          <button
            class="bg-black text-white rounded py-3 w-full font-medium mt-6 hover:bg-gray-800"
            type="submit"
          >
            Sign Up
          </button>
          
      </form>
  `,
  styles: ``,
})
export class SignupComponent {}
