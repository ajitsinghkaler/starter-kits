import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-card-skeleton',
  standalone: true,
  imports: [SkeletonModule],
  template: `
    <div>
      <p-skeleton height="15rem" styleClass="mb-4"></p-skeleton>
      <p-skeleton height="2rem" width="80%" styleClass="mb-4"></p-skeleton>
      <div class="flex">
        <p-skeleton
          width="4rem"
          height="1rem"
          styleClass="mb-2 mr-2"
        ></p-skeleton>
        <p-skeleton
          width="4rem"
          height="1rem"
          styleClass="mb-2 mr-2"
        ></p-skeleton>
        <p-skeleton
          height="1rem"
          width="4rem"
          styleClass="mb-2 mr-2"
        ></p-skeleton>
      </div>
      <p-skeleton height="1rem"></p-skeleton>
    </div>
  `,
  styles: ``,
})
export class CardSkeletonComponent {}
