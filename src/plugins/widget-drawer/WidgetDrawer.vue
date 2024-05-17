<script lang="ts" setup>
import { useStore } from './store'
import { useShortcut } from '@/composables/shortcut'
import { IResizeContext, useResizeable } from '@/composables/resizeable';
import WidgetDrawerInner from './WidgetDrawerInner.vue'

export interface IWidgetDrawerWidget {
  category: string,
  type: string,
  label: string,
  icon: string,
  description: string,
}

export interface IWidgetDrawerProps {
  widgets: IWidgetDrawerWidget[]
}

const store = useStore();
const shortcut = useShortcut();
shortcut.enable([{
  name: 'widget_drawer',
  description: 'Dock/Undock widget drawer',
  keys: ['alt', 'c'],
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
    directions: ['right'],
    onStartResize: ()  => {
      vMain = document.getElementById('app')?.querySelector('.v-main');
    },
    onResize: (props: IResizeContext) => {
      const width = (props.originalWidth.value || 0) + props.deltaX.value;
      element.style.width = width + 'px';
      if (vMain) {
        vMain.style.setProperty('--v-layout-left', width + 'px');
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
  widgets: IWidgetDrawerWidget[],
}>(), {
  widgets: () => ([]),
})
</script>

<template>
  <v-navigation-drawer
    v-model="store.opened"
    :width="store.width"
    id="widget-drawer"
    color="toolbar"
    permanent
    location="left"
    ref="drawer"
  >
    <WidgetDrawerInner
      :widgets="widgets"
    />
  </v-navigation-drawer>
</template>

<style lang="scss">
#widget-drawer * {
  user-select: none;
}
</style>
