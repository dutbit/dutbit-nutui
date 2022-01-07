import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './pages/Home.vue'
import Func from './pages/Func.vue'
import Message from './pages/Message.vue'
import My from './pages/My.vue'
import About from './pages/About.vue'
import SelectIssueType from './pages/func/SelectIssueType.vue'
import DayImage from './pages/func/DayImage.vue'

const routes = [
  { path: '/', component: Home, meta: { pageTitle: '首页' } },
  { path: '/home', component: Home, meta: { pageTitle: '首页' } },
  { path: '/func', component: Func, meta: { pageTitle: '功能' } },
  { path: '/message', component: Message, meta: { pageTitle: '消息' } },
  { path: '/my', component: My, meta: { pageTitle: '我的' } },
  { path: '/about', component: About, meta: { pageTitle: '关于' } },
  {
    path: '/func/selectIssueType',
    component: SelectIssueType,
    meta: { pageTitle: '咨询反馈' },
  },
  {
    path: '/func/dayImage',
    component: DayImage,
    meta: { pageTitle: '日历图', isShowTabbar: false },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

export default router
