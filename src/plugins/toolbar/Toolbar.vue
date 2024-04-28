<template>
  <v-app-bar
    flat
    density="compact"
    location="top"
    color="toolbar"
    style="border-bottom: rgba(var(--v-border-color), var(--v-border-opacity)) solid 1px"
  >
    <ButtonList :model-value="buttons" />
  </v-app-bar>
</template>

<script lang="ts" setup>
import { Component } from 'vue'
import ButtonList from '@/components/ButtonList.vue'

export interface IToolbarProps {
  buttons: (IButton<any> | Component)[]
}

withDefaults(defineProps<{
  buttons: IButton<any>[],
}>(), {
  buttons: () => ([]),
})
</script>
