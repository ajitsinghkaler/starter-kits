import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RatingModule } from 'primeng/rating';
import { StarterKitsService } from '../services/starter-kits.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { TagStore } from '../stores/tag.store';

@Component({
  selector: 'app-submit',
  standalone: true,
  providers: [TagStore],
  imports: [
    InputTextModule,
    InputTextareaModule,
    RatingModule,
    FormsModule,
    MultiSelectModule,
    DropdownModule,
  ],
  template: `
    <form
      #starterKitForm="ngForm"
      class="space-y-6 max-w-4xl rounded-lg px-4 sm:px-8 pt-6 pb-12 container mx-auto mt-12 mb-40 bg-white"
      (ngSubmit)="starterKit.createStarterKit(starterKitForm)"
    >
      <h1 class="text-3xl font-bold text-gray-900 mb-8">
        Submit a Boilerplate
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="name" class="block text-sm text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            pInputText
            class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-slate-400 focus:ring-slate-400"
            ngModel
            required
            #name="ngModel"
          />
          @if(name.touched && name.invalid){
          <div class="text-red-500 text-sm mt-2">
            Please give a name to the boiler plate.
          </div>
          }
        </div>

        <div>
          <label for="website" class="block text-sm text-gray-700">URL</label>
          <input
            type="text"
            id="website"
            name="website"
            pInputText
            class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-slate-400 focus:ring-slate-400"
            ngModel
            #URL="ngModel"
            required
          />
          @if(URL.touched && URL.invalid){
          <div class="text-red-500 text-sm mt-2">
            Please give a URL to your boiler plate.
          </div>
          }
        </div>
        
      </div>

      <div>
        <label for="short_description" class="block text-sm text-gray-700"
          >Short Description (Max Length 60 characters)</label
        >
        <input
          id="short_description"
          name="short_description"
          maxlength="60"
          pInputText
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-400 focus:ring-slate-400"
          ngModel
          #shotDescription="ngModel"
          required
        />
        @if(shotDescription.touched && shotDescription.invalid){
          <div class="text-red-500 text-sm mt-2">
            Please give a short description to the boiler plate.
          </div>
          }
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
          #description="ngModel"
          required
        ></textarea>
        @if(description.touched && description.invalid){
          <div class="text-red-500 text-sm mt-2">
            Please give a description to the boiler plate.
          </div>
          }
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
        <p-multiSelect
          display="chip"
          name="tags"
          styleClass="mt-1  w-full rounded-md border-gray-300 shadow-sm focus:border-slate-400 focus:ring-slate-400"
          ngModel
          [required]="true"
          [options]="tagStore.tags()"
          placeholder="Select Tag(s)"
          optionLabel="name"
          #tags="ngModel"
        >
        </p-multiSelect>
        @if(tags.touched && tags.invalid){
          <div class="text-red-500 text-sm mt-2">
            Please give a tag to the boiler plate.
          </div>
          }
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="pricing" class="block text-sm text-gray-700"
            >Pricing Type</label
          >
          <p-dropdown
            name="pricing_type"
            ngModel
            styleClass="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-slate-400 focus:ring-slate-400"
            [options]="pricingType"
            placeholder="Select Pricing Type"
            [required]="true"
            #pricingtype="ngModel"
          ></p-dropdown>
          @if(pricingtype.touched && pricingtype.invalid){
          <div class="text-red-500 text-sm mt-2">
            Please give a pricing type to the boiler plate.
          </div>
          }
          
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
            #pricing="ngModel"
          />
          @if(pricing.touched && pricing.invalid){
          <div class="text-red-500 text-sm mt-2">
            Please give a pricing to the boiler plate.
          </div>
          }
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
  pricingType = ['Free', 'Paid'];
  starterKit = inject(StarterKitsService);
  tagStore = inject(TagStore);
}
