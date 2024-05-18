<script setup lang="ts">
import { IButton } from '@/utils/interfaces';
import { ref } from 'vue';
import { useFullscreen } from '@vueuse/core';

const button: IButton<any> = { tooltip: () => isFullscreen.value ? 'Exit fullscreen' : 'Enter fullscreen', icon: () => isFullscreen.value ? 'mdi-fullscreen-exit' : 'mdi-fullscreen', onClick: onFullscreenToggleClick };

const isFullscreen = ref<boolean>();
const { toggle } = useFullscreen();

function onFullscreenToggleClick() {
  toggle();
  isFullscreen.value = document.fullscreen === false || document.webkitIsFullScreen === false;
}
</script>

<template>
  <ActionButton :model-value="button" />
</template>
