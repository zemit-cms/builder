import { definePluginStore } from '@/stores';

export interface IContextDrawerStore {
  opened: boolean,
  tab: string | null,
  width: number,
}

export const useStore = definePluginStore<IContextDrawerStore>('contextDrawer', {
  opened: true,
  tab: null,
  width: 300,
})
