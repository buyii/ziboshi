<script setup lang="ts">
import ProductSample from './component/ProductSample.vue'
import type { ProductItem } from '@/types/common'
import { getProductList } from '@/api/product'

interface Pagination {
  pageNum: number
  pageSize: number
  total: number
}
const pagination = ref<Pagination>({
  pageNum: 1,
  pageSize: 10,
  total: 0,
})
const state = ref()

const productList = ref<ProductItem[]>([])

function getdata() {
  if (pagination.value.pageNum === 1) {
    nextTick(() => {
    })
  }
  const params = {
    productType: 2, // 1-正常商品 2-体验装
  }
  getProductList(params).then((res) => {
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
    uni.stopPullDownRefresh()
  }).catch(() => {
    uni.stopPullDownRefresh()
    state.value = 'error'
  })
}

onPullDownRefresh(() => {
  pagination.value.pageNum = 1
  state.value = 'loading'
  getdata()
})

onLoad(() => {
  getdata()
})
</script>

<template>
  <wd-navbar title="申请体验装" safe-area-inset-top fixed :placeholder="true" :bordered="false" />
  <view v-for="item in productList" :key="item.productId" class="produc-list">
    <ProductSample :item-data="item" />
  </view>
</template>

<style lang="scss" scoped>
.card-warp{
  padding-left: 32rpx;
  padding-right: 32rpx;
  padding-bottom: 32rpx;
  padding-top: 16rpx;
  .top-box{
    background: #94C3A3;
    border-radius: 32rpx;
    padding: 42rpx 30rpx 24rpx 48rpx;
  }
  .phone-box{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 55rpx;
    .phone-label{
      font-weight: 400;
      font-size: 28rpx;
      color: #FFFFFF;
    }
    .phone-num{
      font-weight: 400;
      font-size: 28rpx;
      color: #FFFFFF;
    }
  }
  .srbd{
    padding-bottom: 24rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24rpx;
    .srbd-text{
      font-family: PingFangSC, PingFang SC;
      font-weight: 600;
      font-size: 48rpx;
      color: #FFFFFF;
      line-height: 48rpx;
      text-align: left;
      font-style: normal;
    }
    :deep(){
      .wd-button{
        width: 136rpx;
        height: 58rpx;
        background: linear-gradient( 0deg, #D3E6D9 0%, #FAFFFC 100%);
        box-shadow: 0rpx 16rpx 48rpx 0rpx rgba(74,109,85,0.25), inset 0rpx -6rpx 6rpx 0rpx rgba(231,221,212,0.3);
        border-radius: 18rpx;
        color: #042A10;
        font-weight: 500;
        font-size: 30rpx;
      }
    }
  }
  .produc-list{
    margin-top: 24rpx;
  }
}
</style>

<route type="home" lang="json">
{
  "layout": "default",
  "name": "sample",
  "style": {
    "navigationBarTitleText": "申请体验装"
  }
}
</route>
