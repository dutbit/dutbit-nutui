import { createRouter, createWebHashHistory } from 'vue-router'

import About from './pages/About.vue'
import Func from './pages/Func.vue'
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import Message from './pages/Message.vue'
import My from './pages/My.vue'
import CardimgCard from './pages/func/CardimgCard.vue'
import Dayimg from './pages/func/Dayimg.vue'
import IssueForm from './pages/func/IssueForm.vue'
import PointQuery from './pages/func/PointQuery.vue'
import Postcard from './pages/func/Postcard.vue'
import VoltimeQuery from './pages/func/VoltimeQuery.vue'

const default_mata = { pageTitle: '必填', isShowTabbar: true, isRequireAuth: false }

const routes = [
  { path: '/', component: Home, meta: { pageTitle: '首页' } },
  { path: '/home', component: Home, meta: { pageTitle: '首页' } },
  { path: '/func', component: Func, meta: { pageTitle: '功能' } },
  { path: '/message', component: Message, meta: { pageTitle: '消息' } },
  { path: '/my', component: My, meta: { pageTitle: '我的', isRequireAuth: true } },
  { path: '/about', component: About, meta: { pageTitle: '关于' } },
  { path: '/login', component: Login, meta: { pageTitle: '登录' } },
  { path: '/func/cardimg-card', component: CardimgCard, meta: { pageTitle: '专属证书' } },
  { path: '/func/dayimg', component: Dayimg, meta: { pageTitle: '日历图', isShowTabbar: false } },
  { path: '/func/issue-form', component: IssueForm, meta: { pageTitle: '咨询反馈' } },
  { path: '/func/point', component: PointQuery, meta: { pageTitle: '积分查询' } },
  { path: '/func/postcard', component: Postcard, meta: { pageTitle: '大工明信片' } },
  { path: '/func/voltime', component: VoltimeQuery, meta: { pageTitle: '志愿时长查询' } },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

export default router
