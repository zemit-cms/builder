<script setup lang="ts">
import { IDataWidget, useContentDataStore } from '@/plugins/content/store';
import WidgetModel, { useWidget } from '@/plugins/content';
import Widget from '@/plugins/content/Widget.vue';
import Hash from '@/utils/hash';

const widget = defineModel<IDataWidget>({ required: true });
const { attrs, listeners } = useWidget(widget.value);

function injectColumns(amount: number) {
  const contentDataStore = useContentDataStore();
  contentDataStore.$patch(state => {
    widget.value.children.push({
      id: Hash.guid(),
      version: 1,
      type: 'column',
      children: [],
    });
  })
  for (let i = 0; i < amount; i++) {

  }
  new WidgetModel(widget.value).save();
}
</script>

<template>
  <v-container
    v-bind="attrs"
    v-on="listeners"
    class="pa-3"
  >
    <slot></slot>
    <v-row
      v-bind="widget.props"
    >
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
      <Widget
        v-else
        v-for="child in widget.children"
        :model-value="child"
        :key="child.id"
      />
    </v-row>
  </v-container>
</template>
