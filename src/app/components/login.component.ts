import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="row flex-center flex">
      <div class="col-6 form-widget" aria-live="polite">
        <h1 class="header">Supabase + Angular</h1>
        <p class="description">Sign in via magic link with your email below</p>
        <form #f="ngForm" (ngSubmit)="onSubmit(f)" class="form-widget">
          <div>
            <label for="email">Email</label>
            <input
              id="email"
              class="inputField"
              type="email"
              placeholder="Your email"
            />
          </div>
          <div>
            <button type="submit" class="button block" [disabled]="loading">
              {{ loading ? 'Loading' : 'Send magic link' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: ``,
})
export class LoginComponent {
  loading = false;

  constructor(
    private readonly auth: AuthService,
    private readonly formBuilder: FormBuilder
  ) {}

  async onSubmit(f: NgForm): Promise<void> {
    try {
      this.loading = true;
      const email = f.form.value.email as string;
      const { error } = await this.auth.signIn(email);
      if (error) throw error;
      alert('Check your email for the login link!');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      f.form.reset();
      this.loading = false;
    }
  }
}
