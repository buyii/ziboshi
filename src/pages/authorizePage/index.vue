<script setup lang="ts">
import { useToast } from 'wot-design-uni'
import { login } from '@/api/index'
import { useTabbar } from '@/composables/useTabbar'

const userStore = useUserStore()
const { setTabbarItemActive } = useTabbar()
const checkbox = ref(false)
const toast = useToast()
function onBack() {
  setTabbarItemActive('home')
  uni.switchTab({
    url: '/pages/home/index',
  })
}
function abcd() {
  if (!checkbox.value) {
    toast.error('请阅读并同意隐私协议')
    return
  }
  uni.login({
    success(loginRes) {
      login({
        code: loginRes.code,
      }).then((res) => {
        if (res.code === 0) {
          const { data } = res
          userStore.setUserInfo(data)
          uni.navigateBack()
        }
      })
    },
  })
}
function handleOpenPrivacyContract() {
  // 打开隐私协议页面
  wx.openPrivacyContract({
    success: () => {}, // 打开成功
    fail: () => {}, // 打开失败
    complete: () => {},
  })
}
</script>

<template>
  <view class="authpage">
    <image class="logoimg" src="../../static/logo.jpg" />
    <view class="text-box">
      <view class="text1">
        为了给您提供更好的服务，请授权以下权限
      </view>
      <view class="text1">
        获取您的公开信息 (昵称、头像等)
      </view>
    </view>
    <view class="xieyi-warp">
      <wd-checkbox v-model="checkbox" shape="square" checked-color="#089D39" />
      <view class="xieyi-box" @click="handleOpenPrivacyContract">
        <text class="iconfont icon-agreement" />
        <text>《滋博仕小程序隐私保护指引》</text>
      </view>
    </view>
    <view class="btn-box">
      <wd-button custom-class="btn1" block open-type="agreePrivacyAuthorization" @agreeprivacyauthorization="abcd">
        同意授权
      </wd-button>
      <wd-button custom-class="btn2" block type="text" @click="onBack">
        取消授权
      </wd-button>
    </view>
  </view>
</template>

<style scoped lang="scss">
.authpage{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.logoimg{
  width: 208rpx;
  height: 208rpx;
  border-radius: 24rpx;
}
.text-box{
  width: 658rpx;
  background: #F8F8F8;
  border-radius: 24rpx;
  border: 1rpx solid #DADADA;
  text-align: center;
  padding: 48rpx 0 24rpx 0;
  margin-top: 96rpx;
  margin-bottom: 142rpx;
  .text1{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 28rpx;
    color: #666666;
    line-height: 28rpx;
    font-style: normal;
    margin-bottom: 24rpx;
  }
}
.xieyi-warp{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 78rpx;
}
.xieyi-box{
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 28rpx;
  color: #089D39;
  line-height: 28rpx;
  font-style: normal;
  .iconfont{
     font-weight: 500;
    font-size: 28rpx;
    color: #089D39;
    line-height: 28rpx;
    font-style: normal;
  }
}
.btn-box{
  width: 100%;
  :deep(){
    .btn1{
      height: 88rpx !important;
      margin: 0 80rpx;
      background: #089D39 !important;
      .wd-button__text{
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 32rpx;
        color: #FFFFFF;
        line-height: 32rpx;
        font-style: normal;
      }
    }
    .btn2{
      margin-top: 32rpx;
      .wd-button__text{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #999999;
        line-height: 28rpx;
        text-align: left;
        font-style: normal;
      }
    }
  }
}
</style>

<route lang="json">
{
  "layout": "default",
  "name": "authorizePage",
  "style": {
    "navigationBarTitleText": "登录"
  }
}
</route>
