<script setup lang="ts">
import type { ProductItem } from '@/types/common'
import { getTrafficList } from '@/api/product'

const productList = ref<ProductItem[]>([])
function handleClickLeft() {
  uni.navigateBack()
}
interface Pagination {
  pageNum: number
  pageSize: number
  total: number
}
const pagination = ref<Pagination>({
  pageNum: 1,
  pageSize: 6,
  total: 0,
})
const imgBaseUrl = import.meta.env.VITE_IMG_URL
const state = ref()
const productName = ref('')
const loading = ref(false)

function getdata() {
  const params = {
    pageNum: pagination.value.pageNum,
    pageSize: pagination.value.pageSize,
    productName: productName.value,
  }
  getTrafficList(params).then((res) => {
    if (res.code === 0) {
      pagination.value.total = res.total
      state.value = null
      const rows = res.rows || []
      if (pagination.value.pageNum === 1) {
        productList.value = [...rows]
      }
      else {
        productList.value = productList.value.concat(rows)
      }
    }
    else {
      state.value = 'error'
    }
    loading.value = false
  }).catch(() => {
    loading.value = false
    state.value = 'error'
  })
}

function search() {
  pagination.value.pageNum = 1
  getdata()
}
function loadmore() {
  state.value = 'loading'
  getdata()
}
onReachBottom(() => {
  if (pagination.value.pageNum * pagination.value.pageSize >= pagination.value.total) {
    state.value = 'finished'
    return
  }
  state.value = 'loading'
  pagination.value.pageNum += 1
  getdata()
})
onLoad(() => {
  loading.value = true
  getdata()
})
</script>

<template>
  <view class="banner-worp">
    <wd-navbar title="投流专区" safe-area-inset-top left-arrow :placeholder="false" :bordered="false" @click-left="handleClickLeft" />
    <view class="search-box">
      <MySearch v-model="productName" @search="search" @clear="search" />
    </view>
  </view>
  <view class="card-warp">
    <ProductCard v-if="productList.length > 0" :product-list="productList" />
    <wd-status-tip v-if="productList.length <= 0 && !loading" tip="暂无数据~">
      <template #image>
        <image style="width: 320rpx;height: 344rpx;margin-top: 60rpx;" :src="`${imgBaseUrl}/notData.png`" />
      </template>
    </wd-status-tip>
    <wd-loadmore :state="state" custom-class="myloadmore" :loading-props="{ color: '#ff0057' }" @reload="loadmore" />
  </view>
</template>

<style lang="scss" scoped>
.tab-box{
  background-color: #fff;
}
.banner-worp {
  position: fixed;
  left: 0;
  top: 0;
  height: 290rpx;
  width: 100%;
  z-index: 99;
  background: linear-gradient( 180deg, #FFF4F6 0%, #FFFFFF 100%);;
  .img-banner{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 0;
    width: 100%;
    height: 300rpx;
  }
  :deep(){
    .wd-navbar{
      background-color: transparent;
      .wd-navbar__title{
        color: #000
      }
    }
  }
}
.search-box{
  padding: 0 32rpx;
  background-color: #fff;
}
.card-warp{
  padding-top: 300rpx;
  padding-left: 26rpx;
  padding-right: 26rpx;
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

<route type="default" lang="json">
{
  "layout": "default",
  "name": "traffic",
  "style": {
    "navigationBarTitleText": "投流专区"
  }
}
</route>
