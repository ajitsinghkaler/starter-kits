import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, PasswordModule],
  template: `
  <div class="container mx-auto py-16">
    <div class="flex flex-col border max-w-md px-8 py-6 mx-auto rounded-lg">
    <form #newPassword="ngForm" (ngSubmit)="authService.newPassword(newPassword)">
      <h2 class="text-center text-2xl py-4	font-semibold">
        Reset Your password
      </h2>
      <div class="flex flex-col gap-2 mt-4">
        <label class="text-slate-700 font-medium" for="password"
          >Password</label
        >
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
      <div class="flex flex-col gap-2 mt-4">
        <label class="text-slate-700 font-medium" for="repeat-password"
          >Repeat Password</label
        >
        <p-password
          name="repeatPassword"
          inputId="repeat-password"
          placeholder="Repeat Password"
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
    </div>
  </div>
  `,
  styles: ``,
})
export class ResetPasswordComponent {
  authService = inject(AuthService);
}
