import './assets/main.css'
// import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Notifications from '@kyvg/vue3-notification'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Notifications)

const modules: {[key: string]: any} = import.meta.glob("@/components/dynamic/**/*.vue", { eager: true })
for (const path in modules) {
  const splitFileName = path.split('/')
  const componentName = splitFileName[splitFileName.length - 1].split('.')[0]
  app.component(componentName, modules[path].default)
}

app.mount('#app')
