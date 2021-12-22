<template>
  <nut-swiper
    v-if="!updating"
    :init-page="lstCont.length - 1"
    height="100%"
    :pagination-visible="true"
    auto-play="0"
    :loop="false"
    pagination-color="#426543"
    @change="swiperChange"
  >
    <template v-slot:page>
      <div class="swiper-page">
        {{ lstCont[swiperIndex] }}
      </div>
    </template>
    <nut-swiper-item v-for="item in lstCont" :key="item.id">
      <img :src="toUrlImg(item)" />
    </nut-swiper-item>
  </nut-swiper>
  <nut-popup
    position="right"
    v-model:visible="isShowPopup"
    style="height: 100%; width: 50%; zindex: 2000"
  >
    <nut-cell-group title="时间">
      <nut-cell
        v-for="item in lstCata"
        :key="item.id"
        :title="item"
        @click="getCont(item)"
      ></nut-cell>
    </nut-cell-group>
  </nut-popup>
  <div class="di-btn">
    <nut-icon
      name="more-x"
      @click="isShowPopup = true"
      style="margin-right: 5px"
    />
    <nut-icon name="download" />
    <img
      class="fake-icon"
      :src="toUrlImg(this.lstCont[this.swiperIndex])"
      @click="showDownloadTip"
    />
  </div>
</template>

<script>
import { OverLay, Notify } from '@nutui/nutui'
export default {
  components: {},
  data() {
    return {
      swiperIndex: 0,
      isShowPopup: false,
      lstCata: [],
      nameDir: '',
      lstCont: [],
      updating: false,
    }
  },
  inject: ['axiosBaseURL', 'app'],
  computed: {},
  methods: {
    swiperChange(index) {
      this.swiperIndex = index
      this.app.pageTitle = this.lstCont[this.swiperIndex].split('.')[0]
    },
    getCata(isGetCont) {
      this.$http.get('/day-image/cata').then((res) => {
        this.lstCata = res.data.lstCata.sort().reverse()
        if (isGetCont) this.getCont(this.lstCata[0])
      })
    },
    getCont(nameDir) {
      this.$http.get(`/day-image/cont/${nameDir}`).then((res) => {
        this.nameDir = nameDir
        this.lstCont = res.data.lstCont.sort()
        this.swiperIndex = this.lstCont.length - 1
        this.swiperChange(this.swiperIndex)
        // https://www.jianshu.com/p/1a60557b74c1
        this.updating = true
        this.$nextTick(() => {
          this.updating = false
          this.isShowPopup = false
        })
      })
    },
    toUrlImg(filename) {
      return `${this.axiosBaseURL}/day-image/img/${this.nameDir}/${filename}`
    },
    showDownloadTip() {
      Notify.text('请长按后保存', {
        color: '#ad0000',
        background: '#ffe1e1',
      })
    },
  },
  provide() {
    return {}
  },
  mounted() {
    this.getCata(true)
  },
}
</script>

<style scoped>
.nut-swiper {
  height: 100%;
  background-color: rgb(80, 80, 80);
}
.nut-swiper-item {
  display: flex;
  align-items: center;
}
.nut-swiper-item img {
  width: 100%;
}
.swiper-page {
  position: absolute;
  bottom: 0;
  right: 0;
  height: 50px;
  padding: 5px;
  background: rgba(0, 0, 0, 0.33);
  border-radius: 10px;
  text-align: center;
  color: #fff;
  font-size: 14px;
}
.di-btn {
  position: absolute;
  top: 0;
  z-index: 2;
  padding: 5px;
  background: rgba(0, 0, 0, 0.33);
  color: #fff;
  font-size: 14px;
}
.fake-icon {
  width: 20px;
  height: 20px;
  margin-left: -20px;
  opacity: 0;
}
</style>
