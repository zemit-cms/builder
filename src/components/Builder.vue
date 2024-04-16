<template>
  <div ref="container" class="d-flex h-100 w-100 overflow-auto">
    <v-sheet theme="light" class="animated grid ma-auto" :style="{
      width: contentWidth,
      height: contentHeight,
    }">
      <template v-if="canEdit">
        <iframe :src="iframeUrl" class="animated border-0" :style="{
          ...zoomStyle,
          minWidth: contentWidth,
          width: contentWidth,
          minHeight: contentHeight,
          height: contentHeight,
          float: 'left',
        }" />
      </template>
      <div v-else>
        {{mode}}
      </div>
    </v-sheet>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, ref } from 'vue';
import { IContentZoomStyle, useZoom } from '../composables/zoom';
import { IBuilder, ICSSUnit, Mode } from '../interfaces';

const props = defineProps<{
  modelValue: IBuilder,
  mode: Mode,
}>()

const container = ref<HTMLDivElement>();
const {
  getContentWidth,
  getContentHeight,
  getContentZoomStyle,
} = useZoom();

const width = computed((): ICSSUnit => getContentWidth(container));
const height = computed((): ICSSUnit => getContentHeight(container));
const zoomStyle = computed((): IContentZoomStyle => getContentZoomStyle());
const contentWidth = computed((): string => width.value.value + width.value.format);
const contentHeight = computed((): string => height.value.value + height.value.format);
const canEdit = props.mode === Mode.Edit;
const iframeUrl = 'http://localhost:3001';//import.meta.env.VITE_VIEW_URL;
</script>

<style lang="scss" scoped>
.grid {
  outline: #E3E3E3 solid 2px;
  background: repeat linear-gradient(90deg, #E3E3E3 1px, transparent 1px) -1px 0, white;
  background-size: 8.35% 5px;
}
</style>
