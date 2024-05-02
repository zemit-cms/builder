<script setup lang="ts">
import { defineModel } from 'vue';
import { VComboboxProps } from '@/utils/props';

export interface IFieldAccordionProps {
  filterText?: string,
  noItemText?: string,
  filterProps?: VComboboxProps,
  panels?: string[],
}

export interface IFieldAccordionField<P = {}> {
  category: string,
  name: string,
  // component: Component,
  component: any, // Bug in Vite.. refuses to recognize Component from vue
  props?: P
}

export interface IFieldAccordion {
  label: string,
  fields: IFieldAccordionField[]
}

const query = ref(null);
const fields = defineModel<IFieldAccordionField[]>({
  required: true
});
const props = withDefaults(defineProps<IFieldAccordionProps>(), {
  filterText: 'Filter items...',
  noItemText: 'No items found',
  panels: () => ([]),
});
const panels = ref(props.panels)

const categories = computed((): IFieldAccordion[] => {
  const items: IFieldAccordion[] = [];
  fields.value.filter(field => field.category.toLowerCase().includes(query.value || '')).forEach(field => {
    const found = items.find(category => {
      return category.fields.find(child => {
        return child.category === field.category;
      });
    });
    if (found) {
      found.fields.push(field);
    } else {
      items.push({
        label: field.category,
        fields: [field],
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
            <v-chip v-if="query !== null" size="x-small">
              {{ category.fields.length }}
            </v-chip>
          </div>
        </template>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <slot :fields="category.fields">
          <component
            v-for="field in category.fields"
            v-bind="field.props"
            :field="field"
            :key="field.name"
            :is="field.component"
          />
        </slot>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
