<script setup lang="ts">
import { useContentOptionStore } from './store';

const contentOptionStore = useContentOptionStore();
const button = { tooltip: () => 'Select content', icon: 'mdi-cursor-default-outline', onClick: () => {
  contentOptionStore.$patch(state => state.mode = 'select');
}, active: () => contentOptionStore.mode === 'select' };

</script>

<template>
  <ActionButton :model-value="button" />
</template>
