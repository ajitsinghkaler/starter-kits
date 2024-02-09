import { Component, input } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { StarterKit } from '../models/starter-kit';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-profile-kits',
  standalone: true,
  imports: [DataViewModule, RatingModule, FormsModule, ChipModule],
  template: `
    <div>
      <p-dataView #dv [value]="starterKits()">
        <ng-template let-starterKits pTemplate="list">
          @for (starterKit of starterKits; track $index) {
          <div class="flex p-4">
            <div class="mr-4">
              <img [src]="starterKit.kit_image" alt="Starter Kit Image" />
            </div >
            <div class="grow px-4">
              <h3>{{ starterKit.name }}</h3>
              <p-rating
                [ngModel]="starterKit.rating"
                [readonly]="true"
                [cancel]="false"
              ></p-rating>
              <div class="flex gap-2 mt-4">
                @for (tag of starterKit.tags; track $index) {
                <p-chip [label]="tag.name"></p-chip>
                }
              </div>
              <p>{{ starterKit.short_description }}</p>
            </div>
            <div class="flex flex-col">

              <p>{{starterKit.pricing_type}}</p>
              <strong>{{ starterKit.price }}</strong>
              <div class="mt-auto">
                <button >Edit Kit</button>
                <button>Delete Kit</button>
              </div>

            </div>
          </div>
          } @empty {
          <p>No starter kits found</p>
          }
        </ng-template>
      </p-dataView>
    </div>
  `,
  styles: ``,
})
export class ProfileKitsComponent {
  starterKits = input.required<StarterKit[]>();
}
