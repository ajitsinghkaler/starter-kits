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
      <h2 class="text-center text-2xl py-4	font-semibold">
        Reset your password
      </h2>
      <p class="text-center text-sm mx-auto mb-6">
        Enter your email address and we will send you instructions to reset your
        password.
      </p>
      <div class="flex flex-col gap-2">
        <label class="text-slate-700 text-sm" for="email">Email</label>

        <input id="email" name="email" placeholder="Email" pInputText ngModel />
      </div>
      <button
        class="bg-black text-white rounded shadow py-3 w-full font-medium mt-6 mb-4 hover:bg-gray-800"
        type="submit"
      >
        Continue
      </button>
    </form>
  `,
  styles: ``,
})
export class ForgotPasswordComponent {
  authService = inject(AuthService);
}
