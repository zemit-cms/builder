<script setup lang="ts">
import { useWidget } from '@/plugins/content';
import { IDataWidget } from '@/plugins/content/store';

const widget = defineModel<IDataWidget<{
  markup: string
}>>({
  required: true,
});
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
