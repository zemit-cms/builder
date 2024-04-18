<template>
  <template v-for="(button, buttonIdx) in modelValue" :key="buttonIdx">
    <v-divider v-if="button.divider" class="mx-2" vertical inset />
    <v-spacer v-else-if="button.spacer" />
    <v-tooltip
      v-else
      :text="getValue(button.tooltip)"
      :open-delay="500"
      location="bottom"
      style="position: relative"
    >
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          :disabled="getValue(button.disabled)"
          :active="getValue(button.active)"
          size="small"
          @click="button.onClick"
        >
          <v-icon v-if="button.icon">
            {{ getValue(button.icon) }}
          </v-icon>
        </v-btn>
      </template>
    </v-tooltip>
  </template>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { IButton } from '@/interfaces';
// import { useSessionStore } from '@/stores/session'

defineProps<{
  modelValue: IButton<any>[]
}>()

// const sessionStore = useSessionStore();

// function showTooltip(button: IButton<any>): boolean {
//   const shortcuts = getShortcuts(button);
//   return (shortcuts.includes('shift') && sessionStore.shiftKeyActivated)
//     || (shortcuts.includes('ctrl') && sessionStore.ctrlKeyActivated)
//     || (shortcuts.includes('alt') && sessionStore.altKeyActivated);
// }

function getShortcuts(button: IButton<any>): string[] {
  const buttonShortcuts = [];
  if (Array.isArray(button.shortcut)) {
    return button.shortcut;
  } else if (button.shortcut && button.shortcut.length > 0) {
    return button.shortcut.split('+');
  }
  return buttonShortcuts;
}

// function getTooltip(button: IButton<any>) {
//   return showTooltip(button)
//     ? getShortcuts(button).join('+').toUpperCase()
//     : typeof button.tooltip === 'function' ? button.tooltip() : button.tooltip;
// }

function getValue(value: any) {
  return typeof value === 'function' ? value() : value;
}
</script>
