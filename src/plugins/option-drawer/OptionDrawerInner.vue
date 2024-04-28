<template>
  <v-tabs
    v-model="tab"
    :show-arrows="false"
    grow
  >
    <v-tab
      v-for="tab in tabs"
      :value="tab.value"
      :key="tab.value"
    >{{ tab.label }}</v-tab>
  </v-tabs>
  <v-window v-model="tab">
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
import { ref } from 'vue';
import { ITab } from '@/utils/interfaces';

const tab = ref(0);

withDefaults(defineProps<{
  tabs: ITab[],
}>(), {
  tabs: () => ([]),
})
</script>
