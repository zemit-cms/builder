<template>
  <component
    v-for="plugin in pluginList"
    v-bind="plugin.props"
    v-on="plugin.listeners"
    :key="plugin.name"
    :is="plugin.component"
  ></component>
</template>

<script lang="ts" setup>
import { usePlugin } from '@/composables/plugin';

const props = defineProps<{
  category: string,
}>()

const plugins = usePlugin();
const pluginList = plugins.getAll(props.category).map(plugin => {
  const item: any = {
    name: plugin.name,
    component: plugin.component,
    listeners: {},
    props: {},
  };
  if (plugin.props) {
    Object.assign(item.props, plugin.props);
  }
  if (plugin.listeners) {
    item.listeners = plugin.listeners;
  }
  return item;
});
</script>
