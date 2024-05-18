<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { viewModeList } from '@/utils/global'
import { useZoom } from '@/composables/zoom';

const appStore = useAppStore();
const {
  setChangeContentViewMode,
} = useZoom()
</script>

<template>
  <v-btn-toggle
    v-model="appStore.contentViewMode"
    density="compact"
    group
    border
    mandatory
    @change="setChangeContentViewMode"
  >
    <ButtonList
      v-model="viewModeList"
    />
  </v-btn-toggle>
</template>
