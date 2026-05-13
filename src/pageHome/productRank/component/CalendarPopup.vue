<script setup lang="ts">
import { useLayoutStore } from '@/stores'

const show = ref(false)
const { setLayoutStore } = useLayoutStore()

function open() {
  show.value = true
  setLayoutStore({ noScroll: true })
}

function handleClose() {
  show.value = false
  setLayoutStore({ noScroll: false })
}

// 暴露方法
defineExpose({
  open,
  handleClose,
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
  <wd-popup v-model="show" position="bottom" :z-index="9999" safe-area-inset-bottom custom-style="border-radius:32rpx;" @close="handleClose">
    <text class="custom-txt">弹弹弹</text>
  </wd-popup>
</template>

<style lang="scss" scoped>
.custom-txt {
  color: black;
  width: 400rpx;
  height: 400rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40rpx;
  border-radius: 32rpx;
}
</style>
