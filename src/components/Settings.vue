<template>
  <Modal
    v-bind="$attrs"
    title="Settings"
    icon="mdi-dots-vertical"

  >
    <template #body.prepend>
      <v-tabs
        v-model="tab"
        :show-arrows="false"
        grow
      >
        <v-tab value="general">General</v-tab>
        <v-tab value="shortcuts">Shortcuts</v-tab>
      </v-tabs>
    </template>
    <template #body>
      <v-window v-model="tab">
        <v-window-item value="general">
          GENERAL
        </v-window-item>
        <v-window-item value="shortcuts">
          SHORTCUTS
        </v-window-item>
      </v-window>
    </template>
    <template #actions.prepend>
      <v-btn
        class="text-none"
        text="Apply"
        color="primary"
        variant="outlined"
        @click="onApplyClick"
      ></v-btn>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Modal from '@/components/Modal';
const tab = ref('general');

function onApplyClick(): void {

}
</script>
