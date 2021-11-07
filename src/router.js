import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './components/Home.vue'
import Func from './components/Func.vue'
import Message from './components/Message.vue'
import My from './components/My.vue'
import About from './components/About.vue'
import SelectIssueType from './components/SelectIssueType.vue'

const routes = [
  { path: '/', component: Home, meta: { pageTitle: '首页' } },
  { path: '/home', component: Home, meta: { pageTitle: '首页' } },
  { path: '/func', component: Func, meta: { pageTitle: '功能' } },
  { path: '/message', component: Message, meta: { pageTitle: '消息' } },
  { path: '/my', component: My, meta: { pageTitle: '我的' } },
  { path: '/about', component: About, meta: { pageTitle: '关于' } },
  { path: '/func/selectIssueType', component: SelectIssueType, meta: { pageTitle: '咨询反馈' } },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

export default router
