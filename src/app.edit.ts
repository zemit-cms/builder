/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Loaders
import { registerLoaders } from '@/loaders'

// Directives
import { registerDirectives } from '@/directives'

// Components
import App from './App.vue'

// Plugins
import '@/loaders/plugins'

// Composables
import { createApp } from 'vue'
import { useShortcut } from '@/composables/shortcut';

// Stylesheets
import '@/styles/index.scss'
import '@/styles/composable-draggable.scss'
import '@/styles/composable-droppable.scss'
import '@/styles/composable-resizeable.scss'

const app = createApp(App)

registerLoaders(app)
registerDirectives(app)
useShortcut().bootstrap()

app.mount('#app')
