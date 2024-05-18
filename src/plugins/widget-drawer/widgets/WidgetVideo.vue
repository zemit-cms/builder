<script setup lang="ts">
import WidgetModel from '@/plugins/content/models/widget.model';
import { useWidget } from '@/plugins/content/composables';

const widget = defineModel<WidgetModel>({ required: true });
const { attrs, listeners } = useWidget(widget.value);
</script>

<template>
  <div
    v-bind="attrs"
    v-on="listeners"
  >
    VIDEO
    <slot></slot>
  </div>
</template>
