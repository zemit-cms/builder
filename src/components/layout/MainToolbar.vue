<template>
  <v-app-bar flat density="compact" location="top" style="border-bottom: rgba(var(--v-border-color), var(--v-border-opacity)) solid 1px">
    <ButtonList v-model="buttons" />
  </v-app-bar>
</template>

<script lang="ts" setup>
import ButtonList from '@/components/ButtonList';
import { IAppState, useStore } from '@/stores/app';
import { IButton } from '@/interfaces'

const store = useStore();

const buttons: IButton<any>[] = [
  { tooltip: 'Dock component drawer', icon: 'mdi-dock-left', onClick: onDockLeftClick, active: () => store.componentDrawer.opened },
  { divider: true },
  { tooltip: 'Undo', icon: 'mdi-undo' },
  { tooltip: 'Redo', icon: 'mdi-redo' },
  { spacer: true },
  { tooltip: 'Fullscreen', icon: 'mdi-fullscreen' },
  { divider: true },
  { tooltip: 'Undo', icon: 'mdi-dock-bottom', onClick: onDockBottomClick, active: () => store.contentToolbar.opened },
  { tooltip: 'Redo', icon: 'mdi-dock-right', onClick: onDockRightClick, active: () => store.optionDrawer.opened },
]

function onDockLeftClick() {
  store.$patch((state: IAppState) => {
    state.componentDrawer.opened = !state.componentDrawer.opened;
  })
}

function onDockBottomClick() {
  store.$patch((state: IAppState) => {
    state.contentToolbar.opened = !state.contentToolbar.opened;
  })
}

function onDockRightClick() {
  store.$patch((state: IAppState) => {
    state.optionDrawer.opened = !state.optionDrawer.opened;
  })
}

</script>
