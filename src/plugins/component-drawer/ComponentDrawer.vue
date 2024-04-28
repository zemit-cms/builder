<template>
  <v-navigation-drawer
    v-model="store.opened"
    color="toolbar"
    permanent
    location="left"
  >
    <ComponentDrawerInner
      :widgets="widgets"
    />
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { Component } from 'vue'
import { useStore } from './store'
import { useShortcut } from '@/composables/shortcut'
import ComponentDrawerInner from './ComponentDrawerInner.vue'

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

withDefaults(defineProps<{
  widgets: IComponentDrawerWidget[],
}>(), {
  widgets: () => ([]),
})
</script>
