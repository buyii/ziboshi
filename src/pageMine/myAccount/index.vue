<script setup lang="ts">
import { useToast } from 'wot-design-uni'
import type { UploadFileItem, UploadStatusType, UploadSuccessEvent } from 'wot-design-uni/components/wd-upload/types'
import ExamplePopup from './component/ExamplePopup.vue'
import { action, getByKey } from '@/api/common'

const instance = getCurrentInstance()
// import F2chart from './component/F2chart.vue'
const toast = useToast()
const layoutStore = useLayoutStore()
const userStore = useUserStore()
const { token } = userStore
const statusBarHeight = computed(() => {
  return layoutStore.layoutStore.statusBarHeight
})
const imgList = ref<UploadFileItem[]>([])
const configList = ref<any[]>([])

const examplePopupRef = ref()

function handleClickLeft() {
  uni.navigateBack()
}

function onSuccess({ file, fileList, formData }: UploadSuccessEvent) {
  console.log(file, fileList, formData)
  let response: any = {}
  if (typeof file.response === 'string') {
    response = JSON.parse(file.response)
  }
  else if (typeof file.response === 'object' && file.response !== null) {
    response = file.response
  }
  const status: UploadStatusType = response.code === 0 ? 'success' : 'fail'
  file.status = status
}

function joinUrl(list: UploadFileItem[]) {
  const urlList = list.filter(item => item.status === 'success').map((item) => {
    let response: any = {}
    if (typeof item.response === 'string') {
      response = JSON.parse(item.response)
    }
    else if (typeof item.response === 'object' && item.response !== null) {
      response = item.response
    }
    return response?.data
  })
  return urlList
}

function handleSubmit() {
  const uploadImg = joinUrl(imgList.value)
  if (uploadImg.length < 1) {
    toast.error('请上传图片')
    return
  }
  const _this = instance?.proxy
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  const eventChannel = _this?.getOpenerEventChannel()

  eventChannel.emit('backEvent', uploadImg)
  uni.navigateBack()
}

function onExample() {
  examplePopupRef.value?.open()
}

onShow(() => {
  getByKey({ configKey: 'invoice_title,business_number,invoice_category' }).then((res) => {
    if (res.code === 0) {
      configList.value = res.data
    }
  })
})
</script>

<template>
  <wd-navbar title="对公账户信息" safe-area-inset-top left-arrow fixed :bordered="false" @click-left="handleClickLeft" />
  <view :style="{ paddingTop: `${(statusBarHeight || 0) + 44}px` }" class="findproducts-box">
    <view class="daren-title">
      <view>
        <view class="daren-title1">
          上传电子发票
        </view>
      </view>
      <view class="shili" @click="onExample">
        <text class="text">查看示例</text>
        <text class="iconfont icon-into" />
      </view>
    </view>
    <view view class="upload-box">
      <wd-upload
        v-model:file-list="imgList"
        custom-evoke-class="custom-evoke-class"
        :header="{
          Authorization: `Bearer ${token}`,
        }"
        :form-data="{
          prefix: 'find',
        }"
        :limit="1"
        :size-type="['compressed']"
        image-mode="aspectFill" :action="action" @success="onSuccess"
      />
    </view>
    <view class="daren-title">
      <view>
        <view class="daren-title1">
          开票信息
        </view>
      </view>
    </view>
    <view class="info-box">
      <view v-for="item in configList" :key="item.configId" class="info-box-item">
        <view class="info-label">
          {{ item.configName }}
        </view>
        <view class="info-value">
          {{ item.configValue }}
        </view>
      </view>
    </view>
    <FootButton label="确 认" fixed @confirm="handleSubmit" />
  </view>
  <ExamplePopup ref="examplePopupRef" />
</template>

<style scoped lang="scss">
.findproducts-box{
  padding: 48rpx;
  padding-bottom: calc(130rpx + env(safe-area-inset-bottom));
  .tupian-title{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 48rpx;
    .title1{
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 40rpx;
      color: #111111;
      line-height: 40rpx;
      font-style: normal;
    }
    .title2{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 24rpx;
      color: #999999;
      line-height: 24rpx;
      font-style: normal;
      margin-top: 16rpx;
    }
    .shili{
      width: 176rpx;
      height: 64rpx;
      background: #EEEEEE;
      border-radius: 32rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10rpx;
      .text{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #111111;
        line-height: 24rpx;
        text-align: left;
        font-style: normal;
      }
      .iconfont{
        font-size: 24rpx;
        color: #BABABA;
      }
    }
  }
  .upload-box{
    margin-top: 32rpx;
    :deep(){
      .wd-upload{
        flex-wrap: nowrap;
      }
      .wd-upload__preview{
        width: 290rpx;
        height: 290rpx;
      }
      .custom-evoke-class{
        width: 290rpx;
        height: 290rpx;
        background: #FFFFFF;
        border-radius: 32rpx;
      }
    }
  }
  .info-box{
    background: #FFFFFF;
    border-radius: 16rpx;
    padding: 0 32rpx;
    margin-top: 32rpx;
    .info-box-item{
      height: 96rpx;
      display: flex;
      align-items: center;
      gap: 16rpx;
      .info-label{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #999999;
        line-height: 28rpx;
        text-align: left;
        font-style: normal;
      }
      .info-value{
        flex: 1;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #333333;
        line-height: 28rpx;
        text-align: right;
      }
    }
  }
  .daren-title{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 48rpx;
    .daren-title1{
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 32rpx;
      color: #111111;
      line-height: 32rpx;
      font-style: normal;
    }
    .shili{
      width: 176rpx;
      height: 64rpx;
      background: #EEEEEE;
      border-radius: 32rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10rpx;
      .text{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #111111;
        line-height: 24rpx;
        text-align: left;
        font-style: normal;
      }
      .iconfont{
        font-size: 24rpx;
        color: #BABABA;
      }
    }
  }
  .beizhu-title{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 32rpx;
    color: #111111;
    line-height: 32rpx;
    font-style: normal;
    margin-top: 24rpx;
  }
  .textarea-box{
    background: #FFFFFF;
    border-radius: 16rpx;
    margin-top: 24rpx;
    .word-view{
      height: 128rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #DADADA;
      .word-text{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #DADADA;
      }
    }
    :deep(){
      .wd-textarea{
        min-height: 128rpx;
        border-radius: 16rpx;
        padding: 10rpx !important;
      }
      .wd-textarea::after {
        display: none !important;
      }
    }
  }
}
</style>

<route lang="json">
{
  "layout": "default",
  "name": "findproducts",
  "style": {
    "navigationBarTitleText": "找品申请"
  }
}
</route>
