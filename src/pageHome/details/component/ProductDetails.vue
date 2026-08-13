<script setup lang="ts">
const props = withDefaults(defineProps<Props>(), {})
interface Props {
  itemData: any
  swiperList: any[]
}

const currentimg = ref(0)
const userStore = useUserStore()

const coupon = computed(() => {
  const list = userStore.couponList
  const item = list.find((item: any) => item.calType === 2)
  return item
})
const discount = computed(() => {
  if (coupon.value) {
    const num = Number(props.itemData.price) * (Number(coupon.value.discounts) / 100)
    return num.toFixed(2)
  }
  return props.itemData.price
})

function swiperClick(e: any) {
  uni.previewImage({
    current: e.index,
    urls: props.swiperList,
  })
}
</script>

<template>
  <view class="productBox">
    <view class="detail-top">
      <wd-swiper
        v-model:current="currentimg"
        height="750rpx"
        :list="props.swiperList"
        autoplay
        :indicator="{ type: 'fraction' }"
        indicator-position="bottom-right"
        @click="swiperClick"
      />
    </view>
    <view class="product-info">
      <view class="jiage">
        <template v-if="coupon">
          <DigitBold prefix="优惠后¥" :value="discount" int-size="42rpx" decimal-size="28rpx" color="#FF5017" :show-gap="false" />
          <wd-divider vertical color="#FF5017" />
          <DigitBold prefix="原价¥" :value="props.itemData.price" int-size="28rpx" decimal-size="28rpx" color="#FF5017" :show-gap="false" />
        </template>
        <DigitBold v-else :value="props.itemData.price" int-size="60rpx" prefix="¥" decimal-size="40rpx" color="#FF5017" />
        <!-- <DigitBold :value="props.itemData.price" prefix="¥" int-size="80rpx" decimal-size="64rpx" color="#FF5017" /> -->
        <view class="shiliang">
          /{{ props.itemData.unit }}
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
  .img-box{
    width: 100%;
    height: 900rpx;
    .img{
      width: 100%;
      height: 100%;
    }
  }
  .product-info{
    margin-top: 32rpx;
    padding: 0 32rpx;
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
      font-weight: 500;
      font-size: 32rpx;
      color: #111111;
      line-height: 44rpx;
      text-align: left;
    }
  }
  .detail-top{
    position: relative;
    width: 100%;
    height: 750rpx;
    .image{
      width: 750rpx;
      height: 750rpx;
    }
    :deep(){
      .wd-swiper__track{
        border-radius: 0rpx;
      }
    }
  }
}
</style>
