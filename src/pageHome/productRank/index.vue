<script setup lang="ts">
import GoodsCard from './component/GoodsCard.vue'
import { getProductList } from '@/api/product'
import type { ProductItem } from '@/types/common'

const layoutStore = useLayoutStore()
const statusBarHeight = computed(() => {
  return layoutStore.layoutStore.statusBarHeight
})
function handleClickLeft() {
  uni.navigateBack()
}
const tabs = [
  {
    title: '销量榜',
    key: '4',
  },
  {
    title: '高佣榜',
    key: '2',
  },
  {
    title: '补贴榜',
    key: '3',
  },
]

const tabValue = ref()
const productList = ref<ProductItem[]>([])

function getdata() {
  const params = {
    pageNum: 1,
    pageSize: 20,
    orderField: tabValue.value,
    sortType: 2,
  }
  getProductList(params).then((res) => {
    if (res.code === 0) {
      productList.value = [...res.rows]
    }
  })
}

function tabChange() {
  getdata()
}

onLoad((options) => {
  tabValue.value = options?.id || '4'
  getdata()
})
</script>

<template>
  <view class="banner-worp">
    <wd-navbar safe-area-inset-top left-arrow :placeholder="false" :bordered="false" @click-left="handleClickLeft">
      <template #title>
        <view class="tab-box">
          <LineTabs v-model="tabValue" :tabs="tabs" @change="tabChange" />
        </view>
      </template>
    </wd-navbar>
  </view>
  <view class="goods-box" :style="{ paddingTop: `${(statusBarHeight || 0) + 55}px` }">
    <GoodsCard :product-list="productList" />
  </view>
</template>

<style scoped lang="scss">
.tab-box{
  padding: 0 16rpx;
}
.banner-worp {
  position: fixed;
  left: 0;
  top: 0;
  // height: 310rpx;
  width: 100%;
  z-index: 99;
  background: linear-gradient( 180deg, #FFF4F6 0%, #FFFFFF 100%);;
  :deep(){
    .wd-navbar{
      background-color: transparent;
      .wd-navbar__title{
        color: #000
      }
    }
  }
}
.goods-box{
  padding: 10rpx 32rpx 0 32rpx;
}
</style>

<route lang="json">
{
  "layout": "default",
  "name": "productRank",
  "style": {
    "navigationBarTitleText": "商品榜"
  }
}
</route>
