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
      class="space-y-6 max-w-4xl rounded-lg px-4 sm:px-8 pt-6 pb-12 container mx-auto mt-12 mb-40 bg-white"
    >
      <h1 class="text-3xl font-bold text-gray-900 mb-8">
        Submit a Boilerplate
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="name" class="block text-sm text-gray-700"
            >Name</label
          >
          <input
            type="text"
            id="name"
            name="name"
            pInputText
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-400 focus:ring-slate-400"
            ngModel
            required
          />
        </div>

        <div>
          <label for="website" class="block text-sm text-gray-700"
            >Website URL</label
          >
          <input
            type="text"
            id="website"
            name="website"
            pInputText
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-400 focus:ring-slate-400"
            ngModel
            required
          />
        </div>
      </div>

      <div>
        <label for="description" class="block text-sm text-gray-700"
          >Short Description</label
        >
        <input
          id="shot_description"
          name="description"
          rows="3"
          pInputText
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-400 focus:ring-slate-400"
          ngModel
          required
        />
      </div>

      <div>
        <label for="description" class="block text-sm text-gray-700"
          >Description</label
        >
        <textarea
          id="description"
          name="description"
          rows="3"
          pInputTextarea
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-400 focus:ring-slate-400"
          ngModel
          required
        ></textarea>
      </div>

      <div>
        <label for="image" class="block text-sm text-gray-700"
          >Upload Image</label
        >
        <input
          type="text"
          id="image"
          name="kit_image"
          pInputText
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-400 focus:ring-slate-400"
          ngModel
          required
        />
      </div>

      <div>
        <label for="tags" class="block text-sm text-gray-700"
          >Tags (comma-separated)</label
        >
        <input
          type="text"
          id="tags"
          name="tags"
          pInputText
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-400 focus:ring-slate-400"
          ngModel
          required
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="pricing" class="block text-sm text-gray-700"
            >Pricing Type</label
          >
          <input
            type="text"
            id="pricing"
            name="pricing"
            pInputText
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-400 focus:ring-slate-400"
            ngModel
            required
          />
        </div>
        <div>
          <label for="pricing" class="block text-sm text-gray-700"
            >Pricing</label
          >
          <input
            type="text"
            id="pricing"
            name="pricing"
            pInputText
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-400 focus:ring-slate-400"
            ngModel
            required
          />
        </div>
      </div>

      <button
        type="submit"
        class="text-lg bg-black text-white font-semibold py-2 px-20 rounded-lg shadow-lg hover:bg-gray-800 transition duration-300 ease-in-out w-full sm:w-auto"
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
