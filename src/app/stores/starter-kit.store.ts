import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { StarterKit } from '../models/starter-kit';
import { inject } from '@angular/core';
import { StarterKitsService } from '../services/starter-kits.service';
import { writeReviewStatus } from './review.store';

export type Bookmark = { bookmarks: [{ count: number }] };
export type ReviewsCount = { reviewsCount: [{ count: number }] };

type StaterKitState = {
  starterKit: (StarterKit & Bookmark & ReviewsCount) | null;
  bookmarked: boolean;
  isLoading: boolean;
  bookMarkLoading: boolean;
  isError: boolean;
  avgRating: number;
};

const initialState: StaterKitState = {
  bookmarked: false,
  starterKit: null,
  isLoading: false,
  bookMarkLoading: false,
  isError: false,
  avgRating: 0,
};

export const StarterKitStore = signalStore(
  withState(initialState),
  writeReviewStatus(),
  withMethods((store, starterKitService = inject(StarterKitsService)) => ({
    async loadStarterKit(starterKitId: number): Promise<void> {
      patchState(store, { isLoading: true });
      const { data, error } = await starterKitService.getStarterKitById(
        starterKitId
      );
      if (error) {
        patchState(store, {
          starterKit: null,
          isError: true,
          isLoading: false,
        });
        return;
      }
      const totalRating = data.reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      let avgRating =
        data.reviews.length > 0 ? totalRating / data.reviews.length : 0;
      avgRating = Number(avgRating.toFixed(1));
      patchState(store, { starterKit: data, isLoading: false, avgRating });
    },
    async bookmarkStarterKit(starterKitId: number): Promise<void> {
      patchState(store, { bookMarkLoading: true });
      const { data, error } = await starterKitService.bookmarkStarterKit(
        starterKitId
      );
      if (error) {
        console.error('Error toggling bookmark', error);
        return;
      }
      console.log('data', data);
      patchState(store, {
        bookmarked: true,
        bookMarkLoading: false,
      });

      if (store.starterKit()) {
        patchState(store, {
          starterKit: {
            ...store.starterKit()!,
            bookmarks: [{ count: store.starterKit()!.bookmarks[0].count + 1 }],
          },
        });
      }
    },
    async removeBookmarkStarterKit(starterKitId: number): Promise<void> {
      patchState(store, { bookMarkLoading: true });
      const { data, error } = await starterKitService.deleteBookmark(
        starterKitId
      );
      if (error) {
        console.error('Error removing book mark from current data', error);
        return;
      }
      console.log('data', data);
      patchState(store, { bookmarked: false, bookMarkLoading: false });
      if (store.starterKit()) {
        patchState(store, {
          starterKit: {
            ...store.starterKit()!,
            bookmarks: [{ count: store.starterKit()!.bookmarks[0].count - 1 }],
          },
        });
      }
    },
    async getBookMarkStatus(
      starterKitId: number,
      authId: string
    ): Promise<void> {
      patchState(store, { bookMarkLoading: true });
      const { data, error } = await starterKitService.getBookmarkStarterKits(
        authId,
        starterKitId
      );
      if (error) {
        console.error('Error getting current bookmark', error);
        return;
      }
      console.log('data', data);
      patchState(store, {
        bookmarked: Boolean(data.length),
        bookMarkLoading: false,
      });
    },
  }))
);
