export interface IDraggable {
  context: IDraggableContext,
  destroy: () => void,
}
export interface IDraggableOptions<D = {}> {
  category?: string | null,
  data: D | null,
  onDragStart?: (data: D | null) => void,
  onDragEnd?: (data: D | null) => void,
  onDrop?: (data: D | null) => void,
}
export interface IDraggableContext {
  dragging: Ref<boolean>,
}

export function useDraggable<D = {}>(
  element: HTMLElement,
  options: IDraggableOptions<D> = {
    data: null,
  },
): IDraggable {

  const context: IDraggableContext = {
    dragging: ref<boolean>(false),
  }

  function onDragStart(event: DragEvent) {
    if (options.onDragStart instanceof Function) {
      options.onDragStart(options.data)
    }

    event.dataTransfer?.setData('zemit/drag/' + (options.category || 'any'), JSON.stringify(options));
    element.classList.add('cmp-draggable-active');
    document.body.classList.add('cmp-draggable-dragging');
    context.dragging.value = true;
  }

  function onDragEnd(event: DragEvent) {
    if (options.onDragEnd instanceof Function) {
      options.onDragEnd(options.data)
    }

    element.classList.remove('cmp-draggable-active');
    document.body.classList.remove('cmp-draggable-dragging');
    context.dragging.value = false;
  }

  element.classList.add('cmp-draggable');
  element.addEventListener('dragstart', onDragStart);
  element.addEventListener('dragend', onDragEnd);

  return {
    context,
    destroy: () => {
      element.removeEventListener('dragstart', onDragStart);
      element.removeEventListener('dragend', onDragEnd);
    },
  };
}
