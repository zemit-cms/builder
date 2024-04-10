<template>
  <template v-for="(button, buttonIdx) in modelValue" :key="buttonIdx">
    <v-divider v-if="button.divider" class="mx-2" vertical inset />
    <v-spacer v-else-if="button.spacer" />
    <v-tooltip
      v-else
      :text="button.tooltip"
      location="bottom"
      open-delay="500"
    >
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          :disabled="button.disabled && button.disabled()"
          size="small"
          @click="button.onClick"
        >
          <v-icon
            v-if="button.icon"
            :color="button.active && button.active() ? 'primary' : null"
          >
            {{ button.icon }}
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
</script>
