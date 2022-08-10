<template>
  <nut-input label="我的姓名" placeholder="请输入姓名" v-model="dictForm.name" />
  <nut-input label="我的身份" placeholder="请选择" v-model="dictForm.role" readonly @click="isSwRolePker = true" />
  <nut-picker v-model:visible="isSwRolePker" :list-data="lstRoles" title="学部(院)" @confirm="onCfmRole" />
  <nut-input label="我祝大工" placeholder="请选择" v-model="dictForm.wish" readonly @click="isSwWishPker = true" />
  <nut-picker v-model:visible="isSwWishPker" :list-data="lstWishes" title="城市选择" @confirm="onCfmWish" />
  <div style="padding: 5px; text-align: right">
    <nut-button type="info" size="small" style="margin-right: 5px" @click="create">提交</nut-button>
    <nut-button size="small">重置</nut-button>
  </div>

  <img v-if="isSwImg" class="main__img" ref="img" style="width: 100%" src="/72card.png" />
  <canvas class="main__cvs" ref="cvs" style="display: none; width: 100%" />
  <div class="main__svg-box" ref="svg" style="display: none">
    <svg xmlns="http://www.w3.org/2000/svg" :width="svgAttr.width" :height="svgAttr.height">
      <template v-for="text in lstText" :key="text.id">
        <text :x="cNum(text.x)" :y="text.y" font-family="KaiTi" :font-size="text.fontSize">
          {{ text.text }}
        </text>
      </template>
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSwRolePker: false, //isShowRolePicker
      isSwWishPker: false, //isShowWishPicker
      isSwImg: false,
      svgAttr: { width: 100, height: 100 },
      dictForm: { name: '张三', role: '学生', wish: '越来越好！越来越棒！' },
      lstRoles: ['学生', '老师', '校友', '窝工粉丝'],
      lstWishes: [
        '学子前程似锦，为祖国建设做出更大贡献！',
        '妖风越来越温柔，猫猫越来越胖~',
        '学子头发多多，早日脱单',
        '玉兰花开更盛，大工人才辈出！',
        '越来越好！越来越棒！',
        '驰骋骐骥，长荷邦国重托！',
        '继往开来，早日建成世界一流大学！',
        '日益昌盛创辉煌，蒸蒸日上写华章！',
      ],
    }
  },
  computed: {
    lstText() {
      return [
        { x: 'width*0.17', y: 700, fontSize: 80, text: '亲爱的大工：' },
        { x: 400, y: 900, fontSize: 80, text: `我是${this.dictForm.name}` },
        { x: 240, y: 1020, fontSize: 80, text: `是一名${this.dictForm.role}` },
        { x: 240, y: 1140, fontSize: 80, text: `在您72岁生日到来之际，` },
        { x: 240, y: 1260, fontSize: 80, text: `我祝大工${this.dictForm.wish}` },
      ]
    },
  },
  methods: {
    create() {
      let img = new Image()
      img.setAttribute('crossorigin', 'anonymous')
      img.onload = () => {
        let cvs = /** @type {HTMLCanvasElement} */ (this.$refs.cvs)
        let ctx = cvs.getContext('2d')
        cvs.width = img.width
        cvs.height = img.height
        ctx.drawImage(img, 0, 0, cvs.width, cvs.height)
        this.svgAttr.width = img.width
        this.svgAttr.height = img.height
        this.$nextTick(() => {
          let imgText = new Image()
          imgText.setAttribute('crossorigin', 'anonymous')
          imgText.onload = () => {
            ctx.drawImage(imgText, 0, 0)
            this.$refs.img.src = cvs.toDataURL('image/png')
          }
          let svgBox = /** @type {HTMLDivElement} */ (this.$refs.svg)
          imgText.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgBox.innerHTML)))
          this.isSwImg = true
        })
      }
      img.src = '/72card.png'
    },
    //computeNumber
    cNum(raw) {
      let res = null
      if ((res = /width\*(.*)/.exec(String(raw)))) {
        return this.svgAttr.width * parseFloat(res[1])
      } else return raw
    },
    //onConfirm
    onCfmRole(res) {
      this.dictForm.role = res
    },
    onCfmWish(res) {
      this.dictForm.wish = res
    },
  },
}
</script>

<style scoped>
</style>
