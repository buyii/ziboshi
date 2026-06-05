<script setup lang="ts">
const { itemData, swiperList } = defineProps<Props>()
interface Props {
  itemData: any
  swiperList: any[]
}

const currentimg = ref(0)

function swiperClick(e: any) {
  uni.previewImage({
    current: e.index,
    urls: swiperList,
  })
}
</script>

<template>
  <view class="productBox">
    <!-- <view class="img-box">
      <image class="img" :src="itemData.cover" mode="aspectFill" />
    </view> -->
    <view class="detail-top">
      <!-- <image :src="detailData?.schema.cover" style="width: 750rpx;height: 750rpx;" /> -->
      <wd-swiper
        v-model:current="currentimg"
        height="750rpx"
        :list="swiperList"
        autoplay
        :indicator="{ type: 'fraction' }"
        indicator-position="bottom-right"
        @click="swiperClick"
      />
    </view>
    <view class="product-info">
      <view class="jiage">
        <DigitBold :value="itemData.price" prefix="¥" int-size="80rpx" decimal-size="64rpx" color="#FF5017" />
        <view class="shiliang">
          /{{ itemData.unit }}
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
