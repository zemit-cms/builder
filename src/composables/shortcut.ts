import { ContentViewMode } from '../stores/app';
import { useMagicKeys } from '@vueuse/core/index';
import { useZoom } from '@/composables/zoom';
import { useSessionStore, ISessionState } from '@/stores/session';

export enum ShortcutType {
  Zoom,
  ContentViewMode,
}

export function useShortcut() {

  const {
    onZoomMinusClick,
    onZoomPlusClick,
    setZoomValue,
    setChangeContentViewMode,
  } = useZoom()

  const sessionStore = useSessionStore();

  function enable(types: ShortcutType[]) {
    const keys = useMagicKeys({
      passive: false,
      onEventFired(e) {

        sessionStore.$patch((state: ISessionState) => {
          state.ctrlKeyActivated = e.ctrlKey;
          state.altKeyActivated = e.altKey;
          state.shiftKeyActivated = e.shiftKey;
        })

        if (e.ctrlKey && e.type === 'keydown') {
          e.preventDefault();
          if (types.includes(ShortcutType.Zoom)) {
            switch (e.key) {
              case '0':
                setZoomValue(100);
                break;
              case '=':
                onZoomPlusClick();
                break;
              case '-':
                onZoomMinusClick();
                break;
            }
          }
        }
        if (e.altKey && e.type === 'keydown') {
          if (types.includes(ShortcutType.ContentViewMode)) {
            e.preventDefault();
            switch (e.key) {
              case 'm':
                setChangeContentViewMode(ContentViewMode.Mobile);
                break;
              case 't':
                setChangeContentViewMode(ContentViewMode.Tablet);
                break;
              case 'd':
                setChangeContentViewMode(ContentViewMode.Desktop);
                break;
              case 'f':
                setChangeContentViewMode(ContentViewMode.Fit);
                break;
            }
          }
        }
      },
    })
  }

  return {
    enable,
  }
}
