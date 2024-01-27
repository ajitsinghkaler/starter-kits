import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule],
  template: `
    <header>
      <p-menubar [model]="items">
        <ng-template pTemplate="start">
          <img
            src="https://primefaces.org/cdn/primeng/images/primeng.svg"
            height="40"
            class="mr-2"
          />
        </ng-template>
      </p-menubar>
    </header>
  `,
  styles: ``,
})
export class HeaderComponent {
  items = [
    {
      label: 'File',
      icon: 'pi pi-fw pi-file',
    },
  ];
}
