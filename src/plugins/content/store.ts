import { definePluginStore } from '@/stores';

export interface IContentStore {
  name: string,
  version: number,
  widgets: IContentWidget[],
}

export interface IContentWidget {
  id?: string,
  type: string,
  children: IContentWidget[],
}

export const useStore = definePluginStore<IContentStore>('content', {
  name: '',
  version: 0.1,
  widgets: [],
})
