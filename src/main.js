import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { Button, Cell, CellGroup, Icon, Range } from '@nutui/nutui'
import App from './App.vue'
import router from './router.js'

const app = createApp(App)
app.use(router)
app.use(Button)
app.use(Cell)
app.use(CellGroup)
app.use(Icon)
app.use(Range)
app.use(VueAxios, axios)
if (import.meta.env.DEV) {
  app.provide('axiosBaseURL', 'https://vm.dutbit.com/apivue')
} else {
  app.provide('axiosBaseURL', 'https://www.dutbit.com/apivue')
}
app.mount('#app')
