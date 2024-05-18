import { IDataWidget, ISessionStoreDeclaration, useContentDataStore, useContentSessionStore } from './store'
import WidgetModel from '@/plugins/content/models/widget.model';
import { useHistory } from '@/composables/history';
import { useShortcut } from '@/composables/shortcut';
import { IDraggableOptions } from '@/composables/draggable';

export function useContentShortcuts() {
  const { undo, canUndo, redo, canRedo } = useHistory('content');
  const shortcut = useShortcut();

  shortcut.enable([{
    name: 'Delete',
    description: 'Delete selected widgets',
    keys: ['delete'],
    callback: () => {
      const rootModel = useRootModel();
      rootModel.value.filter(widget => widget.isSelected()).forEach(widget => widget.remove(true));
    },
  }, {
    name: 'Undo',
    description: 'Undo the latest changes',
    keys: ['ctrl', 'z'],
    callback: () => canUndo.value && undo(),
  }, {
    name: 'Redo',
    description: 'Redo the latest changes',
    keys: ['ctrl', 'y'],
    callback: () => canRedo.value && redo(),
  }]);
}

export function declareWidgets(declarations: ISessionStoreDeclaration[]): void {
  const sessionStore = useContentSessionStore();
  sessionStore.$patch(state => state.declarations = declarations);
}

let rootModel: Ref<WidgetModel> | null = null;
export const useRootModel = (): Ref<WidgetModel> => {
  if (rootModel === null) {
    const contentDataStore = useContentDataStore();
    rootModel = ref<WidgetModel>(new WidgetModel(contentDataStore.root));
  }
  return rootModel;
}

export function onDropWidget(options: IDraggableOptions<IDataWidget>, parent: WidgetModel) {
  if (options.data) {
    const model = new WidgetModel(options.data, parent);
    const declaration = model.getDeclaration();
    if (declaration?.onDrop instanceof Function) {
      declaration.onDrop(model, parent)
    }
    parent.children.push(model);
    parent.filter(widget => widget.isSelected()).forEach(widget => widget.unselect());
    model.select();
  }
}

export function useWidget(widget: WidgetModel) {
  const attrs = computed(() => {
    const classes = ['widget'];
    if (widget.isSelected()) {
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

        const root = widget.type === 'root' ? widget : widget.root;
        if (root) {
          const selectedWidgets = root.filter(widget => widget.isSelected());
          if (widget.type === 'root') {
            selectedWidgets.forEach(widget => widget.unselect());
            return;
          }

          if (event.ctrlKey) {
            widget.toggleSelect();
          } else if (selectedWidgets.length === 0) {
            widget.toggleSelect();
          } else {
            selectedWidgets.forEach(widget => widget.unselect());
            widget.select();
          }
        }
      }
    },
  }
}
