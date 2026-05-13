<script setup lang="ts">
import { useToast } from 'wot-design-uni'
import { uploadFile } from '@/api/common'
import type { CompanyAuth } from '@/types/common'

const toast = useToast()
const paramsData = defineModel<CompanyAuth>({
  required: true,
})
function onSelectImg(type: number) {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      const tempFilePath = res.tempFilePaths[0]
      uploadFile(tempFilePath, { prefix: 'auth' }).then((res: any) => {
        if (res.code === 0) {
          if (type === 1) {
            paramsData.value.frontImg = res.data
          }
          else if (type === 2) {
            paramsData.value.backImg = res.data
          }
        }
        else {
          toast.error(res.msg)
        }
      })
    },
  })
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
    请上传法人身份证正反面
  </view>
  <view class="auth-sub">
    请保持证件照清晰避免遮挡，反光
  </view>
  <view class="sfzimg-box">
    <image v-if="paramsData.frontImg" class="sfz-img" :src="paramsData.frontImg" />
    <image v-else class="sfz-img" src="../../../static/svg/sfzzm.svg" />
    <view class="img-content" :class="{ 'img-content-active': paramsData.frontImg }">
      <wd-button custom-class="icon-box" @click="onSelectImg(1)">
        <text class="iconfont icon-photograph" />
        <text v-if="paramsData.frontImg" class="btn-text">重新上传</text>
      </wd-button>
      <view v-if="!paramsData.frontImg" class="text-box">
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
    <image v-if="paramsData.backImg" class="sfz-img" :src="paramsData.backImg" />
    <image v-else class="sfz-img" src="../../../static/svg/sfzfm.svg" />
    <view class="img-content" :class="{ 'img-content-active': paramsData.backImg }">
      <wd-button custom-class="icon-box" @click="onSelectImg(2)">
        <text class="iconfont icon-photograph" />
        <text v-if="paramsData.backImg" class="btn-text">重新上传</text>
      </wd-button>
      <view v-if="!paramsData.backImg" class="text-box">
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
      请核对法人的实名信息
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
          <wd-input v-model="paramsData.realName" :cursor-spacing="100" placeholder="请输入" no-border />
        </view>
      </view>
      <view class="sfz-info-item">
        <view class="sfz-label">
          证件号
        </view>
        <view class="sfz-value">
          <wd-input v-model="paramsData.idCard" :cursor-spacing="100" placeholder="请输入" no-border />
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
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
</style>
