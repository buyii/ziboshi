<script setup lang="ts">
import { getPickUrl } from '@/api/product'

interface MyProps {
  detailData: any
}
const props = withDefaults(defineProps<MyProps>(), {
})

const imgBaseUrl = import.meta.env.VITE_IMG_URL
const show = ref<boolean>(false)
const step = ref<number>(0)
function open(num: number) {
  step.value = num
  show.value = true
}

function close() {
  show.value = false
}

function copyLink() {
  getPickUrl({ productId: props.detailData.productId, activityId: props.detailData.activityId }).then((res) => {
    if (res.code === 0) {
      uni.setClipboardData({
        data: res.data,
        showToast: false,
        success() {
          console.log('success')
          close()
        },
      })
    }
  })
}
// 暴露方法
defineExpose({
  open,
  close,
})
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
  <root-portal>
    <wd-overlay :show="show" :z-index="99999" custom-style="background: rgba(43,3,17,0.45);backdrop-filter: blur(10px)">
      <view class="wrapper">
        <view class="head">
          成本购样
          <text class="iconfont icon-close" @click="close" />
        </view>
        <view class="stepview">
          1、点击 <text class="shense">商务推品</text>，获取商品链接
        </view>
        <view class="step1btn">
          <view class="btnbor">
            <view class="btnview">
              商务推品
            </view>
          </view>
          <view class="btnview">
            添加橱窗
          </view>
          <view class="btnview">
            成本购样
          </view>
        </view>
        <view class="stepview">
          2、打开 <text class="shense">抖音</text>，进入 <text class="shense">选品广场</text>，通过链接搜索到对应商品，进入详情页后点击购买样品
        </view>
        <view class="goumai">
          <image class="img" :src="`${imgBaseUrl}/step2.png`" />
        </view>
        <view class="next-btn">
          <wd-button @click="close">
            知道了
          </wd-button>
          <wd-button @click="copyLink">
            复制链接
          </wd-button>
        </view>
      </view>
    </wd-overlay>
  </root-portal>
</template>

<style lang="scss" scoped>
.wrapper{
  width: 622rpx;
  height: 896rpx;
  background: linear-gradient( 180deg, #FAF7F8 0%, #F9F5F6 100%);
  border-radius: 32rpx;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  .head{
    position: relative;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 36rpx;
    color: #111111;
    line-height: 36rpx;
    text-align: center;
    font-style: normal;
    padding: 32rpx 0;
    .iconfont{
      position: absolute;
      right: 36rpx;
      top: 36rpx;
      font-size: 28rpx;
    }
  }
  .stepview{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 32rpx;
    color: #111111;
    line-height: 44rpx;
    text-align: left;
    font-style: normal;
    padding: 32rpx 48rpx;
    .shense{
      color: #FF0057;
    }
  }
  .step1btn{
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    overflow: hidden;
    margin: 0 auto;
    padding-left: 24rpx;
    width: 528rpx;
    height: 176rpx;
    background: #FFFFFF;
    gap: 16rpx;
    .btnbor{
      padding: 8rpx;
      background: #FFFFFF;
      border-radius: 40rpx;
      border: 2rpx solid #FF0057;
      display: inline-block;
      font-size: 0rpx;
    }
    .btnview {
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 28rpx;
      color: #FFFFFF;
      width: 192rpx;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      font-style: normal;
      border-radius: 32rpx;
      min-width: 192rpx;
      padding: 0px;
    }
    .btnview:nth-child(1){
      width: 218rpx;
      height: 88rpx;
      line-height: 88rpx;
      background-color: #4B00FC;
    }
    .btnview:nth-child(2){
      background-color: #7600FF;
    }
    .btnview:nth-child(3){
      background-color: #FF0057;
    }
  }
  .goumai{
    width: 528rpx;
    height: 160rpx;
    background: #FFFFFF;
    margin: 0 auto;
    .img{
      width: 100%;
      height: 100%;
    }
  }
  .next-btn{
    width: 528rpx;
    display: flex;
    justify-content: center;
    gap: 16rpx;
    margin: 0 auto;
    margin-top: 48rpx;
    :deep(){
      .wd-button{
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 28rpx;
        color: #FFFFFF;
        line-height: 28rpx;
        text-align: center;
        font-style: normal;
      }
      .wd-button:nth-child(1){
        width: 198rpx;
        height: 88rpx;
        background: #FF0057;
        border-radius: 32rpx;
      }
      .wd-button:nth-child(2){
        width: 314rpx;
        height: 88rpx;
        background: #4B00FC;
        border-radius: 32rpx;
      }
    }
  }
}
</style>
