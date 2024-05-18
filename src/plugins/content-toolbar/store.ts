import { definePluginStore } from '@/stores';

export interface IContentToolbarStore {
  opened: boolean,
}

export const useContentToolbarStore = definePluginStore<IContentToolbarStore>('contentToolbar', {
  opened: true,
})
