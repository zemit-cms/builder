<script lang="ts" setup>
import { ICSSUnit, Mode } from '@/utils/interfaces';
import { computed, ref } from 'vue';
import { useZoom } from '@/composables/zoom';
import { IDataStore, IDataWidget, useContentDataStore, useContentOptionStore, useContentSessionStore } from './store';
import { useStore as useContentToolbarStore } from '../content-toolbar/store'
import { IDraggableOptions } from '@/composables/draggable';
import { useHistory } from '@/composables/history';
import { useContentShortcuts } from './shortcuts'
import Droppable from '@/components/Droppable.vue';
import Plugins from '@/components/Plugins.vue';
import Widget from '@/plugins/content/Widget.vue';

export interface IContentProps {
  modelValue: IDataStore
}

const model = defineModel<IDataStore>({
  required: true
});

const contentOptionStore = useContentOptionStore();
const contentDataStore = useContentDataStore();
const contentSessionStore = useContentSessionStore();
useHistory<IDataStore>('content', contentDataStore);
useContentShortcuts();

const mode = import.meta.env.MODE;
const contentToolbarStore = useContentToolbarStore();
const container = ref<HTMLDivElement>();
const {
  getContentWidth,
  getContentHeight,
  // getContentZoomStyle,
} = useZoom();

// const appStore = useAppStore();
const animated = ref<boolean>(false);
// const zoomStyle = computed((): IContentZoomStyle => getContentZoomStyle());
const width = computed((): ICSSUnit => getContentWidth(container));
const height = computed((): ICSSUnit => getContentHeight(container));
const contentWidth = computed((): string => width.value.value + width.value.format);
const contentHeight = computed((): string => height.value.value + height.value.format);
const canEdit = mode === Mode.Edit;
// const iframeUrl = import.meta.env.VITE_VIEW_URL;

setTimeout(() => animated.value = true);

function onEmptyClick() {
  contentOptionStore.$patch(state => {
    state.selectedWidgetIds = [];
  })
}

function onDrop(options: IDraggableOptions<IDataWidget>) {
  contentDataStore.$patch(state => {
    if (options.data) {
      const declaration = contentSessionStore.declarations.find(declaration => declaration.type === options.data?.type);
      if (declaration?.onDrop instanceof Function) {
        declaration.onDrop(options.data, state.root)
      }
      state.root.children.push(options.data);
      contentOptionStore.selectedWidgetIds = [options.data.id];
    }
  })
}
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
          'ma-auto grid-container d-flex flex-column', {
          grid: contentOptionStore.grid,
          animated,
        }]" :style="{
          minWidth: contentWidth,
          height: contentHeight,
        }">
          <template v-if="canEdit">
            <div style="flex: 0">
              <Widget
                v-for="widget in model.root.children"
                :model-value="widget"
                :key="widget.id"
              />
            </div>
            <Droppable
              class="h-100 w-100"
              style="flex: 1"
              @drop="onDrop"
              @click="onEmptyClick"
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
            v-for="widget in model.root.children"
            :model-value="widget"
            :key="widget.id"
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
.grid-container {
  outline: #E3E3E3 solid 2px;

  &.grid {
    background: repeat linear-gradient(90deg, #E3E3E3 1px, transparent 1px) -1px 0, white;
    background-size: 8.35% 5px;
  }
}
</style>
