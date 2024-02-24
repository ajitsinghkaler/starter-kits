import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RatingModule } from 'primeng/rating';
import { StarterKitsService } from '../services/starter-kits.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { TagStore } from '../stores/tag.store';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateTagComponent } from '../components/create-tag.component';

@Component({
  selector: 'app-submit',
  standalone: true,
  providers: [TagStore, DialogService],
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
      (ngSubmit)="starterKit.createStarterKit(starterKitForm, files)"
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
        <div  class="block text-sm text-gray-700 "> Upload Image</div>
        <label
          for="dropzone-file"
          class="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 mt-1"
        >
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            @if(!files){
            <p class="text-sm text-gray-500">
              <span class="font-semibold"
                >Click to upload the boiler plate image</span
              >
              or drag and drop
            </p>
            } @else {
              @for(fileName of fileNames; track $index){
              <p class="text-sm text-gray-500">
                {{ fileName }}
              </p>
              }
            }
          </div>
          <input
            id="dropzone-file"
            type="file"
            class="hidden"
            name="kit_image"
            required
            ngModel
            #kitImage="ngModel"
            (change)="onFileSelected($event)"
          />
        </label>
        @if(kitImage.touched && kitImage.invalid){
        <div class="text-red-500 text-sm mt-2">
          Please select an image for the boiler plate.
        </div>
        }
      </div>

      <div>
        <label for="tags" class="block text-sm text-gray-700"
          >Tags (comma-separated)</label
        >
        <div>
          <p-multiSelect
            display="chip"
            name="tags"
            styleClass="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-slate-400 focus:ring-slate-400"
            ngModel
            [required]="true"
            [options]="tagStore.tags()"
            placeholder="Select Tag(s)"
            optionLabel="name"
            #tags="ngModel"
          >
            <ng-template let-country pTemplate="dropdownicon">
              <button
                class="mr-2 text-sm bg-black text-white font-semibold px-2 py-1 rounded-lg shadow-lg hover:bg-gray-800 transition duration-300 ease-in-out"
                type="button"
                (click)="createTags($event)"
              >
                Create Tags
              </button>
            </ng-template>
          </p-multiSelect>
        </div>
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
            name="price"
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
})
export class SubmitComponent {
  pricingType = ['Free', 'Paid'];
  starterKit = inject(StarterKitsService);
  tagStore = inject(TagStore);
  dialogService = inject(DialogService);
  ref: DynamicDialogRef | undefined;
  files: FileList | null = null;
  fileNames: string[] = [];

  createTags(e: Event) {
    e.stopPropagation();
    this.ref = this.dialogService.open(CreateTagComponent, {
      header: 'Create Tags',
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
    });
    this.ref.onClose.subscribe(() => {
      this.tagStore.loadTags();
    });
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    this.files = target.files;
    this.fileNames = [];
    if (this.files) {
      for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i];
        this.fileNames.push(file.name); // Add file name to fileNames array
      }
    }
  }
}
