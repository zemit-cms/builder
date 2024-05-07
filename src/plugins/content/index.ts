import { IDataWidget, useContentDataStore, useContentOptionStore } from './store'

function getSelectedWidgetIds(): string[] {
  const contentOptionStore = useContentOptionStore();
  return contentOptionStore.selectedWidgetIds;
}

function getSelected(): IDataWidget[] {
  const contentDataStore = useContentDataStore();
  const contentOptionStore = useContentOptionStore();

  const items: IDataWidget[] = [];
  function scan(widgets: IDataWidget[]): IDataWidget[] {
    widgets.forEach(widget => {
      if (contentOptionStore.selectedWidgetIds.includes(widget.id)) {
        items.push(widget);
      }
      scan(widget.children);
    })
    return items;
  }
  scan(contentDataStore.widgets)
  return items;
}

export {
  getSelected,
  getSelectedWidgetIds,
}
