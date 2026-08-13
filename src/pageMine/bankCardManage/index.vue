<script setup lang="ts">
import BankItem from './component/BankItem.vue'
import { useLayoutStore } from '@/stores'
import { getBankCardList } from '@/api/bank'

const layoutStore = useLayoutStore()
const userStore = useUserStore()
const statusBarHeight = computed(() => {
  return layoutStore.layoutStore.statusBarHeight
})

const route = useRoute()
const type = computed(() => {
  return route.params?.type
})

const dataList = ref<any>([])
const loading = ref<boolean>(false)
function handleClickLeft() {
  uni.navigateBack()
}
function onConfirm() {
  uni.navigateTo({
    url: '/pageMine/addBankCard/index',
  })
}
function getDataList() {
  loading.value = true
  getBankCardList().then((res) => {
    loading.value = false
    if (res.code === 0) {
      dataList.value = res.data
    }
  }).catch(() => {
    loading.value = false
  })
}
function onDelSuccess() {
  getDataList()
}

function onBack(item: any) {
  userStore.setSelectBank(item)
  uni.navigateBack()
}
onShow(() => {
  getDataList()
})
</script>

<template>
  <wd-navbar title="银行卡管理" safe-area-inset-top left-arrow fixed :bordered="false" @click-left="handleClickLeft" />
  <view :style="{ paddingTop: `${(statusBarHeight || 0) + 44}px` }" class="bank-box">
    <view v-if="dataList.length > 0" class="card-list">
      <view v-for="item in dataList" :key="item.id">
        <BankItem :item="item" :type="type" @on-del-success="onDelSuccess" @on-back="onBack" />
      </view>
    </view>
    <view v-if="dataList.length < 1 && !loading" class="not-card">
      <image class="notimg" src="../../static/svg/notBank.svg" />
      <view class="label1">
        暂无卡片，请添加
      </view>
      <view class="label2">
        本人的储蓄卡
      </view>
    </view>
  </view>
  <FootButton label="添 加" fixed @confirm="onConfirm" />
</template>

<style scoped lang="scss">
.bank-box{
  min-height: 100vh;
  background-color: #fff;
  box-sizing: border-box;
}
.card-list{
  padding: 0 48rpx;
}
.not-card{
  text-align: center;
  padding-top: 100rpx;
  .notimg{
    width: 490rpx;
    height: 290rpx;
  }
  .label1{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 28rpx;
    color: #111111;
    line-height: 28rpx;
    font-style: normal;
    margin-top: 64rpx;
  }
  .label2{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 24rpx;
    color: #111111;
    line-height: 24rpx;
    font-style: normal;
    margin-top: 24rpx;
  }
}
</style>

<route lang="json">
{
  "layout": "default",
  "name": "bankCardManage",
  "style": {
    "navigationBarTitleText": "银行卡管理"
  }
}
</route>
