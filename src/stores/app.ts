// Utilities
import { defineStore } from 'pinia'

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

export const useStore = defineStore<string, IAppState>('app', {
  state: () => ({
    zoomSelection: 100,
    contentViewMode: ContentViewMode.Desktop,
    componentDrawer: {
      opened: true,
    },
    optionDrawer: {
      opened: true,
    },
    contentToolbar: {
      opened: true,
    },
  }),
})
