<script setup lang="ts">
import type { ProductDetail } from '@/types/common'

interface MyProps {
  detailData: ProductDetail
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
  <view class="detail-demand">
    <view class="demand-title">
      免费领样要求
    </view>
    <view class="guigebox">
      <view v-if="props.detailData.sampleType === 1 && props.detailData.remark" class="guige">
        <view class="beizhu">
          备注
        </view>
        <view class="remark">
          {{ props.detailData.remark }}
        </view>
      </view>
      <view v-if="props.detailData.kolShopSale" class="guige">
        <view>总销量</view>
        <view>
          <text>≥</text>
          {{ props.detailData.kolShopSale }}
        </view>
      </view>
      <view v-if="props.detailData.monthShopSale" class="guige">
        <view>月销单量</view>
        <view>
          <text>≥</text>
          {{ props.detailData.monthShopSale }}
        </view>
      </view>
      <view v-if="props.detailData.kolGmv" class="guige">
        <view>近30天GMV</view>
        <view>
          <text>≥</text>
          {{ props.detailData.kolGmv }}
        </view>
      </view>
      <view v-if="props.detailData.kolLevel" class="guige">
        <view>达人等级</view>
        <view>
          <text>≥</text>
          Lv{{ props.detailData.kolLevel }}
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.detail-demand{
  padding: 32rpx 24rpx 16rpx 24rpx;
  background: #fff;
  border-radius: 16rpx;
  margin-top: 24rpx;
  .demand-title{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 28rpx;
    color: #000000;
    line-height: 28rpx;
    font-style: normal;
    margin-bottom: 12rpx;
  }
  .guigebox{
    background-color: #FFFFFF;
    border-radius: 16rpx;
  }
  .guige{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24rpx;
    min-height: 60rpx;
    font-size: 28rpx;
    font-style: normal;
    margin-bottom: 5px;
    view:nth-child(1){
      color: #999999;
      width: 160rpx;
    }
    .beizhu{
      width: 90rpx !important;
    }
    view:nth-child(2){
      flex: 1;
      color: #111111;
      text{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #BABABA;
        line-height: 28rpx;
        font-style: normal;
      }
    }
    .remark{
      line-height: 1.5 !important;
    }
  }
}
</style>
