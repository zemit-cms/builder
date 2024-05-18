import { definePluginSessionStore, definePluginStore } from '@/stores';
import WidgetModel from '@/plugins/content/models/widget.model';
import Hash from '@/utils/hash';

export interface ISessionStoreDeclaration {
  type: string,
  component: Component | string,
  props?: {[key: string]: {
    category: string,
    type: 'select',
    options?: { label: string, value: any }[]
  }},
  onDrop?: (data: IDataWidget, parent?: IDataWidget) => void
}

export interface ISessionStore {
  declarations: ISessionStoreDeclaration[],
}

export interface IDataStore<P = {}> {
  version: number,
  root: IDataWidget<P>,
}

export interface IDataWidget<P = {}> {
  id: string,
  type: string,
  children: IDataWidget<P>[],
  props: P,
}

export interface IContentStore {
  grid: boolean,
  mode: 'select' | 'layout',
}

export const useContentSessionStore = definePluginSessionStore<ISessionStore>('content.session', {
  declarations: [],
})

export const useContentDataStore = definePluginStore<IDataStore>('content.data', {
  version: 1,
  root: {
    id: Hash.guid(),
    type: 'root',
    children: [],
    props: {}
  },
})

export const useContentOptionStore = definePluginStore<IContentStore>('content.option', {
  grid: true,
  mode: 'select',
})
