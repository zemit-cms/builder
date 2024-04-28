<template>
  <div class="pa-4">
    <v-combobox
      v-model="query"
      prepend-inner-icon="mdi-magnify"
      placeholder="Filter components..."
      density="compact"
      clearable
      hide-details
    />
  </div>
  <v-alert
    v-if="query && categories.length === 0"
    type="info"
    variant="tonal"
  >
    No widget found
  </v-alert>
  <v-expansion-panels
    v-model="panels"
    variant="accordion"
    multiple
    tile
    static
  >
    <v-expansion-panel
      v-for="category in categories"
      :key="category.label"
    >
      <v-expansion-panel-title>
        <template #default>
          <div class="d-flex align-center justify-space-between w-100 pr-3">
            <span>{{ category.label }}</span>
            <v-chip v-if="query !== null" size="x-small">
              {{ category.widgets.length }}
            </v-chip>
          </div>
        </template>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-row dense>
          <v-col
            v-for="widget in category.widgets"
            :key="widget.name"
            cols="6"
          >
            <v-card variant="outlined">
              <v-responsive
                :aspect-ratio="4 / 3"
                class="draggable d-flex align-center justify-center text-center"
              >
                <component :is="widget.component" />
              </v-responsive>
            </v-card>
          </v-col>
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts" setup>
import { IComponentDrawerWidget } from '@/plugins/component-drawer/ComponentDrawer.vue';

export interface IComponentDrawerCategory {
  label: string,
  widgets: IComponentDrawerWidget[],
}

const panels = ref([0]);
const query = ref(null);

const props = withDefaults(defineProps<{
  widgets: IComponentDrawerWidget[],
}>(), {
  widgets: () => ([]),
})

const categories = computed((): IComponentDrawerCategory[] => {
  const items: IComponentDrawerCategory[] = [];
  props.widgets.filter(widget => !query.value || widget.name.toLowerCase().includes(query.value || '')).forEach(widget => {
    const found = items.find(category => {
      return category.widgets.find(child => {
        return child.category === widget.category;
      });
    });
    if (found) {
      found.widgets.push(widget);
    } else {
      items.push({
        label: widget.category,
        widgets: [widget],
      })
    }
  })
  return items;
})
</script>

<style lang="scss" scoped>
.draggable {
  cursor: grab;
  user-select: none;
}
</style>
