<script setup lang="ts">
interface Props {
  label: string // 按钮文字
  loading?: boolean // 是否加载中
  fixed?: boolean // 是否固定在底部
  plain?: boolean // 是否是边框类型
  icon?: string // 是否有icon
  disabled?: boolean // 是否禁用
}

const props = withDefaults(defineProps<Props>(), {
  fixed: false,
  plain: false,
  disabled: false,
  loading: false,
})
const emit = defineEmits(['confirm'])
function onConfirm() {
  emit('confirm')
  console.log('onConfirm')
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
  <view class="botbox" :class="{ 'is-fixed': props.fixed, 'isplain': plain }">
    <slot />
    <wd-button :plain="plain" :disabled="disabled" :loading="loading" block @click="onConfirm">
      <text v-if="props.icon" class="iconfont" :class="props.icon" />
      <text>{{ props.label }}</text>
    </wd-button>
  </view>
</template>

<style scoped lang="scss">
.botbox{
  padding-bottom: calc(12rpx + env(safe-area-inset-bottom));
  background-color: #fff;
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 6rpx;
  padding-left: 32rpx;
  padding-right: 32rpx;
  :deep(){
    .wd-button{
      flex: 1;
      height: 88rpx !important;
      background: #089D39 !important;
      border-radius: 8rpx 32rpx 8rpx 32rpx !important;
      font-size: 32rpx !important;
      font-weight: 500 !important;
    }
    .wd-button__text{
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 32rpx;
    }
  }
  .iconfont{
    color: #fff;
    font-size: 32rpx;
    line-height: 32rpx;
    margin-right: 16rpx;
    font-weight: 100 !important;
  }
}
.is-fixed{
  position: fixed !important;
}
.isplain{
  :deep(.wd-button){
    background: #fff !important;
    border: 1px solid #089D39 !important;
    color: #089D39 !important;
  }
  .iconfont{
    color: #089D39;
    font-size: 32rpx;
    line-height: 32rpx;
    margin-right: 16rpx;
  }
}
</style>
