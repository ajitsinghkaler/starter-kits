import { Component, inject } from '@angular/core';
import { ContactService } from '../services/contact.service';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  template: `
    <div class="container mx-auto py-20 mb-20">
      <h1 class="px-2 mb-8 font-bold text-3xl">Contact Form</h1>
      <iframe
        data-tally-src="https://tally.so/embed/nrAArv?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
        loading="lazy"
        width="100%"
        height="276"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
        title="Contact"
      ></iframe>
    </div>
  `,
  styles: ``,
})
export class ContactComponent {
  contactService = inject(ContactService);

  constructor() {
    this.contactService.init();
  }
}
