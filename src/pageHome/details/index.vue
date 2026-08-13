<script setup lang="ts">
import { useToast } from 'wot-design-uni'
import ProductDetails from './component/ProductDetails.vue'
import PosterTem from './component/PosterTem.vue'
import SharePopup from './component/SharePopup.vue'
import PosterPopup from './component/PosterPopup.vue'
import StoreDetail from './component/StoreDetail.vue'
import { getProductDetail } from '@/api/product'
import { miniQRCode } from '@/api/common'
import { login } from '@/api/index'

const toast = useToast()
const productId = ref('')
const scene = ref('')
const showContent = ref(true)
const countdown = ref<any>(null)
const yearsNum = ref<number>(0)
const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)

const posterPopupRef = ref<ComponentPublicInstance<{ open: (num: string) => void }> | null>(null)
const SharePopupRef = ref<ComponentPublicInstance<{ open: () => void, close: () => void }> | null>(null)

const showPoster = ref(false)
const imgUrl = ref('')
const codeImg = ref('')

const detailData = ref<any>({})

const swiperList = computed(() => {
  const list = detailData.value.coverOther ? detailData.value.coverOther.split(',') : []
  return [detailData.value.cover, ...list]
})

const detailImgs = computed(() => {
  return detailData.value.imgs ? detailData.value.imgs.split(',') : []
})

const dicts = computed(() => {
  const list = detailData.value.guaranteeService ? detailData.value.guaranteeService.split(',') : []
  return list
})

function getDetail() {
  getProductDetail({ productId: productId.value }).then((res) => {
    if (res.code === 0) {
      detailData.value = res.data
      showContent.value = false
      // 获取毫秒数
      if (res.data.promotionEndTime) {
        const str = res.data.promotionEndTime.replace(/-/g, '\/')
        countdown.value = new Date(str).getTime() - new Date().getTime()
        // 根据countdown.value 计算有多少年
        yearsNum.value = Math.floor(countdown.value / (1000 * 60 * 60 * 24 * 365))
      }
    }
  })
}

function onShareClick() {
  SharePopupRef.value?.open()
}

function onPoster() {
  if (imgUrl.value) {
    posterPopupRef.value?.open(imgUrl.value)
  }
  else {
    getCode()
  }
}

