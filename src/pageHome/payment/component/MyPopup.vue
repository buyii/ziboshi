<script setup lang="ts">
import { useLayoutStore } from '@/stores'

interface MyProps {
  amountPoint: number
  price: number
}
const props = withDefaults(defineProps<MyProps>(), {
  amountPoint: 0,
})

const emit = defineEmits(['confirmAuth', 'changeItem'])
const show = ref<boolean>(false)
const { setLayoutStore } = useLayoutStore()

function open() {
  show.value = true
  setLayoutStore({ noScroll: true })
}
function close() {
  show.value = false
  setLayoutStore({ noScroll: false })
}
function onConfirm() {
  emit('confirmAuth')
}

// 暴露方法
defineExpose({
  open,
  close,
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
  <view>
    <wd-popup
      v-model="show"
      position="bottom"
      custom-style="height: 550rpx;border-radius: 32rpx 32rpx 0rpx 0rpx;overflow: hidden;"
      :z-index="999" @close="close"
    >
      <view class="title">
        <view />
        <text class="iconfont icon-close" @click="close" />
      </view>
      <view class="jifeng">
        <DigitBold :value="props.price" int-size="96rpx" decimal-size="96rpx" color="#000000" suffix=" 积分" suffix-size="32rpx" />
      </view>
      <view class="desc">
        当前积分<DigitBold :value="props.amountPoint" int-size="24rpx" color="#FF5100" />，兑换后将剩余<DigitBold :value="props.amountPoint - props.price" int-size="24rpx" decimal-size="24rpx" color="#FF5100" />积分
      </view>
      <FootButton label="确认兑换" @confirm="onConfirm" />
    </wd-popup>
  </view>
</template>

<style lang="scss" scoped>
.title{
  display: flex;
  background-color: #fff;
  align-items: center;
  justify-content: space-between;
  height: 116rpx;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 36rpx;
  color: #000000;
  text-align: left;
  font-style: normal;
  padding: 0 48rpx;
  text{
    font-size: 28rpx;
  }
}
.jifeng{
  margin-top: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.desc{
  margin-top: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 24rpx;
  color: #999999;
  line-height: 24rpx;
}
</style>
