import { defineStore } from 'pinia';

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

export const useStore = defineStore<string, IContentStore>('content', {
  state: () => ({
    name: '',
    version: 0.1,
    widgets: [],
  }),
})
