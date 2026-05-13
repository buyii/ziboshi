<script setup lang="ts">
import { useLayoutStore } from '@/stores'

const layoutStore = useLayoutStore()
const statusBarHeight = computed(() => {
  return layoutStore.layoutStore.statusBarHeight
})
function handleClickLeft() {
  uni.navigateBack()
}
function toHome() {
  // uni.switchTab({
  //   url: '/pages/home/index',
  // })
  uni.navigateBack({
    delta: 2,
  })
}
</script>

<template>
  <wd-navbar title="提交完成" safe-area-inset-top left-arrow fixed :bordered="false" @click-left="handleClickLeft" />
  <view class="page-box" :style="{ paddingTop: `${(statusBarHeight || 0) + 44}px`, textAlign: 'center' }">
    <wd-status-tip tip="已提交预计两小时内到账">
      <template #image>
        <image style="width: 195rpx;height: 195rpx;margin-top: 224rpx;" src="../../static/svg/tixian.svg" />
      </template>
    </wd-status-tip>

    <wd-button @click="toHome">
      返回
    </wd-button>
  </view>
</template>

<style lang="scss" scoped>
.page-box{
  :deep(){
    .wd-button{
      margin-top: 158rpx;
      width: 248rpx !important;
      height: 96rpx !important;
      background: #FFFFFF !important;
      border-radius: 48rpx !important;
      font-family: PingFangSC, PingFang SC !important;
      font-weight: 400 !important;
      font-size: 32rpx !important;
      color: #111111 !important;
      line-height: 32rpx !important;
      font-style: normal !important;
    }
  }
}
</style>

<route lang="json">
{
  "layout": "default",
  "name": "extractSuccess",
  "style": {
    "navigationBarTitleText": "提现完成"
  }
}
</route>
