<script setup lang="ts">
import type { SelectionTabList } from '@/types/common'

const props = withDefaults(defineProps<SelectionTabList>(), {
  isSingle: false, // 是否单选
})

const value = ref<number[]>([])
function checkClick(id: number) {
  if (props.isSingle) {
    value.value = [id]
  }
  else {
    const index = value.value.indexOf(id)
    if (index === -1) {
      value.value.push(id)
    }
    else {
      value.value.splice(index, 1)
    }
  }
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
  <view class="inputwarp">
    <view class="label">
      {{ props.label }}
    </view>
    <view class="checkboxwarp">
      <view v-for="item in props.tabList" :key="item.id" :class="value.includes(item.id) ? 'active' : ''" class="my-checkbox" @click="checkClick(item.id)">
        {{ item.name }}
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
  .checkboxwarp{
    display: flex;
    flex-wrap: wrap;
    gap: 16rpx; // 添加子元素之间的间距
    padding: 0;
   .my-checkbox{
      width: calc(100% / 4 - 12rpx); // 每行最多 4 个元素，减去间距
      height: 80rpx;
      background: #F8F8F8;
      border-radius: 16rpx;
      padding: 0;
      text-align: center;
      line-height: 80rpx;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 28rpx;
      color: #444444;
      font-style: normal;
    }
    .active{
      background: #FF0057;
      color: #fff;
    }
  }
}
</style>
