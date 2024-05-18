<script lang="ts" setup>
import { ICSSUnit, Mode } from '@/utils/interfaces';
import { computed, ref } from 'vue';
import { useZoom } from '@/composables/zoom';
import { useContentToolbarStore } from '../content-toolbar/store'
import { onDropWidget, useContentShortcuts, useRootModel } from './composables'
import { useHistory } from '@/composables/history';
import Droppable from '@/components/Droppable.vue';
import Plugins from '@/components/Plugins.vue';
import Widget from '@/plugins/content/components/Widget.vue'
import { IDataWidget } from '@/plugins/content/store';

export interface IContentProps {}

const widget = useRootModel();
const mode = import.meta.env.MODE;
const contentToolbarStore = useContentToolbarStore();
const container = ref<HTMLDivElement>();
const animated = ref<boolean>(false);
const contentWidth = computed((): string => width.value.value + width.value.format);
const contentHeight = computed((): string => height.value.value + height.value.format);
const canEdit = mode === Mode.Edit;
// const zoomStyle = computed((): IContentZoomStyle => getContentZoomStyle());
// const iframeUrl = import.meta.env.VITE_VIEW_URL;
useHistory<IDataWidget>('content', widget);
useContentShortcuts();

const {
  getContentWidth,
  getContentHeight,
  // getContentZoomStyle,
} = useZoom();
const width = computed((): ICSSUnit => getContentWidth(container));
const height = computed((): ICSSUnit => getContentHeight(container));

setTimeout(() => animated.value = true);
</script>

<template>
  <div id="content" class="d-flex flex-column h-100">
    <Plugins category="content.prepend" />
    <v-sheet :class="{ animated }" color="background" :style="[
      'flex: 1',
      { maxHeight: canEdit ? contentToolbarStore.opened ? 'calc(100vh - 105px)' : 'calc(100vh - 50px)' : undefined }
    ]">
      <div ref="container" :class="[
        'd-flex animated h-100 w-100 overflow-auto', {
      }]">
        <v-sheet theme="light" :class="[
          'ma-auto content-container d-flex flex-column grid', {
          animated,
        }]" :style="{
          minWidth: contentWidth,
          height: contentHeight,
        }">
          <template v-if="canEdit">
            <div style="flex: 0">
              <Widget v-model="widget" />
            </div>
            <Droppable
              style="flex: 1"
              @drop="options => onDropWidget(options, widget)"
              @click="() => widget.forEach(widget => widget.unselect())"
            />
            <!--            <iframe :src="iframeUrl" class="animated border-0" :style="{-->
            <!--              ...zoomStyle,-->
            <!--              minWidth: contentWidth,-->
            <!--              width: contentWidth,-->
            <!--              minHeight: contentHeight,-->
            <!--              height: contentHeight,-->
            <!--              float: 'left',-->
            <!--            }" />-->
          </template>
          <Widget
            v-else
            v-once
            v-model="widget"
            read-only
          />
        </v-sheet>
      </div>
    </v-sheet>
    <Plugins category="content.append" />
  </div>
</template>

<style lang="scss">
#content * {
  user-select: none;
}
</style>

<style lang="scss" scoped>
.content-container {
  outline: #E3E3E3 solid 2px;

  &.grid {
    background: repeat linear-gradient(90deg, #E3E3E3 1px, transparent 1px) -1px 0, white;
    background-size: 8.35% 5px;
  }
}
</style>
