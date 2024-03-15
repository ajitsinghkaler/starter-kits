import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { StarterKit } from '../models/starter-kit';
import { inject } from '@angular/core';
import { Filters, StarterKitsService } from '../services/starter-kits.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, from, pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { Tag } from '../models/tag';

type StaterKitsState = {
  starterKits: StarterKit[];
  isLoading: boolean;
  isError: boolean;
  filters: Partial<Filters>;
};

const initialState: StaterKitsState = {
  starterKits: [],
  isLoading: false,
  isError: false,
  filters: {},
};

export const StarterKitsStore = signalStore(
  withState(initialState),

  withMethods((store, starterKitService = inject(StarterKitsService)) => ({
    starterKitFiltered: rxMethod(
      pipe(
        tap((filters) => patchState(store, { filters })),
        debounceTime(300),
        tap(() => patchState(store, { isLoading: true })),
        switchMap((filters: Filters) => {
          return from(starterKitService.getStarterKits(filters)).pipe(
            tapResponse({
              next: (starterKits) =>
                patchState(store, {
                  starterKits: [...store.starterKits(), ...(starterKits || [])],
                }),
              error: () => patchState(store, { isError: true }),
              finalize: () => patchState(store, { isLoading: false }),
            })
          );
        })
      )
    ),
    async loadStarterKitsTags(
      tags: Tag[],
      starterKitId,
      limit = 8
    ): Promise<void> {
      patchState(store, { isLoading: true });
      const { data, error } = await starterKitService.getStarterKitsTags(
        tags.map((tag) => tag.id),
        starterKitId,
        limit
      );

      if (error) {
        patchState(store, {
          starterKits: [],
          isError: true,
          isLoading: false,
        });
        return;
      }
      patchState(store, {
        starterKits: data.map((item) => item.starter_kits),
        isLoading: false,
      });
    },
  }))
);
