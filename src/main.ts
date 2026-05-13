import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import 'uno.css'
import './uni.scss'
import router from './router'
import store from './stores'

const pinia = createPinia()

export function createApp() {
  const app = createSSRApp(App)
  app.use(pinia)
  app.use(store)
  app.use(router)
  return {
    app,
    pinia,
  }
}
