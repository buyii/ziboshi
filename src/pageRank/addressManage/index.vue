<script setup lang="ts">
import AddressItem from './component/AddressItem.vue'
import { useLayoutStore } from '@/stores'
import { getAddressList } from '@/api/address'

const instance = getCurrentInstance()
interface Pagination {
  pageNum: number
  pageSize: number
  total: number
}
const rows = ref<any>([])

const imgBaseUrl = import.meta.env.VITE_IMG_URL
const layoutStore = useLayoutStore()
const route = useRoute()
const select = computed(() => {
  return route.params?.select
})

const pagination = ref<Pagination>({
  pageNum: 1,
  pageSize: 10,
  total: 0,
})
const state = ref()
function handleClickLeft() {
  uni.navigateBack()
}
function onConfirm() {
  if (select.value === 'select') {
    uni.navigateTo({
      url: '/pageRank/addAddress/index?type=add&select=select',
    })
    return
  }
  uni.navigateTo({
    url: '/pageRank/addAddress/index?type=add',
  })
}

function goBack(item: any) {
  const _this = instance?.proxy
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  const eventChannel = _this?.getOpenerEventChannel()
  eventChannel.emit('backChange', item)
  uni.navigateBack()
}

const statusBarHeight = computed(() => {
  return layoutStore.layoutStore.statusBarHeight
})
function getList() {
  getAddressList({
    pageNum: pagination.value.pageNum,
    pageSize: pagination.value.pageSize,
  }).then((res) => {
    if (res.code === 0) {
      pagination.value.total = res.total
      state.value = null
      const resRows = res.rows || []
      console.log(resRows, 'rows')
      if (pagination.value.pageNum === 1) {
        rows.value = [...resRows]
      }
      else {
        rows.value = rows.value.concat(resRows)
      }
    }
  })
}
function onRefresh() {
  getList()
}
function loadmore() {
  state.value = 'loading'
  getList()
}
onReachBottom(() => {
  if (pagination.value.pageNum * pagination.value.pageSize >= pagination.value.total) {
    state.value = 'finished'
    return
  }
  state.value = 'loading'
  pagination.value.pageNum += 1
  getList()
})
onShow(() => {
  getList()
})
</script>

<template>
  <wd-navbar title="地址管理" safe-area-inset-top left-arrow fixed :bordered="false" @click-left="handleClickLeft" />
  <view v-if="rows.length < 1" class="address-notData" :style="{ paddingTop: `${(statusBarHeight || 0) + 49}px` }">
    <wd-status-tip tip="当前暂无地址请新增地址">
      <template #image>
        <image style="width: 320rpx;height: 344rpx;margin-top: 112rpx;" :src="`${imgBaseUrl}/notData1.png`" />
      </template>
    </wd-status-tip>
    <wd-button block @click="onConfirm">
      <text class="iconfont icon-add add" />
      <text>新建地址</text>
    </wd-button>
  </view>
  <view v-else class="box1">
    <view class="address-list" :class="{ notPadB: select === 'select' }" :style="{ paddingTop: `${(statusBarHeight || 0) + 49}px` }">
      <AddressItem :select="select" :list="rows" @on-refresh="onRefresh" @go-back="goBack" />
    </view>
    <view class="add-btn">
      <FootButton label="新增地址" fixed @confirm="onConfirm" />
    </view>
    <wd-loadmore :state="state" custom-class="myloadmore" :loading-props="{ color: '#ff0057' }" @reload="loadmore" />
  </view>
</template>

<style lang="scss" scoped>
.address-notData{
  padding: 0 32rpx calc(100rpx + env(safe-area-inset-bottom)) 32rpx;
  :deep(){
    .wd-status-tip__text{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 28rpx;
      color: #AAAAAA;
      line-height: 28rpx;
    }
    .wd-button{
      flex: 1;
      height: 88rpx !important;
      background: #FFFFFF !important;
      border-radius: 8rpx 32rpx 8rpx 32rpx !important;
      font-size: 32rpx !important;
      font-weight: bold !important;
      margin-top: 80rpx;
    }
    .wd-button__text{
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 32rpx;
      color: #089D39;
    }
  }
  .add{
    padding: 6rpx 10rpx;
    background: rgba(8, 157, 57, 0.1);
    border-radius: 16rpx;
    font-size: 24rpx !important;
    margin-right: 20rpx;
  }
}
.address-list{
  padding: 0 32rpx calc(100rpx + env(safe-area-inset-bottom)) 32rpx;
}
.notPadB{
  padding-bottom: env(safe-area-inset-bottom);
}
.add-btn{
  :deep(){
    .iconfont{
      padding: 10rpx 14rpx;
      background: #E6004E;
      border-radius: 16rpx;
      font-size: 24rpx !important;
    }
  }
}
.box1{
  :deep(){
    .myloadmore{
      line-height: 50rpx;
      height: 50rpx;
      .wd-divider{
        margin: 0;
      }
    }
    .wd-divider{
      text-align: center;
      justify-content: center;
      &::before{
        display: none;
      }
      &::after{
        display: none;
      }
    }
  }
}
</style>

<route lang="json">
{
  "layout": "default",
  "name": "address",
  "style": {
    "navigationBarTitleText": "地址管理"
  }
}
</route>
