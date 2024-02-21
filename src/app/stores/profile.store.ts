import {
  patchState,
  signalStore,
  signalStoreFeature,
  withMethods,
  withState,
} from '@ngrx/signals';
import { inject } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { Profile } from '../models/profile';

type ProfileStore = {
  profile: Profile | null;
  isLoading: boolean;
  isError: boolean;
};

export type EditProfileStatus = {
  name: boolean;
  email: boolean;
  website: boolean;
};

const initialState: ProfileStore = {
  profile: null,
  isLoading: false,
  isError: false,
};

export const ProfileStore = signalStore(
  withState(initialState),
  ProfileEdit(),
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

export function ProfileEdit() {
  return signalStoreFeature(
    withState<EditProfileStatus>({ name: false, email: false, website: false }),
    withMethods((store, profileService = inject(ProfileService)) => ({
      editName() {
        patchState(store, { name: true });
      },
      async saveName(name: string) {
        const { data, error } = await profileService.updateName(name);
        if (error) {
          patchState(store, { name: false });
          return;
        }
        data
        patchState(store, { name: false });
      },
      editEmail() {
        patchState(store, { email: true });
      },
      async saveEmail(email: string) {
        const { data, error } = await profileService.updateEmail(email);
        if (error) {
          patchState(store, { email: false });
          return;
        }
        data
        patchState(store, { email: false });
      },
      editWebsite() {
        patchState(store, { website: true });
      },
      async saveWebsite(website: string) {
        const { data, error } = await profileService.updateWebsite(website);
        if (error) {
          patchState(store, { website: false });
          return;
        }
        data
        patchState(store, { website: false });
      },
    }))
  );
}
