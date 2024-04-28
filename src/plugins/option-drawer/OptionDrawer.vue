<template>
  <v-navigation-drawer
    v-model="store.opened"
    color="toolbar"
    permanent
    location="right"
  >
    <OptionDrawerInner
      :tabs="tabs"
    />
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { useStore } from './store';
import OptionDrawerInner from './OptionDrawerInner.vue';
import { useShortcut } from '@/composables/shortcut';
import { ITab } from '@/utils/interfaces';

export interface IOptionDrawerProps {
  tabs?: ITab[],
}

const store = useStore();

const shortcut = useShortcut();
shortcut.enable([{
  name: 'option_drawer',
  description: 'Dock/Undock option drawer',
  keys: ['alt', 'o'],
  callback: () => {
    store.$patch(state => {
      state.opened = !state.opened;
    })
  },
}]);

withDefaults(defineProps<{
  tabs: ITab[],
}>(), {
  tabs: () => ([]),
})
</script>
