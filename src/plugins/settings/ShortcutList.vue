<script setup lang="ts">
import { shortcutList } from '@/composables/shortcut';
</script>

<template>
  <template v-for="(shortcut, shortcutIdx) in shortcutList" :key="shortcut.name">
    <v-divider v-if="shortcutIdx > 0" class="my-3" />
    <v-row>
      <v-col cols="3" class="d-flex align-center">
        <template v-for="(key, keyIdx) in shortcut.keys" :key="key">
          <span v-if="keyIdx > 0" class="mx-2">+</span>
          <v-chip label>
            {{ key.toUpperCase() }}
          </v-chip>
        </template>
      </v-col>
      <v-col cols="9" class="d-flex align-center">
<!--        <h4>{{ shortcut.name }}</h4>-->
        <p class="ma-0">{{ shortcut.description }}</p>
      </v-col>
    </v-row>
  </template>
</template>
