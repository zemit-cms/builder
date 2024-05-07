import { definePluginStore } from '@/stores';

export interface IWidgetDrawerStore {
  opened: boolean,
  panels: string[],
  width: number,
}

export const useStore = definePluginStore<IWidgetDrawerStore>('widgetDrawer', {
  opened: true,
  panels: [],
  width: 256,
})
