<script setup lang="ts">
import type { UploadFileItem, UploadStatusType, UploadSuccessEvent } from 'wot-design-uni/components/wd-upload/types'

import { action, getByKey, getDictList } from '@/api/common'

import { refund } from '@/api/order'

const layoutStore = useLayoutStore()
const statusBarHeight = computed(() => {
  return layoutStore.layoutStore.statusBarHeight
})

const userStore = useUserStore()
const { token } = userStore

const platformList = ref<any>([])

const imgList = ref<UploadFileItem[]>([])

const configList = ref<any[]>([])
const orderId = ref<string>('')
const totalPayAmount = ref<string>('')
const errProps = ref<string[]>([])
const form = ref()
const model = reactive<{
  refundReason: string
  refundDesc: string
}>({
  refundReason: '',
  refundDesc: '',
})
const loading = ref<boolean>(false)

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

function onSubmit() {
  const refundImg = joinUrl(imgList.value)
  const params = {
    orderId: orderId.value,
    refundReason: model.refundReason,
    refundDesc: model.refundDesc,
    refundImg: refundImg.join(','),
  }
  loading.value = true
  refund(params).then((res) => {
    if (res.code === 0) {
      uni.navigateBack()
    }
    loading.value = false
  }).catch(() => {
    loading.value = false
  })
}

function handleSubmit() {
  form.value.validate().then(({ valid, errors }: any) => {
    if (valid) {
      onSubmit()
    }
    else {
      errProps.value = errors.map((item: any) => {
        return item.prop
      })
    }
  }).catch((error: any) => {
    console.log(error, 'error')
  })
}

function getAddress() {
  getByKey({ configKey: 'refund_address,refund_phone' }).then((res) => {
    if (res.code === 0) {
      configList.value = res.data
    }
  })
}

function copyAddress() {
  const texts = configList.value.map(e => e.configValue)
  const text = texts.join(';')
  uni.setClipboardData({
    data: text,
    success() {
      console.log('success')
    },
  })
}

function getCause() {
  getDictList({
    dictType: 'refund_cause',
  }).then((res) => {
    if (res.code === 0) {
      platformList.value = res.data
    }
  })
}

onLoad((options) => {
  getCause()
  getAddress()
  orderId.value = options?.orderId || ''
  totalPayAmount.value = options?.totalPayAmount || ''
})
</script>

<template>
  <wd-navbar title="申请退款" safe-area-inset-top left-arrow fixed :bordered="false" @click-left="handleClickLeft" />
  <wd-gap bg-color="#F4F4F4" height="16rpx" />
  <view :style="{ paddingTop: `${(statusBarHeight || 0) + 44}px` }" class="refund-box">
    <view>
      <wd-form ref="form" :model="model">
        <wd-select-picker
          v-model="model.refundReason" type="radio"
          :show-confirm="false"
          label="申请原因"
          label-width="100px"
          value-key="dictValue"
          label-key="dictLabel"
          custom-label-class="customlabel"
          custom-content-class="custom-content-class"
          prop="refundReason"
          :columns="platformList"
          title="请选择申请原因"
          placeholder="请选择申请原因"
          :rules="[{ required: true, message: '请选择申请原因' }]"
        />
        <wd-cell custom-class="group" vertical>
          <template #title>
            <view style="width:100%;flex: 1;display: flex;align-items: center;justify-content: space-between;">
              <view class="cell-tit">
                退货地址
              </view>
              <view class="fuzhi">
                <text class="iconfont icon-copy" @click.stop="copyAddress" />
              </view>
            </view>
          </template>
          <view v-for="item in configList" :key="item" class="config">
            <view class="confvalue">
              {{ item.configValue }}
            </view>
          </view>
        </wd-cell>
        <wd-cell-group custom-class="group" title="申请金额">
          <view class="refundNum">
            <view class="numprefix">
              ¥
            </view>
            <view class="num">
              {{ totalPayAmount }}
            </view>
          </view>
          <view class="refundDesc">
            最高{{ totalPayAmount }}
            <!-- ，含运费10元 -->
          </view>
        </wd-cell-group>
        <wd-cell-group :custom-class="model.refundReason === '其他' ? 'group1' : 'group'" title="申请退款补充说明">
          <view class="textarea-box">
            <wd-textarea v-model="model.refundDesc" prop="refundDesc" custom-class="textarea" :rules="[{ required: model.refundReason === '其他', message: '请输入补充说明' }]" />
          </view>
          <view view class="upload-box">
            <wd-upload
              v-model:file-list="imgList"
              multiple
              custom-evoke-class="custom-evoke-class"
              :header="{
                Authorization: `Bearer ${token}`,
              }"
              :form-data="{
                prefix: 'order/refund/',
              }"
              :size-type="['compressed']"
              image-mode="aspectFill"
              :action="action" @success="onSuccess"
            />
          </view>
        </wd-cell-group>
      </wd-form>
    </view>
    <FootButton label="提交申请" :loading="loading" fixed @confirm="handleSubmit" />
    <wd-message-box />
    <wd-toast />
  </view>
