<template>
  <div class="container">
    <nut-swiper
      :init-page="0"
      :pagination-visible="true"
      pagination-color="#426543"
      auto-play="0"
      height="160"
    >
      <nut-swiper-item>
        <img
          src="https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg"
          alt=""
        />
      </nut-swiper-item>
      <nut-swiper-item>
        <img
          src="https://storage.360buyimg.com/jdc-article/welcomenutui.jpg"
          alt=""
        />
      </nut-swiper-item>
      <nut-swiper-item>
        <img
          src="https://storage.360buyimg.com/jdc-article/fristfabu.jpg"
          alt=""
        />
      </nut-swiper-item>
      <nut-swiper-item>
        <img
          src="https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg"
          alt=""
        />
      </nut-swiper-item>
      <nut-swiper-item>
        <img
          src="https://storage.360buyimg.com/jdc-article/welcomenutui.jpg"
          alt=""
        />
      </nut-swiper-item>
      <nut-swiper-item>
        <img
          src="https://storage.360buyimg.com/jdc-article/fristfabu.jpg"
          alt=""
        />
      </nut-swiper-item>
    </nut-swiper>
    <nut-tabs v-model="tab1value" animated-time="100" color="#ff0000">
      <nut-tab-pane title="Tab 1">
        <nut-cell-group>
          <template v-for="n in 7" :key="n">
            <nut-cell title="标题" sub-title="简介">
              <template v-slot:link>
                <img alt="Vue logo" src="../assets/logo.png" />
              </template>
            </nut-cell>
          </template>
        </nut-cell-group>
      </nut-tab-pane>
      <nut-tab-pane title="Tab 2"> Tab 2 </nut-tab-pane>
      <nut-tab-pane title="Tab 3"> Tab 3 </nut-tab-pane>
    </nut-tabs>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return { tab1value: '0' }
  },
  inject: [],
  computed: {},
  methods: {
    routeBack() {
      this.$router.go(-1)
    },
  },
  provide() {
    return {}
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
