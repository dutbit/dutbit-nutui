import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { Button, Cell, CellGroup, Icon, OverLay, Range, NoticeBar } from '@nutui/nutui'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.use(Button).use(Cell).use(CellGroup)
app.use(Icon).use(OverLay)
app.use(Range).use(NoticeBar)
app.use(VueAxios, axios)

app.provide('axiosBaseURL', import.meta.env.VITE_AXIOS_BASE)

app.mount('#app')
