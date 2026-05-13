<script setup lang="ts">
import { ref } from 'vue'
import { useChatStore } from '@/stores'

const chatStore = useChatStore()
const message = ref('')

function sendMessage() {
  if (message.value.trim()) {
    chatStore.sendMessage(message.value)
    message.value = ''
  }
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
  <view class="input-box">
    <view class="chat-input">
      <wd-input v-model="message" :cursor-spacing="100" no-border placeholder="请输入您想找的类似商品" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.input-box{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding-bottom: calc(12rpx + env(safe-area-inset-bottom));
}
.chat-input {
  padding: 0 32rpx;
  :deep(){
    .wd-input {
      height: 96rpx;
      background: #FFFFFF;
      border-radius: 48rpx;
      display: flex;
      align-items: center;
      padding: 0 30rpx;
    }
  }
}
</style>
