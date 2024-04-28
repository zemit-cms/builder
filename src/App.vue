<template>
  <v-app>
    <Builder
      v-model="contentStore"
      :mode="mode"
    />
  </v-app>
</template>

<script lang="ts" setup>
import Builder from '@/components/Builder.vue';
// import { useContentStore } from '@/stores/content';

const contentStore = { };
// const contentStore = useContentStore();
const mode = import.meta.env.MODE;
</script>
