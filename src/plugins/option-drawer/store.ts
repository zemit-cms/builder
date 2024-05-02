import { definePluginStore } from '@/stores';

export interface IOptionDrawerStore {
  opened: boolean,
  tab: string | null,
}

export const useStore = definePluginStore<IOptionDrawerStore>('optionDrawer', {
  opened: true,
  tab: null,
})
