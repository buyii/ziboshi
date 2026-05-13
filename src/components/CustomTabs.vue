<script setup lang="ts">
import type { TabsProps } from '@/types/common'

const props = withDefaults(defineProps<TabsProps>(), {})

const modelValue = defineModel<number>({
  required: true,
})

function tabClick(item: any) {
  console.log(item, 'item')
  modelValue.value = item.id
}
</script>

<template>
  <view class="tabwarp">
    <view v-for="item in props.itemList" :key="item.id" class="tabitem" :class="{ active: item.id === modelValue }" @click="tabClick(item)">
      <view class="tabtext">
        {{ item.name }}
      </view>
      <text v-if="item.icon" class="tabicon iconfont" :class="item.icon" />
    </view>
    <slot />
  </view>
</template>

<style lang="scss" scoped>
.tabwarp {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .tabitem{
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 24rpx;
    height: 64rpx;
    border-radius: 16rpx;
    .tabtext{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 24rpx;
      color: #111111;
      font-style: normal;
    }
    .tabicon{
      font-size: 20rpx;
      margin-left: 8rpx;
      color: #DADADA;
    }
  }
  .active{
    color: #FF0057;
    font-size: 32rpx;
  }
  .tabiconright{
    color: #FF0057;
    font-size: 32rpx;
  }
}
</style>
