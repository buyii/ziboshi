<script setup lang="ts">
import { uploadFile } from '@/api/common'
import type { CompanyAuth } from '@/types/common'

const paramsData = defineModel<CompanyAuth>({
  required: true,
})
function onSelectImg() {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      const tempFilePath = res.tempFilePaths[0]
      uploadFile(tempFilePath, { prefix: 'auth' }).then((res: any) => {
        if (res.code === 0) {
          paramsData.value.businessImg = res.data
        }
      })
    },
  })
}
const nameShow = ref<boolean>(false)
const bnumShow = ref<boolean>(false)
const numShow = ref<boolean>(false)
const bankShow = ref<boolean>(false)
function clicksuffixicon(type: number) {
  if (type === 1) {
    nameShow.value = true
  }
  else if (type === 2) {
    numShow.value = true
  }
  else if (type === 3) {
    bankShow.value = true
  }
  else if (type === 4) {
    bnumShow.value = true
  }
}
function onBlur(e: any, type: number) {
  if (type === 1) {
    nameShow.value = false
  }
  else if (type === 2) {
    numShow.value = false
  }
  else if (type === 3) {
    bankShow.value = false
  }
  else if (type === 4) {
    bnumShow.value = false
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
  <view class="auth-label">
    请上传营业执照
  </view>
  <view class="auth-sub">
    * 证件大小不超过5M
  </view>
  <view class="sfzimg-box">
    <image v-if="paramsData.businessImg" class="sfz-img" :src="paramsData.businessImg" />
    <image v-else class="sfz-img" src="../../../static/svg/yyzz.svg" />
    <view class="img-content" :class="{ 'img-content-active': paramsData.businessImg }">
      <wd-button custom-class="icon-box" @click="onSelectImg">
        <text class="iconfont icon-photograph" />
        <text v-if="paramsData.businessImg" class="btn-text">重新上传</text>
      </wd-button>
      <view v-if="!paramsData.businessImg" class="text-box">
        请上传营业执照
      </view>
    </view>
  </view>
  <view>
    <view class="auth-label">
      账户信息
    </view>
    <view class="auth-sub">
      * 账户信息需与营业执照一致
    </view>
    <view class="sfz-info">
      <view class="sfz-info-item">
        <view class="sfz-label">
          公司名称
        </view>
        <view class="sfz-value">
          <wd-input
            v-model="paramsData.companyName" :focus="nameShow" type="text" :cursor-spacing="100"
            no-border placeholder-class="placeholderClass" placeholder="请输入" @blur="onBlur($event, 1)"
          >
            <template #suffix>
              <text class="iconfont icon-editAsh" @click="clicksuffixicon(1)" />
            </template>
          </wd-input>
        </view>
      </view>
      <view class="sfz-info-item">
        <view class="sfz-label">
          纳税识别号
        </view>
        <view class="sfz-value">
          <wd-input
            v-model="paramsData.businessNumber" :focus="bnumShow" :cursor-spacing="100"
            type="text" no-border placeholder-class="placeholderClass" placeholder="请输入" @blur="onBlur($event, 4)"
          >
            <template #suffix>
              <text class="iconfont icon-editAsh" @click="clicksuffixicon(4)" />
            </template>
          </wd-input>
        </view>
      </view>
      <view class="sfz-info-item">
        <view class="sfz-label">
          账户号码
        </view>
        <view class="sfz-value">
          <wd-input
            v-model="paramsData.cardNumber" :focus="numShow" :cursor-spacing="100"
            type="text" no-border placeholder-class="placeholderClass" placeholder="请输入" @blur="onBlur($event, 2)"
          >
            <template #suffix>
              <text class="iconfont icon-editAsh" @click="clicksuffixicon(2)" />
            </template>
          </wd-input>
        </view>
      </view>
      <view class="sfz-info-item">
        <view class="sfz-label">
          开户行
        </view>
        <view class="sfz-value">
          <wd-input
            v-model="paramsData.bank" :focus="bankShow" type="text" :cursor-spacing="100"
            no-border placeholder-class="placeholderClass" placeholder="请输入" @blur="onBlur($event, 3)"
          >
            <template #suffix>
              <text class="iconfont icon-editAsh" @click="clicksuffixicon(3)" />
            </template>
          </wd-input>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
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
  margin-bottom: 32rpx;
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
        background: #FF0057;
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
        background: #FF0057;
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
  border-radius: 16rpx;
  padding: 0 32rpx;
  .sfz-info-item{
    padding: 32rpx 0;
    .sfz-label{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 28rpx;
      color: rgba(0,0,0,0.85);
      line-height: 28rpx;
      text-align: left;
      font-style: normal;
    }
    .sfz-value{
      margin-top: 16rpx;
      display: flex;
      align-items: center;
      :deep(){
        .wd-input{
          flex: 1;
        }
        .wd-input__inner{
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          height: 32rpx;
          font-size: 32rpx !important;
          color: #111111;
          line-height: 32rpx;
          font-style: normal;
        }
        .placeholderClass{
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 32rpx;
          color: rgba(0,0,0,0.25);
          line-height: 32rpx;
          font-style: normal;
        }
      }
      .iconfont{
        font-size: 28rpx;
        color: #000000;
        margin-left: 10rpx;
      }
    }
  }
}
</style>
