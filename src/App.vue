<template>
  <nut-navbar
    :title="pageTitle"
    :left-show="isShowBack"
    icon="home"
    @on-click-back="routeBack"
    @on-click-send="goHome"
  ></nut-navbar>
  <div id="page">
    <router-view />
  </div>
  <nut-tabbar
    unactive-color="#7d7e80"
    active-color="#1989fa"
    id="tabbar"
    :class="{ 'at-hidden': !isShowTabbar }"
    v-model:visible="activeTabbar"
  >
    <nut-tabbar-item tab-title="首页" icon="home" to="/home"></nut-tabbar-item>
    <nut-tabbar-item
      tab-title="功能"
      icon="category"
      to="/func"
    ></nut-tabbar-item>
    <nut-tabbar-item
      tab-title="消息"
      icon="message"
      to="/message"
    ></nut-tabbar-item>
    <nut-tabbar-item tab-title="我的" icon="my" to="/my"></nut-tabbar-item>
  </nut-tabbar>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      pageTitle: 'pageTitle',
      isShowBack: false,
      isShowTabbar: true,
      activeTabbar: 0,
    }
  },
  inject: ['axiosBaseURL'],
  computed: {
    isHome() {
      return pageTitle == '首页'
    },
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
  provide() {
    return {}
  },
  mounted() {
    this.$http.defaults.baseURL = this.axiosBaseURL
    this.$http.interceptors.request.use((config) => {
      config.headers.Authorization = window.localStorage.getItem('token')
      return config
    })
    this.$router.beforeEach((to, from) => {
      // console.log(to)
      document.title = to.meta?.pageTitle
      this.pageTitle = to.meta?.pageTitle
      this.isShowTabbar = to.meta?.isShowTabbar ?? true

      let lenPath = to.path.split('/').length
      this.isShowBack = lenPath > 2
    })
  },
}
</script>

<style>
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

.at-hidden {
  display: none;
}

#page {
  position: relative;
  flex: auto;
  overflow-y: auto;
}

.container {
  display: flex;
  flex-direction: column;
  padding: 10px;
}
.nut-navbar {
  margin-bottom: 0px;
}
</style>
