<template>
  <v-app>
    <MainToolbar color="toolbar" />

    <v-navigation-drawer color="toolbar" v-model="store.componentDrawer.opened" permanent location="left">
      <ComponentDrawerInner />
    </v-navigation-drawer>

    <v-navigation-drawer color="toolbar" v-model="store.optionDrawer.opened" permanent location="right">
      <OptionDrawerInner />
    </v-navigation-drawer>

    <v-main>
      <div class="d-flex flex-column h-100">
        <v-sheet color="background" :style="[
          'flex: 1',
          { maxHeight: store.contentToolbar.opened ? 'calc(100vh - 104px)' : 'calc(100vh - 48px)' }
        ]">
          <router-view />
        </v-sheet>
        <v-divider />
        <ContentToolbar v-if="store.contentToolbar.opened" color="toolbar" />
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import MainToolbar from './components/layout/MainToolbar.vue';
import ContentToolbar from './components/layout/ContentToolbar.vue';
import ComponentDrawerInner from './components/layout/ComponentDrawerInner.vue';
import OptionDrawerInner from './components/layout/OptionDrawerInner.vue';
import { useStore } from '@/stores/app';

const store = useStore();
</script>
