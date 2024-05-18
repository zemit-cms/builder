<script setup lang="ts">
import ActionButton from '@/components/ActionButton.vue'
import { useContentOptionStore } from '@/plugins/content/store';
import { useRootModel } from '@/plugins/content/composables';

const contentOptionStore = useContentOptionStore();
const rootModel = useRootModel();
</script>

<template>
  <v-expand-x-transition>
    <div
      v-if="contentOptionStore.mode === 'select'"
      class="d-flex align-center flex-nowrap"
    >
      <ActionButton :model-value="{
        icon: 'mdi-content-duplicate',
        tooltip: 'Duplicate',
        disabled: rootModel.filter(widget => widget.isSelected()).length === 0,
        onClick: () => {
          rootModel.forEach(widget => widget.isSelected() && widget.duplicate());
        },
      }" />
      <ActionButton :model-value="{
        icon: 'mdi-delete-outline',
        tooltip: 'Delete',
        disabled: rootModel.filter(widget => widget.isSelected()).length === 0,
        onClick: () => {
          rootModel.filter(widget => widget.isSelected()).forEach(widget => widget.remove(true));
        },
      }" />
    </div>
  </v-expand-x-transition>
</template>
