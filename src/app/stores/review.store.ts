import {
  patchState,
  signalStoreFeature,
  withMethods,
  withState,
} from '@ngrx/signals';

export type WriteReviewStatus = { writeReview: boolean };

export function writeReviewStatus() {
  return signalStoreFeature(
    withState<WriteReviewStatus>({ writeReview: false }),
    withMethods((store) => ({
      startWritingReview() {
        patchState(store, { writeReview: true });
      },
      stopWritingReview() {
        patchState(store, { writeReview: false });
      },
    }))
  );
}