function getCode() {
  toast.loading({
    loadingType: 'ring',
    loadingColor: '#089D39',
    msg: '海报生成中...',
  })
  const params = {
    productId: detailData.value.productId,
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

function changeImg(url: any) {
  toast.close()
  imgUrl.value = url
  posterPopupRef.value?.open(imgUrl.value)
}

function handleClickLeft() {
  uni.navigateBack()
}

function toPay() {
  const data = { ...detailData.value }
  userStore.setPaymentData(data)
  uni.navigateTo({
    url: `/pageHome/payment/index`,
  })
}

onShareAppMessage ((res) => {
  if (res.from === 'button') { // 来自页面内分享按钮
    SharePopupRef.value?.close()
  }
  if (userInfo.value && userInfo.value.userCode) {
    return {
      title: '滋博仕',
      path: `/pageHome/details/index?productId=${detailData.value.productId}&userCode=${userInfo.value.userCode}`,
    }
  }
  return {
    title: detailData.value.productName,
    path: `/pageHome/details/index?productId=${detailData.value.productId}`,
    imageUrl: detailData.value.cover,
  }
})
onShareTimeline (() => {
  if (userInfo.value && userInfo.value.userCode) {
    return {
      title: '滋博仕',
      path: `/pageHome/details/index?productId=${detailData.value.productId}&userCode=${userInfo.value.userCode}`,
    }
  }
  return {
    title: detailData.value.productName,
    path: `/pageHome/details/index?productId=${detailData.value.productId}`,
    imageUrl: detailData.value.cover,
  }
})

function getAgent(userCode: any) {
  uni.login({
    success(loginRes) {
      login({
        code: loginRes.code,
        recommendCode: userCode,
      }).then((res) => {
        if (res.code === 0) {
          const { data } = res
          userStore.setUserInfo(data)
        }
      })
    },
  })
}

// const chartRef = ref<ComponentPublicInstance<{ getServerData: () => void }> | null>(null)

onLoad((options) => {
  if (options?.scene) {
    scene.value = options?.scene
    // 对options?.scene 进行解码
    const sceneData = decodeURIComponent(options?.scene)
    const scenes = sceneData.split(',')
    productId.value = scenes[0] || ''
    const userCode = scenes[1] || ''
    if (userCode) {
      getAgent(userCode)
    }
  }
  else {
    productId.value = options?.productId || ''
    const userCode = options?.userCode || ''
    if (userCode) {
      getAgent(userCode)
    }
  }
  getDetail()
})
</script>

<template>
  <view class="detail-box">
    <wd-navbar title="" safe-area-inset-top left-arrow fixed :bordered="false">
      <template #capsule>
        <view class="capsule-box">
          <wd-icon name="thin-arrow-left" size="28rpx" color="#ffffff" @click="handleClickLeft" />
        </view>
      </template>
    </wd-navbar>
    <ProductDetails :item-data="detailData" :swiper-list="swiperList" />
    <view class="cell-box">
      <wd-cell custom-value-class="cell-right" custom-title-class="cell-left">
        <template #icon>
          <text class="iconfont icon-addressUser1" />
        </template>
        <template #title>
          <view class="title-box">
            <view class="title1">
              {{ detailData.originAddress }}
            </view>
          </view>
        </template>
      </wd-cell>
      <wd-cell v-for="item in dicts" :key="item" :title="item" custom-value-class="cell-right" custom-title-class="cell-left">
        <template #icon>
          <text class="iconfont icon-xingzhuangjiehe" />
        </template>
      </wd-cell>
    </view>
    <!-- 详情页 -->
    <StoreDetail :swiper-list="detailImgs" />
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
  </view>
</template>

<style scoped lang="scss">
.detail-box{
  padding-bottom: calc(120rpx + env(safe-area-inset-bottom));
  :deep(){
    .wd-navbar{
      background-color: transparent;
    }
    .wd-navbar__left{
      .wd-icon-arrow-left{
        color: #ffffff;
      }
    }
  }
  .cell-box{
    margin: 32rpx;
    border-radius: 16rpx;
    overflow: hidden;
    .title-box{
      display: flex;
      align-items: center;
      .title1{
        font-weight: 400;
        font-size: 28rpx;
        color: #444444;
        line-height: 28rpx;
      }
      .title2{
        margin-left: 32rpx;
        font-weight: 400;
        font-size: 28rpx;
        color: #BABABA;
        line-height: 28rpx;
      }
    }
    :deep(){
      .wd-cell__wrapper{
        height: 50rpx;
        display: flex;
        align-items: center;
        .wd-cell__left{
          display: flex;
          align-items: center;
          gap: 14rpx;
        }
        .wd-cell__right{
          display: none;
        }
      }
    }
    .iconfont{
      color: #BABABA;
    }
  }
  .btn-box{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 32rpx;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    padding-bottom: calc(8rpx + env(safe-area-inset-bottom));
    padding-top: 12rpx;
    :deep(){
      .share-btn{
        width: 256rpx;
        height: 96rpx;
        background: rgba(8, 157, 57, 0.2);
        box-shadow: 0rpx 24rpx 80rpx 0rpx rgba(91,91,113,0.25);
        border-radius: 32rpx;
        color: #089D39;
        font-weight: 500;
        font-size: 32rpx;
        line-height: 32rpx;
      }
      .buy-btn{
        width: 398rpx;
        height: 96rpx;
        background: #089D39;
        box-shadow: 0rpx 24rpx 80rpx 0rpx rgba(91,91,113,0.25);
        border-radius: 32rpx;
        font-weight: 500;
        font-size: 32rpx;
        color: #FFFFFF;
        line-height: 32rpx;
      }
    }
    .iconfont{
      font-size: 28rpx;
      margin-right: 8rpx;
    }
  }
}
</style>

<route lang="json">
{
  "layout": "default",
  "name": "details",
  "page-meta": true,
  "style": {
    "navigationBarTitleText": "详情"
  }
}
</route>
