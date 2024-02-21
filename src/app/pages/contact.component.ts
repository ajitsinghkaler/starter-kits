import { Component, inject } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { SkeletonModule } from 'primeng/skeleton';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [SkeletonModule],
  template: `
    <div
      [class.hidden]="contactService.loading"
      class="container mx-auto py-20 mb-20"
    >
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

    <div
      [class.hidden]="!contactService.loading"
      class="container mx-auto py-20 mb-20"
    >
      <h1 class="px-2 mb-8 font-bold text-3xl">Contact Form</h1>
      <div class="flex md:gap-2 flex-wrap w-full">
        <p-skeleton
          class="md:w-[calc(50%-.25rem)] w-full mb-2"
          height="2rem"
        ></p-skeleton>
        <p-skeleton
          class="md:w-[calc(50%-.25rem)] w-full mb-2"
          height="2rem"
        ></p-skeleton>
      </div>
      <div class="flex md:gap-2 flex-wrap w-full">
        <p-skeleton
          class="md:w-[calc(50%-.25rem)] w-full mb-2"
          height="2rem"
        ></p-skeleton>
        <p-skeleton
          class="md:w-[calc(50%-.25rem)] w-full mb-2"
          height="2rem"
        ></p-skeleton>
      </div>
      <p-skeleton height="6rem"></p-skeleton>
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
