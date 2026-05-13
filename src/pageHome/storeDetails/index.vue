<script setup lang="ts">
import type { ProductItem } from '@/types/common'
import { useLayoutStore } from '@/stores'
import { getShopDetail, getShopProductList } from '@/api/shop'

interface Pagination {
  pageNum: number
  pageSize: number
  total: number
}

const layoutStore = useLayoutStore()
const statusBarHeight = computed(() => {
  return layoutStore.layoutStore.statusBarHeight
})
const shopId = ref('')

const detailData = ref<any>()
const state = ref()
const loading = ref<boolean>(false)
const productList = ref<ProductItem[]>([])
const pagination = ref<Pagination>({
  pageNum: 1,
  pageSize: 10,
  total: 0,
})

function handleClickLeft() {
  uni.navigateBack()
}

function getDetail() {
  getShopDetail({ shopId: shopId.value }).then((res) => {
    if (res.code === 0) {
      console.log(res.data)
      detailData.value = res.data
    }
  })
}

function getDataList() {
  const params = {
    pageNum: pagination.value.pageNum,
    pageSize: pagination.value.pageSize,
    shopId: shopId.value,
  }
  loading.value = true
  getShopProductList(params).then((res) => {
    if (res.code === 0) {
      if (pagination.value.pageNum === 1) {
        productList.value = [...res.rows]
      }
      else {
        productList.value = [...productList.value, ...res.rows]
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

onLoad((options) => {
  shopId.value = options?.shopId
  getDetail()
  getDataList()
})
</script>

<template>
  <view class="store-details">
    <wd-navbar title="店铺详情" safe-area-inset-top left-arrow fixed :bordered="false" @click-left="handleClickLeft" />
    <view class="store-info">
      <view class="store-name" :style="{ paddingTop: `${(statusBarHeight || 0) + 44}px` }">
        <!-- <image src="../../static/logo.svg" /> -->
        <view class="name-text">
          <view class="text">
            {{ detailData?.shopName }}
          </view>
          <view class="sales">
            <text>店铺销量</text>
            <text>{{ detailData?.shopSales }}</text>
          </view>
        </view>
      </view>
      <view class="store-score">
        <view v-for="(item, index) in detailData?.shopScores.filter((item1:any) => item1.text !== '商家体验分')" :key="index" class="score-item">
          <view>{{ item.text }}</view>
          <view>{{ item.score }}</view>
        </view>
      </view>
    </view>
    <view class="product-title">
      店铺商品
    </view>
    <MyScrollView top="586rpx" :state="state" :fixed="false" @scrolltolower="scrolltolower" @loadmore="loadmore">
      <view class="product-list">
        <ProductCard :product-list="productList" />
      </view>
    </MyScrollView>
  </view>
</template>

<style scoped lang="scss">
.store-details{
  :deep(){
    .wd-navbar{
      background-color: transparent;
    }
    .wd-navbar__left{
      .wd-icon-arrow-left{
        color: #ffffff;
      }
    }
    .wd-navbar__title{
      color: #ffffff;
    }
  }
}
.store-info{
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  background: rgba(180,0,61,0.5);
  backdrop-filter: blur(12px);
  .store-name{
    display: flex;
    gap: 32rpx;
    align-items: center;
    margin-bottom: 48rpx;
    width: 686rpx;
    padding-left: 32rpx;
    padding-right: 32rpx;
    image{
      width: 128rpx;
      height: 128rpx;
      border-radius: 64rpx;
      border: 4rpx solid rgba(255,255,255,0.85);
    }
    .name-text{
      .text{
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 36rpx;
        color: #FFFFFF;
        line-height: 36rpx;
        font-style: normal;
      }
      .sales{
        display: flex;
        gap: 8rpx;
        margin-top: 22rpx;
        align-items: center;
        text:nth-child(1){
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 24rpx;
          color: rgba(255,255,255,0.65);
          line-height: 20rpx;
          font-style: normal;
        }
        text:nth-child(2){
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: 24rpx;
          color: rgba(255,255,255,0.85);
          line-height: 24rpx;
          font-style: normal;
        }
      }
    }
  }
  .store-score{
    width: 686rpx;
    display: flex;
    padding: 40rpx 0rpx;
    background: #FFFFFF;
    box-shadow: 0rpx 0rpx 112rpx 0rpx rgba(187,133,151,0.1);
    border-radius: 32rpx;
    margin-bottom: -32rpx;
    .score-item{
      flex:1;
      text-align: center;
      view:nth-child(1){
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #666666;
        line-height: 24rpx;
        font-style: normal;
        margin-bottom: 16rpx;
      }
      view:nth-child(2){
        font-family: PingFangSC, PingFang SC;
        font-weight: 600;
        font-size: 32rpx;
        color: #000000;
        line-height: 32rpx;
        font-style: normal;
      }
    }
  }
}
.product-title{
  padding: 54rpx 32rpx 4rpx 32rpx;
}
.scroll-Y{
  transition: all 0.3s ease; /* 添加平滑过渡效果 */
  position: absolute;
  top: 586rpx;
  bottom: env(safe-area-inset-bottom);
}
.product-list{
  padding: 0rpx 32rpx;
}
</style>

<route lang="json">
{
  "name": "storeDetails",
  "style": {
    "navigationBarTitleText": "店铺详情"
  }
}
</route>
