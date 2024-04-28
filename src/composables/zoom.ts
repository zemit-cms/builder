import { computed, Ref } from 'vue';
import { zoomList } from '@/utils/global';
import { ContentViewMode } from '@/utils/enums';
import { useAppStore } from '@/stores/app';
import { CSSUnit, ICSSUnit } from '@/utils/interfaces';

export interface IContentZoomStyle {
  zoom?: number,
  transform?: string,
  transformOrigin?: string,
}

export function useZoom() {
  const appStore = useAppStore()

  const zoomIndex = computed((): number => {
    if (ContentViewMode.Fit === appStore.contentViewMode) {
      return zoomList.findIndex(item => item.value === 100);
    }
    const index = zoomList.findIndex(item => item.value === appStore.zoomSelection);
    if (index === -1) {
      const closest = zoomList.reduce((prev, curr) => {
        return (Math.abs(curr.value - appStore.zoomSelection) < Math.abs(prev.value - appStore.zoomSelection) ? curr : prev);
      });
      return zoomList.findIndex(item => item.value === closest.value);
    }
    return index;
  })

  const canZoomOut = computed((): boolean => {
    return appStore.zoomSelection > minZoom.value && ContentViewMode.Fit !== appStore.contentViewMode;
  })

  const canZoomIn = computed((): boolean => {
    return appStore.zoomSelection < maxZoom.value && ContentViewMode.Fit !== appStore.contentViewMode;
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
    return appStore.zoomSelection < minZoom.value
      ? minZoom.value
      : appStore.zoomSelection > maxZoom.value
        ? maxZoom.value
        : appStore.zoomSelection;
  })

  const factor = computed((): number => currentZoom.value / 100);

  function getContentWidth(container: Ref<HTMLDivElement>): ICSSUnit {
    let format = CSSUnit.Percentage;
    let value = 100;
    if (!container.value || appStore.contentViewMode !== ContentViewMode.Fit) {
      format = CSSUnit.RelativeToFontSize;
      value = (appStore.contentViewMode === ContentViewMode.Desktop
        ? 120
        : appStore.contentViewMode === ContentViewMode.Tablet
          ? 48
          : appStore.contentViewMode === ContentViewMode.Mobile
            ? 22.5
            : 60) * factor.value;
    }
    return {
      format,
      value,
    }
  }

  function getContentHeight(container: Ref<HTMLDivElement>): ICSSUnit {
    let format = CSSUnit.Percentage;
    let value = 100;
    if (!container.value || appStore.contentViewMode !== ContentViewMode.Fit) {
      format = CSSUnit.RelativeToFontSize;
      value = (appStore.contentViewMode === ContentViewMode.Desktop
        ? 67.5
        : appStore.contentViewMode === ContentViewMode.Tablet
          ? 27
          : appStore.contentViewMode === ContentViewMode.Mobile
            ? 50
            : 40) * factor.value;
    }
    return {
      format,
      value,
    }
  }

  function getContentZoomStyle(): IContentZoomStyle {
    return ContentViewMode.Fit === appStore.contentViewMode ? {} : {
      zoom: 1 / factor.value,
      transform: 'scale(' + factor.value + ')',
      transformOrigin: '0 0',
    }
  }

  function adjustZoomValue(): void {
    if (appStore.zoomSelection < minZoom.value) {
      appStore.zoomSelection = minZoom.value;
    }
    if (appStore.zoomSelection > maxZoom.value) {
      appStore.zoomSelection = maxZoom.value;
    }
  }

  function onZoomPlusClick() {
    increaseZoomIndex();
  }

  function increaseZoom(amount = 1) {
    if (canZoomIn.value) {
      appStore.$patch({
        zoomSelection: currentZoom.value + amount,
      })
    }
  }

  function increaseZoomIndex() {
    if (canZoomIn.value) {
      appStore.$patch({
        zoomSelection: zoomList[zoomIndex.value + 1].value,
      })
    }
  }

  function decreaseZoom(amount = 1) {
    if (canZoomOut.value) {
      appStore.$patch({
        zoomSelection: currentZoom.value - amount,
      })
    }
  }

  function onZoomMinusClick() {
    decreaseZoomIndex();
  }

  function decreaseZoomIndex() {
    if (canZoomOut.value) {
      appStore.$patch({
        zoomSelection: zoomList[zoomIndex.value - 1].value,
      })
    }
  }

  function setZoomValue(amount: number) {
    if (amount >= minZoom.value && amount <= maxZoom.value) {
      appStore.$patch({
        zoomSelection: amount,
      })
    }
  }

  function setChangeContentViewMode(contentViewMode: ContentViewMode) {
    appStore.$patch({
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
    increaseZoom,
    increaseZoomIndex,
    onZoomPlusClick,
    decreaseZoom,
    decreaseZoomIndex,
    onZoomMinusClick,
    getContentWidth,
    getContentHeight,
    getContentZoomStyle,
    setChangeContentViewMode,
    adjustZoomValue,
    setZoomValue,
  }
}
