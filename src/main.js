import { createApp } from 'vue'
import {
  Avatar,
  Navbar,
  CellGroup,
  Cell,
  Icon,
  Tabbar,
  TabbarItem,
} from '@nutui/nutui'
import App from './App.vue'
import router from './router.js'

const app = createApp(App)
app.use(router)
app.use(Avatar)
app.use(Navbar)
app.use(CellGroup)
app.use(Cell)
app.use(Icon)
app.use(Tabbar)
app.use(TabbarItem)
app.mount('#app')
