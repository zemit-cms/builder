<script setup lang="ts">
import ActionButton from '@/components/ActionButton.vue'
import { useHistory } from '@/composables/history'

const { redo, canRedo } = useHistory('content');
</script>

<template>
  <ActionButton :model-value="{
    icon: 'mdi-redo-variant',
    tooltip: 'Redo',
    onClick: redo,
    disabled: !canRedo,
  }" />
</template>
