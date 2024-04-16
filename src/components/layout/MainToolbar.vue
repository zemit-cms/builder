<template>
  <v-app-bar flat density="compact" location="top" style="border-bottom: rgba(var(--v-border-color), var(--v-border-opacity)) solid 1px">
    <ButtonList v-model="buttons" />
  </v-app-bar>
</template>

<script lang="ts" setup>
import ButtonList from '@/components/ButtonList';
import { IAppState, useStore } from '@/stores/app';
import { IButton } from '@/interfaces'
import { useFullscreen } from '@vueuse/core'

const store = useStore();
const builderRef = document.getElementById('builder');
const { isFullscreen, toggle } = useFullscreen(builderRef);

const buttons: IButton<any>[] = [
  { tooltip: 'Dock component drawer', icon: 'mdi-dock-left', onClick: onDockLeftClick, active: () => store.componentDrawer.opened },
  { divider: true },
  { tooltip: 'Undo', icon: 'mdi-undo' },
  { tooltip: 'Redo', icon: 'mdi-redo' },
  { spacer: true },
  { tooltip: () => isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen', icon: () => isFullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen', onClick: toggle },
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
