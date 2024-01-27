import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { StarterKit } from '../models/starter-kit';

@Component({
  selector: 'app-starter-kit-cards',
  standalone: true,
  imports: [CardModule],
  template: `
  <div class="h-full">
    <p-card header="{{ starterKitData().name }}" [style]="{height:'100%'}">
      <ng-template pTemplate="header">
        <img alt="Card" [src]="starterKitData().image" />
      </ng-template>
      <p>
        {{ starterKitData().description }}
      </p>
    </p-card>
  </div>
  `,
  styles: ``,
})
export class StarterKitCardsComponent {
  starterKitData = input.required<StarterKit>();
}
