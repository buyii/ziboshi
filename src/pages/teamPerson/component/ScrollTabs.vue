<script setup lang="ts">
import type { TabsProps } from '@/types/common'

const props = withDefaults(defineProps<TabsProps>(), {})

const modelValue = defineModel<number>()
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
  <view class="tabwarp">
    <wd-tabs v-model="modelValue" auto-line-width slidable="always">
      <block v-for="item in props.itemList" :key="item.id">
        <wd-tab :title="item.name" />
      </block>
    </wd-tabs>
  </view>
</template>

<style lang="scss" scoped>
.tabwarp {
  :deep(){
    .wd-tabs{
      background: transparent;
      &.nav-container{
        align-items: center;
      }
    }
    .wd-tabs__nav{
      height: 96rpx;
      background-color: transparent;
    }
    .wd-tabs__nav-item{
      height: 96rpx;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 28rpx;
      color: #444444;
      font-style: normal;
      &.is-active{
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 32rpx;
        color: #FF0057;
        font-style: normal;
      }
    }
    .wd-tabs__line{
      background: #FF0057;
      height: 16rpx;
      opacity: 0.15;
      border-radius: 200rpx;
    }
  }
  .tabitem{
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 160rpx;
    height: 64rpx;
    border-radius: 16rpx;
    .tabtext{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 28rpx;
      color: #444444;
      line-height: 28rpx;
    }
  }
  .active{
    .tabtext{
      color: #FF0057;
    }
  }
}
</style>
