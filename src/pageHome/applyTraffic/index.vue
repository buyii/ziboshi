<script setup lang="ts">
import { useToast } from 'wot-design-uni'
import Commodity from './component/Commodity.vue'
import { uploadVideoUrl, uploadVideoUrlAgent } from '@/api/product'
import { useLayoutStore } from '@/stores'

const userStore = useUserStore()
const layoutStore = useLayoutStore()
const statusBarHeight = computed(() => {
  return layoutStore.layoutStore.statusBarHeight
})
const toast = useToast()
const sampleData = computed(() => {
  return userStore.sampleData
})
const type = ref('')
const itemId = ref('')
const coopCode = ref('')
const kolUid = ref('')
const phone = ref('')
const douyinId = ref('')
const remark = ref<string>('')
const videoUrl = ref<string>('')
const showText = ref<boolean>(false)

function handleClickLeft() {
  uni.navigateBack()
}

function onShowTextarea() {
  showText.value = !showText.value
}
function onTextBlur(val: any) {
  if (val.value === '') {
    showText.value = false
  }
}

function onConfirm() {
  if (!douyinId.value) {
    toast.error('请填写抖音号')
    return
  }
  if (!kolUid.value) {
    toast.error('请填写达人UID')
    return
  }
  if (!phone.value) {
    toast.error('请填写联系方式')
    return
  }
  if (!coopCode.value) {
    toast.error('请填写合作码')
    return
  }

  const params: any = {
    id: itemId.value,
    douyinId: douyinId.value,
    remark: remark.value,
    videoUrl: videoUrl.value,
    kolUid: kolUid.value,
    phone: phone.value,
    coopCode: coopCode.value,
  }
  if (type.value === '1') {
    uploadVideoUrl(params).then((res) => {
      if (res.code === 0) {
        toast.success(res.msg)
        uni.navigateBack()
      }
    })
  }
  else {
    uploadVideoUrlAgent(params).then((res) => {
      if (res.code === 0) {
        toast.success(res.msg)
        uni.navigateBack()
      }
    })
  }
}

onLoad((options) => {
  itemId.value = options?.id
  type.value = options?.type
})
</script>

<template>
  <view class="topbg" />
  <wd-navbar title="申请投流" safe-area-inset-top left-arrow fixed :bordered="false" custom-style="background: transparent;" @click-left="handleClickLeft" />
  <view class="collect-warp" :style="{ paddingTop: `${(statusBarHeight || 0) + 49}px` }">
    <Commodity :sample-data="sampleData" />
    <view class="item-box">
      <view class="card-label">
        抖音号
      </view>
      <view class="info-value">
        <wd-input v-model="douyinId" :cursor-spacing="100" placeholder="请输入" no-border />
      </view>
      <view class="card-label">
        达人UID
      </view>
      <view class="info-value">
        <wd-input v-model="kolUid" :cursor-spacing="100" placeholder="请输入" no-border />
      </view>
      <view class="card-label">
        联系方式
      </view>
      <view class="info-value">
        <wd-input v-model="phone" :cursor-spacing="100" placeholder="请输入" no-border />
      </view>
      <view class="card-label">
        合作码
      </view>
      <view class="info-value">
        <wd-input v-model="coopCode" :cursor-spacing="100" placeholder="请输入" no-border />
      </view>
      <view class="card-label">
        视频链接
      </view>
      <view class="textarea-box">
        <wd-textarea
          v-model="videoUrl"
          :auto-height="true"
          :cursor-spacing="100"
          :show-confirm-bar="false"
          confirm-type="done"
          placeholder="请输入视频链接"
        />
      </view>
      <view class="card-label">
        备注
      </view>
      <view class="textarea-box">
        <view v-if="!showText" class="word-view" @click="onShowTextarea">
          <view><wd-icon name="edit-1" size="24rpx" /></view>
          <view class="word-text">
            点击空白区域输入
          </view>
        </view>
        <wd-textarea
          v-if="showText"
          v-model="remark"
          :auto-height="true"
          :cursor-spacing="100"
          :auto-focus="true"
          :show-confirm-bar="false"
          confirm-type="done"
          placeholder="请输入" @blur="onTextBlur"
        />
      </view>
    </view>
    <FootButton label="确认" fixed @confirm="onConfirm" />
  </view>
</template>

