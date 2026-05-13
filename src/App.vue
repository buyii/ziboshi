<script setup lang="ts">
const layoutStore = useLayoutStore()
const noScroll = computed(() => {
  return layoutStore.layoutStore.noScroll
})
function registerAppUpdateListener() {
  // #ifdef MP
  const manager = uni.getUpdateManager()

  manager.onUpdateReady(async () => {
    const { confirm } = await uni.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否立即重启应用？',
    })

    if (confirm) {
      manager.applyUpdate()
    }
  })
  // #endif
}

onLaunch(() => {
  registerAppUpdateListener()
  // const systemInfo = uni.getSystemInfoSync()
  // const safeAreaBottom = systemInfo.safeAreaInsets?.bottom || 0
  // document.documentElement.style.setProperty('--safe-area-bottom', `${safeAreaBottom}px`)
})
</script>

<template>
  <page-meta :page-style="`overflow:${noScroll ? 'hidden' : 'visible'}`" />
</template>

<style lang="scss">
@import "@/styles/font/iconfont.css";
</style>
