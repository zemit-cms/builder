import { definePluginStore } from '@/stores';

export interface IToolbarSettingsStore {
  opened: boolean,
  tab: string | null,
  panels: string[],
}

export const useStore = definePluginStore<IToolbarSettingsStore>('settings', {
  opened: false,
  tab: null,
  panels: [],
})
