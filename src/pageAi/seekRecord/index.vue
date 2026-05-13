<script setup lang="ts">
import { useToast } from 'wot-design-uni'
import SeekItem from './component/SeekItem.vue'
import { getProductLogList, productLogDel } from '@/api/productfind'
import { useLayoutStore } from '@/stores'

interface Pagination {
  pageNum: number
  pageSize: number
  total: number
}
const { success: showSuccess } = useToast()
const layoutStore = useLayoutStore()
const statusBarHeight = computed(() => {
  return layoutStore.layoutStore.statusBarHeight
})
const tabs = [
  {
    title: '全部',
    key: 'all',
  },
  {
    title: '审核中',
    key: '1',
  },
  {
    title: '进行中',
    key: '2',
  },
  {
    title: '已拒绝',
    key: '4',
  },
  {
    title: '已完成',
    key: '3',
  },
]

const imgBaseUrl = import.meta.env.VITE_IMG_URL
const tabValue = ref<string>('all')
const state = ref()
const loading = ref<boolean>(false)
const dataList = ref<any>([])
const pagination = ref<Pagination>({
  pageNum: 1,
  pageSize: 10,
  total: 0,
})
function handleClickLeft() {
  uni.navigateBack()
}

function getDataList() {
  const params = {
    pageNum: pagination.value.pageNum,
    pageSize: pagination.value.pageSize,
    status: tabValue.value === 'all' ? '' : tabValue.value,
  }
  loading.value = true
  getProductLogList(params).then((res) => {
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

function tabClick() {
  pagination.value.pageNum = 1
  getDataList()
}

function onDel(item: any) {
  const ids = item.id
  productLogDel({ id: ids }).then((res) => {
    if (res.code === 0) {
      showSuccess({
        msg: res.msg,
      })
      getDataList()
    }
  })
}

onLoad(() => {
  getDataList()
})
</script>

<template>
  <view class="topbox">
    <wd-navbar title="找品记录" safe-area-inset-top left-arrow :bordered="false" @click-left="handleClickLeft" />
    <view class="tab-box">
      <LineTabs v-model="tabValue" :tabs="tabs" @change="tabClick" />
    </view>
  </view>
  <MyScrollView :top="`${(statusBarHeight || 0) + 91}px`" :state="state" @scrolltolower="scrolltolower" @loadmore="loadmore">
    <view class="record-content">
      <template v-if="dataList.length > 0">
        <SeekItem v-for="item in dataList" :key="item.id" :item="item" @on-del="onDel" />
      </template>
      <wd-status-tip v-if="dataList.length <= 0 && !loading" tip="暂无数据~">
        <template #image>
          <image style="width: 320rpx;height: 344rpx;margin-top: 60rpx;" :src="`${imgBaseUrl}/notData.png`" />
        </template>
      </wd-status-tip>
    </view>
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
.scroll-Y{
  transition: all 0.3s ease; /* 添加平滑过渡效果 */
  position: fixed;
  bottom: 0;
}
.record-content{
  padding: 24rpx 32rpx;
}
</style>

<route lang="json">
{
  "layout": "default",
  "name": "seekRecord",
  "style": {
    "navigationBarTitleText": "找品记录"
  }
}
</route>
