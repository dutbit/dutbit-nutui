<template>
  <div class="bit-container-n">
    <div class="bit-title">志愿时长查询 <a href="#" style="font-size: 20px">排行榜</a></div>
    <div style="color: #0246b3; font-size: 20px; text-align: right">更新至：{{ lastDate }}</div>
    <hr />
    <nut-input label="姓名" placeholder="请输入姓名" v-model="dictForm.name" />
    <nut-input label="学号" placeholder="请输入学号" type="number" v-model="dictForm.stu_id" />
    <div style="padding-top: 8px; display: flex; justify-content: flex-end">
      <nut-button type="info" size="small" style="margin-right: 5px" :loading="isLoading" @click="onSubmit">
        提交
      </nut-button>
      <nut-button size="small">重置</nut-button>
    </div>
    <hr />
    <div class="err-alert" v-if="numSameID > 1 || numSameName > numDupName">
      数据异常，您的学号对应 <strong>{{ numSameID }}</strong> 个姓名，您的姓名对应
      <strong>{{ numSameName }}</strong> 个学号，请
      <router-link to="/func/issue-form?type=志愿时长查询">反馈错误</router-link>
    </div>
    <div class="err-alert" v-if="isErrQueryLost">数据有缺失，请 <a href="#">反馈错误</a></div>
    <div class="info-box">
      <span style="font-size: 28px">Hi,{{ dictForm.name }}</span>
      <span style="margin: 5px 0 0 auto; color: #f38200" v-if="lstVoltimes.length">
        记录数 {{ lstVoltimes.length }}，总时长 {{ totalDuration }} h
      </span>
    </div>
    <div style="width: 100%; overflow-x: auto">
      <table class="data-table">
        <thead>
          <tr>
            <th>学号</th>
            <th>姓名</th>
            <th>学院</th>
            <th>时间</th>
            <th>时长</th>
            <th>任务名称</th>
            <th>组织学院</th>
            <th>组织人</th>
            <th>备注</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in lstVoltimes" :key="item.id" :class="{ 'query-newly': item.queryNewly }">
            <td style="max-width: 7em">{{ item.stu_id }}</td>
            <td style="max-width: 7em">{{ item.name }}</td>
            <td style="max-width: 6em">{{ item.faculty }}</td>
            <td style="max-width: 7em">{{ item.activity_DATE }}</td>
            <td style="max-width: 3em">{{ item.duration }}</td>
            <td style="max-width: 15em">{{ item.activity_name }}</td>
            <td style="max-width: 15em">{{ item.activity_faculty }}</td>
            <td style="max-width: 7em">{{ item.duty_person }}</td>
            <td style="max-width: 15em">{{ item.remark }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { Notify } from '@nutui/nutui'
export default {
  data() {
    return {
      lastDate: '未知',
      dictForm: { name: '', stu_id: '' },
      lstVoltimes: [],
      totalDuration: 0,
      numSameID: 1,
      numSameName: 1,
      numDupName: 1,
      isErrQueryLost: false,
      isLoading: false,
    }
  },
  methods: {
    onSubmit() {
      window.localStorage.setItem('voltime-form', JSON.stringify(this.dictForm))
      this.isLoading = true
      this.$http.post('/voltime/', this.dictForm).then((res) => {
        // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
        Object.assign(this, res.data)
        this.isLoading = false
        Notify.primary('查询完毕')
      })
    },
  },
  mounted() {
    this.$http.get('/voltime/last-date').then((res) => {
      this.lastDate = res.data.lastDate
    })
    Object.assign(this.dictForm, JSON.parse(window.localStorage.getItem('voltime-form')))
  },
}
</script>

<style scoped>
.data-table {
  min-width: 52em;
  background-color: #fff;
  border-collapse: collapse;
}
tr {
  border-top: 1px solid #ddd;
}
tr.query-newly {
  background-color: #edf2ff;
}
td,
th {
  padding: 0.6rem 0.4rem;
  font-size: 14px;
  text-align: center;
  vertical-align: middle;
}
.err-alert {
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  background: #f8d7da;
  color: #721c24;
}
.info-box {
  display: flex;
  flex-flow: wrap;
  align-items: flex-end;
  margin: 10px;
  padding: 0 10px;
}
</style>
