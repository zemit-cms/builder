import { IDataWidget, ISessionStoreDeclaration, useContentDataStore, useContentOptionStore, useContentSessionStore } from './store'
import Hash from '@/utils/hash';

export function declareWidgets(declarations: ISessionStoreDeclaration[]): void {
  const sessionStore = useContentSessionStore();
  sessionStore.$patch(state => state.declarations = declarations);
}

export function useWidget(widget: IDataWidget) {
  const contentOptionStore = useContentOptionStore();
  const attrs = computed(() => {
    const classes = ['widget'];
    if (contentOptionStore.selectedWidgetIds.indexOf(widget.id)) {
      classes.push('selected');
    }
    return {
      class: classes,
    };
  });

  return {
    attrs,
    listeners: {
      click: (event: MouseEvent) => {
        event.stopPropagation();
        contentOptionStore.$patch(state => {
          if (widget.id === 'root') {
            state.selectedWidgetIds = [];
            return;
          }

          const index = state.selectedWidgetIds.findIndex(id => id === widget.id);
          if (index >= 0 && event.ctrlKey) { // Click on the same with CTRL
            state.selectedWidgetIds.splice(index, 1);
          } else if (event.ctrlKey) { // Click on another one with CTRL
            state.selectedWidgetIds.push(widget.id)
          } else if (state.selectedWidgetIds.length > 1 || index === -1) {
            state.selectedWidgetIds = [widget.id];
          } else {
            state.selectedWidgetIds = [];
          }
        })
      }
    },
  }
}

export default class WidgetModel {

  public id = 'new'
  public type = 'unknown'
  public version = 1
  public children: IDataWidget[] = [];

  constructor(data?: IDataWidget | null) {
    Object.assign(this, data || {});
  }

  get widgets(): WidgetModel[] {
    return this.children.map(children => new WidgetModel(children));
  }

  get data(): IDataWidget {
    return {
      id: this.id,
      version: this.version,
      type: this.type,
      children: this.children,
    };
  }

  get state(): { widget: WidgetModel | null, index: number | null, parent: WidgetModel } {
    const contentDataStore = useContentDataStore();
    const { widget, index, parent } = contentDataStore.find(widget => widget.id === this.id);
    return {
      widget: widget && new WidgetModel(widget) || null,
      index,
      parent: new WidgetModel(parent || contentDataStore.root),
    }
  }

  get parent(): WidgetModel {
    return this.state.parent;
  }

  get index(): number {
    return this.parent.children.findIndex(widget => widget.id === this.id) || -1;
  }

  select(): boolean {
    const contentOptionStore = useContentOptionStore();
    if (this.id !== 'root') {
      contentOptionStore.selectedWidgetIds.push(this.id);
      return true;
    }
    return false;
  }

  unselect(): boolean {
    const contentOptionStore = useContentOptionStore();
    const index = contentOptionStore.selectedWidgetIds.indexOf(this.id);
    if (index !== -1) {
      contentOptionStore.selectedWidgetIds.splice(index, 1);
      return true;
    }
    return false;
  }

  remove(selectNext = false): void {
    const state = this.state;
    const index = state.index;

    if (index !== null) {
      const parent = this.parent;
      this.unselect();
      parent.children.splice(index, 1);

      if (selectNext) {
        if (parent.children.length === 0) {
          parent.select();
        } else if (parent.children.length > index) {
          parent.widgets[index].select();
        } else {
          parent.widgets[index - 1].select();
        }
      }

      this.save();
    }
  }

  clone(): WidgetModel {
    const clone = new WidgetModel(JSON.parse(JSON.stringify(this.data)));
    clone.id = Hash.guid();
    return clone;
  }

  duplicate(): void {
    const clone = this.clone();
    setTimeout(() => {
      this.parent.children.splice(this.index, 0, clone);
      this.save();
    })
  }

  get root(): IDataWidget {
    let parent = this.parent;
    while (parent.id !== 'root') {
      parent = parent.parent;
    }
    return parent;
  }

  save() {
    const contentDataStore = useContentDataStore();
    contentDataStore.$patch(state => {
      state.root.children = JSON.parse(JSON.stringify(this.root.children));
    })
  }
}
