<template>
  <template v-for="(button, buttonIdx) in modelValue" :key="buttonIdx">
    <v-divider v-if="button.divider" class="mx-2" vertical inset />
    <v-spacer v-else-if="button.spacer" />
    <v-tooltip
      v-else
      :text="getValue(button.tooltip)"
      :open-delay="500"
      location="bottom"
    >
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          :disabled="getValue(button.disabled)"
          :active="getValue(button.active)"
          size="small"
          @click="button.onClick"
        >
          <v-icon
            v-if="button.icon"
          >
            {{ getValue(button.icon) }}
          </v-icon>
        </v-btn>
      </template>
    </v-tooltip>
  </template>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { IButton } from '../interfaces';

defineProps<{
  modelValue: IButton<any>[]
}>()

function getValue(value: any) {
  return typeof value === 'function' ? value() : value;
}
</script>
