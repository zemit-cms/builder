import { computed, ref } from 'vue';
import { zoomList } from '../global';
import { ContentViewMode, useStore } from '../stores/app';
import { CSSUnit, ICSSUnit } from '../interfaces';

export interface IContentZoomStyle {
  zoom?: number,
  transform?: string,
  transformOrigin?: string,
}

export function useZoom() {
  const store = useStore()

  const zoomIndex = computed((): number => {
    if (ContentViewMode.Fit === store.contentViewMode) {
      return zoomList.findIndex(item => item.value === 100);
    }
    const index = zoomList.findIndex(item => item.value === store.zoomSelection);
    if (index === -1) {
      const closest = zoomList.reduce((prev, curr) => {
        return (Math.abs(curr.value - store.zoomSelection) < Math.abs(prev.value - store.zoomSelection) ? curr : prev);
      });
      return zoomList.findIndex(item => item.value === closest.value);
    }
    return index;
  })

  const canZoomOut = computed((): boolean => {
    return store.zoomSelection > minZoom.value && ContentViewMode.Fit !== store.contentViewMode;
  })

  const canZoomIn = computed((): boolean => {
    return store.zoomSelection < maxZoom.value && ContentViewMode.Fit !== store.contentViewMode;
  })

  const canZoom = computed((): boolean => {
    return canZoomOut.value || canZoomIn.value;
  })

  const minZoom = computed((): number => {
    return zoomList[0].value;
  })

  const maxZoom = computed((): number => {
    return zoomList[zoomList.length - 1].value;
  })

  const currentZoom = computed((): number => {
    return store.zoomSelection < minZoom.value
      ? minZoom.value
      : store.zoomSelection > maxZoom.value
        ? maxZoom.value
        : store.zoomSelection;
  })

  const factor = computed((): number => currentZoom.value / 100);

  function getContentWidth(container: ref<HTMLDivElement>): ICSSUnit {
    let format = CSSUnit.Percentage;
    let value = 100;
    if (!container.value || store.contentViewMode !== ContentViewMode.Fit) {
      format = CSSUnit.RelativeToFontSize;
      value = (store.contentViewMode === ContentViewMode.Desktop
        ? 120
        : store.contentViewMode === ContentViewMode.Tablet
          ? 48
          : store.contentViewMode === ContentViewMode.Mobile
            ? 22.5
            : 60) * factor.value;
    }
    return {
      format,
      value,
    }
  }

  function getContentHeight(container: ref<HTMLDivElement>): ICSSUnit {
    let format = CSSUnit.Percentage;
    let value = 100;
    if (!container.value || store.contentViewMode !== ContentViewMode.Fit) {
      format = CSSUnit.RelativeToFontSize;
      value = (store.contentViewMode === ContentViewMode.Desktop
        ? 67.5
        : store.contentViewMode === ContentViewMode.Tablet
          ? 27
          : store.contentViewMode === ContentViewMode.Mobile
            ? 50
            : 40) * factor.value;
    }
    return {
      format,
      value,
    }
  }

  function getContentZoomStyle(): IContentZoomStyle {
    return ContentViewMode.Fit === store.contentViewMode ? {} : {
      zoom: 1 / factor.value,
      transform: 'scale(' + factor.value + ')',
      transformOrigin: '0 0',
    }
  }

  function adjustZoomValue(): void {
    if (store.zoomSelection < minZoom.value) {
      store.zoomSelection = minZoom.value;
    }
    if (store.zoomSelection > maxZoom.value) {
      store.zoomSelection = maxZoom.value;
    }
  }

  function onZoomMinusClick() {
    if (canZoomOut.value) {
      store.$patch({
        zoomSelection: zoomList[zoomIndex.value - 1].value,
      })
    }
  }

  function onZoomPlusClick() {
    if (canZoomIn.value) {
      store.$patch({
        zoomSelection: zoomList[zoomIndex.value + 1].value,
      })
    }
  }

  function onChangeContentViewMode(contentViewMode: ContentViewMode) {
    store.$patch({
      contentViewMode,
    })
  }

  return {
    zoomIndex,
    canZoomOut,
    canZoomIn,
    canZoom,
    minZoom,
    maxZoom,
    factor,
    getContentWidth,
    getContentHeight,
    getContentZoomStyle,
    adjustZoomValue,
    onZoomMinusClick,
    onZoomPlusClick,
    onChangeContentViewMode,
  }
}
