import { useMouseInElement, UseMouseSourceType } from '@vueuse/core';
import { Ref } from 'vue'
import * as vue_demi from 'vue-demi';
import Hash from '@/utils/hash';

interface IInstance {
  context: IResizeContext,
  options: IResizeOptions,
  props: IMouseInElement,
}
const instances: IInstance[] = [];

type Direction = 'x' | 'y' | 'top' | 'right' | 'bottom' | 'left';

interface IBindings {
  startResizingBind: (event: MouseEvent) => void,
  onResizingBind: (event: MouseEvent) => void,
  stopResizingBind: (event: MouseEvent) => void,
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

export interface IResizeOptions {
  minWidth?: number,
  maxWidth?: number,
  minHeight?: number,
  maxHeight?: number,
  offset?: number,
  directions?: Direction[],
  tickSpace?: number,
  onStartResize?: (props: IResizeContext) => void
  onResize?: (props: IResizeContext) => void
  onStopResize?: (props: IResizeContext) => void
}

export interface IResizeContext {
  guid: string,
  originalWidth: Ref<number>,
  originalHeight: Ref<number>,
  currentX: Ref<number>,
  currentY: Ref<number>,
  startX: Ref<number>,
  startY: Ref<number>,
  deltaX: Ref<number>,
  deltaY: Ref<number>,
  canResize: Ref<boolean>,
  isResizing: Ref<boolean>,
  activeSides: Ref<Direction[] | null>,
}

export interface IResizeResult {
  context: IResizeContext,
  destroy: () => void
}

function atLeastOneDirectionMatch(directionsA: Direction[], directionsB: Direction[]): boolean {
  for (let i = 0; i < directionsA.length; i++) {
    const directionA = directionsA[i];
    if (directionsB.includes(directionA)) {
      return true;
    }
  }
  return false;
}

function getReadyToResizeDirections(options: IResizeOptions, props: IMouseInElement, x: number, y: number): Direction[] {
  const ranges: Direction[] = [];
  const directions = options.directions;
  const offset = options.offset || 10;
  const minX = props.elementPositionX.value;
  const maxX = props.elementPositionX.value + props.elementWidth.value;
  const minY = props.elementPositionY.value;
  const maxY = props.elementPositionY.value + props.elementHeight.value;

  if (x !== null && y > minY && y < maxY && (x >= -offset && x <= offset) && (!directions || atLeastOneDirectionMatch(directions, ['left', 'x']))) {
    ranges.push('left');
  }
  if (x !== null && y > minY && y < maxY && (x >= props.elementWidth.value - offset && x <= props.elementWidth.value + offset) && (!directions || atLeastOneDirectionMatch(directions, ['right', 'x']))) {
    ranges.push('right');
  }
  if (y !== null && x > minX && x < maxX && (y >= -offset && y <= offset) && (!directions || atLeastOneDirectionMatch(directions, ['top', 'y']))) {
    ranges.push('top');
  }
  if (y !== null && x > minX && x < maxX && (y >= props.elementHeight.value - offset && y <= props.elementHeight.value + offset) && (!directions || atLeastOneDirectionMatch(directions, ['bottom', 'y']))) {
    ranges.push('bottom');
  }
  return ranges;
}

function applyCursorForDirections(directions: Direction[]) {
  if (directions.includes('left') && directions.includes('top')) {
    document.body.classList.add('cmp-resize-nw-resize');
  } else if (directions.includes('left') && directions.includes('bottom')) {
    document.body.classList.add('cmp-resize-sw-resize');
  } else if (directions.includes('left')) {
    document.body.classList.add('cmp-resize-col-resize');
  } else if (directions.includes('right') && directions.includes('top')) {
    document.body.classList.add('cmp-resize-ne-resize');
  } else if (directions.includes('right') && directions.includes('bottom')) {
    document.body.classList.add('cmp-resize-se-resize');
  } else if (directions.includes('right')) {
    document.body.classList.add('cmp-resize-col-resize');
  } else if (directions.includes('top') || directions.includes('bottom')) {
    document.body.classList.add('cmp-resize-row-resize');
  } else {
    document.body.classList.remove(
      'cmp-resize-nw-resize',
      'cmp-resize-sw-resize',
      'cmp-resize-col-resize',
      'cmp-resize-ne-resize',
      'cmp-resize-se-resize',
      'cmp-resize-row-resize',
    );
  }
}

function startResizing(props: IMouseInElement, options: IResizeOptions, context: IResizeContext, element: HTMLElement, bindings: IBindings) {
  if (context.canResize.value) {
    bindings.onResizingBind = () => onResizing.call(null, props, options, context, element, bindings);
    bindings.stopResizingBind = () => onStopResizing.call(null, props, options, context, element, bindings);
    document.addEventListener('mousemove', bindings.onResizingBind);
    document.addEventListener('mouseup', bindings.stopResizingBind);

    context.isResizing.value = true;
    context.originalWidth.value = props.elementWidth.value;
    context.originalHeight.value = props.elementHeight.value;

    context.startX.value = props.elementPositionX.value + (context.activeSides.value?.includes('right') ? props.elementWidth.value : 0);
    context.startY.value = props.elementPositionY.value + (context.activeSides.value?.includes('bottom') ? props.elementHeight.value : 0);
    context.deltaX.value = 0;
    context.deltaY.value = 0;

    if (options.onStartResize instanceof Function) {
      options.onStartResize(context);
    }

    document.body.classList.add('cmp-resize-active');
    element.classList.add('cpm-resize-current-active');
  }
}

function onResizing(props: IMouseInElement, options: IResizeOptions, context: IResizeContext, element: HTMLElement, bindings: IBindings) {
  if (context.activeSides.value) {
    if (atLeastOneDirectionMatch(context.activeSides.value, ['left', 'right'])) {
      const proposedDeltaX = context.activeSides.value.includes('right')
        ? props.x.value - (context.startX.value || 0)
        : (context.startX.value || 0) - props.x.value;
      const proposedX = context.originalWidth.value + proposedDeltaX;

      if (options.minWidth && proposedX < options.minWidth) {
        context.deltaX.value = options.minWidth - context.originalWidth.value;
      } else if (options.maxWidth && proposedX > options.maxWidth) {
        context.deltaX.value = options.maxWidth - context.originalWidth.value
      } else {
        context.deltaX.value = proposedDeltaX;
      }
    }

    if (options.onResize instanceof Function) {
      options.onResize(context);
    }
  }
}

function onStopResizing(props: IMouseInElement, options: IResizeOptions, context: IResizeContext, element: HTMLElement, bindings: IBindings) {
  document.removeEventListener('mousemove', bindings.onResizingBind);
  document.removeEventListener('mouseup', bindings.stopResizingBind);

  context.isResizing.value = false;
  applyCursorForDirections(context.activeSides.value || []);
  document.body.classList.remove('cmp-resize-active');
  element.classList.remove('cpm-resize-current-active');

  if (options.onStopResize instanceof Function) {
    options.onStopResize(context);
  }
}

export function useResize(
  element: HTMLElement,
  options: IResizeOptions
): IResizeResult {
  const props: IMouseInElement = useMouseInElement(element);
  const context: IResizeContext = {
    guid: Hash.guid(),
    currentX: props.elementX,
    currentY: props.elementY,
    originalWidth: ref<number>(0),
    originalHeight: ref<number>(0),
    startX: ref<number>(0),
    startY: ref<number>(0),
    deltaX: ref<number>(0),
    deltaY: ref<number>(0),
    canResize: ref<boolean>(false),
    isResizing: ref<boolean>(false),
    activeSides: ref<Direction[] | null>(null),
  }

  instances.push({
    context,
    options,
    props,
  });

  const bindings: IBindings = {
    startResizingBind: (event: MouseEvent) => {},
    onResizingBind: (event: MouseEvent) => {},
    stopResizingBind: (event: MouseEvent) => {},
  }

  bindings.startResizingBind = () => startResizing.call(null, props, options, context, element, bindings);
  document.addEventListener('mousedown', bindings.startResizingBind);

  return {
    context,
    destroy: () => {
      document.removeEventListener('mousedown', bindings.startResizingBind);
      document.removeEventListener('mousemove', bindings.onResizingBind);
      document.removeEventListener('mouseup', bindings.stopResizingBind);

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
    if (instance.context.isResizing.value) {
      return;
    }
  }
  for (let i = 0; i < instances.length; i++) {
    const instance = instances[i];
    const directions = getReadyToResizeDirections(instance.options, instance.props, instance.context.currentX.value, instance.context.currentY.value);
    instance.context.canResize.value = directions.length > 0;
    instance.context.activeSides.value = directions;

    if (directions.length > 0) {
      applyCursorForDirections(directions);
      return;
    }
  }
  applyCursorForDirections([]);
})
