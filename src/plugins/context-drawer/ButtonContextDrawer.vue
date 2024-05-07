<script setup lang="ts">
import { useStore } from '@/plugins/context-drawer/store';
import { IButton } from '@/utils/interfaces';

const store = useStore();

const button: IButton<any> = { tooltip: () => store.opened ? 'Undock context drawer' : 'Dock context drawer', icon: 'mdi-dock-right', onClick: onDockRightClick, active: () => store.opened };

function onDockRightClick() {
  store.$patch(state => {
    state.opened = !state.opened;
  })
}
</script>

<template>
  <ActionButton :model-value="button" />
</template>
