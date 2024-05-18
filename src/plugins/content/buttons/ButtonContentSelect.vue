<script setup lang="ts">
import { useContentOptionStore } from '../store';

const contentOptionStore = useContentOptionStore();
</script>

<template>
  <ActionButton :model-value="{
    tooltip: () => 'Select content',
    icon: 'mdi-cursor-default-outline',
    active: () => contentOptionStore.mode === 'select',
    onClick: () => {
      contentOptionStore.$patch(state => state.mode = 'select');
    }
  }" />
</template>
