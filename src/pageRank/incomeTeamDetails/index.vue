<script setup lang="ts">
import { useLayoutStore } from '@/stores'
import { getSaleProductList } from '@/api/mine'

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
const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
const imgBaseUrl = import.meta.env.VITE_IMG_URL
const userId = ref('')
const isTeam = ref('')
const layoutStore = useLayoutStore()
const state = ref()
const productName = ref('')
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
const statusBarHeight = computed(() => {
  const h = 198
  const num = uni.upx2px(h)
  return layoutStore.layoutStore.statusBarHeight + num
})
const myCalendarRef = ref()

function handleClickLeft() {
  uni.navigateBack()
}
function showCalendar() {
  myCalendarRef.value.onShow()
}

function changeCalendar(value: any) {
  pagination.value.pageNum = 1
  dataList.value = []
  dateRange.value = {
    ...value,
    showStartDate: value.startDate.replace(/-/g, '.'),
    showEndDate: value.endDate.replace(/-/g, '.'),
  }
  getDataList()
}
function getList1() {
  const params = {
    startTime: dateRange.value.startDate,
    endTime: dateRange.value.endDate,
    userId: userId.value,
    pageNum: pagination.value.pageNum,
    pageSize: pagination.value.pageSize,
    productName: productName.value,
    agentUserId: userInfo.value?.userId,
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
  getList1()
}
function search() {
  pagination.value.pageNum = 1
  getDataList()
}
onLoad((options) => {
  console.log(options)
  userId.value = options?.userId
  isTeam.value = options?.isTeam
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
  <view class="page-top">
    <wd-navbar title="收益明细" safe-area-inset-top left-arrow :bordered="false" @click-left="handleClickLeft" />
    <view class="search-box">
      <MySearch v-model="productName" @search="search" @clear="search" />
      <!-- <wd-search v-model="productName" hide-cancel custom-input-class="inputClass" placeholder-class="placeholderClass" placeholder="请搜索" @search="search" /> -->
      <text class="iconfont icon-calendar myicon" @click="showCalendar" />
    </view>
  </view>
  <MyScrollView :top="`${statusBarHeight || 0}px`" :state="state" @scrolltolower="scrolltolower" @loadmore="loadmore">
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
            <!-- <RecordsDetails v-if="type === 'user'" :item="item" />
            <RecordsMonth v-if="type === 'team'" :item="item" /> -->
            <RecordsMonthTeam :item="item" :user-id="userId" :is-team="isTeam" :start-time="dateRange.startDate" :end-time="dateRange.endDate" />
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
.page-top{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
}
.search-box{
  padding: 16rpx 32rpx;
  background-color: #fff;
  display: flex;
  align-items: center;
  .myicon{
    margin-left: 32rpx;
    font-size: 32rpx;
  }
}
.tab-box{
  background-color: #fff;
}
.scroll-Y{
  transition: all 0.3s ease; /* 添加平滑过渡效果 */
  position: fixed;
  bottom: 0;
}
.record-content{
  // padding-bottom: 24rpx;
  .year-item{
    overflow: visible; /* 确保父元素没有裁剪内容 */
    .top-sticky{
      padding: 24rpx 32rpx;
      position: sticky;
      top: 0;
      background-color: #f5f5f5;
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
  "name": "incomeTeamDetails",
  "style": {
    "navigationBarTitleText": "收益明细"
  }
}
</route>
