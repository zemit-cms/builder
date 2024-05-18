<script setup lang="ts">
import { useWidget } from '@/plugins/content/composables';
import Hash from '@/utils/hash';
import WidgetModel from '@/plugins/content/models/widget.model';

const widget = defineModel<WidgetModel>({ required: true });
const { attrs, listeners } = useWidget(widget.value);

function injectColumns(amount: number) {
  for (let i = 0; i < amount; i++) {
    widget.value.children.push(new WidgetModel({
      id: Hash.guid(),
      type: 'column',
      children: [],
      props: {},
    }, widget.value));
  }
}
</script>

<template>
  <v-container
    v-bind="attrs"
    v-on="listeners"
    class="pa-3"
  >
    <v-row v-bind="widget.props">
      <template v-if="widget.children.length === 0">
        <v-col
          v-for="amount in 12"
          :key="amount"
          class="pa-1"
        >
          <v-btn
            block
            density="compact"
            height="64"
            class="pa-0"
            variant="tonal"
            color="primary"
            @click="injectColumns(amount)"
          >
            {{ amount }}
          </v-btn>
        </v-col>
      </template>
      <slot></slot>
    </v-row>
  </v-container>
</template>
