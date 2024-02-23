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
      <div
        class="flex flex-col border max-w-md px-8 pt-6 pb-10 mx-auto rounded-lg"
      >
        <form
          #newPassword="ngForm"
          (ngSubmit)="authService.newPassword(newPassword)"
        >
          <h2 class="text-center text-2xl py-4	font-semibold">
            Reset Your password
          </h2>
          <div class="flex flex-col gap-2 mt-4">
            <label class="text-slate-700 text-sm" for="password"
              >Password</label
            >
            <div>
              <p-password
                name="password"
                inputId="password"
                [required]="true"
                placeholder="Password"
                minLength="8"
                #password="ngModel"
                pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*])[a-zA-Z0-9!@#$%&*]{8,}"
                ngModel
                [toggleMask]="true"
                styleClass="w-full"
                [inputStyle]="{ width: '100%' }"
                [feedback]="false"
              ></p-password>
              @if(password.touched && password.errors?.["required"]){
              <div class="text-red-500 text-sm mt-2">
                Password is required for signup.
              </div>
              } @if(password.touched && password.errors?.["pattern"]){
              <div class="text-red-500 text-sm mt-2">
                Password should contain at least 8 characters, one lowercase,
                one uppercase, one number and one special character.
              </div>
              }
            </div>
          </div>
          <div class="flex flex-col gap-2 mt-4">
            <label class="text-slate-700 text-sm" for="repeat-password"
              >Repeat Password</label
            >
            <div>
              <p-password
                name="repeatPassword"
                inputId="repeat-password"
                placeholder="Repeat Password"
                #repeatPassword="ngModel"
                [required]="true"
                ngModel
                required
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
            Save Password
          </button>
        </form>
      </div>
    </div>
  `,
  })
export class ResetPasswordComponent {
  authService = inject(AuthService);
}
