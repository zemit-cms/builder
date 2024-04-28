<script lang="ts" setup>
import { IButton } from '@/utils/interfaces';
import ActionButton from '@/components/ActionButton.vue';
import { defineModel } from 'vue';

const buttons = defineModel<IButton<any>[]>();
</script>

<template>
  <template v-for="(button, buttonIdx) in buttons" :key="buttonIdx">
    <component v-if="button.setup" :is="button" />
    <v-divider v-else-if="button.divider" class="mx-2" vertical inset />
    <v-spacer v-else-if="button.spacer" />
    <ActionButton v-else :model-value="button" />
  </template>
</template>