</template>

<style scoped lang="scss">
.refund-box{
  padding: 48rpx 0;
  padding-bottom: calc(130rpx + env(safe-area-inset-bottom));
  .config{
    font-size: 28rpx;
    color: #000000;
    line-height: 45rpx;
    padding-bottom: 20rpx;
  }
  .refundNum{
    display: flex;
    gap: 8rpx;
    padding: 0 40rpx;
    .numprefix{
      font-weight: bold;
      font-size: 28rpx;
      color: #000000;
      line-height: 45rpx;
    }
    .num{
      font-weight: 500;
      font-size: 64rpx;
      color: #000000;
      line-height: 64rpx;
    }
  }
  .refundDesc{
    font-weight: 400;
    font-size: 24rpx;
    color: #999999;
    line-height: 24rpx;
    padding-left: 60rpx;
    margin-top: 16rpx;
    padding-bottom: 40rpx;
  }
  .textarea-box{
    padding: 0 32rpx 32rpx 32rpx;
    :deep(){
      .textarea{
        height: 184rpx;
        background: #F8F8F8;
        border-radius: 16rpx;
        .wd-textarea__value{
          width: 100%;
          height: 100%;
          background: #F8F8F8;
          border-radius: 16rpx;
        }
        .wd-textarea__inner{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .upload-box{
    padding: 0 32rpx 32rpx 32rpx;
    :deep(){
      .wd-upload{
        flex-wrap: nowrap;
      }
      .wd-upload__preview{
        width: 160rpx;
        height: 160rpx;
      }
      .custom-evoke-class{
        width: 160rpx;
        height: 160rpx;
        background: #F8F8F8;
        border-radius: 8rpx;
      }
    }
  }
  :deep() {
    .custom-content-class{
      .wd-radio__shape{
        color: #089D39 !important;
      }
    }
    .customlabel{
      font-weight: 400;
      font-size: 32rpx;
      color: #111111;
    }
    .group{
      margin-top: 16rpx;
      .wd-cell-group__title{
        font-weight: 400;
        font-size: 32rpx;
        color: #111111;
      }
    }
    .group1{
      margin-top: 16rpx;
      .wd-cell-group__title{
        font-weight: 400;
        font-size: 32rpx;
        color: #111111;
        .wd-cell-group__left {
          position: relative;
          padding-left: 20rpx;
          &::after {
            position: absolute;
            left: 0;
            top: 2px;
            content: "*";
            font-size: var(--wot-cell-required-size, 18px);
            line-height: 1.1;
            color: var(--wot-cell-required-color, var(--wot-color-danger, #fa4350));
          }
        }
      }
    }
  }
  .cell-tit{
    font-weight: 400;
    font-size: 32rpx;
    color: #111111;
  }
}
</style>

<route lang="json">
{
  "layout": "default",
  "name": "orderRefund",
  "style": {
    "navigationBarTitleText": "申请退款"
  }
}
</route>
