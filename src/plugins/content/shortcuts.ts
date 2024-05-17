import { useShortcut } from '@/composables/shortcut';
import { useContentDataStore, useContentOptionStore } from '@/plugins/content/store';
import WidgetModel from '@/plugins/content';
import { useHistory } from '@/composables/history';

export function useContentShortcuts() {
  const { undo, canUndo, redo, canRedo } = useHistory('content');
  const shortcut = useShortcut();

  shortcut.enable([{
    name: 'Delete',
    description: 'Delete selected widgets',
    keys: ['delete'],
    callback: () => {
      const contentDataStore = useContentDataStore();
      const contentOptionStore = useContentOptionStore();
      contentDataStore.forEachSelected(widget => {
        const model = new WidgetModel(widget);
        model.remove(contentOptionStore.selectedWidgetIds.length === 1);
      })
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



