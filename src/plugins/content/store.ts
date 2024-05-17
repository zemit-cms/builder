import { definePluginSessionStore, definePluginStore } from '@/stores';
import { useHistory } from '@/composables/history';

export interface ISessionStoreDeclaration {
  type: string,
  component: Component,
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

export interface IDataStore {
  root: IDataWidget,
}

export interface IDataWidget<P = {}> {
  id: string,
  type: string,
  version: number,
  children: IDataWidget[],
  props?: P,
}

export interface IContentStore {
  grid: boolean,
  mode: 'select' | 'layout',
  selectedWidgetIds: string[],
}

export const useContentSessionStore = definePluginSessionStore<ISessionStore>('content.session', {
  declarations: [],
})

export interface IContentDataStoreState {
  widget: IDataWidget | null,
  index: number | null,
  parent: IDataWidget | null
}

export const useContentDataStore = definePluginStore<IDataStore, {
  find: (state: IDataStore) => (callback: (widget: IDataWidget) => boolean) => IContentDataStoreState,
  filter: (state: IDataStore) => (callback: (widget: IDataWidget) => boolean) => IDataWidget[],
  forEach: (state: IDataStore) => (callback: (widget: IDataWidget, index: number, parent?: IDataWidget) => void) => void,
  forEachSelected: (state: IDataStore) => (callback: (widget: IDataWidget, index: number, parent?: IDataWidget) => void) => void,
  getSelected: (state: IDataStore) => IDataWidget[],
}>('content.data', {
  root: {
    id: 'root',
    type: 'root',
    version: 1,
    children: [],
  },
}, {
  find(state) {
    return callback => {
      const result: IContentDataStoreState = { widget: null, index: null, parent: null };
      function loop(widgets: IDataWidget[], parent: IDataWidget) {
        for (let i = 0; i < widgets.length; i++) {
          const widget = widgets[i];
          if (callback(widget)) {
            result.widget = widget;
            result.index = i;
            result.parent = parent || useContentDataStore().root;
            return true
          }
          if (widget.children.length > 0) {
            if (loop(widget.children, widget)) {
              return;
            }
          }
        }
      }
      loop(state.root.children, state.root);
      return result;
    };
  },
  filter(state) {
    return callback => {
      const widgets: IDataWidget[] = [];
      function filter(items: IDataWidget[]) {
        items.forEach(item => {
          if (item.children.length > 0) {
            filter(item.children);
          }
          if (callback(item)) {
            widgets.push(item);
          }
        })
      }
      filter(state.root.children);
      return widgets;
    };
  },
  forEach(state) {
    return callback => {
      function loop(widgets: IDataWidget[], parent?: IDataWidget) {
        widgets.forEach((widget, index) => {
          callback(widget, index, parent);
          if (widget.children.length > 0) {
            loop(widget.children, widget)
          }
        })
      }
      loop(state.root.children);
    }
  },
  forEachSelected() {
    const contentOptionStore = useContentOptionStore();
    return callback => {
      const ids = contentOptionStore.selectedWidgetIds;
      // @ts-ignore
      this.forEach((widget, index, parent) => {
        if (ids.includes(widget.id)) {
          callback(widget, index, parent);
        }
      })
    }
  },
  getSelected() {
    const contentOptionStore = useContentOptionStore();
    const ids = contentOptionStore.selectedWidgetIds;
    const widgets: IDataWidget[] = [];
    // @ts-ignore
    this.forEach((widget) => {
      if (ids.includes(widget.id)) {
        widgets.push(widget);
      }
    })
    return widgets;
  }
})

export const useContentOptionStore = definePluginStore<IContentStore, {
  select: (state: IContentStore) => (id: string) => boolean
  unselect: (state: IContentStore) => (id: string) => boolean
}>('content.option', {
  grid: true,
  selectedWidgetIds: [],
  mode: 'select',
}, {
  select(state) {
    return (id) => {
      if (id !== 'root') {
        state.selectedWidgetIds.push(id);
      }
      return true;
    }
  },
  unselect(state) {
    return (id) => {
      const index = state.selectedWidgetIds.indexOf(id);
      if (index !== -1) {
        state.selectedWidgetIds.splice(index, 1);
        return true;
      }
      return false;
    }
  }
})
