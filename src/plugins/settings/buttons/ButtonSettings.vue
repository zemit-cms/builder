<script setup lang="ts">
import { useSettingsStore } from '@/plugins/settings/store';
import { IButton } from '@/utils/interfaces';

const settingsStore = useSettingsStore();
const button: IButton<any> = { tooltip: 'Settings', icon: 'mdi-cog', shortcut: 'alt+s', onClick: onSettingsClick };

function onSettingsClick() {
  settingsStore.$patch(state => {
    state.opened = !state.opened;
  })
}
</script>

<template>
  <ActionButton :model-value="button" />
</template>
