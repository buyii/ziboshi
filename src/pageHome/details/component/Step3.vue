<script setup lang="ts">
interface MyProps {
  estimate: number | string
}
const props = withDefaults(defineProps<MyProps>(), {
})
const emit = defineEmits(['onSure'])

function onSure() {
  emit('onSure')
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
  <view class="step">
    <view class="step-name">
      <view>第三步</view>
      <!-- <view>1</view> -->
    </view>
    <view class="step-content">
      <view class="step-title">
        进入详情后点击<text>“立即购买”</text>
      </view>
      <view class="step-center">
        <image src="../../../static/svg/step3.svg" mode="widthFix" />
      </view>
      <view class="step-tip">
        <text>提示：</text>
        <text>预估返佣金</text>
        <text>{{ props.estimate }}</text>
        <text>元</text>
      </view>
      <view class="step-tip1">
        购样订单在抖音结算后，返还佣金到达人抖音号中
      </view>
    </view>
    <view class="next-btn">
      <wd-button @click="onSure">
        确定
      </wd-button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.step{
  width: 622rpx;
  .step-name{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 48rpx;
    view:nth-child(1){
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 48rpx;
      color: #FFFFFF;
      line-height: 48rpx;
      font-style: normal;
    }
    view:nth-child(2){
      width: 80rpx;
      height: 80rpx;
      background: #FFFFFF;
      border-radius: 24rpx;
      border: 2rpx solid #979797;
      font-family: YouSheBiaoTiHei;
      font-size: 48rpx;
      color: #000000;
      line-height: 80rpx;
      text-align: center;
      font-style: normal;
    }
  }
  .step-content{
    background: linear-gradient( 180deg, #FAF7F8 0%, #F9F5F6 100%);
    border-radius: 32rpx;
    padding: 72rpx 46rpx 50rpx 48rpx;
    .step-title{
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 32rpx;
      color: #111111;
      line-height: 32rpx;
      font-style: normal;
      margin-bottom: 32rpx;
      text{
        color: #FF0057;
      }
    }
    .step-center{
      image{
        width: 528rpx;
        height: 206rpx;
      }
    }
    .step-tip{
      display: flex;
      align-items: center;
      margin-top: 20rpx;
      text:nth-child(1){
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #444444;
        line-height: 24rpx;
        font-style: normal;
      }
      text:nth-child(2),text:nth-child(4){
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #444444;
        line-height: 24rpx;
        font-style: normal;
      }
      text:nth-child(3){
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #FF0057;
        line-height: 24rpx;
        font-style: normal;
      }
    }
    .step-tip1{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 24rpx;
      color: #666666;
      line-height: 24rpx;
      font-style: normal;
      margin-top: 20rpx;
    }
  }
  .next-btn{
    display: flex;
    justify-content: center;
    margin-top: 32rpx;
    :deep(){
      .wd-button{
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 20rpx !important;
        width: 250rpx !important;
        height: 96rpx !important;
        background: #B4003D !important;
        border-radius: 16rpx 40rpx 40rpx 16rpx !important;
        font-family: PingFangSC, PingFang SC !important;
        font-weight: 500 !important;
        font-size: 36rpx !important;
        color: #FFFFFF !important;
        line-height: 96rpx !important;
        text-align: center !important;
        font-style: normal !important;
      }
    }
  }
}
</style>
