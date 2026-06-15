<script setup lang="ts">
import { useTabbar } from '@/composables/useTabbar'

const { setTabbarItemActive } = useTabbar()

function toHome() {
  setTabbarItemActive('home')
  uni.switchTab({
    url: '/pages/home/index',
  })
}
function toOrder() {
  uni.redirectTo({
    url: '/pageMine/orderList/index',
  })
}
</script>

<template>
  <wd-navbar title="支付成功" safe-area-inset-top fixed :bordered="false" custom-style="background: transparent;" />
  <view class="apply-warp">
    <view class="tip-box">
      <view class="tip-img">
        <image src="../../static/svg/yishenqing.svg" mode="scaleToFill" />
      </view>
      <view class="tip-btn">
        <wd-button @click="toHome">
          返回首页
        </wd-button>
        <wd-button @click="toOrder">
          查看订单
        </wd-button>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.apply-warp{
  height: 100vh;
  background-color: #fff;
  .tip-box{
    height: 626rpx;
    background: linear-gradient( 180deg, #E5FFFF 0%, #FFFFFF 100%);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    .tip-img{
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 50rpx;
      image{
        width: 244rpx;
        height: 230rpx;
      }
    }
    .tip-btn{
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 32rpx;
      margin-bottom: 60rpx;
      margin-top: 32rpx;
      :deep(){
        .wd-button:nth-child(1){
          width: 264rpx;
          height: 80rpx;
          background: rgba(8, 157, 57, 0.2);
          border-radius: 200rpx 30rpx 30rpx 200rpx;
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: 32rpx;
          color: #089D39;
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
  "name": "applySuccess",
  "style": {
    "navigationBarTitleText": "支付成功"
  }
}
</route>
