<script lang="ts" setup>
import { Component } from 'vue'
import { useStore } from './store'
import { useShortcut } from '@/composables/shortcut'
import ComponentDrawerInner from './ComponentDrawerInner.vue'
import { IResizeContext, IResizeResult, useResize } from '@/composables/resize';

export interface IComponentDrawerWidget {
  category: string,
  name: string,
  component: Component,
}

export interface IComponentDrawerProps {
  widgets: IComponentDrawerWidget[]
}

const store = useStore();
const shortcut = useShortcut();
shortcut.enable([{
  name: 'component_drawer',
  description: 'Dock/Undock component drawer',
  keys: ['alt', 'c'],
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
})
onUnmounted(() => {
  resize.destroy();
})

withDefaults(defineProps<{
  widgets: IComponentDrawerWidget[],
}>(), {
  widgets: () => ([]),
})
</script>

<template>
  <v-navigation-drawer
    v-model="store.opened"
    :width="store.width"
    color="toolbar"
    permanent
    location="left"
    ref="drawer"
  >
    <ComponentDrawerInner
      :widgets="widgets"
    />
  </v-navigation-drawer>
</template>
