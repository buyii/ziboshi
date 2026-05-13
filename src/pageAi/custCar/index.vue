<script setup lang="ts">
import ChatInput from './component/ChatInput.vue'
import MessageList from './component/MessageList.vue'
import { useLayoutStore } from '@/stores'

const layoutStore = useLayoutStore()

function handleClickLeft() {
  uni.navigateBack()
}

const statusBarHeight = computed(() => {
  return layoutStore.layoutStore.statusBarHeight
})

const messages = ref<{ id: number, content: string, sent: boolean }[]>([])

function handleSendMessage(message: string) {
  messages.value.push({
    id: Date.now(),
    content: message,
    sent: true,
  })
  console.log('发送消息:', message)
}
</script>

<template>
  <wd-navbar title="互动" safe-area-inset-top left-arrow fixed :bordered="false" @click-left="handleClickLeft" />
  <view class="chat-container" :style="{ paddingTop: `${(statusBarHeight || 0) + 44}px` }">
    <MessageList :messages="messages" />
    <ChatInput @send-message="handleSendMessage" />
  </view>
</template>

<style lang="scss" scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f8f8f8;
}
</style>
