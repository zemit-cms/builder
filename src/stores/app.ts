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

const data: IAppState = {
  zoomSelection: 100,
  contentViewMode: ContentViewMode.Fit,
}

export const useAppStore = defineStore<string, IAppState>('app', {
  // @ts-ignore
  state: () => useStorage<IAppState>('zemit/builder/app', data, localStorage, {
    mergeDefaults: true
  }),
})
