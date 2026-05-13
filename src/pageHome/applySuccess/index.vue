<script setup lang="ts">
import ItemCard from './component/ItemCard.vue'
import { getSampleLogList } from '@/api/sample'
import { useTabbar } from '@/composables/useTabbar'

interface Pagination {
  pageNum: number
  pageSize: number
  total: number
}

const tabs = [
  {
    title: '全部',
    key: '0',
  },
  {
    title: '待审核',
    key: '1',
  },
  {
    title: '待收货',
    key: '2',
  },
  {
    title: '已收货',
    key: '3',
  },
  {
    title: '已完成',
    key: '4',
  },
  {
    title: '已拒绝',
    key: '5',
  },
]
const { setTabbarItemActive } = useTabbar()
const imgBaseUrl = import.meta.env.VITE_IMG_URL
const tabValue = ref<string>('0')
const state = ref()
const loading = ref<boolean>(false)
const dataList = ref<any>([])
const pagination = ref<Pagination>({
  pageNum: 1,
  pageSize: 10,
  total: 0,
})

function toHome() {
  setTabbarItemActive('home')
  uni.switchTab({
    url: '/pages/home/index',
  })
}
function onceMore() {
  uni.navigateBack({
    delta: 2,
  })
}

function tabChange() {
  pagination.value.pageNum = 1
  dataList.value = []
  getDataList()
}

function getDataList() {
  const params = {
    pageNum: pagination.value.pageNum,
    pageSize: pagination.value.pageSize,
    status: tabValue.value === '0' ? '' : tabValue.value,
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

onShow(() => {
  getDataList()
})
</script>

<template>
  <wd-navbar title="申样成功" safe-area-inset-top fixed :bordered="false" custom-style="background: transparent;" />
  <view class="apply-warp">
    <view class="tip-box">
      <view class="tip-img">
        <image src="../../static/svg/yishenqing.svg" mode="scaleToFill" />
      </view>
      <view class="tip-btn">
        <wd-button @click="toHome">
          返回首页
        </wd-button>
        <wd-button @click="onceMore">
          继续申样
        </wd-button>
      </view>
    </view>
    <view class="content-box">
      <image class="jilu" src="../../static/svg/jilu.svg" />
      <LineTabs v-model="tabValue" :tabs="tabs" @change="tabChange" />
      <MyScrollView top="180rpx" :fixed="false" :state="state" @scrolltolower="scrolltolower" @loadmore="loadmore">
        <view v-if="dataList.length > 0" class="scroll-content">
          <template v-for="item in dataList" :key="item.id">
            <ItemCard :item="item" />
          </template>
        </view>
        <wd-status-tip v-if="dataList.length <= 0 && !loading" tip="暂无数据~">
          <template #image>
            <image style="width: 320rpx;height: 344rpx;margin-top: 60rpx;" :src="`${imgBaseUrl}/notData.png`" />
          </template>
        </wd-status-tip>
      </MyScrollView>
    </view>
  </view>
</template>

<style scoped lang="scss">
.apply-warp{
  .tip-box{
    height: 626rpx;
    background: linear-gradient( 180deg, rgba(255,36,87,0.05) 0%, #FFFFFF 100%);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    .tip-img{
      display: flex;
      align-items: center;
      justify-content: center;
      image{
        width: 244rpx;
        height: 230rpx;
      }
    }
    .tip-btn{
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 32rpx;
      margin-bottom: 60rpx;
      margin-top: 32rpx;
      :deep(){
        .wd-button:nth-child(1){
          width: 264rpx;
          height: 80rpx;
          background: #fef1f1;
          border-radius: 200rpx 30rpx 30rpx 200rpx;
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: 32rpx;
          color: #999999;
          line-height: 80rpx;
          text-align: left;
          font-style: normal;
        }
        .wd-button:nth-child(2){
          width: 264rpx;
          height: 80rpx;
          background: #FF0057;
          border-radius: 30rpx 200rpx 200rpx 30rpx;
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: 32rpx;
          color: #FFFFFF;
          line-height: 80rpx;
          text-align: left;
          font-style: normal;
        }
      }
    }
  }
  .content-box{
    position: relative;
    height: calc(100vh - 626rpx);
    .jilu{
      width: 140rpx;
      height: 32rpx;
      margin-top: 40rpx;
      margin-left: 32rpx;
    }
    .scroll-content{
      margin: 0 32rpx;
    }
  }
}
</style>

<route lang="json">
{
  "layout": "default",
  "name": "applySuccess",
  "style": {
    "navigationBarTitleText": "申样成功"
  }
}
</route>
