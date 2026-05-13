<script setup lang="ts">
import { useChatStore } from '@/stores'

const chatStore = useChatStore()

const messages = chatStore.useChatData.messages
console.log(chatStore.useChatData.messages, 'chatStore')
</script>

<template>
  <view class="message-list">
    <view v-for="message in messages" :key="message.id">
      <!-- 输入 -->
      <view v-if="message.sender === 'user'" class="message-item">
        <view class="message-content message-sent">
          <text>{{ message.text }}</text>
        </view>
        <view v-if="message.sender === 'user'" class="message-user">
          <image src="../../../static/logo.svg" />
        </view>
      </view>

      <!-- 回复 -->
      <view v-if="message.sender === 'bot'" class="message-item">
        <view class="message-user">
          <image src="../../../static/logo.svg" />
        </view>
        <view class="message-content message-received">
          <view class="received-name">
            星佣宝小助手
          </view>
          <text class="chat-text">{{ message.text }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.message-list {
  padding: 32rpx;
}
.message-item{
  display: flex;
  gap: 10rpx;
  margin-bottom: 40rpx;
}
.message-user{
  image{
    width: 96rpx;
    height: 96rpx;
    border-radius: 50%;
  }
}
.message-content {
  flex: 1;
  padding: 24rpx 34rpx;
  border-radius: 32rpx 8rpx 32rpx 8rpx;
}
.message-sent {
  background-color: #FF0057; // Light green for sent messages
  align-self: flex-end;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 32rpx;
  color: #FFFFFF;
  line-height: 44rpx;
  font-style: normal;
}

.message-received {
  // background-color: #f1f0f0; // Light gray for received messages
  .received-name{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 28rpx;
    color: #111111;
    line-height: 28rpx;
    font-style: normal;
    padding-bottom: 20rpx;
    border-bottom: 2rpx solid #DADADA;
    margin-bottom: 20rpx;
  }
  .chat-text{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 28rpx;
    color: #666666;
    line-height: 40rpx;
    font-style: normal;
  }
}
</style>
