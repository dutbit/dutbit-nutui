<template>
  <div class="bit-container-n">
    <div class="bit-title">积分查询</div>
    <hr />
    <nut-input label="姓名" placeholder="请输入姓名" v-model="dictForm.name" />
    <nut-input label="学号" placeholder="请输入学号" type="number" v-model="dictForm.stu_id" />
    <div style="padding-top: 8px; display: flex; justify-content: flex-end">
      <nut-button type="info" size="small" style="margin-right: 5px" :loading="isLoading" @click="onSubmit">
        提交
      </nut-button>
      <nut-button size="small">重置</nut-button>
    </div>
  </div>
  <div :class="['resCard', { 'c-opacity-0': !isShowResult }]">
    <div class="resCard__info">
      姓名： <span> {{ dictForm.name }} </span>
    </div>
    <div class="resCard__info">
      学号： <span> {{ dictForm.stu_id }} </span>
    </div>
    <div class="resCard__desc">您的积分为</div>
    <div class="resCard__pt">-- {{ numPoints }} --</div>
  </div>
</template>

<script>
import { Notify } from '@nutui/nutui'
export default {
  data() {
    return {
      dictForm: { name: '', stu_id: '' },
      numPoints: 0,
      isShowResult: false,
      isLoading: false,
    }
  },
  methods: {
    onSubmit() {
      window.localStorage.setItem('point-form', JSON.stringify(this.dictForm))
      this.isLoading = true
      this.$http.post('/point/', this.dictForm).then((res) => {
        this.isLoading = false
        console.log(res)
        if (!res.data.error) {
          this.numPoints = res.data.dictRow.points
          this.isShowResult = true
          Notify.primary('查询完毕')
        } else Notify.warn('无查询结果')
      })
    },
  },
  mounted() {
    Object.assign(this.dictForm, JSON.parse(window.localStorage.getItem('point-form')))
  },
}
</script>

<style scoped>
.resCard {
  margin: 10px;
  padding: 10px 20px;
  border: 1px solid #c7c7c7;
  border-radius: 15px;
  box-shadow: 3px 3px 8px -4px #a1a1a1;
  background-color: #ffffff;
  font-size: 26px;
  color: #49adff;
  transition: opacity 0.5s;
}
.resCard__info span {
  color: #ff7332;
  border-bottom: 2px solid;
}
.resCard__desc {
  margin-top: 12px;
  font-size: 20px;
}
.resCard__pt {
  color: #ff541f;
  text-align: center;
  font-size: 40px;
}
</style>
