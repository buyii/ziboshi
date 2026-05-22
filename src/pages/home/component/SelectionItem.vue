<script setup lang="ts">
import type { Comprehensive, SelectionTabList } from '@/types/common'

const props = withDefaults(defineProps<SelectionTabList>(), {})

const comprehensive = defineModel<Comprehensive>({
  required: true,
})

const value = ref<number[]>([])
function checkClick(item: any) {
  if (value.value.includes(item.id)) {
    value.value = value.value.filter(i => i !== item.id)
    comprehensive.value[props.keys[0]] = ''
    comprehensive.value[props.keys[1]] = ''
  }
  else {
    value.value = [item.id]
    comprehensive.value[props.keys[0]] = item.value[0]
    comprehensive.value[props.keys[1]] = item.value[1]
  }
}

function clearSelection() {
  value.value = []
}

// 暴露方法
defineExpose({
  clearSelection,
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
    <view class="checkboxwarp">
      <view v-for="item in props.tabList" :key="item.id" :class="value.includes(item.id) ? 'active' : ''" class="my-checkbox" @click="checkClick(item)">
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
    gap: 18rpx; // 添加子元素之间的间距
    padding: 0;
   .my-checkbox{
      height: 80rpx;
      background: #F8F8F8;
      border-radius: 16rpx;
      padding: 0 18rpx;
      text-align: center;
      line-height: 80rpx;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 28rpx;
      color: #444444;
      font-style: normal;
    }
    .active{
      background: #089D39;
      color: #fff;
    }
  }
}
</style>
