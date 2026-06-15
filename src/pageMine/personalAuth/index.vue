<script setup lang="ts">
import { useToast } from 'wot-design-uni'
import { addAuth, getUserAuth } from '@/api/auth'
import { uploadFile } from '@/api/common'
import { useLayoutStore } from '@/stores'

const toast = useToast()
const layoutStore = useLayoutStore()
const statusBarHeight = computed(() => {
  return layoutStore.layoutStore.statusBarHeight
})
const realName = ref<string>('')
const idCard = ref<string>('')
const frontImg = ref<string>('')
const backImg = ref<string>('')
const loading = ref<boolean>(false)
function handleClickLeft() {
  uni.navigateBack()
}
function onConfirm() {
  if (!frontImg.value) {
    toast.error('请上传身份证正面')
    return
  }
  if (!backImg.value) {
    toast.error('请上传身份证反面')
    return
  }
  if (!realName.value) {
    toast.error('请输入姓名')
    return
  }
  if (!idCard.value) {
    toast.error('请输入身份证号码')
    return
  }
  loading.value = true
  addAuth({
    type: 1,
    realName: realName.value,
    idCard: idCard.value,
    frontImg: frontImg.value,
    backImg: backImg.value,
  }).then((res) => {
    loading.value = false
    if (res.code === 0) {
      uni.navigateBack()
    }
  }).catch(() => {
    loading.value = false
  })
}

function onSelectImg(type: number) {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    success: (res) => {
      const tempFilePath = res.tempFilePaths[0]
      uni.compressImage({
        src: tempFilePath,
        quality: 80,
        success: (res) => {
          uploadFile(res.tempFilePath, { prefix: 'auth' }).then((res: any) => {
            if (res.code === 0) {
              if (type === 1) {
                frontImg.value = res.data
              }
              else if (type === 2) {
                backImg.value = res.data
              }
            }
            else {
              toast.error(res.msg)
            }
          })
        },
      })
    },
  })
}

function getDetail() {
  getUserAuth({ type: 1 }).then((res) => {
    if (res.code === 0 && res.data) {
      realName.value = res.data.realName
      idCard.value = res.data.idCard
      frontImg.value = res.data.frontImg
      backImg.value = res.data.backImg
    }
  })
}

onShow(() => {
  getDetail()
})
</script>

<template>
  <wd-navbar title="个人认证" safe-area-inset-top left-arrow fixed :bordered="false" @click-left="handleClickLeft" />
  <view :style="{ paddingTop: `${(statusBarHeight || 0) + 44}px` }" class="page-wrapper">
    <view class="auth-label">
      请上传本人身份证正反面
    </view>
    <view class="auth-sub">
      请保持证件照清晰避免遮挡，反光
    </view>
    <view class="sfzimg-box">
      <image v-if="frontImg" class="sfz-img" :src="frontImg" />
      <image v-else class="sfz-img" src="../../static/svg/sfzzm.svg" />
      <view class="img-content" :class="{ 'img-content-active': frontImg }">
        <wd-button custom-class="icon-box" @click="onSelectImg(1)">
          <text class="iconfont icon-photograph" />
          <text v-if="frontImg" class="btn-text">重新上传</text>
        </wd-button>
        <view v-if="!frontImg" class="text-box">
          <wd-text text="正面">
            <template #prefix>
              <text class="prefix">点击上传身份证</text>
            </template>
            <template #suffix>
              <text class="suffix">照片</text>
            </template>
          </wd-text>
        </view>
      </view>
    </view>
    <view class="sfzimg-box">
      <image v-if="backImg" class="sfz-img" :src="backImg" />
      <image v-else class="sfz-img" src="../../static/svg/sfzfm.svg" />
      <view class="img-content" :class="{ 'img-content-active': backImg }">
        <wd-button custom-class="icon-box" @click="onSelectImg(2)">
          <text class="iconfont icon-photograph" />
          <text v-if="backImg" class="btn-text">重新上传</text>
        </wd-button>
        <view v-if="!backImg" class="text-box">
          <wd-text text="反面">
            <template #prefix>
              <text class="prefix">点击上传身份证</text>
            </template>
            <template #suffix>
              <text class="suffix">照片</text>
            </template>
          </wd-text>
        </view>
      </view>
    </view>
    <view>
      <view class="auth-label">
        请确认您的实名信息
      </view>
      <view class="auth-sub">
        如果正确请点击提交，如果不正确请重新上传证件
      </view>
      <view class="sfz-info">
        <view class="sfz-info-item">
          <view class="sfz-label">
            姓名
          </view>
          <view class="sfz-value">
            <wd-input v-model="realName" :cursor-spacing="100" placeholder="请输入" no-border />
            <!-- 王福财 -->
          </view>
        </view>
        <view class="sfz-info-item">
          <view class="sfz-label">
            证件号
          </view>
          <view class="sfz-value">
            <wd-input v-model="idCard" :cursor-spacing="100" placeholder="请输入" no-border />
          </view>
        </view>
      </view>
    </view>
  </view>
  <FootButton label="提 交" fixed :loading="loading" @confirm="onConfirm" />
