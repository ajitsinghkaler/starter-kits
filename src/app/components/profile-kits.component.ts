import { Component } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';

@Component({
  selector: 'app-profile-kits',
  standalone: true,
  imports: [DataViewModule],
  template: `
    <div class="card">
      <p-dataView #dv [value]="products">
        <ng-template pTemplate="list" let-products>
          <div class="grid grid-nogutter">
            @for (item of products; track $index) {
            <div class="col-12">
              <div
                class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4"
              >
                <img
                  class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
                  [src]="
                    'https://primefaces.org/cdn/primeng/images/demo/product/' +
                    item.image
                  "
                  [alt]="item.name"
                />
                <div
                  class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4"
                >
                  <div
                    class="flex flex-column align-items-center sm:align-items-start gap-3"
                  >
                    <div class="text-2xl font-bold text-900">
                      {{ item.name }}
                    </div>
                    <div class="flex align-items-center gap-3">
                      <span class="flex align-items-center gap-2">
                        <i class="pi pi-tag"></i>
                        <span class="font-semibold">{{ item.category }}</span>
                      </span>
                    </div>
                  </div>
                  <div
                    class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2"
                  >
                    <span class="text-2xl font-semibold">{{
                      '$' + item.price
                    }}</span>
                    <button
                      icon="pi pi-shopping-cart"
                      class="md:align-self-end mb-2 p-button-rounded"
                      [disabled]="item.inventoryStatus === 'OUTOFSTOCK'"
                    >button</button>
                  </div>
                </div>
              </div>
            </div>
            }
          </div>
        </ng-template>
      </p-dataView>
    </div>
  `,
  styles: ``,
})
export class ProfileKitsComponent {
  products = [
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
    
  ];
}
