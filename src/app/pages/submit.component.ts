import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-submit',
  standalone: true,
  imports: [InputTextModule, InputTextareaModule, RatingModule, FormsModule],
  template: `
    <form
      #starterKitForm="ngForm"
      (ngSubmit)="onSubmit(starterKitForm.value)"
      class="p-4 space-y-4 bg-white shadow-md rounded px-8 pt-6 pb-8  container mx-auto"
    >
      <div class="flex items-center gap-4">
        <div class="w-1/2">
          <label for="name" class="block text-gray-700 text-sm font-bold mb-2"
            >Name</label
          >
          <input
            type="text"
            id="name"
            name="name"
            pInputText
            class="w-full"
            ngModel
            required
          />
        </div>
        <div class="w-1/2">
          <label
            for="website"
            class="block text-gray-700 text-sm font-bold mb-2"
            >Website URL</label
          >
          <input
            type="text"
            id="website"
            name="website"
            pInputText
            class="w-full"
            ngModel
            required
          />
        </div>
      </div>
      <div>
        <label
          for="description"
          class="block text-gray-700 text-sm font-bold mb-2"
          >Description</label
        >
        <textarea
          id="description"
          name="description"
          rows="3"
          pInputTextarea
          class="w-full"
          ngModel
          required
        ></textarea>
      </div>

      <div>
        <label for="image" class="block text-gray-700 text-sm font-bold mb-2"
          >Image URL</label
        >
        <input
          type="text"
          id="image"
          name="image"
          pInputText
          class="w-full"
          ngModel
          required
        />
      </div>

      <div>
        <label for="tags" class="block text-gray-700 text-sm font-bold mb-2"
          >Tags (comma-separated)</label
        >
        <input
          type="text"
          id="tags"
          name="tags"
          pInputText
          class="w-full"
          ngModel
          required
        />
      </div>

      <div>
        <label for="pricing" class="block text-gray-700 text-sm font-bold mb-2"
          >Pricing</label
        >
        <input
          type="text"
          id="pricing"
          name="pricing"
          pInputText
          class="w-full"
          ngModel
          required
        />
      </div>

      <button
        type="submit"
        pButton
        label="Submit"
        class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  `,
  styles: ``,
})
export class SubmitComponent {
  onSubmit(form: any) {
    console.log(form);
  }
}
