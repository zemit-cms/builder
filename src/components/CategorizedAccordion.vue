<script setup lang="ts">
import { defineModel } from 'vue';
import { VComboboxProps } from '@/utils/props';

export interface ICategorizedAccordionProps {
  filterText?: string,
  noItemText?: string,
  filterProps?: VComboboxProps,
  panels?: string[],
}

export interface ICategorizedAccordionItem<P = {}, L = {}> {
  category: string,
  label: string,
  icon?: string,
  description?: string,
  component: any, // Bug in Vite.. refuses to recognize Component from vue,
}

export interface ICategorizedAccordionField<P = {}, L = {}> extends ICategorizedAccordionItem {
  props?: P,
  listeners?: L,
}

export interface ICategorizedAccordion {
  label: string,
  items: ICategorizedAccordionItem[]
}

defineEmits(['update:panels'])

const query = ref(null);
const fields = defineModel<ICategorizedAccordionItem[]>({
  required: true
});
const props = withDefaults(defineProps<ICategorizedAccordionProps>(), {
  filterText: 'Filter items...',
  noItemText: 'No items found',
  panels: () => ([]),
});
const panels = ref(props.panels)

const categories = computed((): ICategorizedAccordion[] => {
  const items: ICategorizedAccordion[] = [];
  fields.value.filter(field => field.label.toLowerCase().includes(query.value || '')).forEach(field => {
    const found = items.find(category => {
      return category.items.find(child => {
        return child.category === field.category;
      });
    });
    if (found) {
      found.items.push(field);
    } else {
      items.push({
        label: field.category,
        items: [field],
      })
    }
  })
  return items;
})
</script>

<template>
  <v-combobox
    v-model="query"
    v-bind="filterProps"
    :placeholder="filterText"
    prepend-inner-icon="mdi-magnify"
    density="compact"
    clearable
    hide-details
  />
  <v-alert
    v-if="query && categories.length === 0"
    type="info"
    variant="tonal"
  >
    {{ noItemText }}
  </v-alert>
  <v-expansion-panels
    v-model="panels"
    static
    multiple
    variant="accordion"
    @update:model-value="$emit('update:panels', $event)"
  >
    <v-expansion-panel
      v-for="category in categories"
      :key="category.label"
      :value="category.label"
    >
      <v-expansion-panel-title>
        <template #default>
          <div class="d-flex align-center justify-space-between w-100 pr-3">
            <span>{{ category.label }}</span>
            <v-chip v-if="query !== null" size="x-small" label class="mb-n1">
              {{ category.items.length }}
            </v-chip>
          </div>
        </template>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <slot :fields="category.items">
          <component
            v-for="field in category.items"
            v-bind="field.props || {}"
            v-on="field.listeners || {}"
            :field="field"
            :key="field.label"
            :is="field.component"
          />
        </slot>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
