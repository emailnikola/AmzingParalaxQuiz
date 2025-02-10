import { createSSRApp } from 'vue'
import { registerPlugins } from '@/plugins'
import App from '@/App.vue'

export function createSSRApplication() {
  const app = createSSRApp(App)
  registerPlugins(app)
  return { app }
}