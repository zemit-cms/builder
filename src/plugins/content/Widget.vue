<script setup lang="ts">
import { IDataWidget, useContentOptionStore, useContentSessionStore } from '@/plugins/content/store';

const widget = defineModel<IDataWidget>({
  required: true,
});
withDefaults(defineProps<{
  readOnly?: boolean,
}>(), {
  readOnly: false,
});
const contentSessionStore = useContentSessionStore();
const contentOptionStore = useContentOptionStore();
const declaration = contentSessionStore.declarations.find(declaration => declaration.type === widget.value.type);
const selected = computed((): boolean => {
  return contentOptionStore.selectedWidgetIds.findIndex(id => id === widget.value.id) !== -1;
})
</script>

<template>
  <component
    v-once
    :model-value="widget"
    :is="{...declaration?.component}"
  >
    <div v-if="selected" class="overlay"></div>
    <slot name="default"></slot>
  </component>
</template>

<style lang="scss" scoped>
body.cmp-draggable-dragging {
  .widget {
    .overlay {
      opacity: 0;
    }
  }
}

.widget {
  position: relative;

  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(var(--v-theme-primary), 1);
    opacity: 0.2;
  }
}
</style>
