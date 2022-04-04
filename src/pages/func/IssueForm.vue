<template>
  <div class="bit-container-n">
    <div class="bit-title">{{ dictForm.type == '小团儿为你办实事' ? '小团儿办实事' : '反馈' }}</div>
    <hr />
    <nut-form ref="form" :model-value="dictForm">
      <nut-form-item label="反馈类型" prop="type" required :rules="[{ required: true, message: '请选择反馈类型' }]">
        <input
          class="nut-input-text"
          placeholder="请选择反馈类型"
          v-model="dictForm.type"
          readonly
          @click="isSwTypePker = true"
        />
        <nut-picker v-model:visible="isSwTypePker" :list-data="lstTypes" title="反馈类型" @confirm="onCfmType" />
      </nut-form-item>
      <nut-form-item label="联系方式" prop="contact" required :rules="[{ required: true, message: '请填写联系方式' }]">
        <input class="nut-input-text" placeholder="邮箱（推荐）/电话" v-model="dictForm.contact" />
      </nut-form-item>
      <nut-form-item label="姓名" prop="name">
        <input class="nut-input-text" placeholder="请输入姓名" v-model="dictForm.name" type="text" />
      </nut-form-item>
      <nut-form-item label="学号" prop="stu_id">
        <input class="nut-input-text" placeholder="请输入学号" v-model="dictForm.stu_id" type="number" />
      </nut-form-item>
      <nut-form-item label="反馈内容" prop="content" required :rules="[{ required: true, message: '请填写反馈内容' }]">
        <nut-text-area
          placeholder="遇到的问题或您的建议"
          v-model="dictForm.content"
          rows="7"
          max-length="200"
          limit-show
        />
      </nut-form-item>
    </nut-form>
    <vue-hcaptcha ref="hcap" sitekey="45d5cbb6-8bcf-4348-951a-eeaee561d7cb" @verify="isVerified = true"></vue-hcaptcha>
    <div style="padding: 5px; display: flex; justify-content: flex-end">
      <nut-button type="info" :disabled="!isVerified" :loading="isLoading" @click="onSubmit">提交</nut-button>
      <nut-button style="margin-left: 5px" @click="onReset">重置</nut-button>
    </div>
  </div>
</template>

<script>
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha'
import { Toast } from '@nutui/nutui'
export default {
  components: { VueHcaptcha },
  data() {
    return {
      dictForm: { type: '', contact: '', name: '', stu_id: null, content: '', referer: '' },
      lstTypes: [],
      isSwTypePker: false,
      isVerified: false,
      isLoading: false,
    }
  },
  methods: {
    onCfmType(res) {
      this.dictForm.type = res
    },
    onSubmit() {
      this.$refs.form.validate().then(({ valid, errors }) => {
        if (valid) {
          this.isLoading = true
          Toast.loading('正在提交')
          this.$http.post('/issue/', this.dictForm).then((res) => {
            this.isLoading = false
            this.onReset()
            Toast.success('已提交')
          })
        } else console.log('表单校验未通过', errors)
      })
    },
    onReset() {
      Object.assign(this.dictForm, { type: '', contact: '', name: '', stu_id: null, content: '', referer: '' })
      this.$refs.hcap.reset()
    },
  },
  mounted() {
    this.$http.get('/issue/').then((res) => {
      Object.assign(this, res.data)
    })
  },
  // https://next.router.vuejs.org/zh/guide/advanced/navigation-guards.html#组件内的守卫
  beforeRouteEnter(to, from, next) {
    next((comp) => {
      comp.dictForm.referer = from.fullPath
      comp.dictForm.type = to.query.type
    })
  },
}
</script>

<style scoped>
</style>
