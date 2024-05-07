<script setup lang="ts">
import { useDrag } from '@/composables/drag'

export interface IDraggableProps {
  title?: string | null
  tooltip?: string | null
}

withDefaults(defineProps<IDraggableProps>(), {
  title: null,
  tooltip: null,
})
const model = defineModel<any>({
  required: true,
})

const draggable = ref<HTMLDivElement>();
const ghost = ref<HTMLDivElement>();
onMounted(() => {
  if (draggable.value && ghost.value) {
    useDrag(draggable.value, {
      minX: 0,
      maxX: window.innerWidth,
      ghost: ghost.value,
    })
  }
});
</script>

<template>
  <v-tooltip
    :disabled="!tooltip"
    :open-delay="1000"
    max-width="200"
    style="position: relative"
  >
    <template #default>
      <div class="my-1">
        <v-icon size="24" start>mdi-help-circle-outline</v-icon>
        <strong v-if="title">{{ title }}</strong>
      </div>
      <v-divider class="my-3" />
      <div>{{ tooltip }}</div>
    </template>
    <template #activator="{ props }">
      <div v-bind="props" ref="draggable">
        <slot name="default"></slot>
      </div>
    </template>
  </v-tooltip>
  <div ref="ghost">
    <slot name="ghost">
      GHOST
    </slot>
  </div>
</template>
