<script setup lang="ts">
import { IDroppable, useDroppable } from '@/composables/droppable';
import { IDraggableOptions } from '@/composables/draggable';

export interface IDroppableProps {
  category?: string | null,
}

const props = withDefaults(defineProps<IDroppableProps>(), {
  category: 'any',
})

const emit = defineEmits(['drop'])
const droppable = ref<IDroppable>();
const container = ref<HTMLDivElement>();
onMounted(() => {
  if (container.value) {
    droppable.value = useDroppable(container.value, {
      category: props.category,
      onDrop: (options: IDraggableOptions) => {
        emit('drop', options);
      }
    })
    onUnmounted(() => {
      droppable.value?.destroy();
    })
  }
});

</script>

<template>
  <div ref="container">
    <div
      v-if="droppable?.context.canDrop"
      class="cmp-droppable-overlay d-flex align-center justify-center active"
    >
      <div class="dashed"></div>
    </div>
    <slot name="default"></slot>
  </div>
</template>