</template>

<style scoped lang="scss">
.page-wrapper{
  padding: 0 64rpx calc(110rpx + env(safe-area-inset-bottom)) 64rpx;
  .auth-label{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 32rpx;
    color: #111111;
    line-height: 32rpx;
    margin-top: 48rpx;
    font-style: normal;
  }
  .auth-sub{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 24rpx;
    color: #999999;
    line-height: 24rpx;
    font-style: normal;
    margin-top: 20rpx;
    margin-bottom: 48rpx;
  }
  .sfzimg-box{
    width: 100%;
    height: 384rpx;
    background: #FFFFFF;
    border-radius: 16rpx;
    margin-bottom: 20rpx;
    position: relative;
    .sfz-img{
      width: 100%;
      height: 100%;
      background: #FFFFFF;
      border-radius: 16rpx;
      margin-bottom: 20rpx;
    }
    .img-content{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      :deep(){
        .icon-box{
          width: 98rpx;
          height: 98rpx;
          background: #089D39;
          border-radius: 50%;
          text-align: center;
          min-width: auto !important;
          .iconfont{
            font-size: 38rpx;
            color: #FFFFFF;
            line-height: 98rpx;
          }
        }
      }
      .text-box{
        margin-top: 20rpx;
        text-align: center;
        :deep(){
          .wd-text{
            font-family: PingFangSC, PingFang SC;
            font-weight: 500;
            font-size: 32rpx;
            color: #111111;
            line-height: 36rpx;
            text-align: right;
            font-style: normal;
          }
        }
        .prefix,
        .suffix{
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: 24rpx;
          color: #666666;
          line-height: 36rpx;
          font-style: normal;
          margin: 0 10rpx;
        }
      }
    }
    .img-content-active{
      :deep(){
        .icon-box{
          width: 270rpx;
          height: 80rpx;
          background: #089D39;
          border-radius: 40rpx;
          text-align: center;
          min-width: auto !important;
          .iconfont{
            font-size: 28rpx;
            color: #FFFFFF;
            line-height: 80rpx;
          }
          .btn-text{
            font-family: PingFangSC, PingFang SC;
            font-weight: 500;
            font-size: 28rpx;
            color: #FFFFFF;
            line-height: 80rpx;
            font-style: normal;
            margin-left: 16rpx;
          }
        }
      }
    }
  }
  .sfz-info{
    background: #FFFFFF;
    border-radius: 32rpx;
    padding: 0 48rpx;
    .sfz-info-item{
      height: 100rpx;
      display: flex;
      align-items: center;
      .sfz-label{
        width: 160rpx;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 32rpx;
        color: #999999;
        line-height: 32rpx;
        text-align: left;
        font-style: normal;
      }
      .sfz-value{
        flex: 1;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 32rpx;
        color: #111111;
        line-height: 32rpx;
        text-align: left;
        font-style: normal;
        :deep(){
          .wd-input__inner{
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 32rpx;
            color: #111111;
            line-height: 32rpx;
            font-style: normal;
          }
        }
      }
    }
  }
}
</style>

<route lang="json">
{
  "layout": "default",
  "name": "personalAuth",
  "style": {
    "navigationBarTitleText": "个人认证"
  }
}
</route>
