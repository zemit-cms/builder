<script lang="ts" setup>
import { useStore } from './store';
import { useShortcut } from '@/composables/shortcut';
import { ITab } from '@/utils/interfaces';
import { IResizeContext, useResizeable } from '@/composables/resizeable';
import ContextDrawerInner from './ContextDrawerInner.vue';

export interface IContextDrawerProps {
  tabs?: ITab[],
}

const store = useStore();
const shortcut = useShortcut();
shortcut.enable([{
  name: 'option_drawer',
  description: 'Dock/Undock context drawer',
  keys: ['alt', 'o'],
  callback: () => {
    store.$patch(state => {
      state.opened = !state.opened;
    })
  },
}]);

let vMain: HTMLElement | null | undefined;
const drawer = ref<HTMLElement | null>(null);
onMounted(() => {
  const element = drawer.value?.$el.nextElementSibling;
  const context = useResizeable(element, {
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
  onUnmounted(() => {
    context.destroy();
  })
})

withDefaults(defineProps<{
  tabs: ITab[],
}>(), {
  tabs: () => ([]),
})
</script>

<template>
  <v-navigation-drawer
    v-model="store.opened"
    :width="store.width"
    id="context-drawer"
    color="toolbar"
    permanent
    location="right"
    ref="drawer"
  >
    <ContextDrawerInner
      :tabs="tabs"
    />
  </v-navigation-drawer>
</template>

<style lang="scss">
#context-drawer * {
  user-select: none;
}
</style>
