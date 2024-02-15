import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { StarterKitsStore } from '../stores/starter-kits.store';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [DropdownModule, FormsModule],
  template: `
    <div class="container block justify-between mx-auto">
      <div>
        <p-dropdown
        styleClass="min-w-48"
          [options]="pricingType"
          [ngModel]="starterKitStore.filters().pricing_type"
          (ngModelChange)="filterByPricingType($event)"
          [showClear]="true"
          placeholder="Pricing Filter"
        ></p-dropdown>
      </div>
    </div>
  `,
  styles: ``,
})
export class FiltersComponent {
  pricingType = [
    "Free",
    "Paid",
  ];
  starterKitStore = inject(StarterKitsStore);
  filterByPricingType(pricingType: string) {
    this.starterKitStore.starterKitFiltered({
      ...this.starterKitStore.filters(),
      pricing_type: pricingType,
    });
  }

}
