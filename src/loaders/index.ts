/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Loaders
import vuetify from './vuetify'
import pinia from '../stores'

// Types
import type { App } from 'vue'

export function registerLoaders (app: App) {
  app
    .use(vuetify)
    .use(pinia)
}
