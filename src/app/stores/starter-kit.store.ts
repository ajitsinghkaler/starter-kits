import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { StarterKit } from '../models/starter-kit';
import { inject } from '@angular/core';
import { StarterKitsService } from '../services/starter-kits.service';

type StaterKitState = {
  starterKit: StarterKit | null;
  isLoading: boolean;
  isError: boolean;
};

const initialState: StaterKitState = {
  starterKit: null,
  isLoading: false,
  isError: false,
};

export const StarterKitStore = signalStore(
  withState(initialState),
  withMethods((store, starterKitService = inject(StarterKitsService)) => ({
    async loadStarterKit(starterKitId: number): Promise<void> {
      patchState(store, { isLoading: true });
      const { data, error } = await starterKitService.getStarterKitById(
        starterKitId
      );
      if (error) {
        patchState(store, { starterKit: null, isError: true, isLoading: false });
        return;
      }
      patchState(store, { starterKit: data, isLoading: false });
    },
  }))
);
