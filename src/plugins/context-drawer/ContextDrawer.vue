<script lang="ts" setup>
import { useStore } from './store';
import { useShortcut } from '@/composables/shortcut';
import { ITab } from '@/utils/interfaces';
import { IResizeContext, useResizeable } from '@/composables/resizeable';
import { useRootModel } from '@/plugins/content/composables';

export interface IContextDrawerProps {
  tabs?: ITab[],
}

interface IWidgetProps {
  category: string,
  type: string,
  options: any[]
}

const store = useStore();
const shortcut = useShortcut();
shortcut.enable([{
  name: 'option_drawer',
  description: 'Dock/Undock context drawer',
  keys: ['alt', 'o'],
  callback: () => {
    store.$patch(state => {
      state.opened = !state.opened;
    })
  },
}]);

let vMain: HTMLElement | null | undefined;
const drawer = ref<HTMLElement | null>(null);
onMounted(() => {
  const element = drawer.value?.$el.nextElementSibling;
  const context = useResizeable(element, {
    minWidth: 256,
    maxWidth: 600,
    directions: ['left'],
    onStartResize: ()  => {
      vMain = document.getElementById('app')?.querySelector('.v-main');
    },
    onResize: (props: IResizeContext) => {
      const width = (props.originalWidth.value || 0) + props.deltaX.value;
      element.style.width = width + 'px';
      if (vMain) {
        vMain.style.setProperty('--v-layout-right', width + 'px');
      }
    },
    onStopResize(props: IResizeContext) {
      store.width = (props.originalWidth.value || 0) + props.deltaX.value;
    },
  })
  onUnmounted(() => {
    context.destroy();
  })
})

const props = withDefaults(defineProps<{
  tabs: ITab[],
}>(), {
  tabs: () => ([]),
})

const rootModel = useRootModel();
const selectedProps = computed((): IWidgetProps[] => {
  const props: IWidgetProps[] = [];
  rootModel.value.filter(widget => widget.isSelected()).forEach(widget => {
    const declaration = widget.getDeclaration();
    console.log(declaration);
  })
  return props;
})
const activeTabs = computed((): ITab[] => {
  return rootModel.value.children.length > 0
    && props.tabs || [];
})
</script>

<template>
  <v-navigation-drawer
    v-model="store.opened"
    :width="store.width"
    id="context-drawer"
    color="toolbar"
    permanent
    location="right"
    ref="drawer"
  >
    <v-alert
      v-if="activeTabs.length === 0"
      variant="text"
      prominent
      class="h-100 text-center"
    >
      <v-icon size="48">mdi-details</v-icon>
      <div class="font-weight-bold mt-1">Add an element first</div>
      <p>and contextual options will appear here.</p>
    </v-alert>
    <template v-else>
      <v-tabs
        v-model="store.tab"
        :show-arrows="false"
        grow
      >
        <v-tab
          v-for="tab in activeTabs"
          :value="tab.value"
          :key="tab.value"
        >{{ tab.label }}</v-tab>
      </v-tabs>
      <v-window v-model="store.tab">
        <v-window-item
          v-for="tab in tabs"
          :value="tab.value"
          :key="tab.value"
          class="pa-4"
        >
          <component :is="tab.component"></component>
        </v-window-item>
      </v-window>
    </template>
  </v-navigation-drawer>
</template>

<style lang="scss">
#context-drawer * {
  user-select: none;
}
</style>
