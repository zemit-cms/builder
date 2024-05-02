<template>
  <Modal
    v-model="store.opened"
    width="600"
    height="450"
    scrollable
    title="Settings"
    icon="mdi-cog"
  >
    <template v-slot:[`header.append`]>
      <v-tabs
        v-model="store.tab"
        :show-arrows="false"
        bg-color="surface"
        grow
      >
        <v-tab
          v-for="tab in tabs"
          :value="tab.value"
          :key="tab.value"
        >{{ tab.label }}</v-tab>
      </v-tabs>
      <v-divider />
    </template>
    <template #body>
      <v-window v-model="store.tab">
        <v-window-item
          v-for="tab in tabs"
          :value="tab.value"
          :key="tab.value"
        >
          <component v-bind="tab.props" :is="tab.component"></component>
        </v-window-item>
      </v-window>
    </template>
    <template v-slot:[`actions.prepend`]>
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
import { useShortcut } from '@/composables/shortcut';
import { useStore } from '@/plugins/settings/store';
import { ITab } from '@/utils/interfaces';
import Modal from '@/components/Modal.vue';

export interface ISettingsProps {
  tabs?: ITab[],
}

const store = useStore();
const shortcut = useShortcut();
shortcut.enable([{
  name: 'toolbar_settings',
  description: 'Open settings dialog',
  keys: ['alt', 's'],
  callback: () => {
    store.$patch(state => {
      state.opened = true;
    })
  },
}]);

withDefaults(defineProps<{
  tabs: ITab[],
}>(), {
  tabs: () => ([]),
})

function onApplyClick(): void {
  store.$patch(state => {
    state.opened = false;
  })
}
</script>
