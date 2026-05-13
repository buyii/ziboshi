<script setup lang="ts">
import RecordsDetails from './component/RecordsDetails.vue'
import { useLayoutStore } from '@/stores'
import { getSaleProductKolList, getSaleProductList } from '@/api/mine'

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
const productData = computed(() => {
  return userStore.productData
})
const imgBaseUrl = import.meta.env.VITE_IMG_URL
const productId = ref('')
const userId = ref('')
const isTeam = ref<boolean>(false)

const productItem = ref<any>({})
const layoutStore = useLayoutStore()
const state = ref()
const userName = ref('')
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
  let h = 294
  if (isTeam.value) {
    h = h - 110
  }
  const num = uni.upx2px(h)
  return layoutStore.layoutStore.statusBarHeight + num
})
const myCalendarRef = ref()
const tabs = [
  {
    title: '全部',
    key: '1',
  },
  {
    title: '已付款',
    key: 'PAY_SUCC',
  },
  {
    title: '退货退款',
    key: 'REFUND',
  },
  {
    title: '已收货',
    key: 'CONFIRM',
  },
  {
    title: '已结算',
    key: 'SETTLE',
  },
]
const tabValue = ref<string>('1')

function handleClickLeft() {
  uni.navigateBack()
}
function showCalendar() {
  myCalendarRef.value.onShow()
}

function tabChange() {
  pagination.value.pageNum = 1
  dataList.value = []
  getDataList()
  getproductData()
}

function changeCalendar(value: any) {
  pagination.value.pageNum = 1
  dataList.value = []
  dateRange.value = {
    ...value,
    showStartDate: value.startDate.replace(/-/g, '.'),
    showEndDate: value.endDate.replace(/-/g, '.'),
  }
  getproductData()
  getDataList()
}
function getList() {
  const params: any = {
    startTime: dateRange.value.startDate,
    endTime: dateRange.value.endDate,
    productId: productId.value,
    status: tabValue.value === '1' ? '' : tabValue.value,
    userName: userName.value,
    pageNum: pagination.value.pageNum,
    pageSize: pagination.value.pageSize,
  }
  if (userId.value) {
    params.userId = userId.value
  }
  if (isTeam.value) {
    params.agentUserId = userInfo.value?.userId
  }
  getSaleProductKolList({ ...params }).then((res) => {
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
  if (productId.value) {
    getList()
  }
}

function search() {
  pagination.value.pageNum = 1
  dataList.value = []
  getDataList()
}

function getproductData() {
  const params: any = {
    startTime: dateRange.value.startDate,
    endTime: dateRange.value.endDate,
    productId: productId.value,
    status: tabValue.value === '1' ? '' : tabValue.value,
  }
  if (userId.value) {
    params.userId = userId.value
  }
  if (isTeam.value) {
    params.agentUserId = userInfo.value?.userId
  }
  getSaleProductList({ ...params }).then((res) => {
    if (res.code === 0) {
      if (res.rows.length > 0) {
        productItem.value = res.rows[0]
      }
      else {
        productItem.value = {
          orderCount: 0, // 单量
          productId: productData.value.productId, // 商品id
          productName: productData.value.productName, // 商品名称
          productImg: productData.value.productImg, // 商品图片
          kolFocServiceFee: 0, // 预估推广补贴
          totalPayAmount: 0, // 总GMV
          kolFocCosFee: 0, // 总佣金
          focAgentFee: 0, // 有效分红
        }
      }
    }
  })
}

onLoad((options) => {
  console.log(options)
  productId.value = options?.productId || ''
  userId.value = options?.userId || ''
  isTeam.value = options?.isTeam === '1'
  const month = getCurrentMonth()
  // 获取月份有多少天
  const days = getDaysInMonth(month)
  const startTime = options?.startTime || `${month}-01`
  const endTime = options?.endTime || `${month}-${days}`
  // const startTime = `${month}-01`
  // const endTime = `${month}-${days}`

  dateRange.value = {
    showStartDate: startTime.replace(/-/g, '.'),
    showEndDate: endTime.replace(/-/g, '.'),
    startDate: startTime,
    endDate: endTime,
  }
  getproductData()
  getDataList()
})
</script>

<template>
  <view class="page-top">
    <wd-navbar title="收益明细" safe-area-inset-top left-arrow :bordered="false" @click-left="handleClickLeft" />
    <view v-if="!isTeam" class="search-box">
      <MySearch v-model="userName" @search="search" @clear="search" />
      <text class="iconfont icon-calendar myicon" @click="showCalendar" />
    </view>
    <view class="tab-box">
      <LineTabs v-model="tabValue" :tabs="tabs" @change="tabChange" />
    </view>
  </view>

  <view class="recordMyScrollBox">
    <MyScrollView :top="`${statusBarHeight || 0}px`" :state="state" @scrolltolower="scrolltolower" @loadmore="loadmore">
      <view class="record-content">
        <view class="year-item">
          <view class="top-sticky">
            <view class="topflex1">
              <view class="month">
                {{ dateRange.showStartDate }}
              </view>
              <text class="iconfont icon-rotate" />
              <view class="month">
                {{ dateRange.showEndDate }}
              </view>
            </view>
            <text v-if="isTeam" class="iconfont icon-calendar myicon" @click="showCalendar" />
          </view>
          <view class="productbox">
            <RecordsMonthTeam v-if="isTeam" :item="productItem" :show-right="false" />
            <RecordsMonth v-else :item="productItem" :show-right="false" />
          </view>
          <template v-if="dataList.length > 0">
            <template v-for="(item, i) in dataList" :key="i">
              <RecordsDetails :item="item" :is-team="isTeam" />
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
  </view>

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
  padding-bottom: 24rpx;
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
      .topflex1{
        flex: 1;
        display: flex;
        align-items: center;
      }
    }
    .productbox{
      position: sticky;
      top: 82rpx;
      width: 100%;
      z-index: 999;
      background-color: #fff;
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
  "name": "incomeUserDetails",
  "style": {
    "navigationBarTitleText": "收益明细"
  }
}
</route>
