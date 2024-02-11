import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { StarterKit } from '../models/starter-kit';
import { inject } from '@angular/core';
import { StarterKitsService } from '../services/starter-kits.service';
import { writeReviewStatus } from './review.store';

export type Bookmark = { bookmarks: [{ count: number }] };
export type ReviewsCount = { reviewsCount: [{ count: number }] };

type StaterKitState = {
  starterKit: (StarterKit & Bookmark & ReviewsCount) | null;
  isLoading: boolean;
  isError: boolean;
  avgRating: number;
};

const initialState: StaterKitState = {
  starterKit: null,
  isLoading: false,
  isError: false,
  avgRating: 0,
};

export const StarterKitStore = signalStore(
  withState(initialState),
  writeReviewStatus(),
  withMethods((store, starterKitService = inject(StarterKitsService)) => ({
    async loadStarterKit(starterKitId: number): Promise<void> {
      patchState(store, { isLoading: true });
      const { data, error } = await starterKitService.getStarterKitById(starterKitId);
      if (error) {
        patchState(store, {
          starterKit: null,
          isError: true,
          isLoading: false,
        });
        return;
      }
      const totalRating = data.reviews.reduce((acc, review) => acc + review.rating, 0);
      const avgRating = data.reviews.length > 0 ? totalRating / data.reviews.length : 0;


      patchState(store, { starterKit: data, isLoading: false, avgRating });
    },
  }))
);


