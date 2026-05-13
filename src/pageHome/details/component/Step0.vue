<script setup lang="ts">
const emit = defineEmits(['onNext', 'onClose'])

function onNext() {
  emit('onNext')
}

function onClose() {
  emit('onClose')
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
    <view class="step-title">
      <view>提示</view>
      <wd-icon name="close" size="24rpx" color="#AAAAAA" @click="onClose" />
    </view>
    <view class="step-centent">
      您所选达人不符合免费申样条件，建议通过成本购样进行购买
    </view>
    <view class="step-btn">
      <wd-button @click="onNext">
        查看步骤
      </wd-button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.step{
  width: 476rpx;
  background: #FFFFFF;
  padding: 48rpx;
  box-shadow: 0rpx 32rpx 112rpx 0rpx rgba(43,3,17,0.3);
  border-radius: 32rpx;
  .step-title{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 36rpx;
    color: #000000;
    line-height: 36rpx;
    font-style: normal;
  }
  .step-centent{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 28rpx;
    color: #666666;
    line-height: 40rpx;
    font-style: normal;
    margin-top: 32rpx;
  }
  .step-btn{
    padding-top: 44rpx;
    text-align: right;
  }
  :deep(){
    .wd-button{
      width: 192rpx !important;
      height: 80rpx !important;
      background: #FF0057 !important;
      border-radius: 16rpx 40rpx 40rpx 16rpx !important;
      min-width: auto !important;
      font-family: PingFangSC, PingFang SC !important;
      font-weight: 500 !important;
      font-size: 32rpx !important;
      color: #FFFFFF !important;
      line-height: 32rpx !important;
      font-style: normal !important;
    }
  }
}
</style>
