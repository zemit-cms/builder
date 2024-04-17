// Utilities
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core';

export interface IAppState {
  zoomSelection: number,
  contentViewMode: ContentViewMode,
  componentDrawer: {
    opened: boolean,
  },
  optionDrawer: {
    opened: boolean,
  },
  contentToolbar: {
    opened: boolean,
  },
}

export enum ContentViewMode {
  Mobile,
  Tablet,
  Desktop,
  Fit,
}

export const useAppStore = defineStore<string, IAppState>('app', {
  state: () => useStorage('zemit/app', {
    zoomSelection: 100,
    contentViewMode: ContentViewMode.Fit,
    componentDrawer: {
      opened: true,
    },
    optionDrawer: {
      opened: true,
    },
    contentToolbar: {
      opened: true,
    },
  }) as IAppState,
})
