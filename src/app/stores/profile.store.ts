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
import { NgForm } from '@angular/forms';

type ProfileStore = {
  profile: Profile | null;
  isLoading: boolean;
  isError: boolean;
};

export type EditProfileStatus = {
  edit: boolean;
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
    async updateProfile(form: NgForm, userId) {
      form.form.markAllAsTouched();
      if (form.invalid) return;
      const { data, error } = await profileService.updateProfile({...form.value}, userId);
      if (error) {
        patchState(store, { edit: false });
        return;
      }
      data;
      patchState(store, { edit: false, profile: {...data, myKits: store.profile()?.myKits, savedKits: store.profile()?.savedKits} });
    },
  }))
);

export function ProfileEdit() {
  return signalStoreFeature(
    withState<EditProfileStatus>({ edit: false }),
    withMethods((store) => ({
      startEditing() {
        patchState(store, { edit: true });
      },
      stopEditing() {
        patchState(store, { edit: false });
      },
      
    }))
  );
}
