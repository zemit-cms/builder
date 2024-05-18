import { definePluginStore } from '@/stores';

export interface IToolbarSettingsStore {
  opened: boolean,
  tab: string | null,
  panels: string[],
}

export const useSettingsStore = definePluginStore<IToolbarSettingsStore>('settings', {
  opened: false,
  tab: null,
  panels: [],
})
