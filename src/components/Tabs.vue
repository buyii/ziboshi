<script setup lang="ts">
import type { Item, TabsProps } from '@/types/common'

const props = withDefaults(defineProps<TabsProps>(), {})

const emit = defineEmits(['changeTab'])

const model = defineModel({ default: 1 })

function changeTab(item: Item) {
  model.value = item.id
  console.log(model.value, 'model.value')
  emit('changeTab', model.value)
}
</script>

<template>
  <view class="tabwarp">
    <view v-for="item in props.itemList" :key="item.id" class="tabitem" :class="{ active: item.id === model }" @click="changeTab(item)">
      <view class="tabtext">
        {{ item.name }}
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.tabwarp {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 26rpx;
  .tabitem{
    .tabtext{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 28rpx;
      color: #444444;
      line-height: 32rpx;
      font-style: normal;
    }
  }
  .active{
    .tabtext{
      font-weight: 500;
      font-size: 32rpx;
      color: #000000;
      line-height: 32rpx;
      font-style: normal;
    }
  }
}
</style>
