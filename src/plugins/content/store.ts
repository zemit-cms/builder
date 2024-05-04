import { definePluginStore } from '@/stores';

export interface IDataStore {
  name: string,
  version: number,
  widgets: IDataWidget[],
}

export interface IDataWidget {
  id?: string,
  type: string,
  children: IDataWidget[],
}

export interface IContentStore {
  grid: boolean,
}

export const useContentDataStore = definePluginStore<IDataStore>('content.data', {
  name: '',
  version: 0.1,
  widgets: [],
})

export const useContentOptionStore = definePluginStore<IContentStore>('content.option', {
  grid: true,
})
