<template>
  <div>Login</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  // https://next.router.vuejs.org/zh/guide/advanced/navigation-guards.html#组件内的守卫
  beforeRouteEnter(to, from, next) {
    next((that) => {
      if (window.localStorage.getItem('Authorization')) that.$router.replace('/')
      else {
        const loc = window.location
        if (loc.search) window.location.href = loc.origin + loc.pathname + loc.hash.split('?')[0] + loc.search

        if (!to.query.code) {
          // 1.记录上一个页面的地址
          window.localStorage.setItem('login_target', (to.query.login_target as string) ?? '/')
          // 2.跳转授权
          const urlCurrent = window.location.href
          that.$http.get('https://dev.dutbit.com/wechat/login-wx-url', { params: { urlCurrent } }).then((res) => {
            window.location.href = res.data
          })
        } else
          that.$http.get('https://dev.dutbit.com/wechat/login-redirect', { params: to.query }).then((res) => {
            window.localStorage.setItem('Authorization', res.data.openid)
            const redirect = window.localStorage.getItem('login_target') ?? '/'
            // 跳转到授权前访问的页面
            that.$router.replace({ path: redirect })
          })
      }
    })
  },
})
</script>
