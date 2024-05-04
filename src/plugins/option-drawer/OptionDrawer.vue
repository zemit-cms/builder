<template>
  <v-navigation-drawer
    v-model="store.opened"
    :width="store.width"
    color="toolbar"
    permanent
    location="right"
    ref="drawer"
  >
    <OptionDrawerInner
      :tabs="tabs"
    />
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { useStore } from './store';
import OptionDrawerInner from './OptionDrawerInner.vue';
import { useShortcut } from '@/composables/shortcut';
import { ITab } from '@/utils/interfaces';
import { IResizeContext, IResizeResult, useResize } from '@/composables/resize';

export interface IOptionDrawerProps {
  tabs?: ITab[],
}

const store = useStore();
const shortcut = useShortcut();
shortcut.enable([{
  name: 'option_drawer',
  description: 'Dock/Undock option drawer',
  keys: ['alt', 'o'],
  callback: () => {
    store.$patch(state => {
      state.opened = !state.opened;
    })
  },
}]);

let resize: IResizeResult;
let vMain: HTMLElement | null | undefined;
const drawer = ref<HTMLElement | null>(null);
onMounted(() => {
  const element = drawer.value?.$el.nextElementSibling;
  resize = useResize(element, {
    minWidth: 256,
    maxWidth: 600,
    directions: ['left'],
    onStartResize: ()  => {
      vMain = document.getElementById('app')?.querySelector('.v-main');
    },
    onResize: (props: IResizeContext) => {
      const width = (props.originalWidth.value || 0) + props.deltaX.value;
      element.style.width = width + 'px';
      if (vMain) {
        vMain.style.setProperty('--v-layout-right', width + 'px');
      }
    },
    onStopResize(props: IResizeContext) {
      store.width = (props.originalWidth.value || 0) + props.deltaX.value;
    },
  })
})
onUnmounted(() => {
  resize.destroy();
})

withDefaults(defineProps<{
  tabs: ITab[],
}>(), {
  tabs: () => ([]),
})
</script>
