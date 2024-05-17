<script setup lang="ts">
import { IDraggable, useDraggable } from '@/composables/draggable'
import { IDataWidget } from '@/plugins/content/store';

export interface IDraggableProps {
  title?: string | null
  tooltip?: string | null
}

const emit = defineEmits(['onDragStart', 'onDragEnd', 'onDrop'])

withDefaults(defineProps<IDraggableProps>(), {
  title: null,
  tooltip: null,
})

const model = defineModel<any>({
  required: true,
})

let draggable: IDraggable;
const container = ref<HTMLDivElement>();
onMounted(() => {
  if (container.value) {
    draggable = useDraggable<IDataWidget>(container.value, {
      data: model.value,
      onDragStart: (data) => emit('onDragStart', data),
      onDragEnd: (data) => emit('onDragEnd', data),
      onDrop: (data) => emit('onDrop', data),
    })
    onUnmounted(() => {
      draggable.destroy();
    })
  }
});
</script>

<template>
  <v-tooltip
    :disabled="!tooltip || draggable?.context.dragging.value"
    :open-delay="1000"
    max-width="200"
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
      <div v-bind="props" ref="container" draggable="true">
        <slot name="default"></slot>
      </div>
    </template>
  </v-tooltip>
</template>
