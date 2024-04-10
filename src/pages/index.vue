<template>
  <div ref="container" class="d-flex h-100 w-100 ma-auto overflow-auto">
    <div class="animated ma-auto" :style="{
      width: store.contentViewMode === ContentViewMode.Fit ? '100%' : width,
      height: store.contentViewMode === ContentViewMode.Fit ? '100%' : height,
      zoom: factor,
    }">
      <div class="animated grid overflow-hidden" :style="{
        minWidth: width,
        width,
        minHeight: height,
        height,
        margin,
      }">
        <v-card>
          <v-card-title>Title</v-card-title>
          <v-card-text>
            Lorem ipsum dolor amet
          </v-card-text>
          <v-card-actions>
            <v-btn block>TEST</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { ContentViewMode, useStore } from '@/stores/app';

const store = useStore();
const container = ref<HTMLDivElement>();
const factor = computed((): number => store.zoomSelection / 100);

const width = computed((): string => {
  if (container.value && store.contentViewMode === ContentViewMode.Fit) {
    return '100%';
    // return containerWidth.value + 'px';
  }
  return (store.contentViewMode === ContentViewMode.Desktop
    ? 120
    : store.contentViewMode === ContentViewMode.Tablet
      ? 48
      : store.contentViewMode === ContentViewMode.Mobile
        ? 22.5
        : 60) + 'em';
});
const height = computed((): string => {
  if (container.value && store.contentViewMode === ContentViewMode.Fit) {
    return '100%';
    // return containerHeight.value + 'px';
  }
  return (store.contentViewMode === ContentViewMode.Desktop
    ? 67.5
    : store.contentViewMode === ContentViewMode.Tablet
      ? 27
      : store.contentViewMode === ContentViewMode.Mobile
        ? 50
        : 40) + 'em'
});
const margin = computed((): string => {
  if (container.value) {
    const fontSize = container.value.style.fontSize;
    const offsetWidth = container.value.offsetWidth / fontSize;
    // const offsetHeight = container.value.offsetHeight / fontSize;
    return (width.value < offsetWidth ? 10 : 0) + 'rem';
  }
  return 10 + 'rem';
});
</script>

<style lang="scss" scoped>
.animated {
  transition: all ease-in-out 150ms;
}
.grid {
  outline: #E3E3E3 solid 2px;
  background-repeat: repeat;
  background: linear-gradient(90deg, #E3E3E3 1px, transparent 1px) -1px 0, white;
  background-size: 8.35% 5px;
}
</style>
