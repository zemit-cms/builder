<template>
  <v-toolbar color="surface" style="flex: 0" density="comfortable">
    <div class="pa-4">
      <v-btn-toggle
        v-model="store.contentViewMode"
        density="compact"
        group
        border
        mandatory
        @change="onChangeContentViewMode"
      >
        <ButtonList
          v-model="viewModeList"
        />
      </v-btn-toggle>
    </div>
    <v-spacer />
    <v-btn
      :disabled="!canZoomOut || !canZoom"
      icon
      @click="onZoomMinusClick"
    >
      <v-icon>mdi-magnify-minus-outline</v-icon>
    </v-btn>
    <div class="mx-2 d-flex align-center flex-nowrap">
      <v-text-field
        v-model="store.zoomSelection"
        :items="zoomList"
        :min="minZoom"
        :max="maxZoom"
        :disabled="!canZoom"
        density="compact"
        hide-details
        single-line
        type="number"
        variant="outlined"
        style="width: 5rem"
        @blur="adjustZoomValue"
      />
    </div>
    <v-btn
      :disabled="!canZoomIn || !canZoom"
      icon
      @click="onZoomPlusClick"
    >
      <v-icon>mdi-magnify-plus-outline</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script lang="ts" setup>
import ButtonList from '@/components/ButtonList'
import { zoomList, viewModeList } from '@/global'
import { useStore } from '@/stores/app'
import { useZoom } from '@/composables/zoom'

const store = useStore()
const {
  canZoomOut,
  canZoomIn,
  canZoom,
  minZoom,
  maxZoom,
  onZoomMinusClick,
  onZoomPlusClick,
  onChangeContentViewMode,
  adjustZoomValue,
} = useZoom()

</script>
