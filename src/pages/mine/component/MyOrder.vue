<script setup lang="ts">
import order1 from '@/static/svg/order1.svg'
import order2 from '@/static/svg/order2.svg'
import order3 from '@/static/svg/order3.svg'
import order4 from '@/static/svg/order4.svg'
import order5 from '@/static/svg/order5.svg'

export interface TabsProps {
  countData: any
}

const props = withDefaults(defineProps<TabsProps>(), {})

const list = computed(() => [
  {
    title: '待付款',
    icon: order1,
    url: '/pageMine/orderList/index',
    value: 0,
  },
  {
    title: '待发货',
    icon: order2,
    url: '/pageMine/orderList/index',
    value: props.countData.waitSend,
  },
  {
    title: '待收货',
    icon: order3,
    url: '/pageMine/orderList/index',
    value: props.countData.waitRece,
  },
  {
    title: '已完成',
    icon: order4,
    url: '/pageMine/orderList/index',
    value: 0,
  },
  {
    title: '退款/售后',
    icon: order5,
    url: '/pageMine/orderList/index',
    value: props.countData.refund,
  },
])

function toOrder(item: { title: string, url: string }) {
  uni.navigateTo({
    url: item.url,
  })
}
</script>

<template>
  <view class="order-wrap">
    <view class="order-title">
      我的订单
    </view>
    <view class="order-list">
      <view v-for="(item, i) in list" :key="i" class="order-item" @click="toOrder(item)">
        <view class="order-img">
          <wd-badge :model-value="Number(item.value)" :max="99">
            <image class="img" :src="item.icon" mode="widthFix" />
          </wd-badge>
        </view>
        <view class="order-label">
          {{ item.title }}
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.order-wrap{
  margin-top: 16rpx;
  padding: 48rpx 32rpx;
  background: #FFFFFF;
  border-radius: 32rpx;
  .order-title{
    font-weight: 500;
    font-size: 28rpx;
    color: #000000;
    line-height: 28rpx;
  }
  .order-list{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 48rpx;
    padding: 0 12rpx;
    .order-item{
      display: flex;
      flex-direction: column;
      align-items: center;
      .order-img{
        width: 44rpx;
        height: 44rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        .img{
          width: 44rpx;
          height: 44rpx;
        }
      }
      .order-label{
        margin-top: 16rpx;
        font-weight: 400;
        font-size: 24rpx;
        color: #444444;
        line-height: 24rpx;
      }
    }
  }
}
</style>
