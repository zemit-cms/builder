<script setup lang="ts">
import { useStore } from './store';

const store = useStore();
const button = { tooltip: () => store.opened ? 'Undock content drawer' : 'Dock content drawer', icon: 'mdi-dock-bottom', onClick: onDockBottomClick, active: () => store.opened };

function onDockBottomClick() {
  store.$patch(state => {
    state.opened = !state.opened;
  })
}
</script>

<template>
  <ActionButton :model-value="button" />
</template>
