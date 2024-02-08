import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { StarterKit } from '../models/starter-kit';
import { inject } from '@angular/core';
import { StarterKitsService } from '../services/starter-kits.service';

type StaterKitsState = {
  staterKits: StarterKit[];
  isLoading: boolean;
};

const initialState: StaterKitsState = {
  staterKits: [],
  isLoading: false,
};

export const StarterKitsStore = signalStore(
  withState(initialState),
  withMethods((store, starterKitService = inject(StarterKitsService)) => ({
    /* ... */
    // 👇 Defining a method to load all books.
    async loadStarterKits(): Promise<void> {
      patchState(store, { isLoading: true });

      const starterKits = (await starterKitService.getStarterKits()) || [];
      patchState(store, { staterKits: starterKits, isLoading: false });
    },
  }))
);
