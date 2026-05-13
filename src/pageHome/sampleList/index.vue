<script setup lang="ts">
import SampleItem from './component/SampleItem.vue'
import SelectExpertPopup from './component/SelectExpertPopup.vue'
import { useLayoutStore } from '@/stores'

import { getSampleLogList, getSampleLogStatusCount } from '@/api/sample'

interface Pagination {
  pageNum: number
  pageSize: number
  total: number
}

const countData = {
  allCount: ref(0),
  applyCount: ref(0),
  confirmCount: ref(0),
  refuseCount: ref(0),
  toBeReceivedCount: ref(0),
  finishCount: ref(0),
}

const tabs = ref([
  {
    title: '全部',
    key: '0',
    badgeProps: {
      modelValue: ref(countData.allCount || 0),
      max: 99,
      showZero: true,
    },
  },
  {
    title: '待审核',
    key: '1',
    badgeProps: {
      modelValue: ref(countData.applyCount || 0),
      max: 99,
      showZero: true,
    },
  },
  {
    title: '待收货',
    key: '2',
    badgeProps: {
      modelValue: ref(countData.toBeReceivedCount || 0),
      max: 99,
      showZero: true,
    },
  },
  {
    title: '已收货',
    key: '3',
    badgeProps: {
      modelValue: ref(countData.confirmCount || 0),
      max: 99,
      showZero: true,
    },
  },
  {
    title: '已完成',
    key: '4',
    badgeProps: {
      modelValue: ref(countData.finishCount || 0),
      max: 99,
      showZero: true,
    },
  },
  {
    title: '已拒绝',
    key: '5',
    badgeProps: {
      modelValue: ref(countData.refuseCount || 0),
      max: 99,
      showZero: true,
    },
  },
])
const imgBaseUrl = import.meta.env.VITE_IMG_URL
const tabValue = ref<string>('0')
const state = ref()
const loading = ref<boolean>(false)
const dataList = ref<any>([])
const selectUsers = ref<any>([])
const sampleType = ref<string>('')
const pagination = ref<Pagination>({
  pageNum: 1,
  pageSize: 10,
  total: 0,
})
const layoutStore = useLayoutStore()
const statusBarHeight = computed(() => {
  const h = 280
  const num = uni.upx2px(h)
  return layoutStore.layoutStore.statusBarHeight + num
})
function handleClickLeft() {
  uni.navigateBack()
}

const popupRef = ref<ComponentPublicInstance<{ open: () => void }> | null>(null)

function showPopup() {
  popupRef.value?.open()
}

function onConfirm(data: any, flag: boolean) {
  if (flag) {
    sampleType.value = '2'
  }
  else {
    sampleType.value = ''
    selectUsers.value = data
  }
  pagination.value.pageNum = 1
  dataList.value = []
  getDataList()
}

function getDataList() {
  const ids = selectUsers.value.map((item: any) => item.id)
  const params = {
    pageNum: pagination.value.pageNum,
    pageSize: pagination.value.pageSize,
    status: tabValue.value === '0' ? '' : tabValue.value,
    kolIds: ids.length > 0 ? ids.join(',') : '',
    sampleType: sampleType.value,
  }
  loading.value = true
  getSampleLogList(params).then((res) => {
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

function getCount() {
  getSampleLogStatusCount().then((res) => {
    if (res.code === 0) {
      countData.allCount.value = res.data.allCount
      countData.applyCount.value = res.data.applyCount
      countData.confirmCount.value = res.data.confirmCount
      countData.refuseCount.value = res.data.refuseCount
      countData.toBeReceivedCount.value = res.data.toBeReceivedCount
      countData.finishCount.value = res.data.finishCount
    }
  })
}
function tabChange() {
  pagination.value.pageNum = 1
  dataList.value = []
  getDataList()
}
onShow(() => {
  getCount()
  getDataList()
})
</script>

<template>
  <view class="topbox">
    <wd-navbar title="申样列表" safe-area-inset-top left-arrow :bordered="false" @click-left="handleClickLeft" />
    <view class="tab-box">
      <LineTabs v-model="tabValue" :tabs="tabs" show-count @change="tabChange" />
    </view>
    <view class="select-box">
      <view v-if="sampleType === '2'" class="select-text">
        商务申样
      </view>
      <view v-else class="img-box">
        <!-- 取前五个选择的人员 -->
        <image v-for="(item, index) in selectUsers.filter((e:any, i:number) => i < 5)" :key="item.id" :src="item.avatar" :style="{ left: `${index * 24}rpx` }" />
      </view>
      <view class="select-right" @click="showPopup">
        {{ selectUsers.length || sampleType === '2' ? '已选择' : '全部达人' }}
        <wd-icon name="fill-arrow-down" color="#BABABA" size="38rpx" />
      </view>
    </view>
  </view>

  <MyScrollView :top="`${(statusBarHeight || 0)}px`" :state="state" @scrolltolower="scrolltolower" @loadmore="loadmore">
    <view v-if="dataList.length > 0" class="sample-content">
      <template v-for="item in dataList" :key="item.id">
        <SampleItem :item="item" />
      </template>
    </view>
    <wd-status-tip v-if="dataList.length <= 0 && !loading" tip="暂无数据~">
      <template #image>
        <image style="width: 320rpx;height: 344rpx;margin-top: 60rpx;" :src="`${imgBaseUrl}/notData.png`" />
      </template>
    </wd-status-tip>
  </MyScrollView>
  <SelectExpertPopup ref="popupRef" @on-confirm="onConfirm" />
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
  padding: 0 32rpx;
}
</style>

<route lang="json">
{
  "layout": "default",
  "name": "sampleList",
  "style": {
    "navigationBarTitleText": "申样列表"
  }
}
</route>
