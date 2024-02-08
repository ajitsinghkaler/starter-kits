import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { StarterKit } from '../models/starter-kit';
import { inject } from '@angular/core';
import { StarterKitsService } from '../services/starter-kits.service';
import { ProfileService } from '../services/profile.service';

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
    withMethods((store, ProfileService = inject(ProfileService)) => ({

    }))
  );