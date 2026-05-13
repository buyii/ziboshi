<script setup lang="ts">
import { useToast } from 'wot-design-uni'
import NotQualifyPopup from './NotQualifyPopup.vue'
import PosterTem from './PosterTem.vue'
import PosterPopup from './PosterPopup.vue'
import type { ProductDetail } from '@/types/common'

import { miniQRCode } from '@/api/common'

interface MyProps {
  detailData: ProductDetail
}
const props = withDefaults(defineProps<MyProps>(), {
})
const notQualifyPopupRef = ref<ComponentPublicInstance<{ open: (num: number) => void }> | null>(null)
const posterPopupRef = ref<ComponentPublicInstance<{ open: (num: string) => void }> | null>(null)
const toast = useToast()
const showPoster = ref(false)
const imgUrl = ref('')
const codeImg = ref('')
function openPopup() {
  notQualifyPopupRef.value?.open(1)
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
    productId: props.detailData.schema.productId,
    activityId: props.detailData.schema.activityId,
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

function copyOrder(text: string) {
  uni.setClipboardData({
    data: text,
    success() {
      console.log('success')
    },
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
  <view class="detail-name">
    <!-- <view class="detail-sales">
      <view>总销量 <text>· {{ props.detailData.sales }}</text></view>
      <view>样品库存 <text>≤ {{ props.detailData.sampleStock }}</text></view>
    </view> -->
    <view class="detail-title">
      <wd-tag v-if="props.detailData.schema.trafficType && props.detailData.schema.trafficType.includes('1')" mark custom-class="mr-1" color="#fffff" bg-color="#f24e88">
        随心推
      </wd-tag>
      <wd-tag v-if="props.detailData.schema.trafficType && props.detailData.schema.trafficType.includes('2')" mark custom-class="mr-1" color="#fffff" bg-color="#5d2ed9">
        千川全域
      </wd-tag>
      {{ props.detailData.schema.productName }}
    </view>
    <view class="order">
      <view>商品ID</view>
      <view>
        <text>{{ props.detailData.schema.productId }}</text>
        <text class="iconfont icon-copy" @click.stop="copyOrder(props.detailData.schema.productId)" />
      </view>
    </view>
    <view class="detail-inventory">
      <view>
        <text class="iconfont icon-inventory" />
        <text>库存 ≤ {{ props.detailData.productStock }}</text>
      </view>
      <view @click="onShow">
        <text class="iconfont icon-share" />
        <text>分享海报</text>
      </view>
      <view @click="openPopup">
        <text class="iconfont icon-cost" />
        <text>成本购样</text>
      </view>
    </view>
  </view>
  <NotQualifyPopup ref="notQualifyPopupRef" :detail-data="detailData" />
  <PosterPopup ref="posterPopupRef" />
  <PosterTem v-if="showPoster" :code-img="codeImg" :detail-data="props.detailData" @change-img="changeImg" />
  <wd-toast />
</template>

<style lang="scss" scoped>
.detail-name{
  background-color: #fff;
  padding: 32rpx 24rpx;
  border-radius: 16rpx;
  .order{
    display: flex;
    align-items: center;
    gap: 12rpx;
    margin-top: 20rpx;
    margin-bottom: 20rpx;
    view:nth-child(1){
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 28rpx;
      color: #999999;
      line-height: 28rpx;
    }
    view:nth-child(2){
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 28rpx;
      color: #666666;
      line-height: 28rpx;
    }
    .iconfont{
      font-size: 26rpx;
      color: #999999;
      margin-left: 16rpx;
    }
  }
  .detail-sales{
    display: flex;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 24rpx;
    color: #999999;
    line-height: 24rpx;
    font-style: normal;
    gap: 32rpx;
    text{
      color: #444444;
    }
  }
  .detail-title{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 28rpx;
    color: #111111;
    line-height: 40rpx;
    text-align: left;
    font-style: normal;
    /* 从下往上的模糊效果 */
    -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.6));
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.6));
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
  }
  .detail-inventory{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 22rpx;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 24rpx;
    font-style: normal;
    margin-top: 16rpx;
    view{
      // flex: 1;
      display: flex;
      align-items: center;
      gap: 12rpx;
      justify-content: center;
      // border-radius: 16rpx;
      // border: 1rpx solid #E8E8E8;
    }
    view text:nth-child(1){
      color: #000000;
    }
    view text:nth-child(2){
      color: #999999;
    }
  }
}
</style>
