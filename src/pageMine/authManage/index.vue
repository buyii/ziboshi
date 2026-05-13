<script setup lang="ts">
import { getUserInfo } from '@/api/index'

const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
function handleClickLeft() {
  uni.navigateBack()
}
function toUserAuth() {
  if (userInfo.value.inAuth === 1) {
    return
  }
  uni.navigateTo({
    url: '/pageMine/personalAuth/index',
  })
}
function toCompanyAuth() {
  if (userInfo.value.enAuth === 1) {
    return
  }
  uni.navigateTo({
    url: '/pageMine/companyAuth/index',
  })
}
onShow(() => {
  getUserInfo().then((res) => {
    if (res.code === 0) {
      userStore.setUserInfo(res.data)
    }
  })
})
</script>

<template>
  <wd-navbar title="实名认证" safe-area-inset-top left-arrow :bordered="false" @click-left="handleClickLeft" />
  <view class="page-wrapper">
    <view class="auth-item" @click="toUserAuth">
      <text class="iconfont icon-person icon1" />
      <view class="item-label">
        个人身份实名认证
      </view>
      <view class="item-status" :class="{ 'status-not': !userInfo.inAuth, 'status-ing': userInfo.inAuth === 1 }">
        <text v-if="userInfo.inAuth === 2" class="status-label">已认证</text>
        <text v-else-if="userInfo.inAuth === 1" class="status-label">认证中</text>
        <text v-else class="status-label">未认证</text>
        <text class="iconfont icon-into" />
      </view>
    </view>
    <wd-gap bg-color="#f8f8f8" height="28rpx" />
    <view class="auth-item" @click="toCompanyAuth">
      <text class="iconfont icon-company icon1" />
      <view class="item-label">
        公司实名认证
      </view>
      <view class="item-status" :class="{ 'status-not': !userInfo.enAuth, 'status-ing': userInfo.enAuth === 1 }">
        <text v-if="userInfo.enAuth === 2" class="status-label">已认证</text>
        <text v-else-if="userInfo.enAuth === 1" class="status-label">认证中</text>
        <text v-else class="status-label">未认证</text>
        <text class="iconfont icon-into" />
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.page-wrapper{
  padding: 48rpx 32rpx;
  .auth-item{
    padding: 54rpx 16rpx 54rpx 48rpx;
    background: #FFFFFF;
    border-radius: 32rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24rpx;
    .icon1{
      font-size: 68rpx;
      color: #FF0057;
    }
    .item-label{
      flex: 1;
      text-align: left;
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 32rpx;
      color: #444444;
      line-height: 44rpx;
      font-style: normal;
    }
    .item-status{
      padding: 12rpx 16rpx;
      background: rgba(255, 0, 87, 0.05);
      border-radius: 24rpx;
      display: flex;
      .status-label{
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 24rpx;
        color: #FF0057;
        line-height: 24rpx;
        font-style: normal;
      }
      .iconfont{
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 24rpx;
        color: rgba(255, 0, 87, 0.65);
        line-height: 24rpx;
        font-style: normal;
      }
    }
    .status-not{
      padding: 12rpx 16rpx;
      background: #F4F4F4;
      border-radius: 24rpx;
      display: flex;
      .status-label{
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 24rpx;
        color: #999999;
        line-height: 24rpx;
        font-style: normal;
      }
      .iconfont{
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 24rpx;
        color: #BABABA;
        line-height: 24rpx;
        font-style: normal;
      }
    }
    .status-ing{
      padding: 12rpx 16rpx;
      background: rgba(60, 98, 254, 0.05);
      border-radius: 24rpx;
      display: flex;
      .status-label{
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 24rpx;
        color: #3C62FE;
        line-height: 24rpx;
        font-style: normal;
      }
      .iconfont{
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 24rpx;
        color: rgba(60, 98, 254, 0.65);
        line-height: 24rpx;
        font-style: normal;
      }
    }
  }
}
</style>

<route lang="json">
{
  "layout": "default",
  "name": "authManage",
  "style": {
    "navigationBarTitleText": "实名认证"
  }
}
</route>
