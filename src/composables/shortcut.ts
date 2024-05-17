import { useMagicKeys } from '@vueuse/core/index';
import { useSessionStore, ISessionState } from '@/stores/session';

export interface IShortcut {
  name: string,
  description: string,
  keys: string[],
  callback: (event: KeyboardEvent) => void,
}

export let shortcutList: IShortcut[] = [];

export function useShortcut() {

  function bootstrap() {
    const sessionStore = useSessionStore();

    useMagicKeys({
      passive: false,
      onEventFired(e) {

        sessionStore.$patch(state => {
          state.ctrlKeyActivated = e.ctrlKey;
          state.altKeyActivated = e.altKey;
          state.shiftKeyActivated = e.shiftKey;
        })

        if (e.type === 'keydown') {
          const key = e.key.toLowerCase();

          for (let i = 0; i < shortcutList.length; i++) {
            const shortcut = shortcutList[i];
            if (e.ctrlKey && shortcut.keys.includes('ctrl') && key !== 'ctrl') {
              if (shortcut.keys.includes(key)) {
                e.preventDefault();
                shortcut.callback(e);
                return;
              }
            }
            if (e.altKey && shortcut.keys.includes('alt') && key !== 'alt') {
              e.preventDefault();
              if (shortcut.keys.includes(key)) {
                shortcut.callback(e);
                return;
              }
            }
            if (!e.altKey && !e.ctrlKey) {
              if (shortcut.keys.includes(key)) {
                shortcut.callback(e);
                return;
              }
            }
          }
        }
      },
    })
  }

  function enable(shortcut: IShortcut | IShortcut[]) {
    const items = Array.isArray(shortcut) ? shortcut : [shortcut];
    items.forEach(item => {
      shortcutList.push({
        ...item,
        keys: item.keys.join('+').toLowerCase().split('+')
      })
    })
  }

  function disable(name: string | string[]) {
    const names = Array.isArray(name) ? name : [name];
    shortcutList = shortcutList.filter(shortcut => names.includes(shortcut.name));
  }

  return {
    bootstrap,
    enable,
    disable,
  }
}
