<script setup lang="ts">
import LogisticsInfo from './component/LogisticsInfo.vue'
import OrderItem from './component/OrderItem.vue'
import { getOrderLogistics } from '@/api/order'
import { useLayoutStore } from '@/stores'

const statusMap: Record<string, string> = {
  createOrder: '提交订单',
  payOrder: '已下单',
  send: '已发货',
  WAIT_ACCEPT: '待揽收',
  ACCEPT: '已揽收',
  TRANSPORT: '运输中',
  DELIVERING: '派件中',
  AGENT_SIGN: '已代签收',
  SIGN: '已签收',
  FAILED: '包裹异常',
}

const layoutStore = useLayoutStore()
const statusBarHeight = computed(() => {
  return layoutStore.layoutStore.statusBarHeight
})
const orderId = ref<any>(0)
const logisticsData = ref<any>({
  order: [],
  logistics: [],
})

function handleClickLeft() {
  uni.navigateBack()
}

function getDetail() {
  getOrderLogistics({ orderId: orderId.value }).then((res) => {
    if (res.code === 0) {
      logisticsData.value = res.data
    }
  })
}

function copyId() {
  uni.setClipboardData({
    data: logisticsData.value.orderId,
    success() {
      console.log('success')
    },
  })
}

onLoad((options) => {
  orderId.value = options?.orderId || ''
  getDetail()
})
</script>

<template>
  <view class="topbg" />
  <wd-navbar title="" safe-area-inset-top left-arrow fixed :bordered="false" custom-style="background: transparent;" @click-left="handleClickLeft" />
  <view class="collect-warp" :style="{ paddingTop: `${(statusBarHeight || 0) + 49}px` }">
    <view class="top-warp">
      <view class="top-left">
        <view class="lefttitle">
          {{ logisticsData.logistics.length > 0 ? statusMap[logisticsData.logistics[0].logisticsStatus] : '' }}
        </view>
        <view v-if="logisticsData.logistics.length > 0" class="left-desc">
          订单{{ statusMap[logisticsData.logistics[0].logisticsStatus] }}
        </view>
      </view>
      <view class="top-right">
        <image src="../../static/svg/bubble.svg" />
      </view>
    </view>
    <view class="dizhi-box">
      <view class="dizhi-left">
        <view class="dizhi">
          {{ logisticsData.detail }}
        </view>
        <view class="lianxi">
          {{ logisticsData.name }}  {{ logisticsData.phone }}
        </view>
      </view>
      <text class="iconfont icon-address dizhi-right" />
    </view>
    <wd-gap bg-color="#F8F8F8" height="16rpx" />
    <OrderItem />
    <wd-gap bg-color="#F8F8F8" height="16rpx" />
    <view class="guigebox">
      <view class="guige">
        <view>订单编号</view>
        <view>
          {{ logisticsData.orderId }}
          <text class="iconfont icon-copy" @click="copyId" />
        </view>
      </view>
      <view class="guige">
        <view>下单时间</view>
        <view>
          {{ logisticsData.createTime }}
        </view>
      </view>
      <view class="guige">
        <view>订单留言</view>
        <view>
          {{ logisticsData.remark || '' }}
        </view>
      </view>
    </view>
    <!-- <wd-gap bg-color="#F8F8F8" height="16rpx" />
    <view class="guigebox" >
      <view class="guige">
        <view>商品价格</view>
        <view>
          {{ logisticsData.orderId }}
          <text class="iconfont icon-copy" @click="copyId" />
        </view>
      </view>
      <view class="guige">
        <view>下单时间</view>
        <view>
          {{ logisticsData.paySuccessTime }}
        </view>
      </view>
      <view class="guige">
        <view>订单留言</view>
        <view>
          {{ logisticsData.remark || '' }}
        </view>
      </view>
    </view> -->

    <wd-gap bg-color="#F8F8F8" height="16rpx" />
    <view class="logistics-box">
      <LogisticsInfo :logistics="logisticsData.logistics" :order="logisticsData.order" />
    </view>
  </view>
</template>

<style scoped lang="scss">
.topbg{
  position: fixed;
  height: 304rpx;
  width: 100%;
  background: linear-gradient( 180deg, rgb(210, 244, 221) 0%, rgba(255, 255, 255, 1) 100%);
}
.collect-warp{
  position: relative;
  z-index: 2;
  .top-warp{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 32rpx;
    background-color: transparent;
    .top-left{
      .lefttitle{
        font-weight: 600;
        font-size: 48rpx;
        color: #000000;
        line-height: 48rpx;
      }
      .left-desc{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #666666;
        line-height: 24rpx;
        font-style: normal;
        margin-top: 20rpx;
      }
    }
    .top-right{
      image{
        width: 102rpx;
        height: 80rpx;
      }
    }
  }
  .dizhi-box{
    background-color: #FFFFFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 32rpx;
    .dizhi-left{
      .dizhi{
        font-weight: 400;
        font-size: 32rpx;
        color: #000000;
        line-height: 32rpx;
      }
      .lianxi{
        font-weight: 400;
        font-size: 28rpx;
        color: #666666;
        line-height: 28rpx;
        margin-top: 20rpx;
      }
    }
    .dizhi-right{
      font-size: 28rpx;
      color: #000000;
    }
  }
  .guigebox{
    background-color: #FFFFFF;
    border-radius: 16rpx;
  }
  .guige{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12rpx 24rpx;
    min-height: 60rpx;
    font-size: 28rpx;
    font-style: normal;
    view:nth-child(1){
      color: #111111;
      min-width: 160rpx;
      font-weight: 500;
    }
    view:nth-child(2){
      flex: 1;
      color: #666666;
      line-height: 1.4;
      text-align: right;
      text{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #BABABA;
        line-height: 28rpx;
        font-style: normal;
        margin-left: 8rpx;
      }
    }
    :deep(){
      .wd-radio.is-button.is-checked .wd-radio__label {
        background-color: #089D39 !important;
        color: #FFFFFF !important;
        border-color: #089D39 !important;
      }
      .custom-input{
        text-align: right;
      }
    }
  }
  .logistics-box{
    background-color: #FFFFFF;
    padding: 40rpx 32rpx;
  }
}
</style>

<route lang="json">
{
  "layout": "default",
  "name": "orderLogistics",
  "style": {
    "navigationBarTitleText": "物流详情"
  }
}
</route>
