<script setup lang="ts">
import { useMessage } from 'wot-design-uni'
import { getKeFuUrl } from '@/api/index'

const message = useMessage('kefu')

function showKefu() {
  getKeFuUrl().then((res) => {
    if (res.code === 0) {
      console.log('客服链接：', res.data)
      const data = res.data[0]
      if (data) {
        aaa(data)
      }
    }
  })
}

function aaa(data: any) {
  message.confirm({
    msg: '即将联系客服，确定吗?',
    title: '提示',
    cancelButtonProps: {
      customClass: 'custom-shadow1',
    },
    confirmButtonProps: {
      customClass: 'custom-shadow',
    },

  }).then(() => {
    wx.openCustomerServiceChat({
      extInfo: { url: data.configValue },
      corpId: 'wwca77aaa53e45d173',
      success(res) {
        console.log('打开客服会话成功', res)
      },
      fail(err) {
        console.log('打开客服会话失败', err)
      },
    })
  }).catch(() => {
    console.log('点击了取消按钮')
  })
}
</script>

<template>
  <wd-fab position="right-bottom" :expandable="false" :draggable="true" :gap="{ bottom: 150, left: 0, right: 2, top: 0 }">
    <template #trigger>
      <view class="kefuwarp">
        <view class="kefubox" @click="showKefu">
          <img class="kefuimg" src="../static/kefu.png" alt="">
        </view>
        <view class="wenzi">
          联系客服
        </view>
      </view>
    </template>
  </wd-fab>
  <wd-message-box selector="kefu" />
</template>

<style lang="scss" scoped>
.kefuwarp{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20rpx;
  .wenzi{
    padding: 6rpx 12rpx;
    border-radius: 20rpx;
    background-color: #089D39;
    margin-top: -20rpx;
    color: #FFf;
  }
}
.kefubox{
  background-color: #f2faf5;
  width: 90rpx;
  height: 90rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0rpx 2rpx 8rpx rgba(0, 0, 0, 0.8);
  .kefuimg{
    width: 90%;
    height: 90%;
    border-radius: 50%;
  }
  .iconfont{
    font-size: 60rpx;
    color: #089D39;
  }
}
</style>

<style lang="scss">
.custom-shadow{
  background-color: #089D39 !important;
}
</style>
