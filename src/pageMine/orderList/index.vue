<script setup lang="ts">
import OrderItem from './component/OrderItem.vue'
import ScrollTabs from './component/ScrollTabs.vue'
import { useLayoutStore } from '@/stores'

import { countOrderStatus, getOrderList } from '@/api/order'

interface Pagination {
  pageNum: number
  pageSize: number
  total: number
}

const countData = ref<{
  finish: string
  refund: string
  waitPay: string
  waitRece: string
  waitSend: string
}>({
  finish: '0',
  refund: '0',
  waitPay: '0',
  waitRece: '0',
  waitSend: '0',
})

const tabs = computed(() => [
  {
    title: '待支付',
    key: '1',
  },
  {
    title: '待发货',
    key: '2',
    badgeProps: {
      modelValue: Number(countData.value.waitSend),
    },
  },
  {
    title: '待收货',
    key: '3',
    badgeProps: {
      modelValue: Number(countData.value.waitRece),
    },
  },
  {
    title: '已完成',
    key: '4',
  },
  {
    title: '退款/售后',
    key: '5',
    badgeProps: {
      modelValue: Number(countData.value.refund),
    },
  },
])

const imgBaseUrl = import.meta.env.VITE_IMG_URL
const orderType = ref<string>('all')

const state = ref()
const loading = ref<boolean>(false)
const dataList = ref<any>([])
const pagination = ref<Pagination>({
  pageNum: 1,
  pageSize: 10,
  total: 0,
})
const layoutStore = useLayoutStore()
const statusBarHeight = computed(() => {
  return layoutStore.layoutStore.statusBarHeight
})
function handleClickLeft() {
  uni.navigateBack()
}

function getDataList() {
  const params = {
    pageNum: pagination.value.pageNum,
    pageSize: pagination.value.pageSize,
    status: orderType.value === 'all' ? '' : orderType.value,
  }
  loading.value = true
  getOrderList(params).then((res) => {
    if (res.code === 0) {
      if (pagination.value.pageNum === 1) {
        dataList.value = [...res.rows]
      }
      else {
        dataList.value = [...dataList.value, ...res.rows]
      }
      pagination.value.total = res.total
      state.value = null
      loading.value = false
    }
    else {
      state.value = 'error'
      loading.value = false
    }
  }).catch(() => {
    state.value = 'error'
    loading.value = false
  })
}

function getCount() {
  countOrderStatus().then((res) => {
    if (res.code === 0) {
      countData.value = res.data
    }
  })
}

function scrolltolower() {
  if (pagination.value.pageNum * pagination.value.pageSize >= pagination.value.total) {
    state.value = 'finished'
    return
  }
  state.value = 'loading'
  pagination.value.pageNum++
  getDataList()
}
function loadmore() {
  state.value = 'loading'
  getDataList()
}

function tabClick() {
  pagination.value.pageNum = 1
  getDataList()
}

function onRefresh() {
  pagination.value.pageNum = 1
  getDataList()
}
onShow(() => {
  getDataList()
  getCount()
})
</script>

<template>
  <view class="topbox">
    <wd-navbar title="我的订单" safe-area-inset-top left-arrow :bordered="false" @click-left="handleClickLeft" />
    <view class="tab-box">
      <ScrollTabs v-model="orderType" :item-list="tabs" @tab-click="tabClick" />
    </view>
  </view>
  <MyScrollView :top="`${(statusBarHeight || 0) + 91}px`" :state="state" @scrolltolower="scrolltolower" @loadmore="loadmore">
    <view v-if="dataList.length > 0" class="sample-content">
      <template v-for="item in dataList" :key="item.id">
        <OrderItem :item="item" @on-refresh="onRefresh" />
      </template>
    </view>
    <wd-status-tip v-if="dataList.length <= 0 && !loading" tip="暂无数据~">
      <template #image>
        <image style="width: 320rpx;height: 344rpx;margin-top: 60rpx;" :src="`${imgBaseUrl}/notData1.png`" />
      </template>
    </wd-status-tip>
  </MyScrollView>
</template>

<style scoped lang="scss">
.topbox{
  position: fixed;
  width: 100vw;
  top: 0;
}
.tab-box{
  background-color: #fff;
}
.select-box{
  padding: 12rpx 32rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .select-text{
    height: 62rpx;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 32rpx;
    color: #333333;
    line-height: 62rpx;
  }
  .img-box{
    position: relative;
    height: 60rpx;
    image{
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto 0;
      width: 48rpx;
      height: 48rpx;
      border: 2rpx solid #F8F8F8;
      border-radius: 24rpx;
    }
  }
  .select-right{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 32rpx;
    color: #666666;
    line-height: 32rpx;
  }
}
.scroll-Y{
  transition: all 0.3s ease; /* 添加平滑过渡效果 */
  position: fixed;
  bottom: 0;
  :deep(){
    .wd-status-tip__text{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 28rpx;
      color: #AAAAAA;
      line-height: 28rpx;
    }
  }
}
.sample-content{
  padding: 24rpx 32rpx 0 32rpx;
}
</style>

<route lang="json">
{
  "layout": "default",
  "name": "orderList",
  "style": {
    "navigationBarTitleText": "我的订单"
  }
}
</route>
