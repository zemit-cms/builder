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
  <component v-model="component.props.modelValue" v-bind="component.props" :is="component.is"></component>
</template>
