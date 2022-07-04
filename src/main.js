import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'
import '@/assets/styles/main.scss'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(VueChartkick)

app.mount('#app')
