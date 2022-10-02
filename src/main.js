import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { Button, Cell, CellGroup, Icon, OverLay, Range, NoticeBar } from '@nutui/nutui'
import App from './App.vue'
import router from './router.js'

const app = createApp(App)
app.use(router)
app.use(Button).use(Cell).use(CellGroup)
app.use(Icon).use(OverLay)
app.use(Range).use(NoticeBar)
app.use(VueAxios, axios)

// prettier-ignore
if (import.meta.env.DEV) 
  app.provide('axiosBaseURL', 'https://dev.dutbit.com/apivue')
else 
  app.provide('axiosBaseURL', 'https://www.dutbit.com/apivue')

app.mount('#app')
