<script setup lang="ts">
import { useMessage, useToast } from 'wot-design-uni'
import CarItem from './component/CarItem.vue'
import type { Item } from './type'
import { useLayoutStore } from '@/stores'
import { batchDelCar, getMyCarList } from '@/api/pickCar'

interface Pagination {
  pageNum: number
  pageSize: number
  total: number
}
const imgBaseUrl = import.meta.env.VITE_IMG_URL
const message = useMessage()
const { success: showSuccess, error: showError } = useToast()
const layoutStore = useLayoutStore()
const statusBarHeight = computed(() => {
  return layoutStore.layoutStore.statusBarHeight
})

const pagination = ref<Pagination>({
  pageNum: 1,
  pageSize: 5,
  total: 0,
})
const state = ref()
const loading = ref<boolean>(false)
const isBatch = ref(false)
const checkboxAll = ref(false)
function handleClickLeft() {
  uni.navigateBack()
}
const dataList = ref<Item[]>([])
function confirm() {
  isBatch.value = true
}
function onConfirm() {
  const checkList = dataList.value.filter(item => item.checkbox)
  const idarr = checkList.map(item => item.id)
  if (idarr.length < 1) {
    showError({
      msg: '请选择要删除的商品',
    })
    return
  }
  const ids = idarr.join(',')
  message.confirm({
    msg: '确认删除?',
    title: '提示',
    cancelButtonProps: {
      customClass: 'custom-shadow1',
    },
    confirmButtonProps: {
      customClass: 'custom-shadow',
    },
  }).then(() => {
    batchDelCar({ ids }).then((res) => {
      if (res.code === 0) {
        showSuccess({
          msg: res.msg,
        })
        isBatch.value = false
        checkboxAll.value = false
        getDataList()
      }
    })
  }).catch(() => {
    console.log('点击了取消按钮')
  })
}
function onCancel() {
  isBatch.value = false
  checkboxAll.value = false
  dataList.value.forEach((item) => {
    item.checkbox = false
  })
}
function handleChange({ value }: { value: boolean }) {
  if (value) {
    dataList.value.forEach((item) => {
      item.checkbox = true
    })
  }
  else {
    dataList.value.forEach((item) => {
      item.checkbox = false
    })
  }
}
function onDel(item: Item) {
  const ids = [item.id].join(',')
  batchDelCar({ ids }).then((res) => {
    if (res.code === 0) {
      showSuccess({
        msg: res.msg,
      })
      getDataList()
    }
  })
}
function getDataList() {
  const params = {
    pageNum: pagination.value.pageNum,
    pageSize: pagination.value.pageSize,
  }
  loading.value = true
  getMyCarList({ ...params }).then((res) => {
    if (res.code === 0) {
      pagination.value.total = res.total
      state.value = null
      const rows = res.rows.map((item: Item) => {
        return {
          ...item,
          checkbox: false,
        }
      }) || []
      if (pagination.value.pageNum === 1) {
        dataList.value = [...rows]
      }
      else {
        dataList.value = dataList.value.concat(rows)
      }
    }
    else {
      state.value = 'error'
    }
    loading.value = false
  }).catch(() => {
    state.value = 'error'
    loading.value = false
  })
}
function loadmore() {
  state.value = 'loading'
  getDataList()
}
onReachBottom(() => {
  if (pagination.value.pageNum * pagination.value.pageSize >= pagination.value.total) {
    state.value = 'finished'
    return
  }
  state.value = 'loading'
  pagination.value.pageNum += 1
  getDataList()
})
onLoad(() => {
  getDataList()
})
</script>

<template>
  <wd-navbar title="我的选品车" safe-area-inset-top left-arrow fixed :bordered="false" @click-left="handleClickLeft" />
  <view :style="{ paddingTop: `${(statusBarHeight || 0) + 44}px` }" class="car-page">
    <template v-if="dataList.length > 0">
      <CarItem
        v-for="(item, i) in dataList" :key="i"
        v-model:checkbox="item.checkbox" :item="item" :is-batch="isBatch" @on-del="onDel"
      />
    </template>
    <wd-status-tip v-if="dataList.length <= 0 && !loading" tip="暂无数据~">
      <template #image>
        <image style="width: 320rpx;height: 344rpx;margin-top: 60rpx;" :src="`${imgBaseUrl}/notData.png`" />
      </template>
    </wd-status-tip>
    <FootButton v-if="!isBatch" plain label="批量操作" fixed @confirm="confirm" />
    <FootButtonGroup v-if="isBatch" plain cancel-label="取消" confirm-label="删除" fixed @on-confirm="onConfirm" @on-cancel="onCancel">
      <view class="checkbox-all">
        <wd-checkbox v-model="checkboxAll" size="large" shape="square" checked-color="#FF0057" @change="handleChange">
          全选
        </wd-checkbox>
      </view>
    </FootButtonGroup>
    <wd-loadmore :state="state" custom-class="myloadmore" :loading-props="{ color: '#ff0057' }" @reload="loadmore" />
  </view>
</template>

<style scoped lang="scss">
.car-page{
  padding-left:32rpx;
  padding-right:32rpx;
  padding-bottom: calc(102rpx + env(safe-area-inset-bottom));
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
.checkbox-all{
  width: 180rpx;
  // margin-right: 40rpx;
}
</style>

<style lang="scss">
.custom-shadow{
  background-color: #FF0057 !important;
}
</style>

<route lang="json">
{
  "layout": "default",
  "name": "selectedCar",
  "style": {
    "navigationBarTitleText": "我的选品车"
  }
}
</route>
