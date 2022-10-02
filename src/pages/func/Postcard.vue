<template>
  <nut-drag direction="y" :style="{ left: '0px', top: '55px' }">
    <nut-button type="info" size="small" shape="square" @click="this.isSwForm = true">修改</nut-button>
  </nut-drag>
  <div :class="['card__form', { hide: !isSwForm }]">
    <nut-form ref="form" :model-value="dictForm">
      <nut-form-item label="我的姓名" prop="name" :rules="[{ required: true, message: '请输入姓名' }]">
        <input class="nut-input-text" placeholder="请输入姓名" v-model="dictForm.name" />
      </nut-form-item>
      <nut-form-item label="我的身份" prop="role" :rules="[{ required: true, message: '请选择身份' }]">
        <input
          class="nut-input-text"
          placeholder="请选择"
          v-model="dictForm.role"
          readonly
          @click="isSwRolePker = true"
        />
        <nut-picker
          v-model:visible="isSwRolePker"
          :columns="lstRoles"
          title="选择身份"
          @confirm="({ selectedValue }) => (dictForm.role = selectedValue[0])"
        />
      </nut-form-item>
      <nut-form-item label="我祝大工" prop="wish" :rules="[{ required: true, message: '请填写祝福' }]">
        <nut-text-area placeholder="请输入或选择" v-model="dictForm.wish" rows="3" max-length="50" />
        <nut-picker
          v-model:visible="isSwWishPker"
          :columns="lstWishes"
          title="选择祝福"
          @confirm="({ selectedValue }) => (dictForm.wish = selectedValue[0])"
        />
      </nut-form-item>
    </nut-form>
    <div style="padding: 5px 0; display: flex">
      <nut-button style="flex: auto" size="small" type="info" @click="isSwWishPker = true">选择祝福</nut-button>
      <nut-button style="flex: auto; margin: 0 5px" size="small" type="info" @click="preBg()">上一张背景</nut-button>
      <nut-button style="flex: auto" size="small" type="info" @click="nextBg()">下一张背景</nut-button>
    </div>
    <div style="padding: 5px 0">
      <nut-button block type="primary" shape="square" @click="getShot()">生成明信片</nut-button>
    </div>
  </div>
  <img ref="img" style="width: 100%" src="/01.jpg" />
  <div ref="result" style="display: none"></div>
  <div ref="card" class="card">
    <img class="card__bg" :src="lstBg[indBg]" alt="Vue logo" />
    <div class="card__content">
      <div class="ct1">亲爱的大工：</div>
      <div class="ct2">
        我是{{ dictForm.name }}，是一名{{ dictForm.role }}，在您73岁生日到来之际，我祝大工{{ dictForm.wish }}
      </div>
    </div>
  </div>
  <nut-audio
    v-if="isSwAudio"
    class="card__audio"
    type="icon"
    url="https://oss.dutbit.com/03%20%E8%8A%B1%E5%92%B2%E3%81%8F%E6%96%9C%E9%9D%A2.mp3"
    :autoplay="true"
    :loop="true"
  />
</template>

<script>
import html2canvas from 'html2canvas'
import { Dialog, Toast } from '@nutui/nutui'
export default {
  data() {
    return {
      isSwAudio: false,
      isSwRolePker: false, //isShowRolePicker
      isSwWishPker: false, //isShowWishPicker
      isSwForm: true,
      isSwCus: false,
      lstBg: ['/01.jpg', '/02.jpg', '/03.jpg', '/04.jpg', '/05.jpg', '/06.jpg'],
      indBg: 0,
      dictForm: { name: '', role: '学生', wish: '' },
      lstRoles: ['学生', '老师', '校友', '我工粉丝'].map((value) => {
        return { text: value, value: value }
      }),
      lstWishes: [
        '生日快乐！',
        '四季皆美，岁月温柔！',
        '日新月异，未来可期！',
        '加速跑，向未来！',
        '学子前程似锦，建功新时代！',
        '事业发展蒸蒸日上！',
        '越来越好，越来越棒！',
        '继往开来，再谱新篇！',
      ].map((value) => {
        return { text: value, value: value }
      }),
    }
  },
  methods: {
    preBg() {
      this.indBg--
      if (this.indBg <= 0) this.indBg = this.lstBg.length - 1
    },
    nextBg() {
      this.indBg++
      if (this.indBg >= this.lstBg.length) this.indBg = 0
    },
    getShot() {
      this.$refs.form.validate().then(({ valid, errors }) => {
        if (valid) {
          this.isSwForm = false
          Toast.loading('生成中...', { duration: 0 })
          html2canvas(this.$refs.card).then((canvas) => {
            this.$refs.img.src = canvas.toDataURL('image/png')
            this.$refs.result.appendChild(canvas)
            Toast.hide()
            Toast.success('生成完毕，请长按图片保存')
          })
        } else console.log('表单校验未通过', errors)
      })
    },
    swOpeningDia() {
      Dialog({
        title: '送你一张明信片',
        content: '*点击确定开始播放背景音乐',
        noCancelBtn: true,
        onOk: () => {
          this.isSwAudio = true
        },
      })
    },
  },
  mounted() {
    this.indBg = Math.floor(Math.random() * this.lstBg.length)
    this.swOpeningDia()
  },
}
</script>

<style lang="less" scoped>
.nut-tabbar {
  display: none;
}
</style>

<style lang="less" scoped>
.card__form {
  position: absolute;
  top: 0;
  width: 80%;
  height: 405px;
  margin: 32% 10% 0;
  padding: 10% 5%;
  z-index: 10;
  background-color: #fffaea;
  border-radius: 10px;
  transition: 0.5s;

  &.hide {
    top: -100vh;
  }
}

.card {
  position: absolute;
  top: 0;
  pointer-events: none;
}
.card__bg {
  display: block; /* 解决img底部白边 */
  width: 100%;
}
.card__content {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 40% 16%;

  .ct1 {
    font-size: 28px;
  }
  .ct2 {
    width: 100%;
    margin-top: 18%;
    font-size: 23px;
    text-align: justify;
    text-indent: 2em;
  }
}
.card__audio {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 20;
}
.nut-drag {
  z-index: 100 !important;
}
</style>
