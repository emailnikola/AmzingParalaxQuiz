import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify, type ThemeDefinition } from 'vuetify'

const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    'background': '#111111',
    'surface': '#FFFFFF',
    'darkest': '#111111',
    'surface-bright': '#FFFFFF',
    'surface-light': '#EEEEEE',
    'surface-variant': '#EEEEEE',
    'on-surface': '#FFFFFF',
    'on-surface-variant': '#EEEEEE',
    'primary': '#364072',
    'primary-darken-1': '#1F5592',
    'secondary': '#bd5ab1',
    'tertiary': '#90ee90',
    'secondary-darken-1': '#018786',
    'text': '#FFFFFF',
    'error': '#B00020',
    'info': '#2196F3',
    'success': '#4CAF50',
    'warning': '#FB8C00'
  },
  variables: {
    'radius-s': '4px',
    'radius-m': '8px',
    'radius-l': '12px',
    'border-color': '#000000',
    'border-opacity': 1.00,
    'high-emphasis-opacity': 0.87,
    'medium-emphasis-opacity': 0.60,
    'disabled-opacity': 0.38,
    'idle-opacity': 0.04,
    'hover-opacity': 0.04,
    'focus-opacity': 0.12,
    'selected-opacity': 0.08,
    'activated-opacity': 0.12,
    'pressed-opacity': 0.12,
    'dragged-opacity': 0.08
  }
}

export default createVuetify({
  theme: {
    defaultTheme: 'lightTheme',
    themes: {
      lightTheme
    }
  }
})
