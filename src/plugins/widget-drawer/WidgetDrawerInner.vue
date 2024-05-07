<script lang="ts" setup>
import { IWidgetDrawerWidget } from '@/plugins/widget-drawer/WidgetDrawer.vue';
import { useStore } from '@/plugins/widget-drawer/store';
import Draggable from '@/components/Draggable.vue'
import vAdvancedCol from '@/directives/advanced-col';
import CategorizedAccordion from '@/components/CategorizedAccordion.vue';

const store = useStore();
withDefaults(defineProps<{
  widgets: IWidgetDrawerWidget[],
}>(), {
  widgets: () => ([]),
})
</script>

<template>
  <CategorizedAccordion
    v-model:panels="store.panels"
    :model-value="widgets"
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
          :key="field.name"
        >
          <Draggable :model-value="field" :title="field.name" :tooltip="field.description">
            <template #ghost>
              <v-icon size="48">{{ field.icon }}</v-icon>
            </template>
            <template #default>
              <v-card
                variant="text"
                height="5rem"
                class="d-flex align-center text-center justify-center draggable-card"
              >
                <div>
                  <v-icon size="48">{{ field.icon }}</v-icon>
                  <div class="text-caption text-disabled mt-n1">{{ field.name }}</div>
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
  background-color: rgba(var(--v-theme-background), 1);

  &:hover {
    background-color: rgba(var(--v-theme-background), 1);
  }
}
</style>
