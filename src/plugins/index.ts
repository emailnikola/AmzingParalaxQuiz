import vuetify from '@/plugins/vuetify'
import pinia from '@/stores'
import router from '@/router'
import VueSmoothScroll from 'vue3-smooth-scroll'
import type { App } from 'vue'

export function registerPlugins (app: App): void {
  app.use(vuetify)
  app.use(router)
  app.use(pinia)
  app.use(VueSmoothScroll, {
    duration: 1200,
    updateHistory: false
  })
}
