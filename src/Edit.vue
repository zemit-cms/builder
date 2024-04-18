<template>
  <v-app>
    <Settings v-model="sessionStore.settings.opened" width="500" />

    <MainToolbar color="toolbar" />

    <v-navigation-drawer
      v-model="appStore.componentDrawer.opened"
      color="toolbar"
      permanent
      location="left"
    >
      <ComponentDrawerInner />
    </v-navigation-drawer>

    <v-navigation-drawer
      v-model="appStore.optionDrawer.opened"
      color="toolbar"
      permanent
      location="right"
    >
      <OptionDrawerInner />
    </v-navigation-drawer>

    <v-main>
      <div class="d-flex flex-column h-100">
        <v-sheet class="animated" color="background" :style="[
          'flex: 1',
          { maxHeight: appStore.contentToolbar.opened ? 'calc(100vh - 104px)' : 'calc(100vh - 50px)' }
        ]">
          <router-view />
        </v-sheet>
        <div
          :style="[
            { height: appStore.contentToolbar.opened ? 57 : 0 }
          ]"
          class="animated"
        >
          <v-divider />
          <ContentToolbar
            color="toolbar"
          />
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import MainToolbar from '@/components/layout/MainToolbar.vue';
import ContentToolbar from '@/components/layout/ContentToolbar.vue';
import Settings from '@/components/Settings.vue';
import ComponentDrawerInner from '@/components/layout/ComponentDrawerInner.vue';
import OptionDrawerInner from '@/components/layout/OptionDrawerInner.vue';
import { useAppStore } from '@/stores/app';
import { ShortcutType, useShortcut } from '@/composables/shortcut';
import { useSessionStore } from './stores/session';

const appStore = useAppStore();
const sessionStore = useSessionStore();
const shortcut = useShortcut();
shortcut.enable([
  ShortcutType.Zoom,
  ShortcutType.ContentViewMode,
]);
</script>
