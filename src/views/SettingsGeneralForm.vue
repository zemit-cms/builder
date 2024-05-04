<script setup lang="ts">
import CategorizedAccordion, { ICategorizedAccordionField } from '@/components/CategorizedAccordion.vue';
import { useStore } from '@/plugins/settings/store';
import { useContentOptionStore } from '@/plugins/content/store';
import SwitchField, { ISwitchFieldProps, ISwitchFieldListeners } from '@/components/fields/SwitchField.vue';

defineEmits(['update:modelValue'])

const store = useStore();
const contentOptionStore = useContentOptionStore();
const fields = computed((): ICategorizedAccordionField<ISwitchFieldProps, ISwitchFieldListeners>[] => ([{
  category: 'View',
  name: 'Grid view',
  component: SwitchField,
  props: {
    modelValue: contentOptionStore.grid,
    label: 'Grid view',
    description: 'Shows a vertical grid of 12 lines above your content. It\'s a visual guide that can help you calculate the column sizing for different resolution such as desktop, tablet and mobile devices.',
  },
  listeners: {
    'update:modelValue': value => {
      contentOptionStore.$patch(state => state.grid = value)
    },
  }
}]))
</script>

<template>
  <CategorizedAccordion
    v-model:panels="store.panels"
    :model-value="fields"
    :filter-props="{
      class: 'mb-3'
    }"
    filter-text="Filter settings..."
    no-item-text="No settings found"
  >
    <template #default="{ fields }">
      <template v-for="(field, fieldIdx) in fields" :key="field.name">
        <v-divider v-if="fieldIdx > 0" class="my-2" />
        <component
          v-bind="field.props || {}"
          v-on="field.listeners || {}"
          :model-value="field.props.modelValue"
          :is="field.component"
        />
      </template>
    </template>
  </CategorizedAccordion>
</template>
