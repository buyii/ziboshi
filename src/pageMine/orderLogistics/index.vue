<script setup lang="ts">
import LogisticsInfo from './component/LogisticsInfo.vue'
import { getOrderLogistics } from '@/api/order'
import { useLayoutStore } from '@/stores'

const statusMap: Record<string, string> = {
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
    <view class="logistics-box">
      <LogisticsInfo :logistics="logisticsData.logistics" />
    </view>
  </view>
</template>

<style scoped lang="scss">
.topbg{
  position: fixed;
  height: 304rpx;
  width: 100%;
  background: linear-gradient( 180deg, rgba(229, 255, 255, 1) 0%, rgba(222, 255, 233, 1) 50%, rgba(255, 255, 255, 1) 100%);
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
