<script lang="ts" setup>
import { IComponentDrawerWidget } from '@/plugins/component-drawer/ComponentDrawer.vue';
import { useStore } from '@/plugins/component-drawer/store';
import vAdvancedCol from '@/directives/advanced-col';
import CategorizedAccordion from '@/components/CategorizedAccordion.vue';

const store = useStore();
withDefaults(defineProps<{
  widgets: IComponentDrawerWidget[],
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
    filter-text="Filter components..."
    no-item-text="No components found"
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
          <v-card variant="outlined" height="5rem" class="d-flex align-center text-center justify-center">
            <component
              v-bind="field"
              :is="field.component"
            />
          </v-card>
        </v-col>
      </v-row>
    </template>
  </CategorizedAccordion>
</template>

<style lang="scss" scoped>
.draggable {
  cursor: grab;
  user-select: none;
}
</style>
