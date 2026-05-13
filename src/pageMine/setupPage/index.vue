<script setup lang="ts">
import { useMessage } from 'wot-design-uni'
import AgreementPopup from './component/AgreementPopup.vue'
import AboutPopup from './component/AboutPopup.vue'
import { changeAvatarOrUserName, logout } from '@/api/index'
import { uploadFile } from '@/api/common'
import { useTabbar } from '@/composables/useTabbar'

const { setTabbarItemActive } = useTabbar()
const userStore = useUserStore()
const message = useMessage('usernamebox')
const messagePhone = useMessage('phonebox')
const agreementPopupRef = ref()
const aboutPopupRef = ref()
const copyUsername = ref<string>('')
const copyPhone = ref<string>('')

const userInfo = computed(() => userStore.userInfo)
function handleClickLeft() {
  uni.navigateBack()
}
function onLogOut() {
  logout().then((res) => {
    if (res.code === 0) {
      userStore.clearUserInfo()
      setTabbarItemActive('home')
      uni.switchTab({
        url: '/pages/home/index',
      })
    }
  })
}
function showAgreement() {
  agreementPopupRef.value?.open()
}
function showAbout() {
  aboutPopupRef.value?.open()
}
const src = ref<string>('')
const imgSrc = computed(() => {
  return userInfo.value.avatar
})
const username = computed(() => {
  return userInfo.value.userName
})
const phone = computed(() => {
  return userInfo.value.phone
})
const show = ref<boolean>(false)

interface EventType {
  tempFilePath: string
  width: number
  height: number
}
function handleConfirm(event: EventType) {
  console.log(event)
  const { tempFilePath } = event
  uploadFile(tempFilePath, { prefix: `avatar/${userInfo.value.userCode}` }).then((res: any) => {
    if (res.code === 0) {
      console.log('上传成功', res)
      changeImg(res.data)
    }
  })
}

function changeImg(url: string) {
  changeAvatarOrUserName({ avatar: url }).then((res) => {
    if (res.code === 0) {
      userStore.upDataUserInfo({ avatar: url })
    }
  })
}

function handleCancel() {
}
function onPrompt() {
  copyUsername.value = username.value
  message.confirm({
    title: '请输入昵称',
    confirmButtonProps: {
      customClass: 'custom-taking-btn',
    },
  }).then((res) => {
    console.log(res, copyUsername.value)
    changeAvatarOrUserName(({ userName: copyUsername.value })).then((res) => {
      if (res.code === 0) {
        if (!copyUsername.value) {
          copyUsername.value = username.value
          onRestoreName(username.value)
        }
        userStore.upDataUserInfo({ userName: copyUsername.value })
      }
    })
  }).catch((error) => {
    console.log(error)
  })
}

function onRestoreName(name: string) {
  changeAvatarOrUserName(({ userName: name })).then((res) => {
    if (res.code === 0) {
      userStore.upDataUserInfo({ userName: copyUsername.value })
    }
  })
}

function onSetPhone() {
  copyPhone.value = phone.value
  messagePhone.confirm({
    title: '请输入微信号或手机号',
    confirmButtonProps: {
      customClass: 'custom-taking-btn',
    },
  }).then(() => {
    changeAvatarOrUserName(({ phone: copyPhone.value })).then((res) => {
      if (res.code === 0) {
        userStore.upDataUserInfo({ phone: copyPhone.value })
      }
    })
  }).catch((error) => {
    console.log(error)
  })
}

function onUpload({ avatarUrl }: { avatarUrl: string }) {
  src.value = avatarUrl
  show.value = true
}
</script>

<template>
  <wd-navbar title="设置" safe-area-inset-top left-arrow :bordered="false" @click-left="handleClickLeft" />
  <view class="page-wrapper">
    <wd-cell title="头像">
      <view class="custom-value">
        <image class="img" :src="imgSrc" />
        <wd-button type="icon" open-type="chooseAvatar" icon="edit-1" @chooseavatar="onUpload" />
      </view>
    </wd-cell>
    <wd-cell title="昵称">
      <view class="custom-value">
        <text class="name">{{ username }}</text>
        <wd-button type="icon" icon="edit-1" @click="onPrompt" />
      </view>
    </wd-cell>
    <wd-cell title="联系方式">
      <view class="custom-value">
        <text class="name">{{ phone }}</text>
        <wd-button type="icon" icon="edit-1" @click="onSetPhone" />
      </view>
    </wd-cell>
    <wd-gap bg-color="#F8F8F8" height="16rpx" />
    <wd-cell title="关于我们" is-link clickable @click="showAbout" />
    <wd-cell title="用户协议" is-link clickable @click="showAgreement" />
    <view class="btnbox">
      <wd-button block @click="onLogOut">
        退出登录
      </wd-button>
    </view>
  </view>
  <AgreementPopup ref="agreementPopupRef" />
  <AboutPopup ref="aboutPopupRef" />
  <wd-img-cropper
    v-model="show"
    :img-src="src"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  />
  <wd-message-box selector="usernamebox">
    <input v-model="copyUsername" type="nickname">
  </wd-message-box>
  <wd-message-box selector="phonebox">
    <input v-model="copyPhone">
  </wd-message-box>
</template>

<style lang="scss">
.custom-taking-btn{
  background-color: #FF0057 !important;
}
</style>

<style lang="scss" scoped>
.page-wrapper{
  padding-top: 24rpx;
  :deep(){
    .wd-cell {
      &__wrapper{
        align-items: center;
        padding: 32rpx 32rpx 32rpx 0;
      }
      &__title{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 32rpx;
        color: #111111;
        line-height: 32rpx;
        font-style: normal;
      }
    }
  }
  .btnbox{
    :deep(){
      .wd-button{
        margin: 24rpx 36rpx;
        height: 96rpx !important;
        background: #FFFFFF !important;
        border-radius: 200rpx 16rpx 16rpx 200rpx !important;
        font-size: 32rpx !important;
        font-weight: 500 !important;

      }
      .wd-button__text{
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 32rpx;
        color: #111111;
        line-height: 32rpx;
        font-style: normal;
      }
    }
  }

}
.custom-value{
  display: flex;
  align-items: center;
  gap: 32rpx;
  justify-content: flex-end;
  .img{
    width: 112rpx;
    height: 112rpx;
    border-radius: 50%;
  }
  .name{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 28rpx;
    color: #444444;
    line-height: 28rpx;
    font-style: normal;
  }
  .iconfont{
    font-size: 28rpx;
  }
  :deep(){
      .wd-button{
        width: auto !important;
        height: auto !important;
        color: #111111 !important;
        background-color: #fff !important;
      }
      .wd-button__content{
        background-color: #fff !important;
      }
    }
}
</style>

<route lang="json">
{
  "layout": "default",
  "name": "setupPage",
  "style": {
    "navigationBarTitleText": "设置"
  }
}
</route>
