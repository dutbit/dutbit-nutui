<template>
  <nut-navbar
    @on-click-back="routeBack"
    :title="pageTitle"
    :left-show="isShowBack"
  ></nut-navbar>
  <div id="page">
    <div class="container">
      <router-view />
    </div>
  </div>
  <nut-tabbar
    :bottom="true"
    unactive-color="#7d7e80"
    active-color="#1989fa"
    id="tabbar"
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
    return { pageTitle: 'pageTitle', isShowBack: false }
  },
  inject: [],
  computed: {
    isHome() {
      return pageTitle == '首页'
    },
  },
  methods: {
    routeBack() {
      this.$router.go(-1)
    },
  },
  provide() {
    return {}
  },
  mounted() {
    this.$router.beforeEach((to, from) => {
      // console.log(to)
      this.pageTitle = to.meta?.pageTitle
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

#page {
  height: calc(100% - 94px);
  overflow-y: auto;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.nut-navbar {
  margin-bottom: 0px;
}
.nut-cell-group {
  width: 92%;
}
.nut-cell {
  align-items: center;
}
</style>
