<script setup lang="ts">
const { itemData } = defineProps<Props>()
interface Props {
  itemData: any
}

function toDetail() {
  uni.navigateTo({
    url: `/pageHome/details/index?productId=${itemData.productId}&activityId=${itemData.activityId}`,
  })
}
</script>

<template>
  <view class="productBox" @click="toDetail">
    <view class="product-top">
      <view class="top-item">
        <text class="iconfont icon-gfzy item-text" />
        <text class="item-text">官方直营</text>
      </view>
      <view class="top-item">
        <text class="iconfont icon-pzbz item-text" />
        <text class="item-text">品质保障</text>
      </view>
      <view class="top-item">
        <text class="iconfont icon-shwy item-text" />
        <text class="item-text">售后无忧</text>
      </view>
    </view>
    <view class="img-box">
      <img class="img" :src="itemData.cover">
    </view>
    <view class="product-info">
      <view class="jiage">
        <DigitBold :value="itemData.price" int-size="64rpx" decimal-size="48rpx" color="#FF5017" />
        <view class="shiliang">
          /盒/十条
        </view>
      </view>
      <view class="product-name">
        {{ itemData.productName }}
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.productBox{
  background-color: #fff;
  border-radius: 32rpx;
  padding: 28rpx;
  .product-top{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .top-item{
      display: flex;
      align-items: center;
      gap: 10rpx;
      .item-text{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #444444;
        line-height: 28rpx;
        font-style: normal;
      }
    }
  }
  .img-box{
    width: 100%;
    height: 656rpx;
    margin-top: 32rpx;
    .img{
      width: 100%;
      height: 100%;
    }
  }
  .product-info{
    margin-top: 32rpx;
    .jiage{
      display: flex;
      align-items: baseline;
      .shiliang{
        margin-left: 10rpx;
        font-size: 24rpx;
        color: #999999;
        line-height: 24rpx;
      }
    }
    .product-name{
      margin-top: 12rpx;
      font-weight: 400;
      font-size: 32rpx;
      color: #222222;
      line-height: 44rpx;
      text-align: left;
    }
  }
}
</style>
