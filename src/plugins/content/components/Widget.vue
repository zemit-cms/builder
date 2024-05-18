<script setup lang="ts">
import WidgetModel from '@/plugins/content/models/widget.model';
import { useContentOptionStore } from '@/plugins/content/store';

const contentOptionStore = useContentOptionStore();
const widget = defineModel<WidgetModel>({ required: true });
const declaration = widget.value.getDeclaration();
const component = typeof declaration.component === 'object' ? { ...declaration.component } : declaration.component;
</script>

<template>
  <component
    v-model="widget"
    :is="component"
    :class="{ grid: contentOptionStore.grid }"
  >
    <div v-if="widget.isSelected()" class="overlay"></div>
    <slot name="default">
      <Widget
        v-for="(child, index) in widget.children"
        v-model="widget.children[index]"
        :key="child.id"
      />
    </slot>
  </component>
</template>

<style lang="scss" scoped>
body.cmp-draggable-dragging {
  .widget {
    .overlay {
      opacity: 0;
    }
  }
}

.widget {
  position: relative;

  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(var(--v-theme-primary), 1);
    opacity: 0.2;
    pointer-events: none;
  }
}

.grid {
  background: repeat linear-gradient(90deg, #E3E3E3 1px, transparent 1px) -1px 0, white;
  background-size: 8.35% 5px;
}
</style>
