<script setup lang="ts">
import ActionButton from '@/components/ActionButton.vue'
import { useContentOptionStore } from '@/plugins/content/store';

const contentOptionStore = useContentOptionStore();
</script>

<template>
  <v-expand-x-transition>
    <div
      v-if="contentOptionStore.mode === 'layout'"
      class="d-flex align-center flex-nowrap"
    >
      <ActionButton :model-value="{
        label: 'Padding',
        tooltip: 'Adjust inner spacing'
      }" />
      <ActionButton :model-value="{
        label: 'Margin',
        tooltip: 'Adjust outer spacing'
      }" />
      <ActionButton :model-value="{
        label: 'Border',
        tooltip: 'Adjust border spacing'
      }" />
      <ActionButton :model-value="{
        label: 'Background',
        tooltip: 'Adjust background positioning'
      }" />
    </div>
  </v-expand-x-transition>
</template>
