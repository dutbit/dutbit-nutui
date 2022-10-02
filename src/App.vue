<template>
  <nut-navbar :title="app.pageTitle" :left-show="isShowBack" @on-click-back="routeBack">
    <template #right>
      <nut-icon name="home" @click="goHome"></nut-icon>
    </template>
  </nut-navbar>
  <div style="position: relative; flex: auto; overflow-y: auto">
    <div style="min-height: calc(100% - 40px)"><router-view /></div>
    <div :class="['footer', { 'bit-hidden': !isShowTabbar }]">&copy; 校团委 · 比特网络工作室</div>
  </div>
  <nut-tabbar
    unactive-color="#7d7e80"
    active-color="#1989fa"
    :class="{ 'bit-hidden': !isShowTabbar }"
    v-model:visible="activeTabbar"
  >
    <nut-tabbar-item tab-title="首页" icon="home" to="/home" />
    <nut-tabbar-item tab-title="功能" icon="category" to="/func" />
    <nut-tabbar-item tab-title="消息" icon="message" to="/message" />
    <nut-tabbar-item tab-title="我的" icon="my" to="/my" />
  </nut-tabbar>
</template>

<script>
import { ref } from 'vue'
export default {
  data() {
    return {
      isShowBack: false,
      isShowTabbar: true,
      activeTabbar: 0,
      app: {
        pageTitle: 'pageTitle',
      },
    }
  },
  setup() {
    let isShowBack = ref(false)
    let isShowTabbar = ref(true)
    let activeTabbar = ref(0)


    return {
      isShowBack,
      isShowTabbar,
      activeTabbar
    }
  },
  computed: {
    isHome() {
      return this.app.pageTitle == '首页'
    },
  },
  inject: ['axiosBaseURL'],
  provide() {
    return { app: this.app }
  },
  methods: {
    routeBack() {
      this.$router.go(-1)
    },
    goHome() {
      this.$router.push('/')
      this.activeTabbar = 0
    },
  },
  mounted() {
    this.$http.defaults.baseURL = this.axiosBaseURL
    this.$http.interceptors.request.use((config) => {
      config.headers.Authorization = window.localStorage.getItem('Authorization')
      return config
    })
    this.$router.beforeEach((to, from) => {
      if (to.meta.isRequireAuth ?? false) {
        let token = window.localStorage.getItem('Authorization')
        if (!token) return { path: '/login', query: { login_target: to.fullPath } }
      }
      // console.log(to)
      document.title = to.meta?.pageTitle
      this.app.pageTitle = to.meta?.pageTitle
      this.isShowTabbar = to.meta?.isShowTabbar ?? true
      let lenPath = to.path.split('/').length
      this.isShowBack = lenPath > 2
    })
  },
}
</script>

<style scoped>
.footer {
  height: 20px;
  margin: 10px;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #ccc;
}
</style>

<style>
/* 公共样式 */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
  width: 100%;
  margin: 0px;
  background: #f5f6f8;
}

#app {
  display: flex;
  flex-direction: column;
}

hr {
  height: 2px;
  width: 100%;
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  margin: 10px 0;
}

.nut-navbar {
  flex: none;
  margin-bottom: 0px;
}
.nut-form .nut-form-item__label.required::before {
  content: '';
  margin: 0;
}
.nut-form .nut-form-item__label.required::after {
  content: '*';
  color: #fa2c19;
  margin-left: 4px;
}

.bit-hidden {
  display: none;
}

.bit-container {
  display: flex;
  flex-direction: column;
  padding: 10px 10px 0;
}
.bit-container-n {
  padding: 10px 10px 0;
}
.bit-title {
  font-size: 30px;
  margin-left: 20px;
  text-align: center;
}
.c-hidden {
  display: none;
}
.c-opacity-0 {
  opacity: 0;
}
</style>
