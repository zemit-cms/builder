<template>
  <v-tabs
    v-model="store.tab"
    :show-arrows="false"
    grow
  >
    <v-tab
      v-for="tab in tabs"
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

<script lang="ts" setup>
import { ITab } from '@/utils/interfaces';
import { useStore } from '@/plugins/option-drawer/store';

const store = useStore();
withDefaults(defineProps<{
  tabs: ITab[],
}>(), {
  tabs: () => ([]),
})
</script>
