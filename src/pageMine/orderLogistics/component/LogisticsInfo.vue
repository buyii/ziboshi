<script setup lang="ts">
const statusMap = {
  WAIT_ACCEPT: '待揽收',
  ACCEPT: '已揽收',
  TRANSPORT: '运输中',
  DELIVERING: '派件中',
  AGENT_SIGN: '已代签收',
  SIGN: '已签收',
  FAILED: '包裹异常',
} as const

type LogisticsStatus = keyof typeof statusMap

interface LogisticsItem {
  logisticsStatus: LogisticsStatus
  time?: string
  desc?: string
}

const { logistics } = defineProps({
  logistics: {
    type: Array,
    default: () => ([]),
  },
}) as { logistics: LogisticsItem[] }

const active = ref<number>(0)
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
  <view class="steps-box">
    <wd-steps vertical :active="active">
      <wd-step v-for="(item, index) in logistics" :key="index">
        <template #icon>
          <view class="icon" :class="{ 'icon-active': index === active }">
            <wd-icon name="check-bold" />
          </view>
        </template>
        <template #title>
          <view class="title">
            {{ statusMap[item.logisticsStatus] }} {{ item.time }}
          </view>
        </template>
        <template #description>
          <view class="logdesc">
            {{ item.desc }}
          </view>
        </template>
      </wd-step>
    </wd-steps>
  </view>
</template>

<style lang="scss" scoped>
.icon{
  :deep(){
    width: 40rpx;
    height: 40rpx;
    // overflow: hidden;
    .wd-icon{
      font-size: 24rpx;
      width: 40rpx;
      height: 40rpx;
      background-color: #FFFFFF;
      border: 2rpx solid #089D39;
      color: #089D39;
      line-height: 40rpx;
      text-align: center;
      border-radius: 12rpx;
    }
  }
}
.icon-active{
  :deep(){
    width: 40rpx;
    height: 40rpx;
    // overflow: hidden;
    .wd-icon{
      font-size: 24rpx;
      width: 40rpx;
      height: 40rpx;
      background-color: #089D39;
      color: #fff;
      line-height: 40rpx;
      text-align: center;
      border-radius: 12rpx;
    }
  }
}
.title{
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 32rpx;
  color: #222222;
  line-height: 32rpx;
}
.description{
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 24rpx;
  color: #666666;
  line-height: 24rpx;
  margin-top: 16rpx;
}
.logdesc{
  padding: 24rpx;
  border-radius: 8rpx;
  border: 2rpx solid #DADADA;
  margin-top: 24rpx;
  line-height: 1.4;
}
.steps-box{
  :deep(){
    .wd-step{
      padding-bottom: 32rpx;
    }
    .wd-step__header{
      top: 40rpx !important;
    }
    .wd-step__line{
      left: 4rpx !important;
      right: 0 !important;
      margin: 0 auto !important;
      width: 6rpx !important;
      background-color: #DADADA;
    }
    .wd-step__icon{
      background-color: transparent;
      display: flex;
      justify-content: center;
    }
    .wd-step__content{
      padding: 24rpx 0rpx;
      background-color: #ffffff;
      border-radius: 16rpx;
      margin-left: 70rpx !important;
      padding-bottom: 0rpx !important;
    }
  }
}
</style>
