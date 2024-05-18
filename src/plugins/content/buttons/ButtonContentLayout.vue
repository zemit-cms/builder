<script setup lang="ts">
import { useContentOptionStore } from '../store';

const contentOptionStore = useContentOptionStore();
</script>

<template>
  <ActionButton :model-value="{
    tooltip: () => 'Adjust layout',
    icon: 'mdi-format-paint',
    active: () => contentOptionStore.mode === 'layout',
    onClick: () => {
      contentOptionStore.$patch(state => state.mode = 'layout');
    }
  }" />
</template>
