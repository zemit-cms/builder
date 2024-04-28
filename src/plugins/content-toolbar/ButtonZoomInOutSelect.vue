<script setup lang="ts">
import { zoomList } from '@/utils/global'
import { useAppStore } from '@/stores/app'
import { useZoom } from '@/composables/zoom'

const appStore = useAppStore()
const {
  canZoomOut,
  canZoomIn,
  canZoom,
  minZoom,
  maxZoom,
  increaseZoom,
  onZoomPlusClick,
  decreaseZoom,
  onZoomMinusClick,
  adjustZoomValue,
} = useZoom()
</script>

<template>
  <v-tooltip
    :open-delay="500"
    text="Zoom Out"
    location="top"
  >
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        :disabled="!canZoomOut || !canZoom"
        icon
        @click="onZoomMinusClick"
      >
        <v-icon>mdi-magnify-minus-outline</v-icon>
      </v-btn>
    </template>
  </v-tooltip>

  <div class="mx-2 d-flex align-center flex-nowrap">
    <v-text-field
      v-model.number="appStore.zoomSelection"
      :items="zoomList"
      :min="minZoom"
      :max="maxZoom"
      :disabled="!canZoom"
      density="compact"
      hide-details
      single-line
      variant="outlined"
      style="width: 5rem"
      @keydown.up="() => increaseZoom(1)"
      @keydown.down="() => decreaseZoom(1)"
      @blur="adjustZoomValue"
    >
      <template #append-inner>%</template>
    </v-text-field>
  </div>

  <v-tooltip
    :open-delay="500"
    text="Zoom In"
    location="top"
  >
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        :disabled="!canZoomIn || !canZoom"
        icon
        @click="onZoomPlusClick"
      >
        <v-icon>mdi-magnify-plus-outline</v-icon>
      </v-btn>
    </template>
  </v-tooltip>
</template>
