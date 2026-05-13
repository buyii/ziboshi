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
    <wd-tabs v-model="modelValue" slidable="always">
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
      background-color: transparent;
    }
    .wd-tabs__nav{
      height: 64rpx;
      background-color: transparent;
    }
    .wd-tabs__line{
      display: none;
    }
    .wd-tabs__nav-container{
      gap: 16rpx;
    }
    .wd-tabs__nav-item{
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 160rpx;
      height: 64rpx;
      border-radius: 16rpx;
      padding: 0 !important;

      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 28rpx;
      color: #444444;
    }
    .wd-tabs__nav-item.is-active{
      color: #FF0057;
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
