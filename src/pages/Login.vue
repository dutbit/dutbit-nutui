<template>
  <div class="bit-container-n">
    <div class="bit-title">登录</div>
    <hr />
    <nut-form ref="form" :model-value="dictForm">
      <nut-form-item label="邮箱地址" prop="email" required :rules="rulesEmail">
        <input class="nut-input-text" placeholder="请输入邮箱地址" v-model="dictForm.email" />
      </nut-form-item>
      <nut-form-item label="密码" prop="password" required :rules="[{ required: true, message: '请输入密码' }]">
        <input class="nut-input-text" placeholder="请输入密码" v-model="dictForm.password" type="password" />
      </nut-form-item>
    </nut-form>
    <nut-button block type="info" shape="square" :loading="isLoading" @click="onLogin">登录</nut-button>
  </div>
</template>

<script>
import SHA512 from 'crypto-js/sha512'
import { Notify, Toast } from '@nutui/nutui'
export default {
  components: {},
  data() {
    return {
      dictForm: { email: '', password: '' },
      rulesEmail: [
        { required: true, message: '请输入邮箱地址' },
        { regex: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: '邮箱格式不正确' },
      ],
      isLoading: false,
    }
  },
  computed: {},
  inject: [],
  provide() {
    return {}
  },
  methods: {
    onLogin() {
      this.$refs.form.validate().then(({ valid, errors }) => {
        if (valid) {
          let payload = Object.assign({}, this.dictForm)
          console.log(payload)
          payload.password = SHA512(payload.password).toString()
          console.log(payload.password)
          this.isLoading = true
          this.$http.post('/login', payload).then((res) => {
            console.log(res)
            this.isLoading = false
            if (res.data.success === true) {
              window.localStorage.setItem('Authorization', res.data.token)
              Notify.success('登录成功')
              this.$router.replace('/func')
            } else Toast.fail(res.data.details, { title: '错误' })
          })
        } else console.log('表单校验未通过', errors)
      })
    },
  },
  mounted() {},
}
</script>

<style scoped>
</style>
