<script setup lang="ts">
import RevenueRecords from './component/RevenueRecords.vue'
import PointsTabs from './component/PointsTabs.vue'

import { getMyPoint } from '@/api/wallet'

import { getMyTeamMemberOrderList } from '@/api/team'

interface Pagination {
  pageNum: number
  pageSize: number
  total: number
}

const imgBaseUrl = import.meta.env.VITE_IMG_URL
function handleClickLeft() {
  uni.navigateBack()
}

const activeTab = ref<number>(1)

const state = ref()
const amountData = ref({
  amount: '0.00',
  total: '0.00',
  waitSettle: '0.00',
})
const loading = ref<boolean>(false)
const dataList = ref<any>([])
const pagination = ref<Pagination>({
  pageNum: 1,
  pageSize: 10,
  total: 0,
})

function getPayoutsData() {
  getMyPoint().then((res) => {
    if (res.code === 0) {
      amountData.value = res.data
    }
  })
}

function getDataList() {
  const params = {
    pageNum: pagination.value.pageNum,
    pageSize: pagination.value.pageSize,
    status: activeTab.value,
    amountType: 1,
  }
  loading.value = true
  getMyTeamMemberOrderList(params).then((res) => {
    if (res.code === 0) {
      if (pagination.value.pageNum === 1) {
        dataList.value = [...res.rows]
      }
      else {
        dataList.value = [...dataList.value, ...res.rows]
      }
      pagination.value.total = res.total
      state.value = null
      loading.value = false
    }
    else {
      state.value = 'error'
      loading.value = false
    }
  }).catch(() => {
    state.value = 'error'
    loading.value = false
  })
}

function scrolltolower() {
  if (pagination.value.pageNum * pagination.value.pageSize >= pagination.value.total) {
    state.value = 'finished'
    return
  }
  state.value = 'loading'
  pagination.value.pageNum++
  getDataList()
}
function loadmore() {
  state.value = 'loading'
  getDataList()
}

function tabClick() {
  pagination.value.pageNum = 1
  getDataList()
}

function handleWithdraw() {
  uni.navigateTo({
    url: `/pageRank/pointsRedemption/index`,
  })
}

const statusBarHeight = computed(() => {
  const h = 760
  const num = uni.upx2px(h)
  return num
})

onShow(() => {
  getPayoutsData()
  getDataList()
})
</script>

<template>
  <view class="page-top">
    <wd-navbar title="我的积分" safe-area-inset-top left-arrow :bordered="false" @click-left="handleClickLeft" />
    <wd-notice-bar :scrollable="false" text="团队成员购买产品 / 1元 = 1积分" custom-class="my-notice" color="#000000" background-color="#FFFFFF">
      <template #prefix>
        <img class="prefiximg" src="../../static/svg/home_notice.svg" alt="">
      </template>
    </wd-notice-bar>
    <view class="wallet-am">
      <view class="wallet-top">
        <view class="top-title">
          可使用积分
        </view>
        <view class="amount-box">
          <wd-text custom-class="custom-text" :text="amountData.amount" color="#111111" size="56rpx" />
          <view class="amount-btn">
            <wd-button type="text" @click="handleWithdraw">
              兑换记录
              <text class="iconfont icon-into" />
            </wd-button>
          </view>
        </view>
        <view class="accumulated-box">
          <view class="accumulated-item">
            <view class="acc-title">
              历史累计积分
            </view>
            <wd-text custom-class="custom-text" :text="amountData.total" color="#444444" size="48rpx" />
          </view>
          <view class="accumulated-item">
            <view class="acc-title">
              未结算积分
            </view>
            <wd-text custom-class="custom-text" :text="amountData.waitSettle" color="#444444" size="48rpx" />
          </view>
        </view>
      </view>
      <PointsTabs v-model="activeTab" @tab-click="tabClick" />
    </view>
  </view>
  <MyScrollView :top="`${(statusBarHeight || 0) - 1}px`" :state="state" @scrolltolower="scrolltolower" @loadmore="loadmore">
    <view class="records-box">
      <template v-if="dataList.length > 0">
        <RevenueRecords :datas-list="dataList" />
      </template>
      <wd-status-tip v-if="dataList.length < 1 && !loading" tip="暂无数据~">
        <template #image>
          <image style="width: 320rpx;height: 344rpx;margin-top: 60rpx;" :src="`${imgBaseUrl}/notData1.png`" />
        </template>
      </wd-status-tip>
    </view>
  </MyScrollView>
