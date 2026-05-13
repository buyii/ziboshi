<script setup lang="ts">
import type { Sample } from '@/types/common'
// sampleData

interface MyProps {
  sampleData: Sample | null
}

const props = withDefaults(defineProps<MyProps>(), {
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
  <view class="store-card">
    <view class="store-box">
      <image :src="sampleData?.cover" />
      <view class="store-right">
        <view class="store-title">
          {{ props.sampleData?.productName }}
        </view>
        <view class="store-price-left">
          <text>到手价</text>
          <text>{{ props.sampleData?.sku?.effectivePrice }}元</text>
        </view>
        <view class="store-price">
          <view class="store-price-center">
            <text>高佣: 约</text>
            <text>{{ props.sampleData?.focKolCosFee }}</text>
            <text>元</text>
          </view>
          <view class="store-price-right">
            <text>每单补: 约</text>
            <text>{{ props.sampleData?.kolFocServiceFee }}</text>
            <text>元</text>
          </view>
        </view>
      </view>
    </view>
    <!-- <view class="store-foot">
      <view class="foot-item">
        <view>规格</view>
        <view>
          <text>1w</text>
          <text>可领</text>
        </view>
      </view>
      <view class="foot-item">
        <view>样品库存≥</view>
        <view>{{props.sampleData.sku?.stockNum}}</view>
      </view>
    </view> -->
  </view>
</template>

<style lang="scss" scoped>
.store-card{
  background-color: #fff;
  border-radius: 16rpx;
  margin-top: 24rpx;
  padding: 28rpx 24rpx 32rpx 24rpx;
}
.store-box{
  display: flex;
  gap: 22rpx;
  image{
    width: 128rpx;
    height: 128rpx;
    border-radius: 32rpx;
  }
  .store-right{
    flex: 1;
    .store-title{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 28rpx;
      color: #111111;
      line-height: 44rpx;
      font-style: normal;
    }
    .store-price-left{
        display: flex;
        align-items: center;
        gap: 8rpx;
        margin-top: 12rpx;
        text:nth-child(1){
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 24rpx;
          color: #333333;
          font-style: normal;
        }
        text:nth-child(2){
          font-family: DINAlternate, DINAlternate;
          font-weight: bold;
          font-size: 32rpx;
          color: #000000;
          font-style: normal;
        }
        text:nth-child(3){
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 24rpx;
          color: #111111;
          font-style: normal;
        }
      }
    .store-price{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 12rpx;
      .store-price-center,.store-price-right{
        display: flex;
        align-items: center;
        gap: 2rpx;
        text:nth-child(1){
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 24rpx;
          color: #666666;
          font-style: normal;
        }
        text:nth-child(2){
          font-family: DINAlternate, DINAlternate;
          font-weight: bold;
          font-size: 28rpx;
          color: #FF0057;
          font-style: normal;
          margin-left: 6rpx;
        }
        text:nth-child(3){
          font-family: DINAlternate, DINAlternate;
          font-weight: bold;
          font-size: 20rpx;
          color: #FF0057;
          font-style: normal;
        }
      }
    }
  }
}
.store-foot{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32rpx;
  gap: 32rpx;
  .foot-item{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6rpx;
    flex: 1;
    border: 1rpx solid #EEEEEE;
    height: 64rpx;
    border-radius: 16rpx;
    view:nth-child(1){
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 24rpx;
      color: #999999;
      font-style: normal;
    }
    view:nth-child(2){
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 24rpx;
      color: #111111;
      font-style: normal;
      display: flex;
      align-items: center;
      gap: 6rpx;
      text:nth-child(2){
        color: #444444;
      }
    }
  }
}
</style>
