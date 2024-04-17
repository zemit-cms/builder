// Utilities
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core';
import { IBuilder } from '../interfaces';

export const useContentStore = defineStore<string, IBuilder>('app', {
  state: () => useStorage('zemit/content', {
    name: '',
    version: '0.1',
    widgets: [],
  }) as IBuilder,
})
