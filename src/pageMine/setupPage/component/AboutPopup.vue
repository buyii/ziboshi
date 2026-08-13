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
        <image class="logo" src="../../../static/logo.jpg" />
        <view class="name">
          滋博士
        </view>
        <view class="ver">
          Version 1.0.0
        </view>
        <view class="time">
          2026.06.15
        </view>
        <view class="brief">
          <view class="text">
            滋博士是深耕男性滋补的垂直电商小程序，针对当前男性精力不足、体虚乏力、熬夜损耗等问题精准发力。平台恪守草本本源、科学配比配方，每批次均可溯源，并经过权威检测，无多余添加、不夸大功效。微信一键登录，兼顾隐私保护、极速发货与专业售后，让滋补选购省心又安心。
          </view>
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
    background: #089D39;
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
      background: #089D39 !important;
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
