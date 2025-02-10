import { renderToString } from 'vue/server-renderer'
import { createSSRApplication } from '@/main'

export async function render(): Promise<object> {
  const { app } = createSSRApplication()
  const ctx = {}
  const html = await renderToString(app, ctx)
  return { html }
}
