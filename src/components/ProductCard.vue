<script setup lang="ts">
import type { Product, ProductItem } from '@/types/common'

const props = withDefaults(defineProps<Product>(), {})

function toDetail(item: ProductItem) {
  uni.navigateTo({
    url: `/pageHome/details/index?productId=${item.productId}&activityId=${item.activityId}`,
  })
}
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
  <view class="product-warp">
    <view v-for="item in props.productList" :key="`${item.productId}${item.activityId}`" class="product-card" @click="toDetail(item)">
      <view class="product-info">
        <view v-if="item.trafficType" class="tuiliubox">
          <image v-if="item.trafficType.includes('1')" src="../static/svg/sxt.svg" mode="heightFix" class="tuiimg" />
          <image v-if="item.trafficType.includes('2')" src="../static/svg/qcqy.svg" mode="heightFix" class="tuiimg" />
        </view>
        <img :src="item.cover" style="width: 100%; height: 332rpx">
        <view class="product-content">
          <view class="flex justify-between">
            <view>
              <view class="rate">
                <text class="size10">
                  高佣
                </text>
                <text class="size14">
                  {{ item.kolCosRatio }}
                </text>
                <text class="size10 fuhao">
                  %
                </text>
              </view>
              <view class="rate1">
                <text>公开佣金</text>
                <text class="rate1fh">{{ item.cosRatio }}%</text>
              </view>
            </view>
            <view>
              <view class="yjlabel">
                预估赚
              </view>
              <DigitBold :value="item.focKolCosFee" color="#FF4600" />
            </view>
          </view>
          <view class="jieshao">
            {{ item.productName }}
          </view>
          <view class="flex-align-center justify-between">
            <view style="margin-top: 12rpx">
              <DigitBold :value="item.price" int-size="32rpx" decimal-size="24rpx" color="#000000" />
              <view class="daoshoulabel">
                到手价
              </view>
            </view>
            <view style="margin-top: 12rpx">
              <DigitBold :value="formatNumber(item.sales)" int-size="32rpx" decimal-size="24rpx" color="#000000" />
              <view class="daoshoulabel">
                总销量
              </view>
            </view>
            <view class="bubox">
              <DigitBold :value="item.kolFocServiceFee" int-size="32rpx" decimal-size="24rpx" prefix="¥" />
              <view class="daoshoulabel bumei">
                每单补
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.product-warp {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background: transparent;
  // padding-top: 20rpx;
  padding-bottom: 16rpx;
  gap: 10px; // 增加子元素之间的间隔
  .product-card{
    width: calc(50% - 5px);
    border-radius: 16rpx;
    overflow: hidden;
  }
  .product-info{
    border-radius: 16rpx;
    overflow: hidden;
    background-color: #fff;
    padding-bottom: 20rpx;
    position: relative;
  }
  .tuiliubox{
    position: absolute;
    top: 16rpx;
    left: 16rpx;
    display: flex;
    align-items: center;
    gap: 16rpx;
    .tuiimg{
      height: 36rpx;
    }
  }
  .product-content{
    padding: 0 20rpx;
  }
  .rate{
    height: 40rpx;
    color: #089D39;
    border-radius: 4rpx 16rpx 4rpx 16rpx;
    display: flex;
    align-items: baseline;
    .fuhao{
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 20rpx;
      color: #089D39;
      line-height: 20rpx;
      font-style: normal;
    }
    .size10{
      font-size: 20rpx;
    }
    .size14{
      font-size: 28rpx;
    }
    text:nth-child(1){
      margin-right: 6rpx;
    }
  }
  .rate1{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 16rpx;
    color: #999999;
    line-height: 16rpx;
    text-align: left;
    font-style: normal;
    margin-top: 8rpx;
    display: flex;
    gap: 8rpx;
    .rate1fh{
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 16rpx;
      color: #444444;
      line-height: 16rpx;
      font-style: normal;
    }
  }
  .yjlabel{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 20rpx;
    color: #FF4600;
    line-height: 20rpx;
    font-style: normal;
    margin-bottom: 12rpx;
    text-align: right;
  }
  .jieshao{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 24rpx;
    color: #333333;
    line-height: 32rpx;
    text-align: left;
    font-style: normal;
    white-space: nowrap;
    overflow: hidden;
    letter-spacing: 0.2px;
    margin: 4rpx 0 16rpx 0;
  }
  .bubox{
    position: relative;
    width: 88rpx;
    height: 88rpx;
    background: linear-gradient( 180deg, rgba(255,0,87,0.05) 0%, rgba(255,0,87,0) 100%);
    border-radius: 16rpx;
    border: 2rpx solid rgba(255,0,87,0.05);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .daoshoulabel{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 20rpx;
    color: #999999;
    line-height: 20rpx;
    font-style: normal;
    margin-top: 4rpx;
  }
  .bumei{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 20rpx;
    color: #089D39;
    line-height: 20rpx;
    font-style: normal;
  }
  .tuiguang{
    display: flex;
    align-items: baseline;
    text:nth-child(1){
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 20rpx;
      color: #666666;
      line-height: 20rpx;
      font-style: normal;
      margin-right: 8rpx;
    }
    text:nth-child(2){
      font-family: DINAlternate, DINAlternate;
      font-weight: bold;
      font-size: 32rpx;
      color: #FF0000;
      line-height: 32rpx;
      font-style: normal;
    }
    text:nth-child(3){
      font-family: DINAlternate, DINAlternate;
      font-weight: bold;
      font-size: 24rpx;
      color: #FF0000;
      line-height: 24rpx;
      font-style: normal;
    }
  }
  .yugu{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 16rpx;
    line-height: 16rpx;
    text-align: center;
    font-style: normal;
    margin-top: 12rpx;
    text:nth-child(1){
      color: #999999;
      margin-right: 8rpx;
    }
    text:nth-child(2){
      color: #FF0000;
    }
  }
}
</style>
