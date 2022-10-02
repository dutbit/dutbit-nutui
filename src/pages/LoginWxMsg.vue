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
      else if (!to.query.code) {
        // 1.记录上一个页面的地址
        window.localStorage.setItem('login_target', (to.query.login_target as string) ?? '/')
        // 2.跳转授权
        const redirect_url = 'https://dev.dutbit.com/wechat/login-wxmsg-redirect'
        const current_url = window.location.href
        that.$http
          .get('https://dev.dutbit.com/wechat/login-wxmsg-url', { params: { redirect_url, current_url } })
          .then((res) => {
            window.location.href = res.data
            // console.log(res.data)
          })
      } else
        that.$http.get('https://dev.dutbit.com/wechat/login-wxmsg-redirect', { params: to.query }).then((res) => {
          window.localStorage.setItem('Authorization', res.data.openid)
          const redirect = window.localStorage.getItem('login_target') ?? '/'
          // 跳转到授权前访问的页面
          that.$router.replace({ path: redirect })
        })
    })
  },
})
</script>
