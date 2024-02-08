import { Component, inject } from '@angular/core';
import { ProfileKitsComponent } from "../components/profile-kits.component";
import { AuthService } from '../services/auth.service';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'app-profile',
    standalone: true,
    template: `
    <div class="container mx-auto">
        <div class="flex items-center">
          <pre>{{userState.user()|json}}</pre>
          <!-- <div>
            <img [src]="user.avatar" alt="User image">
          </div>
          <div>
            <h2>{{user.name}}</h2>
            <h3>{{user.email}}</h3>
          </div> -->

        </div>
        <div>
          <app-profile-kits></app-profile-kits>
        </div>
    </div>
  `,
    styles: ``,
    imports: [ProfileKitsComponent, JsonPipe]
})
export class ProfileComponent {
  authService = inject(AuthService);
  userState = this.authService.userState;

  // ngOnInit() {
  //   console.log('User', this.user)
  // }
  // user = {
  //   name: 'Amy Elsner',
  //   image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
  //   email: 'email',
  //   kits: []
  // }
}
