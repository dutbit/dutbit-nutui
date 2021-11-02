import { createRouter, createWebHashHistory } from 'vue-router'

import home from './components/home.vue'
import func from './components/func.vue'
import message from './components/message.vue'
import my from './components/my.vue'
import about from './components/about.vue'
import raiseIssue from './components/raiseIssue.vue'

const routes = [
  { path: '/', component: home, meta: { pageTitle: '首页' } },
  { path: '/home', component: home, meta: { pageTitle: '首页' } },
  { path: '/func', component: func, meta: { pageTitle: '功能' } },
  { path: '/message', component: message, meta: { pageTitle: '消息' } },
  { path: '/my', component: my, meta: { pageTitle: '我的' } },
  { path: '/about', component: about, meta: { pageTitle: '关于' } },
  { path: '/func/raiseIssue', component: raiseIssue, meta: { pageTitle: '咨询反馈' } },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

export default router
