import { Component } from '@angular/core';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-hero-tags',
  standalone: true,
  imports: [ChipModule],
  template: `
    <div class="flex flex-wrap gap-2 mt-6 justify-center items-stretch	">
      @for (tag of tags; track $index) {
      <p-chip [label]="tag"></p-chip>
      }
    </div>
  `,
  styles: ``,
})
export class HeroTagsComponent {
  tags = [
    'HTML',
    'CSS',
    'JavaScript',
    'TypeScript',
    'Angular',
    'All Categories',
  ];
}
