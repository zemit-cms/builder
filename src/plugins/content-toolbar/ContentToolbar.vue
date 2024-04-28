<script lang="ts" setup>
import { ContentViewMode } from '@/stores/app'
import { useStore } from './store'
import { useZoom } from '@/composables/zoom'
import { useShortcut } from '@/composables/shortcut';
import { Component } from 'vue';
import { IButton } from '@/utils/interfaces';
import ButtonList from '@/components/ButtonList.vue';

export interface IContentToolbarProps {
  buttons: (IButton<any> | Component)[]
}

const store = useStore()
const {
  increaseZoomIndex,
  decreaseZoomIndex,
  setZoomValue,
  setChangeContentViewMode,
} = useZoom()

withDefaults(defineProps<{
  buttons: IButton<any>[],
}>(), {
  buttons: () => ([]),
})

const shortcut = useShortcut();
shortcut.enable([{
  name: 'content_view_mobile',
  description: 'Set content view in mobile mode',
  keys: ['alt', 'm'],
  callback: () => setChangeContentViewMode(ContentViewMode.Mobile),
}, {
  name: 'content_view_tablet',
  description: 'Set content view in tablet mode',
  keys: ['alt', 't'],
  callback: () => setChangeContentViewMode(ContentViewMode.Tablet),
}, {
  name: 'content_view_desktop',
  description: 'Set content view in desktop mode',
  keys: ['alt', 'd'],
  callback: () => setChangeContentViewMode(ContentViewMode.Desktop),
}, {
  name: 'content_view_fit',
  description: 'Set content view in fix viewport mode',
  keys: ['alt', 'f'],
  callback: () => setChangeContentViewMode(ContentViewMode.Fit),
}, {
  name: 'content_zoom_reset',
  description: 'Reset zoom to 100%',
  keys: ['ctrl', '0'],
  callback: (e) => {
    e.preventDefault();
    setZoomValue(100);
  },
}, {
  name: 'content_zoom_out',
  description: 'Zoom out by one factor',
  keys: ['ctrl', '-'],
  callback: (e) => {
    e.preventDefault();
    decreaseZoomIndex();
  },
}, {
  name: 'content_zoom_in',
  description: 'Zoom in by one factor',
  keys: ['ctrl', '='],
  callback: (e) => {
    e.preventDefault();
    increaseZoomIndex();
  },
}]);
</script>

<template>
  <div
    :style="[
      { height: store.opened ? 57 : 0 }
    ]"
    class="animated"
  >
    <v-divider />
    <v-toolbar color="surface" style="flex: 0" density="comfortable">
      <ButtonList :model-value="buttons" />
    </v-toolbar>
  </div>
</template>
