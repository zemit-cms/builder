<template>
  <v-app-bar flat density="compact" location="top" style="border-bottom: rgba(var(--v-border-color), var(--v-border-opacity)) solid 1px">
    <ButtonList v-model="buttons" />
  </v-app-bar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ButtonList from '@/components/ButtonList';
import { IAppState, useAppStore } from '@/stores/app';
import { IButton } from '@/interfaces'
import { useFullscreen } from '@vueuse/core'
import { useSessionStore } from '@/stores/session';

const appStore = useAppStore();
const sessionStorage = useSessionStore();
const { toggle } = useFullscreen();

const isFullscreen = ref<boolean>();

const buttons: IButton<any>[] = [
  { tooltip: () => appStore.componentDrawer.opened ? 'Undock component drawer' : 'Dock component drawer', icon: 'mdi-dock-left', onClick: onDockLeftClick, active: () => appStore.componentDrawer.opened },
  { divider: true },
  { tooltip: 'Undo', icon: 'mdi-undo', disabled: true, shortcut: 'ctrl+z' },
  { tooltip: 'Redo', icon: 'mdi-redo', disabled: true, shortcut: 'ctrl+shift+z' },
  { spacer: true },
  { tooltip: () => isFullscreen.value ? 'Exit fullscreen' : 'Enter fullscreen', icon: () => isFullscreen.value ? 'mdi-fullscreen-exit' : 'mdi-fullscreen', onClick: onFullscreenToggleClick },
  { divider: true },
  { tooltip: () => appStore.contentToolbar.opened ? 'Undock content drawer' : 'Dock content drawer', icon: 'mdi-dock-bottom', onClick: onDockBottomClick, active: () => appStore.contentToolbar.opened },
  { tooltip: () => appStore.optionDrawer.opened ? 'Undock option drawer' : 'Dock option drawer', icon: 'mdi-dock-right', onClick: onDockRightClick, active: () => appStore.optionDrawer.opened },
  { divider: true },
  { tooltip: 'Settings', icon: 'mdi-dots-vertical', shortcut: 'alt+s', onClick: onSettingsClick },
]

function onDockLeftClick() {
  appStore.$patch((state: IAppState) => {
    state.componentDrawer.opened = !state.componentDrawer.opened;
  })
}

function onDockBottomClick() {
  appStore.$patch((state: IAppState) => {
    state.contentToolbar.opened = !state.contentToolbar.opened;
  })
}

function onFullscreenToggleClick() {
  toggle();
  isFullscreen.value = document.fullscreen === false || document.webkitIsFullScreen === false;
}

function onDockRightClick() {
  appStore.$patch((state: IAppState) => {
    state.optionDrawer.opened = !state.optionDrawer.opened;
  })
}

function onSettingsClick() {
  sessionStorage.$patch((state: IAppState) => {
    state.settings.opened = !state.settings.opened;
  })
}

</script>
