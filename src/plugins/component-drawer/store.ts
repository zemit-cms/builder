import { definePluginStore } from '@/stores';

export interface IComponentDrawerStore {
  opened: boolean,
  panels: string[],
}

export const useStore = definePluginStore<IComponentDrawerStore>('componentDrawer', {
  opened: true,
  panels: [],
})
