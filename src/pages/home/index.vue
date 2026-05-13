<script setup lang="ts">
import type { Comprehensive, ProductItem } from '@/types/common'
import { getProductList } from '@/api/product'
import { getCategoryList } from '@/api/common'
import { getAgentInfo } from '@/api/mine'
import { login } from '@/api/index'

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
// const toast = useToast()
const scene = ref()
const state = ref()
const joinData = ref<any>({})

const productList = ref<ProductItem[]>([])
const categoryList = ref<any[]>([])
const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
const comprehensive = ref<Comprehensive>(
  {
    maxPrice: '', // 最大价格
    minPrice: '', // 最小价格
    maxCosRatio: '', // 最大佣金率
    minCosRatio: '', // 最小佣金率
    maxKolServiceRatio: '', // 最大每单补率
    minKolServiceRatio: '', // 最小每单补率
    maxSales: '', // 最大销量
    minSales: '', // 最小销量
  },
)
const orderField = ref<number>(0)
const productName = ref<string>('')
const categoryId = ref<string>('0')
const sortType = ref<0 | 1 | 2>(0)
function getdata() {
  if (pagination.value.pageNum === 1) {
    nextTick(() => {
    })
  }
  const params = {
    pageNum: pagination.value.pageNum,
    pageSize: pagination.value.pageSize,
    orderField: orderField.value,
    sortType: sortType.value,
    productName: productName.value,
    categoryId: categoryId.value === '0' ? '' : categoryId.value,
    source: 1,
    ...comprehensive.value,
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

function getCategory() {
  getCategoryList().then((res) => {
    if (res.code === 0) {
      categoryList.value = res.data
    }
  })
}

onPullDownRefresh(() => {
  pagination.value.pageNum = 1
  state.value = 'loading'
  getdata()
})

function getAgent(userCode: any) {
  getAgentInfo({
    userCode,
    source: 2,
  }).then((res) => {
    if (res.code === 0) {
      if (res.data.has) {
        if (userInfo.value && userInfo.value.userCode === res.data.agent.agentUserCode) {
          return
        }
        joinData.value = res.data.agent
      }
    }
  })
}

onShareAppMessage ((res) => {
  if (res.from === 'button') { // 来自页面内分享按钮
    console.log(res.target)
  }
  if (userInfo.value && userInfo.value.userCode && userInfo.value.userType === '03') {
    return {
      title: '星佣宝',
      path: `/pages/home/index?scene=${userInfo.value.userCode}`,
    }
  }
  return {
    title: '星佣宝',
    path: '/pages/home/index',
  }
})
onShareTimeline (() => {
  if (userInfo.value && userInfo.value.userCode && userInfo.value.userType === '03') {
    return {
      title: '星佣宝',
      path: `/pages/home/index?scene=${userInfo.value.userCode}`,
    }
  }
  return {
    title: '星佣宝',
    path: '/pages/home/index',
  }
})

onLoad((options) => {
  if (options?.scene) {
    scene.value = options?.scene
    getAgent(scene.value)
  }
  getdata()
  getCategory()
})
</script>

<template>
  <wd-navbar title="首页" safe-area-inset-top fixed :placeholder="true" :bordered="false" />
  <view class="card-warp">
    <view class="srbd">
      <view class="srbd-text">
        新人必读
      </view>
      <wd-button size="small" :round="false">
        查看<wd-icon name="arrow-right" color="#042A10" />
      </wd-button>
    </view>
    <ProductCard :product-list="productList" />
  </view>
</template>

<style lang="scss" scoped>
.card-warp{
  padding-left: 32rpx;
  padding-right: 32rpx;
  .srbd{
    width: 686rpx;
    height: 192rpx;
    background: #94C3A3;
    border-radius: 32rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 48rpx;
    padding-right: 30rpx;
    box-sizing: border-box;
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
        height: 64rpx;
        background: linear-gradient( 0deg, #D3E6D9 0%, #FAFFFC 100%);
        box-shadow: 0rpx 16rpx 48rpx 0rpx rgba(74,109,85,0.25), inset 0rpx -6rpx 6rpx 0rpx rgba(231,221,212,0.3);
        border-radius: 24rpx;
        color: #042A10;
        font-weight: 500;
        font-size: 32rpx;
      }
    }
  }
  :deep(){
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

<route type="home" lang="json">
{
  "layout": "tabbar",
  "name": "home",
  "style": {
    "navigationBarTitleText": "选品广场"
  }
}
</route>
