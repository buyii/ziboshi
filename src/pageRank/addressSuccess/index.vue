<script setup lang="ts">
import { useTabbar } from '@/composables/useTabbar'

const instance = getCurrentInstance()
const imgBaseUrl = import.meta.env.VITE_IMG_URL
const { setTabbarItemActive } = useTabbar()

function toHome() {
  setTabbarItemActive('home')
  uni.switchTab({
    url: '/pages/home/index',
  })
}
function toAdd() {
  const _this = instance?.proxy
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  const eventChannel = _this?.getOpenerEventChannel()

  eventChannel.emit('backEvent')
  uni.navigateBack()
}
</script>

<template>
  <wd-navbar title="地址管理" safe-area-inset-top :bordered="false" custom-style="background: transparent;" />
  <view class="apply-warp">
    <view class="tip-box">
      <wd-status-tip tip="地址新增完成">
        <template #image>
          <image style="width: 320rpx;height: 344rpx;margin-top: 112rpx;" :src="`${imgBaseUrl}/notData1.png`" />
        </template>
      </wd-status-tip>
      <view class="tip-btn">
        <wd-button @click="toHome">
          返回首页
        </wd-button>
        <wd-button @click="toAdd">
          继续新增
        </wd-button>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.apply-warp{
  .tip-box{
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    :deep(){
      .wd-status-tip__text{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #AAAAAA;
        line-height: 28rpx;
      }
    }
    .tip-btn{
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 32rpx;
      margin-top: 76rpx;
      :deep(){
        .wd-button:nth-child(1){
          width: 264rpx;
          height: 80rpx;
          background: #ffffff;
          border-radius: 200rpx 30rpx 30rpx 200rpx;
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: 32rpx;
          color: #999999;
          line-height: 80rpx;
          text-align: left;
          font-style: normal;
        }
        .wd-button:nth-child(2){
          width: 264rpx;
          height: 80rpx;
          background: #089D39;
          border-radius: 30rpx 200rpx 200rpx 30rpx;
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: 32rpx;
          color: #FFFFFF;
          line-height: 80rpx;
          text-align: left;
          font-style: normal;
        }
      }
    }
  }
}
</style>

<route lang="json">
{
  "layout": "default",
  "name": "addressSuccess",
  "style": {
    "navigationBarTitleText": "地址添加成功"
  }
}
</route>