<style scoped lang="scss">
.topbg{
  position: fixed;
  height: 400rpx;
  width: 100%;
  background: linear-gradient( 180deg, rgba(255,36,87,0.05) 0%, rgba(248,248,248,0) 100%);
}
.collect-warp{
  position: relative;
  z-index: 2;
  padding: 0 32rpx;
  padding-bottom: calc(120rpx + env(safe-area-inset-bottom));
  .top-warp{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 32rpx;
    background-color: transparent;
    .top-left{
      image{
        width: 172rpx;
        height: 40rpx;
      }
      view{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #666666;
        line-height: 24rpx;
        font-style: normal;
        margin-top: 20rpx;
      }
    }
    .top-right{
      image{
        width: 74rpx;
        height: 84rpx;
      }
    }
  }
  .item-box{
    background-color: #fff;
    border-radius: 16rpx;
    margin-top: 24rpx;
  }
  .card-label{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 28rpx;
    color: #111111;
    font-style: normal;
    padding-top: 32rpx;
    padding-left: 16rpx;
  }
  .dizhibox{
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #FFFFFF;
    border-radius: 16rpx;
    margin-top: 32rpx;
    padding: 34rpx 32rpx;
    .dizhiLeft{
      .dizhiname{
        display: flex;
        gap: 24rpx;
        .name{
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: 32rpx;
          color: #000000;
          line-height: 32rpx;
          font-style: normal;
        }
        .phone{
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 28rpx;
          color: #666666;
          line-height: 28rpx;
          font-style: normal;
        }
      }
      .address{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #444444;
        line-height: 28rpx;
        font-style: normal;
        margin-top: 24rpx;
        line-height: 1.4;
      }
    }
    .dizhiRight{
      margin-left: 20rpx;
      .iconfont{
        font-size: 28rpx;
        color: #111111;
      }
    }
  }
  .title-box{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 32rpx;
    .card-label{
      margin-top: 0;
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
  .add-box{
    height: 160rpx;
    background: #FFFFFF;
    border-radius: 16rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 32rpx;
    .add-text{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 24rpx;
      color: #666666;
      line-height: 24rpx;
      font-style: normal;
    }
    .change-box{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .change-label{
        display: flex;
        align-items: center;
        padding-right: 30rpx;
        .label-text{
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 24rpx;
          color: #AAAAAA;
          line-height: 24rpx;
          font-style: normal;
        }
        .iconfont{
          font-size: 24rpx;
          line-height: 24rpx;
          color: #DADADA;
          margin-left: 4rpx;
        }
      }
    }
    .tips{
      display: flex;
      align-items: center;
      margin: 0 32rpx;
      padding: 16rpx 16rpx 16rpx 24rpx;
      background: rgba(255,0,87,0.05);
      border-radius: 16rpx;
      border: 1rpx solid rgba(255,0,87,0.1);
      .tips-left{
        flex: 1;
        display: flex;
        align-items: center;
        gap: 20rpx;
        .iconfont{
          font-size: 32rpx;
          color: #FF0057;
        }
        .tips-text{
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 24rpx;
          color: #FF0057;
          line-height: 24rpx;
          font-style: normal;
        }
      }
      :deep(){
        .wd-button{
          width: 144rpx;
          height: 64rpx;
          background: #FF0057;
          border-radius: 20rpx;
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: 24rpx;
          color: #FFFFFF;
          line-height: 24rpx;
          font-style: normal;
          min-width: auto;
        }
      }
    }
  }
  .add-box2{
    margin-top: 24rpx;
  }
  .add-box3{
    display: block;
    height: auto;
    justify-content: space-between;
    align-items: flex-start;
  }
  .leave-word{
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
        padding: 16rpx !important;
      }
      .wd-textarea::after {
        display: none !important;
      }
    }
  }
  .guigebox{
    background-color: #FFFFFF;
    border-radius: 16rpx;
  }
  .guige{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24rpx;
    height: 80rpx;
    font-size: 28rpx;
    font-style: normal;
    view:nth-child(1){
      color: #999999;
      width: 160rpx;
    }
    view:nth-child(2){
      color: #111111;
      text{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #BABABA;
        line-height: 28rpx;
        font-style: normal;
      }
    }
  }
}
.botbox{
  padding-bottom: calc(12rpx + env(safe-area-inset-bottom));
  padding-top: 8rpx;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: center;
  :deep(.wd-button){
    width: 90%;
    height: 88rpx !important;
    background: #FF0057 !important;
    border-radius: 8rpx 32rpx!important;
  }
}
.upload-box{
  margin-top: 32rpx;
  :deep(){
    .wd-upload{
      flex-wrap: nowrap;
    }
    .wd-upload__preview{
      width: 180rpx;
      height: 180rpx;
    }
    .custom-evoke-class{
      width: 180rpx;
      height: 180rpx;
      background: #FFFFFF;
      border-radius: 16rpx;
    }
  }
}
.info-value{
  background: #FFFFFF;
  margin-top: 10rpx;
  padding: 24rpx;
  :deep(){
    .wd-input__inner{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 28rpx;
      color: #111111;
      line-height: 28rpx;
      font-style: normal;
    }
  }
}
.instructions{
  background: #FFFFFF;
  border-radius: 16rpx;
  margin-top: 24rpx;
  padding: 24rpx;
  .card-label{
    margin-top: 0;
    margin-bottom: 24rpx;
  }
  .instructions-text{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 26rpx;
    color: #999999;
    line-height: 40rpx;
    font-style: normal;
    .kefu{
      color: #FF0056;
    }
  }
}
</style>

<route lang="json">
{
  "layout": "default",
  "name": "applyTraffic",
  "style": {
    "navigationBarTitleText": "申请投流"
  }
}
</route>
