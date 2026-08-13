<script setup lang="ts">
import ScrollTabs from './component/ScrollTabs.vue'

import { useLayoutStore } from '@/stores'
import { getCouponList } from '@/api/common'

interface Pagination {
  pageNum: number
  pageSize: number
  total: number
}

const tabs = [
  {
    title: '有效',
    key: '1',
  },
  {
    title: '已失效',
    key: '2',
  },
]

const imgBaseUrl = import.meta.env.VITE_IMG_URL
const state = ref()
const loading = ref<boolean>(false)
const dataList = ref<any>([])
const orderType = ref<string>('1')
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

function tabClick() {
  pagination.value.pageNum = 1
  getDataList()
}

function getDataList() {
  const params = {
    pageNum: pagination.value.pageNum,
    pageSize: pagination.value.pageSize,
    status: orderType.value,
  }
  loading.value = true
  getCouponList(params).then((res) => {
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
onShow(() => {
  getDataList()
})
</script>

<template>
  <wd-navbar title="我的优惠券" safe-area-inset-top left-arrow :bordered="false" @click-left="handleClickLeft" />
  <view class="tab-box">
    <ScrollTabs v-model="orderType" :item-list="tabs" @tab-click="tabClick" />
  </view>
  <MyScrollView :top="`${(statusBarHeight || 0) + 91}px`" :state="state" @scrolltolower="scrolltolower" @loadmore="loadmore">
    <view v-if="dataList.length > 0" class="sample-content">
      <template v-for="item in dataList" :key="item.id">
        <x-coupon
          :value="item.calType === 1 ? item.price : `${item.discounts / 100}折`" :title="item.name" color="#24d192" background-color="#e1f6ee"
          :type="item.calType === 1 ? 'money' : ''"
          :desc="`${Number(item.threshold) > 0 ? `满${item.threshold}可用` : '无门槛'} - ${item.deadline === 1 ? '无期限' : ''}`" validity="优惠券x1"
          :show-btn="false" :status="item.status === 2 ? 'used' : 'available'"
        />
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
