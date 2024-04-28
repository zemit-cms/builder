import { defineStore } from 'pinia';

export interface IContentToolbarStore {
  opened: boolean
}
export const useStore = defineStore<string, IContentToolbarStore>('content.toolbar', {
  state: () => ({
    opened: true,
  }),
})
