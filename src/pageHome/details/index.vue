<script setup lang="ts">
import { useToast } from 'wot-design-uni'
import ProductDetails from './component/ProductDetails.vue'
import PosterTem from './component/PosterTem.vue'
import PosterPopup from './component/PosterPopup.vue'
import { getProductDetail } from '@/api/product'
import { miniQRCode } from '@/api/common'

const userStore = useUserStore()
const toast = useToast()
const productId = ref('')
const activityId = ref('')
const scene = ref('')
const showContent = ref(true)
const countdown = ref<any>(null)
const yearsNum = ref<number>(0)

const posterPopupRef = ref<ComponentPublicInstance<{ open: (num: string) => void }> | null>(null)

const showPoster = ref(false)
const imgUrl = ref('')
const codeImg = ref('')

const detailData = ref<any>({})

function getDetail() {
  getProductDetail({ productId: productId.value, activityId: activityId.value }).then((res) => {
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

function onShow() {
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

// const chartRef = ref<ComponentPublicInstance<{ getServerData: () => void }> | null>(null)

onLoad((options) => {
  if (options?.scene) {
    scene.value = options?.scene
    // 对options?.scene 进行解码
    const sceneData = decodeURIComponent(options?.scene)
    const scenes = sceneData.split(',')
    productId.value = scenes[1] || ''
    activityId.value = scenes[0] || ''
  }
  else {
    productId.value = options?.productId || ''
    activityId.value = options?.activityId || ''
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
    <ProductDetails :item-data="detailData" />
    <view class="cell-box">
      <wd-cell custom-value-class="cell-right" custom-title-class="cell-left">
        <template #icon>
          <text class="iconfont icon-urlUser" />
        </template>
        <template #title>
          <view class="title-box">
            <view class="title1">
              {{ detailData.originAddress }}
            </view>
            <view class="title2">
              {{ detailData.sendTime }}
            </view>
          </view>
        </template>
      </wd-cell>
      <wd-cell :title="detailData.guaranteeService" custom-value-class="cell-right" custom-title-class="cell-left">
        <template #icon>
          <text class="iconfont icon-urlUser" />
        </template>
      </wd-cell>
    </view>
    <view class="btn-box">
      <wd-button icon="apple" custom-class="share-btn" @click="onShow">
        分享
      </wd-button>
      <wd-button icon="apple" custom-class="buy-btn" @click="toPay">
        购买
      </wd-button>
    </view>
    <PosterPopup ref="posterPopupRef" />
    <PosterTem v-if="showPoster" :code-img="codeImg" :detail-data="detailData" @change-img="changeImg" />
  </view>
</template>

<style scoped lang="scss">
.detail-box{
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
        height: 80rpx;
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
    padding: 0 32rpx;
    display: flex;
    justify-content: space-between;
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
