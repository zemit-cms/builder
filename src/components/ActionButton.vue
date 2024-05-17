<script setup lang="ts">
import { IButton } from '@/utils/interfaces';

const button = defineModel<IButton<any>>({
  required: true
})

// const sessionStore = useSessionStore();

// function showTooltip(button: IButton<any>): boolean {
//   const shortcuts = getShortcuts(button);
//   return (shortcuts.includes('shift') && sessionStore.shiftKeyActivated)
//     || (shortcuts.includes('ctrl') && sessionStore.ctrlKeyActivated)
//     || (shortcuts.includes('alt') && sessionStore.altKeyActivated);
// }

// function getShortcuts(button: IButton<any>): string[] {
//   const buttonShortcuts: string[] = [];
//   if (Array.isArray(button.shortcut)) {
//     return button.shortcut;
//   } else if (button.shortcut && button.shortcut.length > 0) {
//     return button.shortcut.split('+');
//   }
//   return buttonShortcuts;
// }

// function getTooltip(button: IButton<any>) {
//   return showTooltip(button)
//     ? getShortcuts(button).join('+').toUpperCase()
//     : typeof button.tooltip === 'function' ? button.tooltip() : button.tooltip;
// }

function getValue(value: any) {
  return typeof value === 'function' ? value() : value;
}
</script>

<template>
  <v-tooltip
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
        <span v-if="button.label">{{ button.label }}</span>
      </v-btn>
    </template>
  </v-tooltip>
</template>
