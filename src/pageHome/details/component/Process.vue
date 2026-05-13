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
  <view class="detail-process">
    <view class="process-title">
      领样流程
    </view>
    <view class="process-content">
      <wd-steps align-center>
        <wd-step title="申请样品">
          <template #icon>
            <image src="../../../static/svg/applyForAmples.svg" style="width: 48rpx; height: 48rpx;" />
          </template>
        </wd-step>
        <wd-step title="审核">
          <template #icon>
            <image src="../../../static/svg/toExamine.svg" style="width: 48rpx; height: 48rpx;" />
          </template>
        </wd-step>
        <wd-step title="商家发货">
          <template #icon>
            <image src="../../../static/svg/merchantShipping.svg" style="width: 48rpx; height: 48rpx;" />
          </template>
        </wd-step>
        <wd-step title="达人收货">
          <template #icon>
            <image src="../../../static/svg/receivedGoods.svg" style="width: 48rpx; height: 48rpx;" />
          </template>
        </wd-step>
        <wd-step title="发视频/直播">
          <template #icon>
            <image src="../../../static/svg/liveBroadcast.svg" style="width: 48rpx; height: 48rpx;" />
          </template>
        </wd-step>
        <wd-step title="完成带货">
          <template #icon>
            <image src="../../../static/svg/complete.svg" style="width: 48rpx; height: 48rpx;" />
          </template>
        </wd-step>
      </wd-steps>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.detail-process{
  background: #FFFFFF;
  border-radius: 16rpx;
  margin-top: 20rpx;
  padding: 32rpx 24rpx;
  .process-title{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 28rpx;
    color: #000000;
    line-height: 28rpx;
    font-style: normal;
  }
  .process-content{
    padding-top: 32rpx;
    :deep(.wd-steps){
      .wd-step__content{
        width: 110rpx;
      }
      .wd-step__title{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 20rpx;
        color: #999999;
        line-height: 20rpx;
        font-style: normal;
        text-align: center;
      }
    }

  }
}
</style>
