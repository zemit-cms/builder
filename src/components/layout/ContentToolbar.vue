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
        <v-btn :value="ContentViewMode.Mobile">
          <v-icon>mdi-cellphone</v-icon>
        </v-btn>
        <v-btn :value="ContentViewMode.Tablet">
          <v-icon>mdi-tablet</v-icon>
        </v-btn>
        <v-btn :value="ContentViewMode.Desktop">
          <v-icon>mdi-desktop-mac</v-icon>
        </v-btn>
        <v-btn :value="ContentViewMode.Fit">
          <v-icon>mdi-fit-to-page-outline</v-icon>
        </v-btn>
      </v-btn-toggle>
    </div>
    <v-spacer />
    <v-btn
      :disabled="!canZoomOut"
      icon
      @click="onZoomMinusClick"
    >
      <v-icon>mdi-magnify-minus-outline</v-icon>
    </v-btn>
    <div class="mx-2 d-flex align-center flex-nowrap">
      <v-combobox
        v-model="store.zoomSelection"
        :items="zoomList"
        density="compact"
        hide-details
        variant="outlined"
        style="width: 7rem"
      >
        <template #selection="{ item }">{{ item.title }}%</template>
      </v-combobox>
    </div>
    <v-btn
      :disabled="!canZoomIn"
      icon
      @click="onZoomPlusClick"
    >
      <v-icon>mdi-magnify-plus-outline</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { IList } from '@/interfaces'
import { useStore, ContentViewMode } from '@/stores/app'
const store = useStore()

const zoomList: IList<number>[] = [
  { title: '25', value: 25, },
  { title: '50', value: 50, },
  { title: '75', value: 75, },
  { title: '100', value: 100, },
  { title: '125', value: 125, },
  { title: '150', value: 150, },
  { title: '200', value: 200, },
  { title: '400', value: 400, },
  { title: '800', value: 800, },
];

const zoomIndex = computed((): number => {
  return zoomList.findIndex(item => item.value === store.zoomSelection);
})

const canZoomOut = computed((): boolean => {
  return zoomIndex.value > 0;
})

const canZoomIn = computed((): boolean => {
  return zoomIndex.value < zoomList.length - 1;
})

function onChangeContentViewMode(contentViewMode: ContentViewMode) {
  store.$patch({
    contentViewMode,
  })
}

function onZoomMinusClick() {
  if (canZoomOut.value) {
    store.$patch({
      zoomSelection: zoomList[zoomIndex.value - 1].value,
    })
  }
}

function onZoomPlusClick() {
  if (canZoomIn.value) {
    store.$patch({
      zoomSelection: zoomList[zoomIndex.value + 1].value,
    })
  }
}
</script>
