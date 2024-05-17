<script setup lang="ts">
export interface IPlugginWrapperProps<P> {
  init: () => {
    is: Component,
    props: P,
  }
}

const props = defineProps<IPlugginWrapperProps<any>>();
const component = props.init();
</script>

<template>
  <component :is="component.is" v-bind="component.props"></component>
</template>
