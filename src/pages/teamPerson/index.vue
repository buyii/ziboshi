<script setup lang="ts">
import RecordsTeam from './component/RecordsTeam.vue'
import ScrollTabs from './component/ScrollTabs.vue'
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
const layoutStore = useLayoutStore()
const itemList: any[] = [
  {
    id: 1,
    name: '近三天',
  },
  {
    id: 2,
    name: '近七天',
  },
  {
    id: 3,
    name: '近一个月',
  },
  {
    id: 4,
    name: '近三个月',
  },
  {
    id: 5,
    name: '近一年',
  },
]
const route = useRoute()
const userId = computed(() => {
  return route.params?.userId
})
const myCalendarRef = ref()
const tabIndex = ref(0)
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
function showCalendar() {
  myCalendarRef.value.onShow()
}
const scrollTop1 = computed(() => {
  const h = 186
  const num = uni.upx2px(h)
  return layoutStore.layoutStore.statusBarHeight + num
})
function handleClickLeft() {
  uni.navigateBack()
}
function getDataList() {
  const params = {
    startTime: dateRange.value.startDate,
    endTime: dateRange.value.endDate,
    userId: userId.value,
    status: '',
    pageNum: pagination.value.pageNum,
    pageSize: pagination.value.pageSize,
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
onLoad(() => {
  const dates = getNDaysRange(7)
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
  <wd-navbar title="个人收益" safe-area-inset-top left-arrow :bordered="false" @click-left="handleClickLeft" />
  <view class="tab-box">
    <view class="tableft">
      <ScrollTabs v-model="tabIndex" :item-list="itemList" />
    </view>
    <view class="tabright">
      <text class="iconfont icon-calendares" @click="showCalendar" />
    </view>
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
        <template v-for="(item, i) in dataList" :key="i">
          <RecordsTeam :item="item" />
        </template>
      </view>
    </view>
  </MyScrollView>
  <MyCalendar ref="myCalendarRef" is-range @change="changeCalendar" />
</template>

<style scoped lang="scss">
.tab-box{
  display: flex;
  align-items: center;
  background-color: #fff;
  .tableft{
    width: 660rpx;
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
.record-content{
  padding: 0 32rpx 32rpx;
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
