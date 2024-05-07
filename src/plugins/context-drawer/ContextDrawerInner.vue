<template>
  <v-alert
    v-if="activeTabs.length === 0"
    variant="text"
    prominent
    class="h-100 text-center"
  >
    <v-icon size="48">mdi-details</v-icon>
    <div class="font-weight-bold mt-1">Select an element first</div>
    <p>and its contextual options will appear here.</p>
  </v-alert>
  <template v-else>
    <v-tabs
      v-model="store.tab"
      :show-arrows="false"
      grow
    >
      <v-tab
        v-for="tab in activeTabs"
        :value="tab.value"
        :key="tab.value"
      >{{ tab.label }}</v-tab>
    </v-tabs>
    <v-window v-model="store.tab">
      <v-window-item
        v-for="tab in tabs"
        :value="tab.value"
        :key="tab.value"
        class="pa-4"
      >
        <component :is="tab.component"></component>
      </v-window-item>
    </v-window>
  </template>
</template>

<script lang="ts" setup>
import { ITab } from '@/utils/interfaces';
import { useStore } from '@/plugins/context-drawer/store';
import { getSelectedWidgetIds } from '@/plugins/content';

const store = useStore();
const props = withDefaults(defineProps<{
  tabs: ITab[],
}>(), {
  tabs: () => ([]),
})
const activeTabs = computed((): ITab[] => {
  return getSelectedWidgetIds().length > 0
    && props.tabs || [];
})
</script>
