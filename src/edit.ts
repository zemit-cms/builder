/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import Edit from './Edit.vue'

// Composables
import { createApp } from 'vue'

// Stylesheets
import '@/styles/index.scss'

const app = createApp(Edit)

registerPlugins(app)

app.mount('#app')
