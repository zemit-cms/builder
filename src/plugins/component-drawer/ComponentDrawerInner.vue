<script lang="ts" setup>
import { IComponentDrawerWidget } from '@/plugins/component-drawer/ComponentDrawer.vue';
import { useStore } from '@/plugins/component-drawer/store';
import FieldAccordion from '@/components/FieldAccordion.vue';

const store = useStore();
withDefaults(defineProps<{
  widgets: IComponentDrawerWidget[],
}>(), {
  widgets: () => ([]),
})
</script>

<template>
  <FieldAccordion
    v-model:panels="store.panels"
    :model-value="widgets"
    :filter-props="{
      class: 'pa-4'
    }"
    filter-text="Filter components..."
    no-item-text="No components found"
  >
    <template #default="{ fields }">
      <v-row dense>
        <v-col
          v-for="field in fields"
          :key="field.name"
          cols="6"
        >
          <v-card variant="outlined">
            <v-responsive
              :aspect-ratio="4 / 3"
              class="draggable d-flex align-center justify-center text-center"
            >
              <component
                v-bind="field"
                :is="field.component"
              />
            </v-responsive>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </FieldAccordion>
</template>

<style lang="scss" scoped>
.draggable {
  cursor: grab;
  user-select: none;
}
</style>
