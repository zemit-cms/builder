// Utilities
import { createPinia, defineStore } from 'pinia'
import { useStorage } from '@vueuse/core';

export function definePluginStore<S>(name: string, data: S) {
  return defineStore<string, S>(name, {
    // @ts-ignore
    state: () => useStorage('zemit/builder/plugin/' + name, data, localStorage, {
      mergeDefaults: true
    }),
  })
}

export default createPinia()
