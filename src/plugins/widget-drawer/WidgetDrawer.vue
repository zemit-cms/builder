<script lang="ts" setup>
import { useStore } from './store'
import { useShortcut } from '@/composables/shortcut'
import { IResizeContext, useResizeable } from '@/composables/resizeable';
import { IDataWidget } from '@/plugins/content/store';
import Hash from '@/utils/hash'
import vAdvancedCol from '@/directives/advanced-col';
import CategorizedAccordion, { ICategorizedAccordionItem } from '@/components/CategorizedAccordion.vue';

export interface IWidgetDrawerWidget {
  category: string,
  type: string,
  label: string,
  icon: string,
  description: string,
}

export interface IWidgetDrawerProps {
  widgets: IWidgetDrawerWidget[]
}

const store = useStore();
const shortcut = useShortcut();
shortcut.enable([{
  name: 'widget_drawer',
  description: 'Dock/Undock widget drawer',
  keys: ['alt', 'c'],
  callback: () => {
    store.$patch(state => {
      state.opened = !state.opened;
    })
  },
}]);

let vMain: HTMLElement | null | undefined;
const drawer = ref<HTMLElement | null>(null);
onMounted(() => {
  const element = drawer.value?.$el.nextElementSibling;
  const context = useResizeable(element, {
    minWidth: 256,
    maxWidth: 600,
    directions: ['right'],
    onStartResize: ()  => {
      vMain = document.getElementById('app')?.querySelector('.v-main');
    },
    onResize: (props: IResizeContext) => {
      const width = (props.originalWidth.value || 0) + props.deltaX.value;
      element.style.width = width + 'px';
      if (vMain) {
        vMain.style.setProperty('--v-layout-left', width + 'px');
      }
    },
    onStopResize(props: IResizeContext) {
      store.width = (props.originalWidth.value || 0) + props.deltaX.value;
    },
  })
  onUnmounted(() => {
    context.destroy();
  })
})

const props = withDefaults(defineProps<{
  widgets: IWidgetDrawerWidget[],
}>(), {
  widgets: () => ([]),
})

const sections = computed((): ICategorizedAccordionItem[] => {
  // @ts-ignore
  return [...props.widgets];
})

function getWidget(field: any): IDataWidget {
  return {
    id: 'new',
    type: field.type,
    children: [],
    props: {},
  }
}
</script>

<template>
  <v-navigation-drawer
    v-model="store.opened"
    :width="store.width"
    id="widget-drawer"
    color="toolbar"
    permanent
    location="left"
    ref="drawer"
  >
    <CategorizedAccordion
      v-model:panels="store.panels"
      :model-value="sections"
      :filter-props="{
      class: 'pa-4'
    }"
      filter-text="Filter widgets..."
      no-item-text="No widgets found"
    >
      <template #default="{ fields }">
        <v-row ref="row" dense>
          <v-col
            v-for="field in fields"
            v-advanced-col="{
            250: 6,
            360: 4,
            500: 3,
            1e10: 3,
          }"
            :key="field.label"
          >
            <Draggable
              :model-value="getWidget(field)"
              :title="field.label"
              :tooltip="field.description"
              @onDragStart="data => {
                if (data) {
                  data.id = Hash.guid();
                }
              }"
              @onDrop="data => {
                console.log(data);
              }"
            >
              <template #default>
                <v-card
                  variant="outlined"
                  height="5rem"
                  class="d-flex align-center text-center justify-center draggable-card"
                >
                  <div>
                    <v-icon size="48">{{ field.icon }}</v-icon>
                    <div class="text-caption text-disabled mt-n1">{{ field.label }}</div>
                  </div>
                </v-card>
              </template>
            </Draggable>
          </v-col>
        </v-row>
      </template>
    </CategorizedAccordion>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>
#widget-drawer * {
  user-select: none;
}

.draggable-card {
  transition: all 150ms ease-in-out;
  border-color: rgba(0, 0, 0, 0.5);
  border-style: dashed;
  background-color: #F9F9F9;
  opacity: 0.8;

  &:hover {
    border-color: rgba(0, 0, 0, 0.5);
    border-style: solid;
    background-color: white;
    opacity: 1;
  }
}
</style>
