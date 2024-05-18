<script setup lang="ts">
import { IShortcut, shortcutList } from '@/composables/shortcut'
import { useSessionStore } from '@/stores/session'
import { useMagicKeys } from '@vueuse/core/index';

const pressedKeys: Ref<string[]> = ref([]);
useMagicKeys({
  passive: false,
  onEventFired(e) {
    pressedKeys.value = [];
    if (e.type === 'keydown') {
      pressedKeys.value = [e.key.toUpperCase()];
    }
  }
});

const sessionStore = useSessionStore();
const getHighlightColor = (key: string): string | undefined => {
  const uKey = key.toUpperCase();
  return (
    pressedKeys.value.includes(uKey)
    || sessionStore.altKeyActivated && uKey === 'ALT'
    || sessionStore.ctrlKeyActivated && uKey === 'CTRL'
    || sessionStore.shiftKeyActivated && uKey === 'SHIFT'
  ) ? 'primary' : undefined;
}

const sortedShortcutList = computed((): IShortcut[] => {
  return shortcutList.sort((a, b) => a.keys[0] < b.keys[0] ? -1 : 1);
})
</script>

<template>
  <template v-for="(shortcut, shortcutIdx) in sortedShortcutList" :key="shortcut.name">
    <v-divider v-if="shortcutIdx > 0" class="my-3" />
    <v-row>
      <v-col cols="3" class="d-flex align-center">
        <template v-for="(key, keyIdx) in shortcut.keys" :key="key">
          <span v-if="keyIdx > 0" class="mx-2">+</span>
          <v-chip
            :color="getHighlightColor(key)"
            label
          >
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
