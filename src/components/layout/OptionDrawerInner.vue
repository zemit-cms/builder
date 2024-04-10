<template>
  <v-tabs
    v-model="tab"
    :show-arrows="false"

    grow
    tag
  >
    <v-tab :value="1">Style</v-tab>
    <v-tab :value="2">Text</v-tab>
    <v-tab :value="3">Arrange</v-tab>
  </v-tabs>
  <v-window v-model="tab">
    <div class="pa-4">

    </div>
  </v-window>
</template>

<script lang="ts" setup>
const tab = 0;
</script>
