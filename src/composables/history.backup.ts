import { Store } from 'pinia';

export type IHistory<T = {}> = T[]

export interface IHistoryReturn<T = {}> {
  _skip: Ref<boolean>
  history: Ref<IHistory<T>>
  store: Store<string, Record<string, T>> | null
  current: Ref<T>
  index: Ref<number>
  canUndo: Ref<boolean>
  canRedo: Ref<boolean>
  init: (data: T, clone?: boolean) => void
  commit: (data: T, clone?: boolean) => void
  undo: () => void
  redo: () => void
}

const memory: {[key: string]: IHistoryReturn<any>} = {}

// @ts-ignore
export function useHistory<T>(key: string, store?: Store<string, Record<string, T>>): IHistoryReturn<T> {

  function updateObject(obj: any, data: any) {
    Object.keys(obj).forEach(key => {
      if (!data[key]) {
        delete obj[key];
      }
    });
    Object.assign(obj, data);
  }

  if (!memory[key]) {
    memory[key] = {
      _skip: ref(false),
      history: ref([]),
      index: ref(0),
      store: null,
      current: ref(null),
      canUndo: ref(false),
      canRedo: ref(false),
      init: (store: Store<string, Record<string, T>>) => {
        memory[key].history.value = [JSON.parse(JSON.stringify(store.$state))];
        memory[key].index.value = 0;
        memory[key].canRedo.value = false;
        memory[key].canUndo.value = false;
        memory[key].store = store;
        memory[key].current.value = memory[key].history.value[0];

        store.$subscribe((mutation, state) => {
          if (!memory[key]._skip.value) {
            memory[key].commit(state, true);
          }
        })
      },
      commit: (data: T, clone = false) => {
        memory[key].history.value.splice(memory[key].index.value + 1, memory[key].history.value.length)
        memory[key].history.value.push(clone ? JSON.parse(JSON.stringify(data)) : data);

        memory[key].index.value = memory[key].history.value.length - 1;
        memory[key].canRedo.value = false;
        memory[key].canUndo.value = memory[key].index.value > 0;
        memory[key].current.value = memory[key].history.value[memory[key].index.value];
      },
      undo: () => {
        memory[key]._skip.value = true;
        if (memory[key].canUndo.value) {
          memory[key].index.value--;
          memory[key].canUndo.value = memory[key].index.value > 0;
          memory[key].canRedo.value = true;

          const data = JSON.parse(JSON.stringify(memory[key].history.value[memory[key].index.value]));
          memory[key].current.value = memory[key].history.value[memory[key].index.value];
          memory[key].store?.$patch(state => {
            updateObject(state, data);
          })
        }
        memory[key]._skip.value = false;
      },
      redo: () => {
        memory[key]._skip.value = true;
        if (memory[key].canRedo.value) {
          memory[key].index.value++;
          memory[key].canRedo.value = memory[key].index.value < memory[key].history.value.length - 1;
          memory[key].canUndo.value = true;

          const data = JSON.parse(JSON.stringify(memory[key].history.value[memory[key].index.value]));
          memory[key].current.value = memory[key].history.value[memory[key].index.value];
          memory[key].store?.$patch(state => {
            updateObject(state, data);
          })
        }
        memory[key]._skip.value = false;
      },
    };
  }

  if (store) {
    memory[key].init(store);
  }

  return memory[key]
}
