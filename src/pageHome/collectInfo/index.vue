<script setup lang="ts">
import { useMessage, useToast } from 'wot-design-uni'
import type { UploadFileItem, UploadStatusType, UploadSuccessEvent } from 'wot-design-uni/components/wd-upload/types'
import Commodity from './component/Commodity.vue'
import ExpertsItem from './component/ExpertsItem.vue'
import MyPopup from './component/MyPopup.vue'
import ExamplePopup from './component/ExamplePopup.vue'
import { applySample, getSampleKol } from '@/api/product'
import { getQRCode, getUserKolList } from '@/api/userKol'
import { useLayoutStore } from '@/stores'
import { action } from '@/api/common'

const userStore = useUserStore()
const layoutStore = useLayoutStore()
const { token } = userStore
const userInfo = computed(() => userStore.userInfo)
const statusBarHeight = computed(() => {
  return layoutStore.layoutStore.statusBarHeight
})
const helpMessage = useMessage('help')
const toast = useToast()
const sampleData = computed(() => {
  return userStore.sampleData
})
const imgList = ref<UploadFileItem[]>([])
const addressData = ref()
const selectUser = ref()
const showCode = ref(false)
const authCodePopupRef = ref()
const douyinId = ref('')
const phone = ref('')
const nickName = ref('')
const sampleType = ref('')
const imgUrl = ref('')
const codeUrl = ref('')
const remark = ref<string>('')
const showText = ref<boolean>(false)
const myPopupRef = ref()
const examplePopupRef = ref()

