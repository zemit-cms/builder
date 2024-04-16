<template>
  <Builder
    v-model="data"
    :mode="mode"
    id="main"
  />
</template>

<script lang="ts" setup>
import Builder from '@/components/Builder'
import { IBuilder } from '../interfaces';

const data: IBuilder = {
  name: 'Main',
  version: '1.0',
  widgets: [],
}
const mode = import.meta.env.MODE;
</script>


