import { defineStore } from 'pinia';

export interface IComponentDrawerStore {
  opened: boolean,
}

export const useStore = defineStore<string, IComponentDrawerStore>('componentDrawer', {
  state: () => ({
    opened: true,
  }),
})
