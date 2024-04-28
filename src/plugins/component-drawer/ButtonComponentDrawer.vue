<script setup lang="ts">
import { useStore } from './store';

const store = useStore();

function onButtonClick() {
  store.$patch(state => {
    state.opened = !state.opened;
  })
}
</script>

<template>
  <ActionButton :model-value="{
    tooltip: () => store.opened ? 'Undock component drawer' : 'Dock component drawer',
    icon: 'mdi-dock-left',
    onClick: onButtonClick,
    active: () => store.opened,
  }"
    :tooltip="store.opened ? 'Undock component drawer' : 'Dock component drawer'"
    :active="store.opened"
    icon="mdi-dock-left"
    @click="onButtonClick"
  />
</template>
