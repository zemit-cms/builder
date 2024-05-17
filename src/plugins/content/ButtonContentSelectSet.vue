<script setup lang="ts">
import ActionButton from '@/components/ActionButton.vue'
import { useContentDataStore, useContentOptionStore } from '@/plugins/content/store';
import WidgetModel from '@/plugins/content/index';

const contentOptionStore = useContentOptionStore();
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
        disabled: contentOptionStore.selectedWidgetIds.length === 0,
        onClick(props) {
          const contentDataStore = useContentDataStore();
          contentDataStore.forEachSelected(widget => {
            const model = new WidgetModel(widget);
            model.duplicate();
          })
        },
      }" />
      <ActionButton :model-value="{
        icon: 'mdi-delete-outline',
        tooltip: 'Delete',
        disabled: contentOptionStore.selectedWidgetIds.length === 0,
        onClick(props) {
          const contentDataStore = useContentDataStore();
          contentDataStore.forEachSelected(widget => {
            const model = new WidgetModel(widget);
            model.remove(contentOptionStore.selectedWidgetIds.length === 1);
          })
        },
      }" />
    </div>
  </v-expand-x-transition>
</template>
