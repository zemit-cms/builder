<script setup lang="ts">
import ActionButton from '@/components/ActionButton.vue'
import { useHistory } from '@/composables/history';

const { undo, canUndo } = useHistory('content');
</script>

<template>
  <ActionButton :model-value="{
    icon: 'mdi-undo-variant',
    tooltip: 'Undo',
    onClick: undo,
    disabled: !canUndo,
  }" />
</template>
