<script setup lang="ts">
const imgBaseUrl = import.meta.env.VITE_IMG_URL

const show = ref<boolean>(false)

const imgUrl = ref<string>(`${imgBaseUrl}/invoice.png`)

function open() {
  show.value = true
}
function close() {
  show.value = false
}
// 暴露方法
defineExpose({
  open,
  close,
})
</script>

<script lang="ts">
export default {
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
</script>

<template>
  <wd-overlay :show="show" :z-index="99999" custom-style="background: rgba(43, 3, 17, 0.45);backdrop-filter: blur(10px);">
    <view v-if="show" class="poster-popup">
      <view class="title-box">
        <view class="title">
          示例
        </view>
        <view class="close">
          <text class="iconfont icon-close" @click="close" />
        </view>
      </view>
      <view class="card-swiper">
        <image
          class="card-image"
          :src="imgUrl"
          mode="scaleToFill"
        />
      </view>
    </view>
  </wd-overlay>
</template>

<style lang="scss" scoped>
.poster-popup{
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  .title-box{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 64rpx;
    margin-bottom: 48rpx;
    margin-left: 100rpx;
    .title{
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 36rpx;
      color: #FFFFFF;
      line-height: 36rpx;
      font-style: normal;
    }
    .close{
      width: 64rpx;
      height: 64rpx;
      background: rgba(255, 255, 255, 0.65);
      border-radius: 24rpx;
      text-align: center;
      .iconfont{
        font-size: 24rpx;
        color: #3E0418;
        line-height: 64rpx;
      }
    }
  }
}
.card-swiper {
  --wot-swiper-radius: 0;
  --wot-swiper-item-padding: 0 24rpx;
  --wot-swiper-nav-dot-color: #e7e7e7;
  --wot-swiper-nav-dot-active-color: #4d80f0;
  padding-bottom: 24rpx;
  .card-image{
    width: 100%;
  }
}
</style>
