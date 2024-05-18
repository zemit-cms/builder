<script setup lang="ts">
import { useContentToolbarStore } from '../store';

const contentToolbarStore = useContentToolbarStore();
const button = { tooltip: () => contentToolbarStore.opened ? 'Undock content drawer' : 'Dock content drawer', icon: 'mdi-dock-bottom', onClick: onDockBottomClick, active: () => contentToolbarStore.opened };

function onDockBottomClick() {
  contentToolbarStore.$patch(state => {
    state.opened = !state.opened;
  })
}
</script>

<template>
  <ActionButton :model-value="button" />
</template>
