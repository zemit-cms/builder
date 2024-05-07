import { definePluginStore } from '@/stores';

export interface IContentToolbarStore {
  opened: boolean,
}

export const useStore = definePluginStore<IContentToolbarStore>('contentToolbar', {
  opened: true,
})
