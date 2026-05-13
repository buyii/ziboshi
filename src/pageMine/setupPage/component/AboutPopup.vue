<script setup lang="ts">
import { useLayoutStore } from '@/stores'

const show = ref<boolean>(false)
const value = ref<number[]>([])
const { setLayoutStore } = useLayoutStore()
function open() {
  show.value = true
  setLayoutStore({ noScroll: true })
  console.log('open')
}

function close() {
  show.value = false
  setLayoutStore({ noScroll: false })
}

function onConfirm() {
  console.log(value.value)
  show.value = false
  setLayoutStore({ noScroll: false })
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
  <view>
    <wd-popup
      v-model="show"
      position="bottom" custom-style="height: 1226rpx;border-radius: 32rpx 32rpx 0rpx 0rpx;overflow: hidden;"
      :z-index="999" @close="close"
    >
      <view class="title">
        <view>关于我们</view>
      </view>
      <view class="popup-content">
        <image class="logo" src="../../../static/logo.svg" />
        <view class="name">
          星佣宝
        </view>
        <view class="ver">
          Version 1.0.11
        </view>
        <view class="time">
          2025.03.20
        </view>
        <view class="brief">
          <view class="text">
            在数字经济飞速发展的时代，星佣宝应运而生，平台以创新模式+数字智能相结合，为商家与达人之间构建了一个高效的选品系统。凭借独特的商业模式、先进的交易管理、强大的数据分析等，打造业界领先的辅助交易平台。开创一个全新的商业生态，实现多方共赢。
          </view>
          <!-- <view class="text">
            星佣宝不仅解决了，商家和达人之间的效率问题还开创了一个全新的商业生态实现多方共赢
          </view> -->
        </view>
      </view>
      <view class="btn-box">
        <wd-button block @click="onConfirm">
          知道啦
        </wd-button>
      </view>
    </wd-popup>
  </view>
</template>

<style lang="scss" scoped>
.title{
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  display: flex;
  z-index: 99;
  background-color: #fff;
  align-items: center;
  justify-content: space-between;
  height: 116rpx;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 36rpx;
  color: #000000;
  text-align: left;
  font-style: normal;
  padding: 0 48rpx;
}
.bannerimg{
  width: 654rpx;
  height: 200rpx;
  border-radius: 8rpx;
  position: absolute;
  left: 0;
  top: 116rpx;
  right: 0;
  margin: 0 auto;
}
.popup-content{
  padding: 116rpx 40rpx 0 40rpx;
  background-color: #F4F4F4;
  height: 918rpx;
  text-align: center;
  .logo{
    width: 130rpx;
    height: 130rpx;
    background: #FF0057;
    border-radius: 32rpx;
    margin: 96rpx 0 80rpx;
  }
  .name{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 40rpx;
    color: #000000;
    line-height: 40rpx;
    font-style: normal;
  }
  .ver{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 32rpx;
    color: #666666;
    line-height: 32rpx;
    font-style: normal;
    margin-top: 24rpx;
  }
  .time{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 24rpx;
    color: #999999;
    line-height: 24rpx;
    font-style: normal;
    margin-top: 24rpx;
  }
  .brief{
    background: #FFFFFF;
    border-radius: 32rpx;
    padding: 32rpx;
    text-align: left;
    margin-top: 48rpx;
    .text{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 28rpx;
      color: #444444;
      line-height: 40rpx;
      font-style: normal;
    }
    .text:nth-child(2){
      margin-top: 16rpx;
    }
  }
}
.btn-box{
  padding-bottom: calc(12rpx + env(safe-area-inset-bottom));
  background-color: #fff;
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 6rpx;
  padding-left: 32rpx;
  padding-right: 32rpx;
  :deep(){
    .wd-button{
      flex: 1;
      height: 88rpx !important;
      background: #FF0057 !important;
      border-radius: 16rpx 200rpx 200rpx 16rpx !important;
      font-size: 32rpx !important;
      font-weight: 500 !important;
    }
    .wd-button__text{
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 32rpx;
    }
  }
}
</style>
