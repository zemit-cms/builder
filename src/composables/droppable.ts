import { IDraggableOptions } from '@/composables/draggable';

export interface IDroppable {
  context: IDroppableContext,
  destroy: () => void,
}
export interface IDroppableOptions<D = {}> {
  category?: string | null,
  onDrop?: (options: IDraggableOptions<D>) => void,
}
export interface IDroppableContext {
  canDrop: Ref<boolean>
}

export function useDroppable<D>(
  element: HTMLElement,
  options: IDroppableOptions<D> = {},
): IDroppable {

  const context: IDroppableContext = {
    canDrop: ref<boolean>(false),
  }

  function onDragEnter(event: DragEvent) {
    event.preventDefault();
  }

  function onDragOver(event: DragEvent) {
    event.preventDefault();
    if (!context.canDrop.value) {
      const canDrop = !options.category || event.dataTransfer?.types.includes('zemit/drag/' + (options.category || 'any')) || false;
      context.canDrop.value = canDrop;

      if (canDrop) {
        event.preventDefault();
        element.classList.add('cmp-droppable-ready', 'active');
        setTimeout(() => {
          element.classList.add('overlay');
        }, 1);
      }
    }
  }

  function onDragLeave(event: DragEvent) {
    event.preventDefault();
    if (context.canDrop.value) {
      element.classList.remove('active');
      setTimeout(() => {
        element.classList.remove('cmp-droppable-ready', 'overlay');
        context.canDrop.value = false;
      }, 150);
    }
  }

  function onDrop(event: DragEvent) {
    event.preventDefault();
    const json = event.dataTransfer?.getData('zemit/drag/' + (options.category || 'any')) || '{}';
    const data = JSON.parse(json);

    element.classList.remove('active');
    setTimeout(() => {
      element.classList.remove('cmp-droppable-ready', 'overlay');
      context.canDrop.value = false;
    }, 150);

    if (options.onDrop instanceof Function) {
      options.onDrop(data);
    }
  }

  element.classList.add('cmp-droppable');
  element.addEventListener('drop', onDrop);
  element.addEventListener('dragover', onDragOver);
  element.addEventListener('dragenter', onDragEnter);
  element.addEventListener('dragleave', onDragLeave);

  return {
    context,
    destroy: () => {
      element.removeEventListener('drop', onDrop);
      element.removeEventListener('dragover', onDragOver);
      element.removeEventListener('dragenter', onDragEnter);
      element.removeEventListener('dragleave', onDragLeave);
    },
  };
}
