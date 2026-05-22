<script setup lang="ts">
import type { Sample } from '@/types/common'

interface MyProps {
  paymentData: Sample | null
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
      <view class="store-content">
        <image :src="paymentData?.cover" />
        <view class="store-right">
          <view class="store-title">
            <wd-text :text="props.paymentData?.productName" :lines="2" />
          </view>
          <view class="store-price">
            <DigitBold :value="props.paymentData!.price" int-size="48rpx" decimal-size="32rpx" color="#FF5100" />
          </view>
        </view>
      </view>
      <view class="num-box">
        <view class="num1">
          1
        </view>
        <view class="num2">
          数量
        </view>
      </view>
    </view>
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
  align-items: center;
  gap: 22rpx;
  .store-content{
    flex: 1;
    display: flex;
    gap: 22rpx;
  }
  .num-box{
    text-align: center;
    .num1{
      font-weight: 500;
      font-size: 40rpx;
      color: #000000;
      line-height: 40rpx;
    }
    .num2{
      margin-top: 8rpx;
      font-weight: 400;
      font-size: 16rpx;
      color: #999999;
      line-height: 16rpx;
    }
  }
  image{
    width: 176rpx;
    height: 176rpx;
    border-radius: 8rpx;
  }
  .store-right{
    height: 176rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    .store-title{
      font-weight: 400;
      font-size: 28rpx;
      color: #111111;
      :deep(){
        .wd-text{
          font-weight: 400;
          font-size: 28rpx;
          color: #111111;
          line-height: 36rpx;
        }
      }
    }
    .store-price{
      font-weight: 500;
      font-size: 48rpx;
      color: #FF5100;
      line-height: 48rpx;
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
