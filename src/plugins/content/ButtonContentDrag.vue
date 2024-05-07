<script setup lang="ts">
import { useContentOptionStore } from './store';

const contentOptionStore = useContentOptionStore();
const button = { tooltip: () => 'Adjust layout', icon: 'mdi-format-paint', onClick: () => {
  contentOptionStore.$patch(state => state.mode = 'layout');
}, active: () => contentOptionStore.mode === 'layout' };

</script>

<template>
  <ActionButton :model-value="button" />
</template>
