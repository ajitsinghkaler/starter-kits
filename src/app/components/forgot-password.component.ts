import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, InputTextModule],
  template: `
    <form
      class="block"
      #resetForm="ngForm"
      (ngSubmit)="authService.resetPassword(resetForm)"
    >
      <h2 class="text-center text-2xl py-4	font-semibold">Forgot Password</h2>
      <p class="text-center text-sm mx-auto mb-6">
        Enter your email address and we will send you instructions to reset your
        password.
      </p>
      <div class="flex flex-col gap-2">
        <label class="text-slate-700 text-sm" for="email">Email</label>
        <div>
          <input
            #email="ngModel"
            id="email"
            pattern="[a-z0-9._%+\\-]+@[a-z0-9.\\-]+[.][a-z]{2,}$"
            name="email"
            placeholder="Email"
            class="w-full"
            pInputText
            ngModel
            required
          />
          @if(email.touched && email.errors?.["required"]){
          <div class="text-red-500 text-sm mt-2">
            Email is required for resetting password.
          </div>
          }
          @if(email.touched && email.errors?.["pattern"]){
          <div class="text-red-500 text-sm mt-2">
            Please enter a valid email address.
          </div>
          }
        </div>
      </div>
      <button
        class="bg-black text-white rounded shadow py-3 w-full font-medium mt-6 mb-4 hover:bg-gray-800"
        type="submit"
      >
        Continue
      </button>
    </form>
  `,
  })
export class ForgotPasswordComponent {
  authService = inject(AuthService);
}
