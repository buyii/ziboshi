<script setup lang="ts">
import { useLayoutStore } from '@/stores'
import { getSaleProductList, getTeamMemberIncomeList } from '@/api/mine'

interface DateRange {
  startDate: string
  endDate: string
  showStartDate: string
  showEndDate: string
}

interface Pagination {
  pageNum: number
  pageSize: number
  total: number
}
const imgBaseUrl = import.meta.env.VITE_IMG_URL
const type = ref('')
const keyword = ref('')
const layoutStore = useLayoutStore()
const statusBarHeight = computed(() => {
  return layoutStore.layoutStore.statusBarHeight
})
const myCalendarRef = ref()
const state = ref()
const dataList = ref<any>([])
const dateRange = ref<DateRange>({
  showStartDate: '',
  showEndDate: '',
  startDate: '',
  endDate: '',
})
const pagination = ref<Pagination>({
  pageNum: 1,
  pageSize: 10,
  total: 0,
})
const scrollTop1 = computed(() => {
  const h = 198
  const num = uni.upx2px(h)
  return layoutStore.layoutStore.statusBarHeight + num
})
function handleClickLeft() {
  uni.navigateBack()
}

function showCalendar() {
  myCalendarRef.value.onShow()
}

function changeCalendar(value: any) {
  pagination.value.pageNum = 1
  dateRange.value = {
    ...value,
    showStartDate: value.startDate.replace(/-/g, '.'),
    showEndDate: value.endDate.replace(/-/g, '.'),
  }

  getDataList()
}

// 个人商品数据
function getList() {
  const params = {
    startTime: dateRange.value.startDate,
    endTime: dateRange.value.endDate,
    pageNum: pagination.value.pageNum,
    pageSize: pagination.value.pageSize,
    productName: keyword.value,
  }
  getSaleProductList({ ...params }).then((res) => {
    if (res.code === 0) {
      if (pagination.value.pageNum === 1) {
        dataList.value = [...res.rows]
      }
      else {
        dataList.value = [...dataList.value, ...res.rows]
      }
      pagination.value.total = res.total
      state.value = null
    }
    else {
      state.value = 'error'
    }
  }).catch(() => {
    state.value = 'error'
  })
}
function getMemberList() {
  const params = {
    startTime: dateRange.value.startDate,
    endTime: dateRange.value.endDate,
    pageNum: pagination.value.pageNum,
    pageSize: pagination.value.pageSize,
    userName: keyword.value,
  }
  getTeamMemberIncomeList({ ...params }).then((res) => {
    if (res.code === 0) {
      if (pagination.value.pageNum === 1) {
        dataList.value = [...res.rows]
      }
      else {
        dataList.value = [...dataList.value, ...res.rows]
      }
      pagination.value.total = res.total
      state.value = null
    }
    else {
      state.value = 'error'
    }
  }).catch(() => {
    state.value = 'error'
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
function getDataList() {
  if (type.value === 'user') {
    getList()
  }
  else {
    getMemberList()
  }
}

function search() {
  pagination.value.pageNum = 1
  getDataList()
}
onLoad((options) => {
  type.value = options?.type
  const month = getCurrentMonth()
  // 获取月份有多少天
  const days = getDaysInMonth(month)
  const startTime = options?.startTime || `${month}-01`
  const endTime = options?.endTime || `${month}-${days}`

  dateRange.value = {
    showStartDate: startTime.replace(/-/g, '.'),
    showEndDate: endTime.replace(/-/g, '.'),
    startDate: startTime,
    endDate: endTime,
  }
  getDataList()
})
</script>

<template>
  <wd-navbar title="收益记录" safe-area-inset-top left-arrow fixed :bordered="false" @click-left="handleClickLeft" />
  <view class="search-box" :style="{ top: `${(statusBarHeight || 0) + 44}px` }">
    <MySearch v-model="keyword" @search="search" @clear="search" />
    <text class="iconfont icon-calendar myicon" @click="showCalendar" />
  </view>
  <MyScrollView :top="`${scrollTop1 || 0}px`" :state="state" @scrolltolower="scrolltolower" @loadmore="loadmore">
    <view class="record-content">
      <view class="year-item">
        <view class="top-sticky">
          <view class="month">
            {{ dateRange.showStartDate }}
          </view>
          <text class="iconfont icon-rotate" />
          <view class="month">
            {{ dateRange.showEndDate }}
          </view>
        </view>
        <template v-if="dataList.length > 0">
          <template v-for="(item, i) in dataList" :key="i">
            <RecordsMonth v-if="type === 'user'" :item="item" :start-time="dateRange.startDate" :end-time="dateRange.endDate" />
            <UserRecords v-if="type === 'team'" :item="item" is-team="1" :start-time="dateRange.startDate" :end-time="dateRange.endDate" />
          </template>
        </template>
        <wd-status-tip v-else tip="暂无数据~">
          <template #image>
            <image style="width: 320rpx;height: 344rpx;margin-top: 60rpx;" :src="`${imgBaseUrl}/notData.png`" />
          </template>
        </wd-status-tip>
      </view>
    </view>
  </MyScrollView>
  <MyCalendar ref="myCalendarRef" is-range @change="changeCalendar" />
</template>

<style scoped lang="scss">
.search-box{
  position: fixed;
  left: 0;
  right: 0;
  z-index: 5;
  padding: 16rpx 32rpx;
  background-color: #fff;
  display: flex;
  align-items: center;
  .myicon{
    margin-left: 32rpx;
    font-size: 32rpx;
  }
}

.record-content{
  padding: 0 32rpx;
  .year-item{
    overflow: visible; /* 确保父元素没有裁剪内容 */
    .top-sticky{
      padding: 24rpx 0;
      position: sticky;
      top: 0;
      background-color: #f8f8f8;
      z-index: 1; /* 确保层级足够高 */
      display: flex;
      align-items: center;
    }
    .icon-rotate{
      color: #444444;
      font-size: 16rpx;
      margin: 0 16rpx;
    }
    .month{
      display: flex;
      justify-content: space-between;
      color: #444444;
      font-size: 28rpx;
    }
  }
}
</style>

<route lang="json">
{
  "layout": "default",
  "name": "incomeRecord",
  "style": {
    "navigationBarTitleText": "收益记录"
  }
}
</route>
