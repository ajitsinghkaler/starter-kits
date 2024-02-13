import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RatingModule } from 'primeng/rating';
import { StarterKitsService } from '../services/starter-kits.service';

@Component({
  selector: 'app-submit',
  standalone: true,
  imports: [InputTextModule, InputTextareaModule, RatingModule, FormsModule],
  template: `
    <form
      #starterKitForm="ngForm"
      (ngSubmit)="starterKit.createStarterKit(starterKitForm)"
      class="max-w-4xl space-y-6 rounded-lg px-8 py-6 container mx-auto mt-12 mb-40 bg-white border-0 shadow:none sm:shadow-lg sm:border"
    >
      <h1 class="text-3xl font-semibold text-gray-900 mb-8">
        Submit a Boilerplate
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Name</label
          >
          <input
            type="text"
            id="name"
            name="name"
            pInputText
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            ngModel
            required
          />
        </div>

        <div>
          <label for="website" class="block text-sm font-medium text-gray-700"
            >Website URL</label
          >
          <input
            type="text"
            id="website"
            name="website"
            pInputText
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            ngModel
            required
          />
        </div>
      </div>

      <div>
        <label for="description" class="block text-sm font-medium text-gray-700"
          >Short Description</label
        >
        <input
          id="shot_description"
          name="description"
          rows="3"
          pInputText
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          ngModel
          required
        />
      </div>

      <div>
        <label for="description" class="block text-sm font-medium text-gray-700"
          >Description</label
        >
        <textarea
          id="description"
          name="description"
          rows="3"
          pInputTextarea
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          ngModel
          required
        ></textarea>
      </div>

      <div>
        <label for="image" class="block text-sm font-medium text-gray-700"
          >Image URL</label
        >
        <input
          type="text"
          id="image"
          name="image"
          pInputText
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          ngModel
          required
        />
      </div>

      <div>
        <label for="tags" class="block text-sm font-medium text-gray-700"
          >Tags (comma-separated)</label
        >
        <input
          type="text"
          id="tags"
          name="tags"
          pInputText
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          ngModel
          required
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="pricing" class="block text-sm font-medium text-gray-700"
            >Pricing Type</label
          >
          <input
            type="text"
            id="pricing"
            name="pricing"
            pInputText
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            ngModel
            required
          />
        </div>
        <div>
          <label for="pricing" class="block text-sm font-medium text-gray-700"
            >Pricing</label
          >
          <input
            type="text"
            id="pricing"
            name="pricing"
            pInputText
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            ngModel
            required
          />
        </div>
      </div>

      <button
        type="submit"
        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  `,
  styles: ``,
})
export class SubmitComponent {
  starterKit = inject(StarterKitsService);
}
