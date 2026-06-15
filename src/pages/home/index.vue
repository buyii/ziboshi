<script setup lang="ts">
import { useToast } from 'wot-design-uni'
import ProductHome from './component/ProductHome.vue'
import PosterTem from './component/PosterTem.vue'
import SharePopup from './component/SharePopup.vue'
import BuyPopup from './component/BuyPopup.vue'
import PosterPopup from './component/PosterPopup.vue'

import type { ProductItem } from '@/types/common'
import { getProductDetail, getProductList } from '@/api/product'
import { getAgentInfo } from '@/api/mine'
import { getCoupon, miniQRCode } from '@/api/common'

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
const toast = useToast()
const scene = ref()
const state = ref()
const joinData = ref<any>({})
const imgBaseUrl = import.meta.env.VITE_IMG_URL
const productList = ref<ProductItem[]>([])
const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)

const posterPopupRef = ref<ComponentPublicInstance<{ open: (num: string) => void }> | null>(null)
const SharePopupRef = ref<ComponentPublicInstance<{ open: () => void, close: () => void }> | null>(null)
const BuyPopupRef = ref<ComponentPublicInstance<{ open: () => void, close: () => void }> | null>(null)

const showPoster = ref(false)
const imgUrl = ref('')
const codeImg = ref('')
const detailData = ref<any>({})

const coupon = computed(() => {
  const list = userStore.couponList.filter((item: any) => item.type === 1)
  const item = list.find((item: any) => item.type === 1)
  return item
})

function getdata() {
  if (pagination.value.pageNum === 1) {
    nextTick(() => {
    })
  }
  const params = {
    productType: 1, // 1-正常商品 2-体验装
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
      getDetail()
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

function getYouHui() {
  getCoupon().then((res) => {
    if (res.code === 0) {
      const list = res.data || []
      userStore.setCouponList(list)
    }
  })
}

function getCode() {
  toast.loading({
    loadingType: 'ring',
    loadingColor: '#FF0057',
    msg: '海报生成中...',
  })
  const params = {
    productId: detailData.value.productId,
    activityId: detailData.value.activityId,
  }
  miniQRCode(params).then((res) => {
    if (res.code === 0) {
      showPoster.value = true
      codeImg.value = res.data
    }
  }).catch(() => {
    toast.close()
  })
}

function onPoster() {
  if (imgUrl.value) {
    posterPopupRef.value?.open(imgUrl.value)
  }
  else {
    getCode()
  }
}

function changeImg(url: any) {
  toast.close()
  imgUrl.value = url
  posterPopupRef.value?.open(imgUrl.value)
}

function onShareClick() {
  SharePopupRef.value?.open()
}

function getDetail() {
  getProductDetail({ productId: productList.value[0].productId, activityId: productList.value[0].activityId }).then((res) => {
    if (res.code === 0) {
      detailData.value = res.data
    }
  })
}

function toPay() {
  BuyPopupRef.value?.open()
}

onShow(() => {
  if (userInfo.value && userInfo.value.userCode) {
    getYouHui()
  }
})

onLoad((options) => {
  if (options?.scene) {
    scene.value = options?.scene
    getAgent(scene.value)
  }
  getdata()
})
</script>

<template>
  <wd-navbar title="我的" safe-area-inset-top fixed :placeholder="true" :bordered="false" />
  <view class="card-warp">
    <image style="width: 100%;height: 220rpx;" :src="`${imgBaseUrl}/topbanner.png`" />
    <view v-for="item in productList" :key="item.productId" class="produc-list">
      <ProductHome :item-data="item" :coupon="coupon" />
    </view>
    <view class="btn-box">
      <wd-button custom-class="share-btn" @click="onShareClick">
        <text class="iconfont icon-share1" />
        分享
      </wd-button>
      <wd-button custom-class="buy-btn" @click="toPay">
        <text class="iconfont icon-buy" />
        购买
      </wd-button>
    </view>
    <PosterPopup ref="posterPopupRef" />
    <PosterTem v-if="showPoster" :code-img="codeImg" :detail-data="detailData" @change-img="changeImg" />
    <SharePopup ref="SharePopupRef" @on-poster="onPoster" />
    <BuyPopup ref="BuyPopupRef" :detail-data="detailData" />
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
    margin-top: 16rpx;
  }
}
.btn-box{
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 12rpx 16rpx 28rpx 16rpx;
  border-radius: 0 0 32rpx 32rpx;
  :deep(){
    .share-btn{
      width: 230rpx !important;
      height: 80rpx !important;
      background: rgba(8, 157, 57, 0.2) !important;
      box-shadow: 0rpx 24rpx 80rpx 0rpx rgba(91,91,113,0.25) !important;
      border-radius: 32rpx !important;
      color: #089D39 !important;
      font-weight: 500 !important;
      font-size: 32rpx !important;
      line-height: 32rpx !important;
    }
    .buy-btn{
      width: 370rpx !important;
      height: 80rpx !important;
      background: #089D39 !important;
      box-shadow: 0rpx 24rpx 80rpx 0rpx rgba(91,91,113,0.25) !important;
      border-radius: 32rpx !important;
      font-weight: 500 !important;
      font-size: 32rpx !important;
      color: #FFFFFF !important;
      line-height: 32rpx !important;
    }
  }
  .iconfont{
    font-size: 28rpx;
    margin-right: 8rpx;
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
