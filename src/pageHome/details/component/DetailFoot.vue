<script setup lang="ts">
import { useToast } from 'wot-design-uni'
import NotQualifyPopup from './NotQualifyPopup.vue'
import { pickCarAdd, pickCarDel } from '@/api/pickCar'
import { getUserInfo } from '@/api/index'
import type { ProductDetail } from '@/types/common'

const props = withDefaults(defineProps<MyProps>(), {
})

// const props = defineProps({
//   pageScrollTop: {
//     type: Number,
//     default: 0,
//   },
// })
const emit = defineEmits(['add', 'showApplyPopup'])
const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
const toast = useToast()

interface MyProps {
  pageScrollTop: number
  helpMessage: any
}

const detailData = defineModel<ProductDetail>({
  required: true,
})

const notQualifyPopupRef = ref<ComponentPublicInstance<{ open: (num: number) => void }> | null>(null)

function showPopup() {
  if (detailData.value.sampleType === 1) {
    getUserInfo().then((res) => {
      if (res.code === 0) {
        userStore.setUserInfo(res.data)
        if ((Number(res.data.score) <= 3) && (detailData.value.sampleType === 1)) {
          toast.error('抱歉，您的星佣分值≤3分，暂不支持免费领样')
          return
        }
        emit('showApplyPopup')// 免费领样时的弹窗
      }
    })
  }
  else {
    notQualifyPopupRef.value?.open(1) // 成本购样时的弹窗
  }
}

function toKefu() {
  if (detailData.value.merchantKefuUrl) {
    wx.openCustomerServiceChat({
      extInfo: { url: detailData.value.merchantKefuUrl },
      corpId: 'wwca77aaa53e45d173',
      success(res) {
        console.log('打开客服会话成功', res)
      },
      fail(err) {
        console.log('打开客服会话失败', err)
      },
    })
  }
}

function onSelection() {
  const productId = detailData.value.schema.productId
  const activityId = detailData.value.schema.activityId
  if (detailData.value.inPickCar) {
    pickCarDel({ productId, activityId }).then((res) => {
      if (res.code === 0) {
        detailData.value.inPickCar = 0
        toast.show('已移除选品车')
      }
    })
  }
  else {
    pickCarAdd({ productId, activityId }).then((res) => {
      if (res.code === 0) {
        detailData.value.inPickCar = 1
        toast.show('已添加选品车')
      }
    })
  }
}

function goTop() {
  uni.pageScrollTo({
    scrollTop: 0,
    duration: 300,
  })
}

function addShopStore() {
  emit('add')
}

function copyId() {
  uni.navigateTo({
    url: `/pageHome/detailshare/index?productId=${detailData.value.schema.productId}&activityId=${detailData.value.schema.activityId}`,
  })
}
</script>

<script lang="ts">
export default {
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
</script>

<template>
  <view class="detail-foot">
    <view class="foot1" :class="{ foot1scoll: props.pageScrollTop > 100 }">
      <view class="foot1-item" :class="{ 'foot1-item-active': detailData.inPickCar === 1 }" @click="onSelection">
        <text v-if="detailData.inPickCar === 1" class="iconfont icon-selectedCar_1" />
        <text v-else class="iconfont icon-selectedCar_0" />
        <view>选品车</view>
      </view>
      <view class="foot1-item" @click="toKefu">
        <text class="iconfont icon-customerService" />
        <view>联系招商</view>
      </view>
      <view class="foot1-item" @click="goTop">
        <text class="iconfont icon-topUp" />
        <view>回到顶部</view>
      </view>
    </view>
    <view class="foot2">
      <wd-button @click="copyId">
        商务推品
      </wd-button>
      <wd-button @click="addShopStore">
        添加橱窗
      </wd-button>

      <wd-button :custom-class="(Number(userInfo.score) <= 3) && (detailData.sampleType === 1) ? 'disbtn' : ''" @click="showPopup">
        {{ detailData.sampleType === 1 ? '免费领样' : '成本购样' }}
      </wd-button>
    </view>
  </view>
  <NotQualifyPopup ref="notQualifyPopupRef" :detail-data="detailData" />
</template>

<style lang="scss" scoped>
.detail-foot{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 99;
  .foot1{
    width: 464rpx;
    height: 108rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    background: rgba(255,255,255,0.85);
    box-shadow: 0rpx 16rpx 64rpx 0rpx rgba(90,0,31,0.2);
    border-radius: 32rpx;
    backdrop-filter: blur(10px);
    .foot1-item{
      flex: 1;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #444444;
      text{
        font-size: 32rpx;
        margin-bottom: 12rpx;
      }
      view{
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 24rpx;
        line-height: 24rpx;
        font-style: normal;
      }
    }
    .foot1-item-active{
      color: #FF0057;
    }
  }
  .foot1scoll{
    background: rgba(255,255,255,0.65);
    box-shadow: 0rpx 16rpx 64rpx 0rpx rgba(90,0,31,0.2);
  }
  .foot2{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 24rpx;
    padding: 0 32rpx;
    gap: 16rpx;
    padding-bottom: env(safe-area-inset-bottom);
    view{
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 28rpx;
      color: #FFFFFF;
      height: 88rpx;
      line-height: 88rpx;
      text-align: center;
      font-style: normal;
      border-radius: 32rpx;
    }
    :deep() {
      .wd-button {
        flex: 1;
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 28rpx;
        color: #FFFFFF;
        height: 88rpx;
        line-height: 88rpx;
        text-align: center;
        font-style: normal;
        border-radius: 32rpx;
        min-width: auto !important;
        padding: 0px;
      }
      .wd-button.is-medium{
        .wd-button__content{
          min-width: auto !important;
        }
      }
      .wd-button:nth-child(1){
        background-color: #4B00FC;
      }
      .wd-button:nth-child(2){
        background-color: #7600FF;
      }
      .wd-button:nth-child(3){
        background-color: #FF0057;
      }
      .disbtn{
        background-color: #fff !important;
        .wd-button__content{
          background-color: rgba(255, 0, 87, 0.6) !important;
        }
      }
    }
  }
}
</style>
