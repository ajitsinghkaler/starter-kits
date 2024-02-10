import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { StarterKit } from '../models/starter-kit';
import { inject } from '@angular/core';
import { Filters, StarterKitsService } from '../services/starter-kits.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  debounceTime,
  distinctUntilChanged,
  from,
  pipe,
  switchMap,
  tap,
} from 'rxjs';
import { tapResponse } from '@ngrx/operators';

type StaterKitsState = {
  staterKits: StarterKit[];
  isLoading: boolean;
  isError: boolean;
  filters: Partial<Filters>;
};

const initialState: StaterKitsState = {
  staterKits: [],
  isLoading: false,
  isError: false,
  filters: {},
};

export const StarterKitsStore = signalStore(
  withState(initialState),

  withMethods((store, starterKitService = inject(StarterKitsService)) => ({
    async loadStarterKits(): Promise<void> {
      patchState(store, { isLoading: true });

      const starterKits = (await starterKitService.getStarterKits({})) || [];
      patchState(store, { staterKits: starterKits, isLoading: false });
    },
    starterKitFiltered: rxMethod<Filters>(
      pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap((filters) => {
          return from(starterKitService.getStarterKits(filters)).pipe(
            tapResponse({
              next: (staterKits) => patchState(store, { staterKits }),
              error: () => patchState(store, { isError: true }),
              finalize: () => patchState(store, { isLoading: false }),
            })
          );
        })
      )
    ),
  }))
);
