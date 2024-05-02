<script setup lang="ts">
import FieldAccordion, { IFieldAccordionField } from '@/components/FieldAccordion.vue';
import { useStore } from './store';

export interface ISettingsGeneralFormProps {
  fields: IFieldAccordionField[]
}

withDefaults(defineProps<ISettingsGeneralFormProps>(), {
  fields: () => ([]),
})

const store = useStore();
</script>

<template>
  <FieldAccordion
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
          v-bind="field"
          :is="field.component"
        />
      </template>
    </template>
  </FieldAccordion>
</template>
