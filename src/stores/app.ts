// Utilities
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core';

export interface IAppState {
  zoomSelection: number,
  contentViewMode: ContentViewMode,
}

export enum ContentViewMode {
  Mobile,
  Tablet,
  Desktop,
  Fit,
}

export const useAppStore = defineStore<string, IAppState>('app', {
  state: () => useStorage<IAppState>('zemit/app', {
    zoomSelection: 100,
    contentViewMode: ContentViewMode.Fit,
  }),
})
