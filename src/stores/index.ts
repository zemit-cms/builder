// Utilities
import { createPinia, defineStore, Store, StoreDefinition } from 'pinia'
import { useSessionStorage, useStorage } from '@vueuse/core';

// @ts-ignore
export function definePluginStore<D = {}, G = {}, A = {}>(name: string, data: D, getters?: G, actions?: A): StoreDefinition<string, D, G, A> {
  // @ts-ignore
  return defineStore<string, Record<string, D>, Record<string, (state?: D) => G>, Record<string, A>>(name, {
    state: () => useStorage('zemit/builder/plugin/' + name, data, localStorage, {
      mergeDefaults: true
    }),
    getters: getters || {},
    actions: actions || {},
  })
}

// @ts-ignore
export function definePluginSessionStore<D = {}, G = {}, A = {}>(name: string, data: D, getters?: G, actions?: A): StoreDefinition<string, D, G, A> {
  // @ts-ignore
  return defineStore<string, Record<string, D>, Record<string, (state?: D) => G>, Record<string, A>>(name, {
    state: () => useSessionStorage('zemit/builder/plugin/' + name, data),
    getters: getters || {},
    actions: actions || {},
  })
}

export default createPinia()
