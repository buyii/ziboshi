<script setup lang="ts">
import DataCard from './component/DataCard.vue'
import RevenueRecords from './component/RevenueRecords.vue'
import { useLayoutStore } from '@/stores'

import { getSaleProductList, getTeamMemberIncomeList } from '@/api/mine'

interface DateRange {
  startDate: string
  endDate: string
  showStartDate: string
  showEndDate: string
}
const dataTab = ref('1')

const layoutStore = useLayoutStore()
const statusBarHeight = computed(() => {
  return layoutStore.layoutStore.statusBarHeight
})
const dateRange = ref<DateRange>({
  showStartDate: '',
  showEndDate: '',
  startDate: '',
  endDate: '',
})
const dataList = ref<any>([])
function handleClickLeft() {
  uni.navigateBack()
}
function tabClick() {
  dataList.value = []
  getDataList()
}
function dateTabClick(data: any) {
  dataList.value = []
  dateRange.value = {
    showStartDate: data.startTime.replace(/-/g, '.'),
    showEndDate: data.endTime.replace(/-/g, '.'),
    startDate: data.startTime,
    endDate: data.endTime,
  }
  getDataList()
}
// 个人商品数据
function getList() {
  const params = {
    startTime: dateRange.value.startDate,
    endTime: dateRange.value.endDate,
    pageNum: 1,
    pageSize: 5,
  }
  getSaleProductList({ ...params }).then((res) => {
    if (res.code === 0) {
      dataList.value = res.rows
      console.log(res.rows, 'res.rows')
    }
  })
}
// 团队个人数据
function getMemberList() {
  const params = {
    startTime: dateRange.value.startDate,
    endTime: dateRange.value.endDate,
    pageNum: 1,
    pageSize: 5,
  }
  getTeamMemberIncomeList({ ...params }).then((res) => {
    if (res.code === 0) {
      dataList.value = res.rows
    }
  })
}

function getDataList() {
  if (dataTab.value === '1') {
    getList()
  }
  else {
    getMemberList()
  }
}

onLoad((options) => {
  dataTab.value = options?.dataTab || '1'
  const month = getCurrentMonth()
  // 获取月份有多少天
  const days = getDaysInMonth(month)
  const startTime = `${month}-01`
  const endTime = `${month}-${days}`

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
  <wd-navbar title="我的数据" safe-area-inset-top left-arrow fixed :bordered="false" @click-left="handleClickLeft" />
  <view :style="{ paddingTop: `${(statusBarHeight || 0) + 44}px` }" class="data-page">
    <DataCard v-model="dataTab" @tab-click="tabClick" @date-tab-click="dateTabClick" />
    <RevenueRecords :tabdata="dataTab" :list="dataList" :date-range="dateRange" />
  </view>
</template>

<style scoped lang="scss">
.data-page{
  padding: 32rpx;
}
</style>

<route lang="json">
{
  "layout": "default",
  "name": "myData",
  "style": {
    "navigationBarTitleText": "我的数据"
  }
}
</route>
