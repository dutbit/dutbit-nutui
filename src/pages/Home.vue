<template>
  <div class="bit-container">
    <p>欢迎访问比特网络工作室前端主页</p>
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

<style scoped>
.nut-swiper-item img {
  height: 100%;
}
.nut-tabpane {
  padding: 0px;
}
.nut-cell {
  align-items: center;
}
.nut-cell img {
  width: 50px;
}
</style>
