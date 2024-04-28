<script setup lang="ts">
import { useStore } from '@/plugins/settings/store';
import { IButton } from '@/utils/interfaces';

const store = useStore();
const button: IButton<any> = { tooltip: 'Settings', icon: 'mdi-cog', shortcut: 'alt+s', onClick: onSettingsClick };

function onSettingsClick() {
  store.$patch(state => {
    state.opened = !state.opened;
  })
}
</script>

<template>
  <ActionButton :model-value="button" />
</template>
