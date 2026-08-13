<script setup lang="ts">
import { getMsgList } from '@/api/rank'

const layoutStore = useLayoutStore()
const userStore = useUserStore()
const msgStore = useMsgStore()
const token = computed(() => userStore.token)
const userInfo = computed(() => userStore.userInfo)
const wssUrl = import.meta.env.VITE_REQUEST_WSS_URL
const baseModule = import.meta.env.VITE_REQUEST_BASE_MODULE

const socketUrl = computed(() => `${wssUrl}${baseModule}/mall/ws/${userInfo.value.userCode}`)
const { isConnected, send, close, connect } = useWebSocket({
  url: socketUrl,
  onOpen: () => {
    if (isConnected.value) {
      send(JSON.stringify({ type: 'auth', token: token.value }))
    }
    console.log('WebSocket 已连接')
  },
  onMessage: (msg) => {
    console.log('收到消息', msg, JSON.parse(msg.data))
    const data = JSON.parse(msg.data)
    const content = JSON.parse(data.content)
    msgStore.setMessages(content)
  },
  onError: (err) => {
    console.error('WebSocket 错误', err)
  },
  onClose: (res) => {
    console.log('WebSocket 已关闭', res)
  },
  heartbeatMsg: JSON.stringify({ type: 'ping' }),
  heartbeatInterval: 15000,
})

function getDataList() {
  getMsgList().then((res) => {
    if (res.code === 0) {
      msgStore.setMessagesAll(res.data.noRead)
    }
  })
}

onShow(() => {
  if (userInfo.value.userCode) {
    getDataList()
  }
})

watch(
  () => userInfo.value.userCode,
  (userCode) => {
    if (userCode) {
      if (isConnected.value) {
        close()
      }
      connect()
    }
  },
)

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
