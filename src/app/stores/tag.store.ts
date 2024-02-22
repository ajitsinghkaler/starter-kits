import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Tag } from '../models/tag';
import { computed, inject } from '@angular/core';
import { TagsService } from '../services/tags.service';

type TagStore = {
  tags: Tag[];
  tagsCount: number;
  isLoading: boolean;
  isError: boolean;
  showAllTags: boolean;
};

const initialState: TagStore = {
  tags: [],
  tagsCount: 0,
  isLoading: false,
  isError: false,
  showAllTags: false,
};

export const TagStore = signalStore(
  withState(initialState),
  withComputed(({ tags, showAllTags }) => ({
    topTags: computed(() => {
      if (showAllTags()) {
        return tags();
      } else {
        return tags().slice(0, 10);
      }
    }),
  })),
  withMethods((store, tagService = inject(TagsService)) => ({
    async loadTags(): Promise<void> {
      patchState(store, { isLoading: true });
      const { data, error, count } = await tagService.getTags();
      if (error) {
        patchState(store, { tags: [], isError: true, isLoading: false });
        return;
      }
      patchState(store, {
        tags: data,
        isLoading: false,
        tagsCount: count || 0,
      });
    },
    showTagsAll() {
      patchState(store, { showAllTags: true });
    },
    showTagsLess() {
      patchState(store, { showAllTags: false });
    },
  })),
  withHooks({
    onInit({ loadTags }) {
      loadTags();
    },
  })
);
