<script setup lang="ts">
import GoodsCard from './component/GoodsCard.vue'
import { getProductSales } from '@/api/rank'

import type { ProductItem } from '@/types/common'

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

interface OptionList {
  value: number
  payload?: any // 添加 icon 属性，使用可选属性（?）以防部分选项没有图标
}
const itemList: any[] = [
  {
    id: 3,
    name: '近三天',
  },
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
const list = ref<OptionList[]>([
  {
    value: 1,
    payload: {
      label: '销量榜',
      icon: 'icon-salesVolume',
    },
  },
  {
    value: 2,
    payload: {
      label: '高佣榜',
      icon: 'icon-commission',
    },
  },
  {
    value: 3,
    payload: {
      label: '补贴榜',
      icon: 'icon-subsidy',
    },
  },
])

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
const imgBaseUrl = import.meta.env.VITE_IMG_URL
const productList = ref<ProductItem[]>([])
const state = ref()
const orderField = ref(1)
const activeTab = ref(3)

function handelChange() {
  console.log(orderField.value)
  getDataList()
}
function getDataList() {
  const params = {
    startTime: dateRange.value.startDate,
    endTime: dateRange.value.endDate,
    orderField: orderField.value,
  }
  getProductSales(params).then((res) => {
    if (res.code === 0) {
      productList.value = res.data
      state.value = null
    }
    else {
      state.value = 'error'
    }
  }).catch(() => {
    state.value = 'error'
  })
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
function changeCalendar(value: any) {
  dateRange.value = {
    ...value,
    showStartDate: value.startDate.replace(/-/g, '.'),
    showEndDate: value.endDate.replace(/-/g, '.'),
  }
  pagination.value.pageNum = 1
  getDataList()
}
onLoad(() => {
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
  <view class="banner-wrap">
    <image src="../../static/svg/rankbanner.svg" />
    <view class="segmented-box">
      <wd-segmented v-model:value="orderField" :options="list" @change="handelChange">
        <template #label="{ option }">
          <view class="section-slot">
            <text class="iconfont" :class="option.payload.icon" />
            <view class="name">
              {{ option.payload.label }}
            </view>
          </view>
        </template>
      </wd-segmented>
    </view>
    <CustomScrollTabs
      v-model:active-tab="activeTab"
      :item-list="itemList"
      bg="#f8f8f8"
      @tab-change="tabChange"
      @change-calendar="changeCalendar"
    />
  </view>
  <!-- <MyScrollView top="510rpx" :state="state"> -->
  <view class="goods-box">
    <GoodsCard v-if="productList.length > 0" :product-list="productList" />
    <wd-status-tip v-else tip="暂无数据~">
      <template #image>
        <image style="width: 320rpx;height: 344rpx;margin-top: 60rpx;" :src="`${imgBaseUrl}/notData1.png`" />
      </template>
    </wd-status-tip>
  </view>
</template>

<style scoped lang="scss">
.banner-wrap{
  position: fixed;
  top: 0;
  left: 0;
  height: 510rpx;
  width: 100%;
  z-index: 90;
  font-size: 0rpx;
  image{
    width: 100%;
    height: 410rpx;
  }
  .segmented-box{
    width: 640rpx;
    height: 96rpx;
    position: absolute;
    bottom: 112rpx;
    left: 0;
    right: 0;
    margin: 0 auto;
    .section-slot{
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16rpx;
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 32rpx;
      color: #ffffff;
    }
    :deep(){
      .wd-segmented{
        background: rgba(192,0,65,0.45);
        border-radius: 48rpx;
        backdrop-filter: blur(8px);
        height: 100%;
        display: flex;
        align-items: center;
        .wd-segmented__item--active{
          background: rgba(255,255,255,0.85);
          border-radius: 200rpx;
          backdrop-filter: blur(8px);
        }
        .is-active{
          .section-slot{
            color: #000000;
          }
        }
      }
    }
  }
}
.goods-box{
  padding: 510rpx 32rpx env(safe-area-inset-bottom) 32rpx;
}
</style>

<route lang="json">
{
  "layout": "tabbar",
  "name": "rank",
  "style": {
    "navigationBarTitleText": "排行榜"
  }
}
</route>
