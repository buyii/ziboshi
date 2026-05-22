<script setup lang="ts">
interface Props {
  state: any
  top: string | number
  notData?: boolean
  refresherEnabled?: boolean
  fixed?: boolean
  tip?: string
}
const props = withDefaults(defineProps<Props>(), {
  state: null,
  notData: false,
  refresherEnabled: false,
  fixed: true,
  tip: '暂无数据~',
})
const emit = defineEmits(['scrolltolower', 'loadmore', 'onMyScroll', 'onRefresh'])
const imgBaseUrl = import.meta.env.VITE_IMG_URL

const triggered = ref(false)
const scrollTop1 = ref<number>(0)
const oldScrollTop = ref<number>(0)
function scrolltolower() {
  emit('scrolltolower')
}

function loadmore() {
  emit('loadmore')
}

function onMyScroll(e: any) {
  oldScrollTop.value = e.detail.scrollTop
  emit('onMyScroll', e)
}

function onPulling(e: any) {
  triggered.value = true
}
function onRefresh() {
  emit('onRefresh')
}
function onRestore() {
  triggered.value = false // 需要重置
  console.log('onRestore')
}
function onAbort() {
  triggered.value = false // 需要重置
  console.log('onAbort')
}
function onReset() {
  setTimeout(() => {
    triggered.value = false // 需要重置
  }, 1000)
}
function onResetTop() {
  scrollTop1.value = oldScrollTop.value
  nextTick(() => {
    scrollTop1.value = 0
  })
}
// 暴露方法
defineExpose({
  onReset,
  onResetTop,
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
  <scroll-view
    :style="{ top }" :scroll-top="scrollTop1"
    enable-back-to-top scroll-anchoring lower-threshold="300"
    :refresher-enabled="refresherEnabled" :refresher-triggered="triggered"
    :refresher-threshold="100" refresher-background="#f8f8f8" class="scroll-Y"
    :class="{ 'scroll-fixed': props.fixed }" :scroll-y="true" @refresherpulling="onPulling"
    @refresherrefresh="onRefresh" @refresherrestore="onRestore"
    @refresherabort="onAbort" @scroll="onMyScroll" @scrolltolower="scrolltolower"
  >
    <slot />
    <wd-status-tip v-if="props.notData" :tip="props.tip">
      <template #image>
        <image style="width: 320rpx;height: 344rpx;margin-top: 60rpx;" :src="`${imgBaseUrl}/notData1.png`" />
      </template>
    </wd-status-tip>
    <wd-loadmore :state="props.state" custom-class="myloadmore" :loading-props="{ color: '#ff0057' }" @reload="loadmore" />
  </scroll-view>
</template>

<style lang="scss" scoped>
.scroll-Y{
  position: absolute;
  bottom: 0;
  :deep(){
    .myloadmore{
      line-height: 1;
      .wd-divider{
        margin: 0;
      }
    }
    .wd-divider{
      text-align: center;
      justify-content: center;
      &::before{
        display: none;
      }
      &::after{
        display: none;
      }
    }
  }
}
.scroll-fixed{
  position: fixed;
}
</style>
