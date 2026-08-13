<script setup lang="ts">
import RevenueRecords from './component/RevenueRecords.vue'

import { getWithdrawList } from '@/api/wallet'

import { useLayoutStore } from '@/stores'

interface Pagination {
  pageNum: number
  pageSize: number
  total: number
}

interface DateRange {
  startDate: string
  endDate: string
  showStartDate: string
  showEndDate: string
}

const imgBaseUrl = import.meta.env.VITE_IMG_URL
const layoutStore = useLayoutStore()
const statusBarHeight = computed(() => {
  const h = 200
  const num = uni.upx2px(h)
  return layoutStore.layoutStore.statusBarHeight + num
})
function handleClickLeft() {
  uni.navigateBack()
}
const activeTab = ref(7)

const state = ref()
const loading = ref<boolean>(false)
const dataList = ref<any>([])
const pagination = ref<Pagination>({
  pageNum: 1,
  pageSize: 10,
  total: 0,
})
const dateRange = ref<DateRange>({
  showStartDate: '',
  showEndDate: '',
  startDate: '',
  endDate: '',
})
const itemList: any[] = [
  {
    id: 7,
    name: '近七天',
  },
  {
    id: 30,
    name: '近一个月',
  },
  {
    id: 90,
    name: '近三个月',
  },
  {
    id: 183,
    name: '近半年',
  },
]
function changeCalendar(value: any) {
  dateRange.value = {
    ...value,
    showStartDate: value.startDate.replace(/-/g, '.'),
    showEndDate: value.endDate.replace(/-/g, '.'),
  }
  pagination.value.pageNum = 1
  getDataList()
}

function tabChange() {
  const day = activeTab.value
  const dates = getNDaysRange(day)
  dateRange.value = {
    startDate: dates.start,
    endDate: dates.end,
    showStartDate: dates.start.replace(/-/g, '.'),
    showEndDate: dates.end.replace(/-/g, '.'),
  }
  pagination.value.pageNum = 1
  getDataList()
}

function getDataList() {
  const params = {
    startTime: dateRange.value.startDate,
    endTime: dateRange.value.endDate,
    queryType: 2,
    pageNum: pagination.value.pageNum,
    pageSize: pagination.value.pageSize,
  }
  loading.value = true
  getWithdrawList(params).then((res) => {
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
  const dates = getNDaysRange(activeTab.value)
  dateRange.value = {
    startDate: dates.start,
    endDate: dates.end,
    showStartDate: dates.start.replace(/-/g, '.'),
    showEndDate: dates.end.replace(/-/g, '.'),
  }
  getDataList()
})
</script>

<template>
  <view class="page-top">
    <wd-navbar title="提现记录" safe-area-inset-top left-arrow :bordered="false" @click-left="handleClickLeft" />
    <CustomScrollTabs
      v-model:active-tab="activeTab"
      :item-list="itemList"
      bg="#f8f8f8"
      @tab-change="tabChange"
      @change-calendar="changeCalendar"
    />
  </view>
  <MyScrollView :top="`${(statusBarHeight || 0) - 1}px`" :state="state" @scrolltolower="scrolltolower" @loadmore="loadmore">
    <view class="records-box">
      <template v-if="dataList.length > 0">
        <RevenueRecords :date-range="dateRange" :datas-list="dataList" />
      </template>
      <wd-status-tip v-if="dataList.length < 1 && !loading" tip="暂无数据~">
        <template #image>
          <image style="width: 320rpx;height: 344rpx;margin-top: 60rpx;" :src="`${imgBaseUrl}/notData1.png`" />
        </template>
      </wd-status-tip>
    </view>
  </MyScrollView>
</template>

<style scoped lang="scss">
.page-top{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
}
.wallet-top{
  padding: 32rpx 32rpx 48rpx 32rpx;
}
.jilulabel{
  padding-left: 32rpx;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 32rpx;
  color: #111111;
  line-height: 32rpx;
  font-style: normal;
}
.tab-box{
  padding: 0 32rpx;
  display: flex;
  align-items: center;
  .tableft{
    width: 626rpx;
  }
  .tabright{
    width: 60rpx;
    text-align: right;
    font-size: 32rpx;
    color: #FF0057;
  }
}
.scroll-Y{
  transition: all 0.3s ease; /* 添加平滑过渡效果 */
  position: fixed;
  bottom: 0;
}
.records-box{
  padding: 0 32rpx 32rpx 32rpx;
}
.hongbao{
  position: fixed;
  right: 6rpx;
  top: 400rpx;
  width: 50rpx;
  height: 50rpx;
  .hongbaoImg{
    width: 100%;
    height: 100%;
  }
}

.join-box{
  height: 420rpx;
  .join-text{
    display: flex;
    gap: 10rpx;
    margin: 20rpx 0;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 28rpx;
    color: #111111;
    line-height: 30rpx;
    .join-label{
      width: 152rpx;
      text-align: right;
    }
    .join-value{
      text-align: left;
      flex: 1;
    }
  }
  .join-zhu{
    margin: 20rpx;
    margin-top: 60rpx;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 22rpx;
    line-height: 28rpx;
    color: #666666;
    line-height: 30rpx;
    text-align: center;
  }
  .down-box{
    margin-top: 60rpx;
    .time-box{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 32rpx;
      color: #111111;
      line-height: 32rpx;
      font-style: normal;
    }
    .text-time{
      font-family: PingFangSC, PingFang SC;
      font-weight: bold;
      font-size: 32rpx;
      color: #FF0057;
      line-height: 32rpx;
      font-style: normal;
      margin: 0 6rpx;
    }
    .text-timesucc{
      font-family: PingFangSC, PingFang SC;
      font-weight: bold;
      font-size: 32rpx;
      color: #52c41a;
      line-height: 32rpx;
      font-style: normal;
      margin: 0 6rpx;
    }
  }
}
</style>

<style lang="scss">
.custom-shadow{
  background-color: #089D39 !important;
}
.joinmsg{
  .wd-message-box__body{
    padding: 30rpx 30rpx 0 30rpx !important;
  }
  .wd-message-box__actions{
    padding-top: 16rpx !important;
  }
  .wd-message-box__content{
    max-height: 640rpx !important;
  }
}
</style>

<route lang="json">
{
  "layout": "default",
  "name": "withdrawalHistory",
  "style": {
    "navigationBarTitleText": "提现记录"
  }
}
</route>
