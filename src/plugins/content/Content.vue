<template>
  <div class="d-flex flex-column h-100">
    <Plugins category="content.prepend" />
    <v-sheet class="animated" color="background" :style="[
      'flex: 1',
      { maxHeight: canEdit ? contentToolbarStore.opened ? 'calc(100vh - 104px)' : 'calc(100vh - 50px)' : undefined }
    ]">
      <div ref="container" class="d-flex h-100 w-100 overflow-auto">
        <v-sheet theme="light" class="animated grid ma-auto" :style="{
          width: contentWidth,
          height: contentHeight,
        }">
          <template v-if="canEdit">
<!--            <iframe :src="iframeUrl" class="animated border-0" :style="{-->
<!--              ...zoomStyle,-->
<!--              minWidth: contentWidth,-->
<!--              width: contentWidth,-->
<!--              minHeight: contentHeight,-->
<!--              height: contentHeight,-->
<!--              float: 'left',-->
<!--            }" />-->
          </template>
          <div v-else>
            {{ mode }}
          </div>

          {{model}}
        </v-sheet>
      </div>
    </v-sheet>
    <Plugins category="content.append" />
  </div>
</template>

<script lang="ts" setup>
import { ICSSUnit, Mode } from '@/utils/interfaces';
import { computed, ref } from 'vue';
import { IContentZoomStyle, useZoom } from '@/composables/zoom';
import { IContentStore } from './store';
import { useStore as useContentToolbarStore } from '../content-toolbar/store'
import Plugins from '@/components/Plugins.vue';

const mode = import.meta.env.MODE;
const contentToolbarStore = useContentToolbarStore();
const container = ref<HTMLDivElement>();
const {
  getContentWidth,
  getContentHeight,
  getContentZoomStyle,
} = useZoom();

const model = defineModel<IContentStore>();
const zoomStyle = computed((): IContentZoomStyle => getContentZoomStyle());
const width = computed((): ICSSUnit => getContentWidth(container));
const height = computed((): ICSSUnit => getContentHeight(container));
const contentWidth = computed((): string => width.value.value + width.value.format);
const contentHeight = computed((): string => height.value.value + height.value.format);
const canEdit = mode === Mode.Edit;
const iframeUrl = import.meta.env.VITE_VIEW_URL;
</script>

<style lang="scss" scoped>
.grid {
  outline: #E3E3E3 solid 2px;
  background: repeat linear-gradient(90deg, #E3E3E3 1px, transparent 1px) -1px 0, white;
  background-size: 8.35% 5px;
}
</style>