</template>

<style scoped lang="scss">
.page-top{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  .prefiximg{
    width: 58rpx;
    height: 42rpx;
    margin-right: 18rpx;
  }
  :deep(){
    .my-notice{
      .wd-notice-bar__content{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #000000;
        line-height: 28rpx;
        font-style: normal;
      }
    }
  }
}
.wallet-am{
  padding: 32rpx;
  background-color: #F4F4F4;
}
.wallet-top{
  padding: 48rpx 48rpx 32rpx 48rpx;
  background-color: #fff;
  border-radius: 12rpx;
  .top-title{
    font-weight: 400;
    font-size: 24rpx;
    color: #666666;
    line-height: 24rpx;
    margin-bottom: 16rpx;
  }
  .amount-box{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 48rpx;
    :deep(){
      .custom-text{
        font-weight: 400;
        font-size: 56rpx;
        color: #111111;
        line-height: 64rpx;
        .prefix-text{
          font-weight: 400;
          font-size: 32rpx;
          color: #111111;
        }
      }
    }
  }
  .amount-btn{
    :deep(){
      .wd-button__text{
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 32rpx;
        color: #089D39;
        line-height: 32rpx;
      }
    }
    .iconfont{
      display: inline-block;
      font-size: 28rpx;
      color: #089D39;
    }
  }
  .accumulated-box{
    display: flex;
    gap: 32rpx;
    .accumulated-item{
      .acc-title{
        font-weight: 400;
        font-size: 24rpx;
        color: #999999;
        line-height: 24rpx;
        margin-bottom: 16rpx;
      }
    }
    :deep(){
      .custom-text{
        font-weight: 400;
        font-size: 48rpx;
        color: #444444;
        line-height: 48rpx;
        .prefix-acc{
          font-weight: 400;
          font-size: 32rpx;
          color: #444444;
        }
      }
    }
  }

}
.jilulabel{
  padding-left: 32rpx;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 32rpx;
  color: #111111;
  line-height: 32rpx;
  font-style: normal;
}
.tab-box{
  padding: 0 32rpx;
  display: flex;
  align-items: center;
  .tableft{
    width: 626rpx;
  }
  .tabright{
    width: 60rpx;
    text-align: right;
    font-size: 32rpx;
    color: #089D39;
  }
}
.scroll-Y{
  transition: all 0.3s ease; /* 添加平滑过渡效果 */
  position: fixed;
  bottom: 0;
}
.records-box{
  padding: 0 32rpx 32rpx 32rpx;
}
.hongbao{
  position: fixed;
  right: 6rpx;
  top: 400rpx;
  width: 50rpx;
  height: 50rpx;
  .hongbaoImg{
    width: 100%;
    height: 100%;
  }
}

.join-box{
  height: 420rpx;
  .join-text{
    display: flex;
    gap: 10rpx;
    margin: 20rpx 0;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 28rpx;
    color: #111111;
    line-height: 30rpx;
    .join-label{
      width: 152rpx;
      text-align: right;
    }
    .join-value{
      text-align: left;
      flex: 1;
    }
  }
  .join-zhu{
    margin: 20rpx;
    margin-top: 60rpx;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 22rpx;
    line-height: 28rpx;
    color: #666666;
    line-height: 30rpx;
    text-align: center;
  }
  .down-box{
    margin-top: 60rpx;
    .time-box{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 32rpx;
      color: #111111;
      line-height: 32rpx;
      font-style: normal;
    }
    .text-time{
      font-family: PingFangSC, PingFang SC;
      font-weight: bold;
      font-size: 32rpx;
      color: #089D39;
      line-height: 32rpx;
      font-style: normal;
      margin: 0 6rpx;
    }
    .text-timesucc{
      font-family: PingFangSC, PingFang SC;
      font-weight: bold;
      font-size: 32rpx;
      color: #52c41a;
      line-height: 32rpx;
      font-style: normal;
      margin: 0 6rpx;
    }
  }
}
</style>

<style lang="scss">
.custom-shadow{
  background-color: #089D39 !important;
}
.joinmsg{
  .wd-message-box__body{
    padding: 30rpx 30rpx 0 30rpx !important;
  }
  .wd-message-box__actions{
    padding-top: 16rpx !important;
  }
  .wd-message-box__content{
    max-height: 640rpx !important;
  }
}
</style>

<route lang="json">
{
  "layout": "default",
  "name": "myPoints",
  "style": {
    "navigationBarTitleText": "我的积分"
  }
}
</route>
