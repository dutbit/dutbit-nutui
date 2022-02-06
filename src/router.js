import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './pages/Home.vue'
import Func from './pages/Func.vue'
import Message from './pages/Message.vue'
import My from './pages/My.vue'
import About from './pages/About.vue'
import CardimgCard from './pages/func/CardimgCard.vue'
import DayImage from './pages/func/DayImage.vue'
import IssueForm from './pages/func/IssueForm.vue'
import PointsQuery from './pages/func/PointsQuery.vue'
import VoltimeQuery from './pages/func/VoltimeQuery.vue'

const routes = [
  { path: '/', component: Home, meta: { pageTitle: '首页' } },
  { path: '/home', component: Home, meta: { pageTitle: '首页' } },
  { path: '/func', component: Func, meta: { pageTitle: '功能' } },
  { path: '/message', component: Message, meta: { pageTitle: '消息' } },
  { path: '/my', component: My, meta: { pageTitle: '我的' } },
  { path: '/about', component: About, meta: { pageTitle: '关于' } },
  { path: '/func/cardimg-card', component: CardimgCard, meta: { pageTitle: '专属证书' } },
  { path: '/func/dayImage', component: DayImage, meta: { pageTitle: '日历图', isShowTabbar: false } },
  { path: '/func/issue-form', component: IssueForm, meta: { pageTitle: '咨询反馈' } },
  { path: '/func/points', component: PointsQuery, meta: { pageTitle: '积分查询' } },
  { path: '/func/voltime', component: VoltimeQuery, meta: { pageTitle: '志愿时长查询' } },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

export default router
