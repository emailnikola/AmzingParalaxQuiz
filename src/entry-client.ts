import { createSSRApplication } from './main'

const { app } = createSSRApplication()

app.mount('#app')
