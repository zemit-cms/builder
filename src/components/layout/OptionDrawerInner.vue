<template>
  <v-tabs
    v-model="tab"
    :show-arrows="false"
    grow
  >
    <v-tab :value="1">Style</v-tab>
    <v-tab :value="2">Text</v-tab>
  </v-tabs>
  <v-window v-model="tab">
    <div class="pa-4">

    </div>
  </v-window>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const tab = ref(0);
</script>
