/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import View from './View.vue'

// Composables
import { createApp } from 'vue'

// Stylesheets
import '@/styles/index.scss'

const app = createApp(View)

registerPlugins(app)

app.mount('#app')
