<template>
  <div class="bit-container">
    <nut-cell-group title="团委相关">
      <nut-cell
        title="志愿时长查询问题"
        sub-title="权益部"
        desc="反馈页面"
        is-link
        to="/func/issue-form?type_id=2"
      ></nut-cell>
    </nut-cell-group>
    <nut-cell-group title="校园生活">
      <!-- 小团为你办实事已经不再使用 -->
      <!-- <nut-cell title="咨询反馈" is-link to="/func/issue-form"></nut-cell> -->
      <nut-cell title="日历图" is-link to="/func/dayimg"></nut-cell>
      <nut-cell title="志愿时长查询" is-link to="/func/voltime"></nut-cell>
      <nut-cell title="积分查询" is-link to="/func/point"></nut-cell>
      <nut-cell title="大工主页" desc="外部链接" is-link url="https://www.dlut.edu.cn/"></nut-cell>
      <nut-cell title="校园门户" desc="外部链接" is-link url="https://portal.dlut.edu.cn/"></nut-cell>
    </nut-cell-group>
  </div>
</template>

<script>
export default {
  components: {},
  inject: [],
  computed: {},
  methods: {
    routeBack() {
      this.$router.go(-1)
    },
  },
  mounted() {},
}
</script>

<style scoped></style>
