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
  <view class="goods-warp">
    <view v-for="(item, index) in props.productList" :key="item.productId" class="goods-card" @click="toDetail(item)">
      <view class="ranking" :class="{ first: index === 0, second: index === 1, third: index === 2 }">
        {{ index + 1 }}
      </view>
      <view class="myimg">
        <image :src="item.cover" mode="scaleToFill" />
      </view>
      <view class="goods-content">
        <view class="goods-title">
          <wd-text
            :text="item.productName"
            :lines="1"
            size="28rpx"
            color="#111111"
          />
        </view>

        <view class="goods-sales">
          <view>
            <text>销量</text>
            <text>· {{ formatNumber(item.sales) }}</text>
          </view>
          <view>
            <text>公开佣金</text>
            <text>· {{ item.cosRatio }}%</text>
          </view>
        </view>
        <view class="goods-price">
          <view>
            <view class="label">
              到手价
            </view>
            <view class="price">
              <DigitBold :value="item.price" prefix="¥" int-size="32rpx" decimal-size="24rpx" color="#111111" />
            </view>
          </view>
          <view>
            <view class="label">
              达人高佣
            </view>
            <view class="ratio">
              <DigitBold :value="item.kolCosRatio" suffix="%" int-size="32rpx" decimal-size="24rpx" />
            </view>
          </view>
          <view>
            <view class="label">
              每单补
            </view>
            <view class="ratio">
              <DigitBold :value="item.kolServiceFee" prefix="¥" int-size="32rpx" decimal-size="24rpx" />
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.goods-warp {
  padding-bottom: 16rpx;
  .goods-card{
    position: relative;
    border-radius: 16rpx;
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 26rpx;
    padding: 32rpx 24rpx;
    margin-bottom: 24rpx;
    .ranking{
      position: absolute;
      top: 0;
      left: 0;
      width: 54rpx;
      height: 54rpx;
      line-height: 54rpx;
      text-align: center;
      background: #DADDE4;
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 36rpx;
      color: #ffffff;
      border-radius: 16rpx 0 16rpx 0;
      z-index: 9;
    }
    .first{
      background-color: #FF0057;
    }
    .second{
      background-color: #FF8600;
    }
    .third{
      background-color: #FF00F1;
    }
    .myimg{
      width: 164rpx;
      height: 164rpx;
      border-radius: 16rpx;
      overflow: hidden;
      image{
        width: 100%;
        height: 100%;
      }
    }
    .goods-content{
      flex: 1;
      .goods-title{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #111111;
        line-height: 28rpx;
        :deep(){
          .wd-text{
            font-weight: 400;
            font-size: 28rpx;
            color: #111111;
          }
        }
      }
      .goods-sales{
        display: flex;
        align-items: center;
        gap: 80rpx;
        margin-top: 10rpx;
        view{
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 20rpx;
          text:nth-child(1){
            color: #999999;
          }
          text:nth-child(2){
            color: #000000;
          }
        }
      }
      .goods-price{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 20rpx;
        .label{
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 24rpx;
          color: #999999;
          font-style: normal;
        }
        .price,.ratio{
          margin-top: 8rpx;
        }
      }
    }
  }
}
</style>