function handleClickLeft() {
  uni.navigateBack()
}
function onExample(type: number) {
  examplePopupRef.value?.open(type)
}
function onShowTextarea() {
  showText.value = !showText.value
}
function onTextBlur(val: any) {
  if (val.value === '') {
    showText.value = false
  }
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

function toAddress() {
  uni.navigateTo({
    url: `/pageRank/addressManage/index?select=select`,
    events: {
      // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
      backChange(data: any) {
        addressData.value = data
      },
    },
  })
}
function toExperts() {
  toast.loading({
    loadingType: 'ring',
    loadingColor: '#FF0057',
    msg: '加载中...',
  })
  const productId = sampleData.value?.productId
  const activityId = sampleData.value?.activityId
  getUserKolList({ productId, activityId, pageNum: 1, pageSize: 1000 }).then((res) => {
    if (res.code === 0) {
      if (res.total > 0) {
        toast.close()
        myPopupRef.value?.open(res.rows)
      }
      else {
        confirmAuth()
      }
    }
  }).catch(() => {
    toast.close()
  })
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

function changeItem(item: any) {
  selectUser.value = { ...item }
}
function onConfirm() {
  if (!addressData.value) {
    toast.error('请选择领样地址')
    return
  }
  if (!phone.value) {
    toast.error('请输入联系方式')
    return
  }

  const params: any = {
    sampleType: sampleType.value,
    productId: sampleData.value?.productId,
    activityId: sampleData.value?.activityId,
    addressId: addressData.value?.id,
    phone: phone.value,
    remark: remark.value,
    skuIds: [sampleData.value?.sku?.skuId].join(','),
    // kolId: '',
    // douyinId: '',
    // douyinImg: '',
  }

  if (sampleType.value === '1') {
    if (!selectUser.value) {
      toast.error('请选择领样达人')
      return
    }
    params.kolId = selectUser.value?.id
  }
  if (sampleType.value === '2') {
    console.log('imgList.value', imgList.value)
    const uploadImg = joinUrl(imgList.value)
    if (!douyinId.value) {
      toast.error('请填写达人抖音号')
      return
    }
    if (!nickName.value) {
      toast.error('请填写达人名称')
      return
    }
    if (uploadImg.length < 1) {
      toast.error('请上传达人主页截图')
      return
    }
    params.nickName = nickName.value
    params.douyinId = douyinId.value
    params.douyinImg = uploadImg.join(',')
  }
  applySample(params).then((res) => {
    if (res.code === 0) {
      uni.navigateTo({
        url: '/pageHome/applySuccess/index',
      })
    }
  })
}
function helpClick() {
  helpMessage.alert({
    msg: `务必填写您的真实联系方式，方便与您沟通样品问题！`,
    title: '提示',
    confirmButtonText: '确 定',
    confirmButtonProps: {
      customClass: 'custom-apply',
    },
  }).then(() => {
    console.log('点击了确定按钮')
  })
}
function dyIdBlur({ value }: { value: any }) {
  if (!value) {
    nickName.value = ''
    imgList.value = []
    return
  }
  getSampleKol({ douyinId: value }).then((res) => {
    if (res.code === 0) {
      if (res.data) {
        nickName.value = res.data.nickName ? res.data.nickName : ''
        phone.value = res.data.phone ? res.data.phone : ''
        imgList.value = res.data.douyinImg
          ? [{
              name: '达人主页截图',
              url: res.data.douyinImg,
              status: 'success',
              uid: new Date().getTime(),
              response: {
                code: 0,
                data: res.data.douyinImg,
              },
            }]
          : []
      }
      else {
        nickName.value = ''
        imgList.value = []
      }
    }
    else {
      toast.close()
    }
  }).catch(() => {
    toast.close()
  })
}
function confirmAuth() {
  getQRCode().then((res) => {
    if (res.code === 0) {
      codeUrl.value = res.data
      showCode.value = true
    }
    else {
      toast.close()
    }
  }).catch(() => {
    toast.close()
  })
}

function changeImg(url: any) {
  toast.close()
  imgUrl.value = url
  authCodePopupRef.value?.open(imgUrl.value)
}

onLoad((options) => {
  if (userInfo.value.phone) {
    phone.value = userInfo.value.phone
  }
  sampleType.value = options?.sampleType
})
</script>

<template>
  <view class="topbg" />
  <wd-navbar title="" safe-area-inset-top left-arrow fixed :bordered="false" custom-style="background: transparent;" @click-left="handleClickLeft" />
  <view class="collect-warp" :style="{ paddingTop: `${(statusBarHeight || 0) + 49}px` }">
    <view class="top-warp">
      <view class="top-left">
        <image src="../../static/svg/mfly.svg" />
        <view>选择您的地址以及样品达人</view>
      </view>
      <view class="top-right">
        <image src="../../static/svg/bubble.svg" />
      </view>
    </view>

    <view v-if="addressData" class="dizhibox">
      <view class="dizhiLeft" @click="toAddress">
        <view class="dizhiname">
          <view class="name">
            {{ addressData.name }}
          </view>
          <view class="phone">
            {{ addressData.phone }}
          </view>
        </view>
        <view class="address">
          {{ addressData.area }} {{ addressData.detail }}
        </view>
      </view>
      <view class="dizhiRight" @click="toAddress">
        <text class="iconfont icon-address" />
      </view>
    </view>

    <view v-else class="add-box" @click="toAddress">
      <view><wd-icon name="add1" size="30rpx" /></view>
      <view class="add-text">
        新增地址
      </view>
    </view>

    <Commodity :sample-data="sampleData" />

    <view class="guigebox" style="margin-top: 24rpx;">
      <view class="guige">
        <view>规格</view>
        <view>{{ sampleData?.sku?.specName }}</view>
      </view>
      <view class="guige">
        <view>样品库存</view>
        <view>
          <text>≤</text>
          {{ sampleData?.sampleStock }}
        </view>
      </view>
    </view>

    <view class="card-label" style="margin-bottom: 32rpx;">
      申样要求
    </view>
    <view class="guigebox">
      <view v-if="sampleData?.kolShopSale" class="guige">
        <view>总销量</view>
        <view>
          <text>≥</text>
          {{ sampleData?.kolShopSale }}
        </view>
      </view>
      <view v-if="sampleData?.monthShopSale" class="guige">
        <view>月销单量</view>
        <view>
          <text>≥</text>
          {{ sampleData?.monthShopSale }}
        </view>
      </view>
      <view v-if="sampleData?.kolGmv" class="guige">
        <view>近30天GMV</view>
        <view>
          <text>≥</text>
          {{ sampleData?.kolGmv }}
        </view>
      </view>
      <view v-if="sampleData?.kolLevel" class="guige">
        <view>达人等级</view>
        <view>
          <text>≥</text>
          Lv{{ sampleData.kolLevel }}
        </view>
      </view>
    </view>

    <template v-if="sampleType === '1'">
      <view class="card-label">
        选择领样达人
      </view>
      <view v-if="selectUser" class="add-box add-box2 add-box3">
        <view class="change-box">
          <ExpertsItem :show-right="false" :item="selectUser" />
          <view class="change-label" @click="toExperts">
            <text class="label-text">更换达人</text>
            <text class="iconfont icon-into" />
          </view>
        </view>
      </view>
      <view v-else class="add-box add-box2" @click="toExperts">
        <view><wd-icon name="add1" size="30rpx" /></view>
        <view class="add-text">
          添加达人
        </view>
      </view>
    </template>

    <template v-if="sampleType === '2'">
      <view class="title-box">
        <view class="card-label">
          达人主页截图
        </view>
        <view class="shili" @click="onExample(2)">
          <text class="text">查看示例</text>
          <text class="iconfont icon-into" />
        </view>
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
            prefix: 'find',
          }"
          :limit="1"
          :size-type="['compressed']"
          image-mode="aspectFill"
          :action="action" @success="onSuccess"
        />
      </view>
      <view class="card-label">
        达人名称
      </view>
      <view class="info-value">
        <wd-input v-model="nickName" :cursor-spacing="100" placeholder="请输入" no-border />
      </view>
      <view class="card-label">
        达人抖音号
      </view>
      <view class="info-value">
        <wd-input v-model="douyinId" :cursor-spacing="100" placeholder="请输入" no-border @blur="dyIdBlur" />
      </view>
    </template>
    <view class="card-label lianxi" @click.stop="helpClick">
      联系方式
      <view class="helpbox">
        <wd-icon name="help-circle-filled" custom-class="help-icon" />
      </view>
    </view>
    <view class="info-value">
      <wd-input v-model="phone" :cursor-spacing="100" placeholder="微信号或手机号" no-border />
    </view>
    <view class="card-label">
      申样留言
    </view>
    <view class="textarea-box">
      <view v-if="!showText" class="word-view" @click="onShowTextarea">
        <view><wd-icon name="edit-1" size="24rpx" color="#FF0056" /></view>
        <view class="word-text">
          如需特殊规格(如:全色寄样)请备注
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
        placeholder="如需特殊规格(如:全色寄样)请备注" @blur="onTextBlur"
      />
    </view>
    <view class="instructions">
      <view class="card-label">
        申样须知
      </view>
      <view class="instructions-text">
        1.收到样品后需在15天内完成作业.
      </view>
      <view class="instructions-text">
        2.使用已授权的抖音账号发布短视频，或发布图文带上商品链接,或直播交付大于3单(三选其一)即算完成任务.
      </view>
      <view class="instructions-text">
        3.系统会自动检测作业完成情况，未完成作业将会影响您在平台的信誉分!
      </view>
      <view class="instructions-text">
        如有任何问题，欢迎咨询 客服
      </view>
    </view>
    <FootButton label="确认" fixed @confirm="onConfirm" />
    <AuthCodePopup ref="authCodePopupRef" />
    <MyPopup ref="myPopupRef" @confirm-auth="confirmAuth" @change-item="changeItem" />
    <AuthCodeTem v-if="showCode" :code-url="codeUrl" :toast="toast" @change-img="changeImg" />
    <ExamplePopup ref="examplePopupRef" />
    <wd-message-box selector="help" custom-class="helpmsg" />
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

  .card-label{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 28rpx;
    color: #111111;
    font-style: normal;
    margin-top: 32rpx;
  }
  .lianxi{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 28rpx;
    color: #111111;
    font-style: normal;
    margin-top: 32rpx;
    display: flex;
    align-items: center;
    .helpbox{
      line-height: 18rpx;
      margin-left: 8rpx;
      :deep(){
        .help-icon{
          font-size: 30rpx;
          color: #FF4600;
        }
      }
    }
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
        color: #FF0056;
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
  .guigebox{
    background-color: #FFFFFF;
    border-radius: 16rpx;
  }
  .guige{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12rpx 24rpx;
    min-height: 80rpx;
    font-size: 28rpx;
    font-style: normal;
    view:nth-child(1){
      color: #999999;
      min-width: 160rpx;
    }
    view:nth-child(2){
      color: #111111;
      line-height: 1.4;
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
  :deep(){
    .helpmsg{
      .wd-message-box__title{
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 36rpx;
        color: #000000;
        line-height: 36rpx;
        text-align: left;
        font-style: normal;
      }
      .wd-message-box__content{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #666666;
        line-height: 40rpx;
        text-align: left;
        font-style: normal;
        margin-top: 12rpx;
      }
      .wd-message-box__actions{
        display: flex;
        justify-content: flex-end;
      }
      .custom-apply{
        width: 220rpx;
        height: 80rpx;
        background: #FF0057 !important;
        border-radius: 16rpx 40rpx 40rpx 16rpx !important;
      }
      .custom-cancel{
        width: 220rpx;
        height: 80rpx;
        background: #FAFAFA !important;
        border-radius: 40rpx 16rpx 16rpx 40rpx !important;
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
  border-radius: 16rpx;
  margin-top: 24rpx;
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
  "name": "collectInfo",
  "style": {
    "navigationBarTitleText": "申样信息填写"
  }
}
</route>
