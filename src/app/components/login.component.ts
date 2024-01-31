import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { account } from '../appwrite';
import { ID } from 'appwrite';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div>
  <p>
    {{ loggedInUser ? 'Logged in as ' + loggedInUser.name : 'Not logged in' }}
  </p>

  <div>
    <input type="email" placeholder="Email" [(ngModel)]="email" />
    <input type="password" placeholder="Password" [(ngModel)]="password" />
    <input type="text" placeholder="Name" [(ngModel)]="name" />

    <button (click)="login(email, password)">
      Login
    </button>

    <button (click)="register(email, password, name)">
      Register
    </button>

    <button (click)="logout()">
      Logout
    </button>
  </div>
</div>

  `,
  styles: ``
})
export class LoginComponent {
  loggedInUser: any = null;
  email: string = '';
  password: string = '';
  name: string = '';

  async login(email: string, password: string) {
    await account.createEmailSession(email, password);
    this.loggedInUser = await account.get();
  }

  async register(email: string, password: string, name: string) {
    await account.create(ID.unique(), email, password, name);
    this.login(email, password);
  }

  async logout() {
    await account.deleteSession('current');
    this.loggedInUser = null;
  }
}
