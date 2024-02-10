import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Tag } from '../models/tag';
import { computed, inject } from '@angular/core';
import { TagsService } from '../services/tags.service';

type TagStore = {
  tags: Tag[];

  isLoading: boolean;
  isError: boolean;
};

const initialState: TagStore = {
  tags: [],
  isLoading: false,
  isError: false,
};

export const TagStore = signalStore(
  withState(initialState),
  withComputed(({ tags }) => ({
    topTags: computed(() => tags().slice(0,6)), 
  })),
  withMethods((store, tagService = inject(TagsService)) => ({

    async loadTags(): Promise<void> {
      patchState(store, { isLoading: true });
      const { data, error } = await tagService.getTags();
      if (error) {
        patchState(store, { tags: [], isError: true, isLoading: false });
        return;
      }
      patchState(store, { tags: data, isLoading: false });
    },
  }))
);
