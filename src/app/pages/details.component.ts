import { Component, OnInit, inject, input } from '@angular/core';

import { ReviewsComponent } from '../components/reviews.component';
import { SimilarKitsComponent } from '../components/similar-kits.component';
import { StarterKitStore } from '../stores/starter-kit.store';
import { SkeletonModule } from 'primeng/skeleton';
import { DetailsStaterKitComponent } from '../components/details-stater-kit.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-details',
  standalone: true,
  providers: [StarterKitStore],
  template: `
    <div class="container mx-auto py-8 md:py-20">
      @if (starterKitStore.isLoading()) {
      <div class="border-round border-1 surface-border p-4 surface-card">
        <div class="flex mb-3">
          <p-skeleton shape="square" size="4rem" styleClass="mr-2"></p-skeleton>
          <div>
            <p-skeleton width="10rem" styleClass="mb-2"></p-skeleton>
            <p-skeleton width="5rem" styleClass="mb-2"></p-skeleton>
            <p-skeleton height=".5rem"></p-skeleton>
          </div>
        </div>
        <p-skeleton width="100%" height="200px"></p-skeleton>
        <p-skeleton width="100%" height="200px"></p-skeleton>

        <div class="flex justify-between mt-3">
          <p-skeleton width="100%" height="2rem"></p-skeleton>
        </div>
      </div>
      } @else{
      <app-details-stater-kit></app-details-stater-kit>
      @defer (on viewport; prefetch on idle) {
      <app-reviews
        [reviews]="starterKitStore.starterKit()?.reviews || []"
      ></app-reviews>
      <app-similar-kits
        [tags]="starterKitStore.starterKit()?.tags || []"
        [starterKitId]="starterKitStore.starterKit()?.id || 0"
      ></app-similar-kits>
      } @placeholder {
      <p>Loading...</p>
      } }
    </div>
  `,
    imports: [
    ReviewsComponent,
    SimilarKitsComponent,
    SkeletonModule,
    DetailsStaterKitComponent,
  ],
})
export class DetailsComponent implements OnInit {
  starterKitId = input<number>(0);
  starterKitStore = inject(StarterKitStore);
  authServices = inject(AuthService);
  ngOnInit() {
    this.starterKitStore.loadStarterKit(this.starterKitId());
    if (this.authServices.userState.getValue()?.user?.id) {
      this.starterKitStore.getBookMarkStatus(
        this.starterKitId(),
        this.authServices.userState.getValue()?.user?.id || ''
      );
    }
  }
}
