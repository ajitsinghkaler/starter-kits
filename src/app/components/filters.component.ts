import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [DropdownModule, FormsModule],
  template: `
    <div class="container flex justify-between mx-auto">
      <div>
        Filters:
        <p-dropdown
          [options]="cities"
          [(ngModel)]="selectedCity"
          optionLabel="name"
          placeholder="Select filters"
        ></p-dropdown>
      </div>
      <div>
        Sort by:
        <p-dropdown
          [options]="cities"
          [(ngModel)]="selectedCity"
          optionLabel="name"
        ></p-dropdown>
      </div>
    </div>
  `,
  styles: ``,
})
export class FiltersComponent {
  cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ];
  selectedCity =  this.cities[0];
  selectedCities =  [];

}
