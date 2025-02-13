/* eslint-disable */
// @ts-nocheck
import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'

export const router = createRouter({
  history: typeof window !== 'undefined' ? createWebHistory(import.meta.env.BASE_URL) : createMemoryHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes)
})

router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
}).catch(e => { console.warn(e) })

export default router
