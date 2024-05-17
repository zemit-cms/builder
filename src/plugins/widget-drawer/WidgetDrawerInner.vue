<script lang="ts" setup>
import { IWidgetDrawerWidget } from '@/plugins/widget-drawer/WidgetDrawer.vue';
import { useStore } from '@/plugins/widget-drawer/store';
import { IDataWidget } from '@/plugins/content/store';
import Hash from '@/utils/hash'
import Draggable from '@/components/Draggable.vue'
import vAdvancedCol from '@/directives/advanced-col';
import CategorizedAccordion, { ICategorizedAccordionItem } from '@/components/CategorizedAccordion.vue';

const store = useStore();
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
    version: 1,
    type: field.type,
    children: [],
  }
}
</script>

<template>
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
</template>

<style lang="scss" scoped>
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
