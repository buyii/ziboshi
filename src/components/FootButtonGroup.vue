<script setup lang="ts">
interface Props {
  confirmLabel: string // 确定按钮文字
  cancelLabel: string // 取消按钮文字
  fixed?: boolean // 是否固定在底部
  plain?: boolean // 是否是边框类型
  cancelClass?: string // 左边按钮类名
}

const props = withDefaults(defineProps<Props>(), {
  fixed: false,
  plain: false,
  cancelClass: '',
})
const emit = defineEmits(['onConfirm', 'onCancel'])
function onConfirm() {
  emit('onConfirm')
  console.log('onConfirm')
}
function onCancel() {
  emit('onCancel')
  console.log('onCancel')
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
    <wd-button :plain="plain" :custom-class="cancelClass" block @click="onCancel">
      {{ props.cancelLabel }}
    </wd-button>
    <wd-button :plain="plain" block @click="onConfirm">
      {{ props.confirmLabel }}
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
  gap: 16px; // 增加子元素之间的间隔
  align-items: center;
  justify-content: center;
  padding-top: 6rpx;
  padding-left: 32rpx;
  padding-right: 32rpx;
  :deep(.wd-button){
    flex: 1;
    height: 88rpx !important;
    background: #089D39 !important;
    border-radius: 32rpx !important;

  }
  :deep(){
    .cancelDis{
      opacity: 0.6 !important;
    }
  }
}
.is-fixed{
  position: fixed !important;
}
.isplain{
  :deep(.wd-button){
    background: #fff !important;
    border: 2rpx solid #089D39 !important;
    color: #089D39 !important;
  }
}
</style>
