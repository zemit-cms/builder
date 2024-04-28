import { defineStore } from 'pinia';

export interface IOptionDrawerStore {
  opened: boolean,
}

export const useStore = defineStore<string, IOptionDrawerStore>('optionDrawer', {
  state: () => ({
    opened: true,
  }),
})
