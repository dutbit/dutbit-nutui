import { createApp } from 'vue'
import { Icon } from '@nutui/nutui'
import App from './App.vue'
import router from './router.js'

const app = createApp(App)
app.use(router)
app.use(Icon)
app.mount('#app')
