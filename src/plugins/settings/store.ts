import { defineStore } from 'pinia';

export interface IToolbarSettingsStore {
  opened: boolean,
}

export const useStore = defineStore<string, IToolbarSettingsStore>('toolbar.settings', {
  state: () => ({
    opened: false,
  }),
})
