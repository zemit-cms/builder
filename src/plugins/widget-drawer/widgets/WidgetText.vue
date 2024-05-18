<script setup lang="ts">
import { useWidget } from '@/plugins/content/composables';
import WidgetModel from '@/plugins/content/models/widget.model';

export interface IWidgetTextProps {
  markup: string
}

const widget = defineModel<WidgetModel<IWidgetTextProps>>({ required: true });
const { attrs, listeners } = useWidget(widget.value);
</script>

<template>
  <component
    v-bind="attrs"
    v-on="listeners"
    :is="widget.props?.markup || 'div'"
  >
    TEXT
    <slot></slot>
  </component>
</template>
