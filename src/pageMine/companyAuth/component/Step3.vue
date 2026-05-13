<script setup lang="ts">

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
  <view class="step3">
    <image class="imgsucc" src="../../../static//svg/uploadsucc.svg" />
    <view class="imgtext">
      上传成功
    </view>
  </view>
</template>

<style scoped lang="scss">
.step3{
  text-align: center;
  padding-top: 162rpx;
}
.imgsucc{
  width: 198rpx;
  height: 182rpx;
}
.imgtext{
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 28rpx;
  color: #666666;
  line-height: 28rpx;
  font-style: normal;
  margin-top: 32rpx;
  padding-right: 40rpx;
}
</style>
