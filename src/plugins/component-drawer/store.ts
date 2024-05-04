import { definePluginStore } from '@/stores';

export interface IComponentDrawerStore {
  opened: boolean,
  panels: string[],
  width: number,
}

export const useStore = definePluginStore<IComponentDrawerStore>('componentDrawer', {
  opened: true,
  panels: [],
  width: 256,
})
