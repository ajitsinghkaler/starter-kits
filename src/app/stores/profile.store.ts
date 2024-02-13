import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { Profile } from '../models/profile';

type ProfileStore = {
  profile: Profile | null;
  isLoading: boolean;
  isError: boolean;
};

const initialState: ProfileStore = {
  profile: null,
  isLoading: false,
  isError: false,
};

export const ProfileStore = signalStore(
  withState(initialState),
  withMethods((store, profileService = inject(ProfileService)) => ({
    startLoading() {
      patchState(store, { isLoading: true });
    },
    async loadProfile(profileId: string): Promise<void> {
      patchState(store, { isLoading: true });
      const { data, error } = await profileService.getProfile(profileId);
      if (error) {
        patchState(store, { profile: null, isError: true, isLoading: false });
        return;
      }
      patchState(store, { profile: data, isLoading: false });
    },
  }))
);
