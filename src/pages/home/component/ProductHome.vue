<script setup lang="ts">
// const { itemData } = defineProps<Props>()
const props = withDefaults(defineProps<Props>(), {})
interface Props {
  itemData: any
  coupon: any
}
const discount = computed(() => {
  if (props.coupon) {
    const num = Number(props.itemData.price) * (Number(props.coupon.discounts) / 100)
    return num.toFixed(2)
  }
  return props.itemData.price
})

function toDetail() {
  uni.navigateTo({
    url: `/pageHome/details/index?productId=${props.itemData.productId}&activityId=${props.itemData.activityId}`,
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
      <img class="img" :src="props.itemData.cover">
    </view>
    <view class="product-info">
      <view class="jiage">
        <template v-if="props.coupon">
          <DigitBold prefix="优惠后¥" :value="discount" int-size="42rpx" decimal-size="28rpx" color="#FF5017" :show-gap="false" />
          <wd-divider vertical color="#FF5017" />
          <DigitBold prefix="原价¥" :value="props.itemData.price" int-size="28rpx" decimal-size="28rpx" color="#FF5017" :show-gap="false" />
        </template>
        <DigitBold v-else :value="props.itemData.price" int-size="60rpx" prefix="¥" decimal-size="40rpx" color="#FF5017" />
        <view class="shiliang">
          {{ props.itemData.unit }}
        </view>
      </view>
      <view class="product-name">
        {{ props.itemData.productName }}
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.productBox{
  background-color: #fff;
  border-radius: 32rpx 32rpx 0 0;
  // padding: 28rpx;
  .product-top{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 28rpx 28rpx 0 28rpx;
    .top-item{
      display: flex;
      align-items: center;
      gap: 10rpx;
      padding: 16rpx 20rpx;
      background-color: #ffe4c8;
      border-radius: 50rpx;
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
    height: 600rpx;
    margin-top: 16rpx;
    .img{
      width: 100%;
      height: 100%;
    }
  }
  .product-info{
    margin-top: 16rpx;
    padding: 0rpx 28rpx 28rpx 28rpx;
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
      line-height: 40rpx;
      text-align: left;
    }
  }
}
</style>
