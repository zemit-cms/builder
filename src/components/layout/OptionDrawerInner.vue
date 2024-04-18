<template>
  <v-tabs
    v-model="tab"
    :show-arrows="false"
    grow
  >
    <v-tab value="style">Style</v-tab>
    <v-tab value="text">Text</v-tab>
  </v-tabs>
  <v-window v-model="tab">
    <v-window v-model="tab">
      <v-window-item value="style" class="pa-4">
        STYLE
      </v-window-item>
      <v-window-item value="text" class="pa-4">
        TEXT
      </v-window-item>
    </v-window>
  </v-window>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const tab = ref(0);
</script>
