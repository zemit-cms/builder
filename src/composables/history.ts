import Model from '@/composables/model';

export type IHistory<T = {}> = T[]

export interface IHistoryReturn<T = {}> {
  _skip: boolean,
  history: Ref<IHistory<T>>
  reference: Ref<Model>
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
export function useHistory<T>(
  key: string,
  model: Ref<Model<T>> | null = null,
): IHistoryReturn<Model<T>> {

  if (!memory[key]) {
    memory[key] = {
      _skip: false,
      history: ref([]),
      index: ref(0),
      reference: ref(new Model()),
      canUndo: ref(false),
      canRedo: ref(false),
      init: (value: Ref<Model>) => {
        memory[key].index.value = 0;
        memory[key].canRedo.value = false;
        memory[key].canUndo.value = false;
        memory[key].reference = value;
        memory[key].history.value = [value.value.clone(false).data];

        watch(value, (newValue) => {
          if (!memory[key]._skip) {
            memory[key].commit(newValue.clone(false).data);
          }
        }, { deep: true });
      },
      commit: (data: T) => {
        memory[key].history.value.splice(memory[key].index.value + 1, memory[key].history.value.length)
        memory[key].history.value.push(data);
        memory[key].canRedo.value = false;
        memory[key].canUndo.value = memory[key].index.value > 0;
        memory[key].index.value = memory[key].history.value.length - 1;
      },
      undo: () => {
        if (memory[key].canUndo.value) {
          memory[key]._skip = true;
          memory[key].index.value--;
          memory[key].canUndo.value = memory[key].index.value > 0;
          memory[key].canRedo.value = true;

          const current = memory[key].history.value[memory[key].index.value];
          memory[key].reference.value.assign(current);
          setTimeout(() => {
            memory[key]._skip = false;
          })
        }
      },
      redo: () => {
        if (memory[key].canRedo.value) {
          memory[key]._skip = true;
          memory[key].index.value++;
          memory[key].canRedo.value = memory[key].index.value < memory[key].history.value.length - 1;
          memory[key].canUndo.value = true;

          const current = memory[key].history.value[memory[key].index.value];
          memory[key].reference.value.assign(current);
          setTimeout(() => {
            memory[key]._skip = false;
          })
        }
      },
    };
  }

  if (model) {
    memory[key].init(model);
  }

  return memory[key]
}
