<script setup lang="ts">
import { IDataWidget } from '@/plugins/content/store';
import Widget from '@/plugins/content/Widget.vue';
import { useWidget } from '@/plugins/content';

const widget = defineModel<IDataWidget>({
  required: true,
});
const { attrs, listeners } = useWidget(widget.value);
</script>

<template>
  <v-col
    v-bind="{ ...attrs, ...widget.props }"
    v-on="listeners"
    class="text-center"
  >
    COLUMN
    <slot></slot>
    <Widget
      v-for="child in widget.children"
      :model-value="child"
      :key="child.id"
    />
  </v-col>
</template>
