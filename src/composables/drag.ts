import { useMouseInElement, UseMouseSourceType } from '@vueuse/core';
import { Ref } from 'vue'
import * as vue_demi from 'vue-demi';
import Hash from '@/utils/hash';

interface IInstance {
  context: IDragContext,
  options: IDragOptions,
  props: IMouseInElement,
}
const instances: IInstance[] = [];

type Direction = 'x' | 'y' | 'top' | 'right' | 'bottom' | 'left';

interface IBindings {
  startDraggingBind: (event: MouseEvent) => void,
  onDraggingBind: (event: MouseEvent) => void,
  stopDraggingBind: (event: MouseEvent) => void,
}

interface IMouseInElement {
  x: vue_demi.Ref<number>;
  y: vue_demi.Ref<number>;
  sourceType: vue_demi.Ref<UseMouseSourceType>;
  elementX: vue_demi.Ref<number>;
  elementY: vue_demi.Ref<number>;
  elementPositionX: vue_demi.Ref<number>;
  elementPositionY: vue_demi.Ref<number>;
  elementHeight: vue_demi.Ref<number>;
  elementWidth: vue_demi.Ref<number>;
  isOutside: vue_demi.Ref<boolean>;
  stop: () => void;
}

export interface IDragOptions {
  minX?: number,
  maxX?: number,
  minY?: number,
  maxY?: number,
  offset?: number,
  directions?: Direction[],
  tickSpace?: number,
  onStartDrag?: (props: IDragContext) => void
  onDrag?: (props: IDragContext) => void
  onStopDrag?: (props: IDragContext) => void,
  ghost?: HTMLElement,
}

export interface IDragContext {
  guid: string,
  currentX: Ref<number>,
  currentY: Ref<number>,
  startX: Ref<number>,
  startY: Ref<number>,
  deltaX: Ref<number>,
  deltaY: Ref<number>,
  canDrag: Ref<boolean>,
  isDragging: Ref<boolean>,
}

export interface IDragResult {
  context: IDragContext,
  destroy: () => void
}

function isReadyToDrag(options: IDragOptions, props: IMouseInElement, x: number, y: number): boolean {
  const offset = options.offset || 0;
  const minX = 0 - offset;
  const maxX = props.elementWidth.value + offset;
  const minY = 0 - offset;
  const maxY = props.elementHeight.value + offset;
  return x >= minX && y >= minY && x <= maxX && y <= maxY;
}

function applyCursor(flag: boolean) {
  if (flag) {
    document.body.classList.add('draggable');
  } else {
    document.body.classList.remove('draggable');
  }
}

function startDragging(props: IMouseInElement, options: IDragOptions, context: IDragContext, element: HTMLElement, bindings: IBindings) {
  if (context.canDrag.value) {
    bindings.onDraggingBind = () => onDragging.call(null, props, options, context, element, bindings);
    bindings.stopDraggingBind = () => onStopDragging.call(null, props, options, context, element, bindings);
    document.addEventListener('mousemove', bindings.onDraggingBind);
    document.addEventListener('mouseup', bindings.stopDraggingBind);

    context.isDragging.value = true;

    context.startX.value = props.elementPositionX.value;
    context.startY.value = props.elementPositionY.value;
    context.deltaX.value = 0;
    context.deltaY.value = 0;

    if (options.onStartDrag instanceof Function) {
      options.onStartDrag(context);
    }

    document.body.classList.add('cmp-drag-active');
    element.classList.add('cpm-drag-current-active');
  }
}

function onDragging(props: IMouseInElement, options: IDragOptions, context: IDragContext, element: HTMLElement, bindings: IBindings) {
  const proposedDeltaX = props.x.value - (context.startX.value || 0);
  const proposedX = context.startX.value + proposedDeltaX;

  if (options.minX && proposedX < options.minX) {
    context.deltaX.value = options.minX - context.startX.value;
  } else if (options.maxX && proposedX > options.maxX) {
    context.deltaX.value = options.maxX - context.startX.value
  } else {
    context.deltaX.value = proposedDeltaX;
  }

  if (options.onDrag instanceof Function) {
    options.onDrag(context);
  }
}

function onStopDragging(props: IMouseInElement, options: IDragOptions, context: IDragContext, element: HTMLElement, bindings: IBindings) {
  document.removeEventListener('mousemove', bindings.onDraggingBind);
  document.removeEventListener('mouseup', bindings.stopDraggingBind);

  context.isDragging.value = false;
  applyCursor(false);
  document.body.classList.remove('cmp-drag-active');
  element.classList.remove('cpm-drag-current-active');

  if (options.onStopDrag instanceof Function) {
    options.onStopDrag(context);
  }
}

export function useDrag(
  element: HTMLElement,
  options: IDragOptions
): IDragResult {
  const props: IMouseInElement = useMouseInElement(element);
  const context: IDragContext = {
    guid: Hash.guid(),
    currentX: props.elementX,
    currentY: props.elementY,
    startX: ref<number>(0),
    startY: ref<number>(0),
    deltaX: ref<number>(0),
    deltaY: ref<number>(0),
    canDrag: ref<boolean>(false),
    isDragging: ref<boolean>(false),
  }

  if (options.ghost) {
    options.ghost.classList.add('draggable-ghost');
  }

  instances.push({
    context,
    options,
    props,
  });

  const bindings: IBindings = {
    startDraggingBind: (event: MouseEvent) => {},
    onDraggingBind: (event: MouseEvent) => {},
    stopDraggingBind: (event: MouseEvent) => {},
  }

  bindings.startDraggingBind = () => startDragging.call(null, props, options, context, element, bindings);
  document.addEventListener('mousedown', bindings.startDraggingBind);

  return {
    context,
    destroy: () => {
      document.removeEventListener('mousedown', bindings.startDraggingBind);
      document.removeEventListener('mousemove', bindings.onDraggingBind);
      document.removeEventListener('mouseup', bindings.stopDraggingBind);

      const index = instances.findIndex(instance => instance.context.guid === context.guid);
      if (index >= 0) {
        instances.splice(index, 1);
      }
    },
  };
}

document.addEventListener('mousemove', () => {
  for (let i = 0; i < instances.length; i++) {
    const instance = instances[i];
    if (instance.context.isDragging.value) {
      return;
    }
  }
  for (let i = 0; i < instances.length; i++) {
    const instance = instances[i];
    const ready = isReadyToDrag(instance.options, instance.props, instance.context.currentX.value, instance.context.currentY.value);
    instance.context.canDrag.value = ready;

    if (ready) {
      applyCursor(ready);
      return;
    }
  }
  applyCursor(false);
})
