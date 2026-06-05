<script setup lang="ts">
import { useToast } from 'wot-design-uni'
import businessLicense from '../../static/svg/businessLicense.svg'
import authentication from '../../static/svg/authentication.svg'
import authentication1 from '../../static/svg/authentication1.svg'
import legalPerson_0 from '../../static/svg/legalPerson_0.svg'
import legalPerson_1 from '../../static/svg/legalPerson_1.svg'
import Step1 from './component/Step1.vue'
import Step2 from './component/Step2.vue'
import Step3 from './component/Step3.vue'
import MyStep from './component/MyStep.vue'
import { useLayoutStore } from '@/stores'
import { addAuth, getUserAuth } from '@/api/auth'
import type { CompanyAuth } from '@/types/common'
import { useTabbar } from '@/composables/useTabbar'

const list = [
  {
    id: 1,
    name: '上传营业执照',
    img: businessLicense,
    activeImg: businessLicense,
  },
  {
    id: 2,
    name: '法人身份证',
    img: legalPerson_0,
    activeImg: legalPerson_1,
  },
  {
    id: 3,
    name: '公司认证审核中',
    img: authentication,
    activeImg: authentication,
  },
]

const { setTabbarItemActive } = useTabbar()
const toast = useToast()
const layoutStore = useLayoutStore()
const statusBarHeight = computed(() => {
  const h = 172
  const num = uni.upx2px(h)
  return layoutStore.layoutStore.statusBarHeight + num + 44
})
const paramsData = ref<CompanyAuth>({
  type: 2,
  realName: '',
  idCard: '',
  frontImg: '',
  backImg: '',
  businessNumber: '',
  businessImg: '',
  companyName: '',
  cardNumber: '',
  bank: '',
})
const loading = ref<boolean>(false)
const stepIndex = ref<number>(1)
function handleClickLeft() {
  if (stepIndex.value === 1 || stepIndex.value >= list.length) {
    uni.navigateBack()
  }
  else {
    stepIndex.value--
  }
}
function onsubmit() {
  loading.value = true
  addAuth({
    ...paramsData.value,
  }).then((res) => {
    loading.value = false
    if (res.code === 0) {
      stepIndex.value++
    }
  }).catch(() => {
    loading.value = false
  })
}

function onConfirm() {
  if (stepIndex.value >= list.length) {
    toHome()
    return
  }
  if (stepIndex.value === 1) {
    if (!paramsData.value.businessImg) {
      toast.error('请上传印业执照')
      return
    }
    if (!paramsData.value.companyName) {
      toast.error('请输入公司名称')
      return
    }
    if (!paramsData.value.businessNumber) {
      toast.error('请输入纳税识别号')
      return
    }
    if (!paramsData.value.cardNumber) {
      toast.error('请输入账户号码')
      return
    }
    if (!paramsData.value.cardNumber) {
      toast.error('请输入账户号码')
      return
    }
    if (!paramsData.value.bank) {
      toast.error('请输入开户行')
      return
    }
    stepIndex.value++
    return
  }
  if (stepIndex.value === 2) {
    if (!paramsData.value.frontImg) {
      toast.error('请上传身份证正面')
      return
    }
    if (!paramsData.value.backImg) {
      toast.error('请上传身份证反面')
      return
    }
    if (!paramsData.value.realName) {
      toast.error('请输入姓名')
      return
    }
    if (!paramsData.value.idCard) {
      toast.error('请输入身份证号码')
      return
    }
    onsubmit()
  }
}
function toHome() {
  setTabbarItemActive('home')
  uni.switchTab({
    url: '/pages/home/index',
  })
}
function getDetail() {
  getUserAuth({ type: 2 }).then((res) => {
    if (res.code === 0) {
      const data = res.data || {
        realName: '',
        idCard: '',
        frontImg: '',
        backImg: '',
        businessNumber: '',
        businessImg: '',
        companyName: '',
        cardNumber: '',
        bank: '',
      }
      paramsData.value = {
        type: 2,
        ...data,
      }
    }
  })
}
onLoad(() => {
  getDetail()
})
</script>

<template>
  <wd-navbar title="公司认证" safe-area-inset-top left-arrow :bordered="false" @click-left="handleClickLeft" />
  <view class="page-wrapper">
    <view class="mystep">
      <MyStep v-model="stepIndex" :list="list" />
    </view>
    <scroll-view :style="{ top: `${statusBarHeight}px` }" class="scroll-Y" :scroll-y="true">
      <view class="content-box">
        <!-- 营业执照 -->
        <Step1 v-if="stepIndex === 1" v-model="paramsData" />
        <!-- 法人信息 -->
        <Step2 v-else-if="stepIndex === 2" v-model="paramsData" />
        <!-- 完成 -->
        <Step3 v-else v-model="paramsData" />
      </view>
    </scroll-view>
  </view>
  <FootButton :label="stepIndex >= list.length ? '返回首页' : '下一步'" :loading="loading" fixed @confirm="onConfirm" />
</template>

<style scoped lang="scss">
.page-wrapper{
  // padding-bottom: calc(110rpx + env(safe-area-inset-bottom));
  .mystep{
    padding: 0 32rpx;
    background-color: #fff;
  }
  .content-box{
    padding: 0 64rpx 10rpx 64rpx;
  }
}
.scroll-Y{
    transition: all 0.3s ease; /* 添加平滑过渡效果 */
    position: fixed;
    bottom: calc(106rpx + env(safe-area-inset-bottom));
  }
</style>

<route lang="json">
{
  "layout": "default",
  "name": "companyAuth",
  "style": {
    "navigationBarTitleText": "公司认证"
  }
}
</route>
