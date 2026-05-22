<script setup lang="ts">
const list = ref([
  {
    title: '待付款',
    icon: 'icon-bankUser',
    url: '/pageMine/orderList/index',
  },
  {
    title: '待发货',
    icon: 'icon-addressUser',
    url: '/pageRank/orderList/index',
  },
  {
    title: '待收货',
    icon: 'icon-sampleUser',
    url: '/pageMine/orderList/index',
  },
  {
    title: '待评价',
    icon: 'icon-setUser',
    url: '/pageMine/orderList/index',
  },
  {
    title: '退款/售后',
    icon: 'icon-setUser',
    url: '/pageMine/orderList/index',
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
          <text class="iconfont" :class="item.icon" />
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
        width: 64rpx;
        height: 64rpx;
        background-color: #F5F5F5;
        border-radius: 32rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        .iconfont{
          font-size: 32rpx;
          color: #999999;
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
