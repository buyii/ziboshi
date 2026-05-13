<script setup lang="ts">
import { useMessage, useToast } from 'wot-design-uni'
import MyPopup from './component/MyPopup.vue'
import { getQRCode, getUserKolList } from '@/api/userKol'
import { getUserMatchDetail, onApplyMatch } from '@/api/applyMatch'

const imgBaseUrl = import.meta.env.VITE_IMG_URL
const helpMessage = useMessage('devtips')

const toast = useToast()
const myPopupRef = ref()
const authCodePopupRef = ref()
const selectUser = ref()
const showCode = ref(false)
const codeUrl = ref('')
const imgUrl = ref('')

const layoutStore = useLayoutStore()
const statusBarHeight = computed(() => {
  return layoutStore.layoutStore.statusBarHeight
})

function topage() {
  uni.navigateTo({
    url: '/pageAi/findproducts/index',
  })
}

function getStatus() {
  getUserMatchDetail({}).then((res) => {
    if (res.code === 0) {
      if (res.data.today) {
        uni.navigateTo({
          url: `/pageAi/matchingDetails/index`,
        })
      }
      if (!res.data.today) {
        showUser()
      }
    }
  })
}

function showUser() {
  toast.loading({
    loadingType: 'ring',
    loadingColor: '#FF0057',
    msg: '加载中...',
  })
  getUserKolList({ pageNum: 1, pageSize: 1000 }).then((res) => {
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

function confirmAdd(item: any) {
  selectUser.value = { ...item }
  onApplyMatch({ kolId: item.id }).then((res) => {
    if (res.code === 0) {
      selectUser.value = null
      uni.navigateTo({
        url: `/pageAi/matchingDetails/index`,
      })
    }
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

function helpClick() {
  helpMessage.alert({
    msg: `功能正在升级中，敬请期待 ~`,
    title: '温馨提示',
    confirmButtonText: '知道了',
    confirmButtonProps: {
      customClass: 'custom-apply',
    },
  }).then(() => {
    console.log('点击了确定按钮')
  })
}
</script>

<template>
  <view class="wisdomPage">
    <view class="page-top">
      <image
        class="bgimg"
        src="../../static/svg/wisdombg.svg"
      />
      <image class="img" :style="{ top: `${(statusBarHeight || 0) + 11}px` }" src="../../static/znzpai.png" />
      <!-- <view class="img1" :style="{ top: `${(statusBarHeight || 0) + 11}px` }">
        智能找品
      </view> -->
    </view>
    <view class="btn-box">
      <!-- <image class="btnimg" :src="`${imgBaseUrl}/hudong.png`" @click="helpClick" /> -->
      <view class="zpbtn-box">
        <image class="zpbtnimg" :src="`${imgBaseUrl}/znppAi.png`" @click="getStatus" />
        <image class="zpbtnimg" :src="`${imgBaseUrl}/zpsqAi.png`" @click="topage" />
      </view>
    </view>
    <wd-message-box selector="devtips" custom-class="devtipsmsg" />
  </view>
  <MyPopup ref="myPopupRef" @confirm-add="confirmAdd" @confirm-auth="confirmAuth" />
  <AuthCodePopup ref="authCodePopupRef" />
  <AuthCodeTem v-if="showCode" :code-url="codeUrl" :toast="toast" @change-img="changeImg" />
</template>

<style lang="scss" scoped>
.wisdomPage{
  .page-top{
    width: 750rpx;
    height: 750rpx;
    position: relative;
    .bgimg{
      width: 100%;
      height: 100%;
    }
    .img{
      width: 158rpx;
      height: 42rpx;
      position: absolute;
      left: 48rpx;
    }
    .img1{
      width: 148rpx;
      height: 40rpx;
      position: absolute;
      left: 248rpx;
    }
  }
  .btn-box{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 48rpx;
    z-index: 9;
    .btnimg{
      width: 654rpx;
      height: 352rpx;
    }
  }
  .zpbtn-box{
    display: flex;
    gap: 22rpx;
    .zpbtnimg{
      width: 316rpx;
      height: 464rpx;
      box-shadow: inset 0rpx 1rpx 0rpx 0rpx #FFFFFF;
    }
  }
  :deep(){
    .devtipsmsg{
      .wd-message-box__title{
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 32rpx;
        color: #000000;
        line-height: 32rpx;
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
</style>

<route lang="json">
{
  "layout": "tabbar",
  "name": "wisdom",
  "style": {
    "navigationBarTitleText": "智能找品"
  }
}
</route>
