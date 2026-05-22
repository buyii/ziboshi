<script setup lang="ts">
import type { LineTabProps } from '@/types/common'

const props = withDefaults(defineProps<LineTabProps>(), {
  showCount: false,
})

const emit = defineEmits(['change'])

const value = defineModel<string>()
function handleChange(e: any) {
  value.value = e.name
  emit('change', value.value)
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
  <view class="tab-box" :class="{ 'tab-box--show-count': props.showCount }">
    <wd-tabs v-model="value" auto-line-width @change="handleChange">
      <block v-for="item in props.tabs" :key="item.key">
        <wd-tab v-if="props.showCount" :title="`${item.title}`" :name="item.key" :badge-props="item.badgeProps" />
        <wd-tab v-else :title="`${item.title}`" :name="item.key" />
      </block>
    </wd-tabs>
  </view>
</template>

<style lang="scss" scoped>
.tab-box{
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
        color: #089D39;
        font-style: normal;
      }
    }
    .wd-tabs__line{
      background: #089D39;
      height: 16rpx;
      opacity: 0.15;
      border-radius: 200rpx;
    }
  }
}
.tab-box--show-count{
  :deep(){
    .wd-tabs__nav{
      height: 110rpx;
      background-color: transparent;
    }
    .wd-tabs__nav-item{
      height: 110rpx;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 28rpx;
      color: #444444;
      font-style: normal;
    }
    .wd-badge{
      margin-top: 12rpx;
    }
    .wd-badge__content{
      top: -40rpx !important;
      left: 0 !important;
      right: 0 !important;
      margin: 0 auto !important;
      transform: none !important;
      background-color: transparent !important;
      color: #444444 !important;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
    }
    .is-active{
      .wd-badge__content{
        color: #089D39 !important;
      }
    }
  }
}
</style>
