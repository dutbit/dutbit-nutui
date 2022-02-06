import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { Cell, CellGroup, Icon } from '@nutui/nutui'
import App from './App.vue'
import router from './router.js'

const app = createApp(App)
app.use(router)
app.use(Cell)
app.use(CellGroup)
app.use(Icon)
app.use(VueAxios, axios)
if (import.meta.env.DEV) {
  app.provide('axiosBaseURL', 'https://vm.dutbit.com/apivue')
} else {
  app.provide('axiosBaseURL', 'https://dev.dutbit.com/apivue')
}
app.mount('#app')
