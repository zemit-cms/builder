/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
// @ts-ignore
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          toolbar: '#FDFDFD',
          surface: '#FFFFFF',
          background: '#F6F6F6',
          // primary: '#';
          // secondary: '#';
          // success: '#';
          // warning: '#';
          // error: '#';
          // info: '#';
        }
      },
      dark: {
        colors: {
          toolbar: '#FDFDFD',
          surface: '#FFFFFF',
          background: '#F6F6F6',
        }
      }
    }
  },
})
