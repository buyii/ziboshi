<script setup lang="ts">
import type { Comprehensive, SelectionType } from '@/types/common'

const props = withDefaults(defineProps<SelectionType>(), {})
const comprehensive = defineModel<Comprehensive>({
  required: true,
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
  <view class="inputwarp">
    <view class="label">
      {{ props.label }}
    </view>
    <view class="inputcontent">
      <view class="inputbox">
        <wd-input v-model="comprehensive[props.keys[0]]" :cursor-spacing="100" no-border type="text" placeholder-class="placeholderClass" clearable placeholder="请输入" />
        <view class="sublabel">
          {{ props.labels[0] }}
        </view>
      </view>
      <text class="iconfont icon-rotate" />
      <view class="inputbox">
        <wd-input v-model="comprehensive[props.keys[1]]" no-border :cursor-spacing="100" type="text" placeholder-class="placeholderClass" clearable placeholder="请输入" />
        <view class="sublabel">
          {{ props.labels[1] }}
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.inputwarp {
  margin-bottom: 40rpx;
  .label{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 28rpx;
    color: #111111;
    line-height: 28rpx;
    font-style: normal;
    margin-bottom: 32rpx;
  }
  .inputcontent{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .inputbox{
      width: 284rpx;
      height: 120rpx;
      background: #FFFFFF;
      border-radius: 32rpx;
      border: 2rpx solid #EEEEEE;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 40rpx;
      padding-right: 30rpx;
      .sublabel{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 20rpx;
        color: #DADADA;
        line-height: 20rpx;
        font-style: normal;
      }
      .wd-input::after{
        display: none;
      }
      :deep(.placeholderClass){
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #BABABA;
        line-height: 28rpx;
        font-style: normal;
      }
    }
    text{
      font-size: 20rpx;
      margin: 0 28rpx;
    }
  }
}
</style>
