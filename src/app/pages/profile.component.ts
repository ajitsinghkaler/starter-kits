import { Component } from '@angular/core';
import { ProfileKitsComponent } from "../components/profile-kits.component";

@Component({
    selector: 'app-profile',
    standalone: true,
    template: `
    <div class="container mx-auto">
        <div class="flex items-center">
          <div>
            <img [src]="user.image">
          </div>
          <div>
            <h2>{{user.name}}</h2>
            <h3>{{user.email}}</h3>
          </div>

        </div>
        <div>
          <app-profile-kits></app-profile-kits>
        </div>
    </div>
  `,
    styles: ``,
    imports: [ProfileKitsComponent]
})
export class ProfileComponent {
  user = {
    name: 'Amy Elsner',
    image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
    email: 'email',
    kits: []
  }
}
