<script setup lang="ts">
import { useMessage } from 'wot-design-uni'
import IncomeTab from './component/IncomeTab.vue'
import RevenueRecords from './component/RevenueRecords.vue'

import { getWalletAccountsBalance, getWithdrawList } from '@/api/wallet'
import { claimRedPacket, getRedPacket } from '@/api/common'

import { useLayoutStore } from '@/stores'

interface Pagination {
  pageNum: number
  pageSize: number
  total: number
}

interface DateRange {
  startDate: string
  endDate: string
  showStartDate: string
  showEndDate: string
}

const message = useMessage('redJoin')
const messageSucc = useMessage()
const tabActive = ref(1)
const countdown = ref<any>(null)
const countdown7 = ref<any>(null)
const redData = ref<any>({})
const imgBaseUrl = import.meta.env.VITE_IMG_URL
const layoutStore = useLayoutStore()
const statusBarHeight = computed(() => {
  let h = 600
  if ((tabActive.value === 2) || (tabActive.value === 1 && redData.value.join && (redData.value.status <= 5))) {
    h = 600 + 72
  }
  const num = uni.upx2px(h)
  return layoutStore.layoutStore.statusBarHeight + num
})
function handleClickLeft() {
  uni.navigateBack()
}
const balanceData = ref({
  kolServiceBalance: 0,
  agentBalance: 0,
})
const activeTab = ref(7)

const state = ref()
const loading = ref<boolean>(false)
const dataList = ref<any>([])
const pagination = ref<Pagination>({
  pageNum: 1,
  pageSize: 10,
  total: 0,
})
const dateRange = ref<DateRange>({
  showStartDate: '',
  showEndDate: '',
  startDate: '',
  endDate: '',
})
const itemList: any[] = [
  {
    id: 7,
    name: '近七天',
  },
  {
    id: 30,
    name: '近一个月',
  },
  {
    id: 90,
    name: '近三个月',
  },
  {
    id: 183,
    name: '近半年',
  },
]

function showTips() {
  message.alert({
    title: '专属奖励金',
    confirmButtonProps: {
      customClass: 'custom-shadow',
    },
  }).then(() => {
    console.log('点击了确定按钮')
  })
}

function showSuccTips() {
  messageSucc.alert({
    title: '领取成功',
    msg: '金额已发放至个人收益,可即刻提现',
    confirmButtonProps: {
      customClass: 'custom-shadow',
    },
  }).then(() => {
    console.log('点击了确定按钮')
  })
}

function getMyRedPacket(flag = false) {
  getRedPacket().then((res) => {
    if (res.code === 0) {
      redData.value = { ...res.data }
      const str = res.data.end_time.replace(/-/g, '\/')
      const times = new Date(str).getTime() - new Date().getTime()
      countdown.value = times > 0 ? times : null
      // 结束时间加上 7天 为结算时间
      const str7 = new Date(str)
      str7.setDate(str7.getDate() + redData.value.settleDays)
      countdown7.value = new Date(str7).getTime() - new Date().getTime()
      if (flag) {
        message.alert({
          title: '专属奖励金',
          confirmButtonProps: {
            customClass: 'custom-shadow',
          },
        }).then(() => {
          console.log('点击了确定按钮')
        })
      }
    }
  })
}

function onReceive() {
  claimRedPacket().then((res) => {
    if (res.code === 0) {
      getMyRedPacket(true)
    }
  })
}

function changeCalendar(value: any) {
  dateRange.value = {
    ...value,
    showStartDate: value.startDate.replace(/-/g, '.'),
    showEndDate: value.endDate.replace(/-/g, '.'),
  }
  pagination.value.pageNum = 1
  getDataList()
}

function tabChange() {
  const day = activeTab.value
  const dates = getNDaysRange(day)
  dateRange.value = {
    startDate: dates.start,
    endDate: dates.end,
    showStartDate: dates.start.replace(/-/g, '.'),
    showEndDate: dates.end.replace(/-/g, '.'),
  }
  pagination.value.pageNum = 1
  getDataList()
}

function typeClick() {
  dataList.value = []
  pagination.value.pageNum = 1
  getDataList()
}

function getDataList() {
  const params = {
    startTime: dateRange.value.startDate,
    endTime: dateRange.value.endDate,
    queryType: tabActive.value,
    pageNum: pagination.value.pageNum,
    pageSize: pagination.value.pageSize,
  }
  loading.value = true
  getWithdrawList(params).then((res) => {
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

function getBalance() {
  getWalletAccountsBalance().then((res) => {
    if (res.code === 0) {
      balanceData.value = res.data
    }
  })
}
onShow(() => {
  const dates = getNDaysRange(activeTab.value)
  dateRange.value = {
    startDate: dates.start,
    endDate: dates.end,
    showStartDate: dates.start.replace(/-/g, '.'),
    showEndDate: dates.end.replace(/-/g, '.'),
  }
  getDataList()
  getBalance()
  getMyRedPacket()
})
</script>

<template>
  <view class="page-top">
    <wd-navbar title="我的钱包" safe-area-inset-top left-arrow :bordered="false" @click-left="handleClickLeft" />
    <view class="wallet-top">
      <IncomeTab
        v-model="tabActive"
        :balance-data="balanceData" :red-data="redData"
        @show-succ-tips="showSuccTips" @type-click="typeClick" @on-receive="onReceive" @show-tips="showTips"
      />
    </view>
    <view class="jilulabel">
      提现记录
    </view>
    <CustomScrollTabs
      v-model:active-tab="activeTab"
      :item-list="itemList"
      bg="#f8f8f8"
      @tab-change="tabChange"
      @change-calendar="changeCalendar"
    />
  </view>
  <MyScrollView :top="`${(statusBarHeight || 0) - 1}px`" :state="state" @scrolltolower="scrolltolower" @loadmore="loadmore">
    <view class="records-box">
      <template v-if="dataList.length > 0">
        <RevenueRecords :date-range="dateRange" :datas-list="dataList" />
      </template>
      <wd-status-tip v-if="dataList.length < 1 && !loading" tip="暂无数据~">
        <template #image>
          <image style="width: 320rpx;height: 344rpx;margin-top: 60rpx;" :src="`${imgBaseUrl}/notData.png`" />
        </template>
      </wd-status-tip>
    </view>
  </MyScrollView>

  <!-- hongbao -->
  <wd-message-box selector="redJoin" custom-class="joinmsg">
    <view class="join-box">
      <view class="join-text">
        <view class="join-label">
          领取时间：
        </view>
        <view class="join-value">
          {{ redData.receive_time }}
        </view>
      </view>
      <view class="join-text">
        <view class="join-label">
          活动期限：
        </view>
        <view class="join-value">
          {{ redData.days }}天
        </view>
      </view>
      <view class="join-text">
        <view class="join-label">
          奖励金额：
        </view>
        <view class="join-value">
          {{ redData.bonusAmount }}元
        </view>
      </view>
      <view class="join-text">
        <view class="join-label">
          有效GMV：
        </view>
        <view class="join-value">
          {{ redData.gmv }}元(扣除退货退款)
        </view>
      </view>
      <view class="join-zhu">
        <view class="join-value">
          该奖励金与平台每单补贴不冲突
        </view>
        <view class="join-value">
          达标且活动结束{{ redData.settleDays }}天后可通过钱包直接提现
        </view>
      </view>

      <view v-if="countdown && redData.status === 2" class="down-box">
        <wd-count-down :time="countdown">
          <template #default="{ current }">
            <view class="time-box">
              <text class="text-time">
                {{ current.days >= 10 ? current.days : `0${current.days}` }}
              </text>
              天
              <text class="text-time">
                <text>
                  {{ current.hours >= 10 ? current.hours : `0${current.hours}` }}
                </text>
                :
                <text>
                  {{ current.minutes >= 10 ? current.minutes : `0${current.minutes}` }}
                </text>
                :
                <text>
                  {{ current.seconds >= 10 ? current.seconds : `0${current.seconds}` }}
                </text>
              </text>
              结束
            </view>
          </template>
        </wd-count-down>
      </view>

      <view v-if="countdown7 && redData.status === 3" class="down-box">
        <wd-count-down :time="countdown7">
          <template #default="{ current }">
            <view class="time-box">
              <text class="text-timesucc">
                {{ current.days >= 10 ? current.days : `0${current.days}` }}
              </text>
              天
              <text class="text-timesucc">
                <text>
                  {{ current.hours >= 10 ? current.hours : `0${current.hours}` }}
                </text>
                :
                <text>
                  {{ current.minutes >= 10 ? current.minutes : `0${current.minutes}` }}
                </text>
                :
                <text>
                  {{ current.seconds >= 10 ? current.seconds : `0${current.seconds}` }}
                </text>
              </text>
              后结算
            </view>
          </template>
        </wd-count-down>
      </view>
      <view v-if="redData.status === 4" class="down-box">
        <view class="time-box">
          活动结束
        </view>
      </view>
    </view>
  </wd-message-box>
</template>

<style scoped lang="scss">
.page-top{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
}
.wallet-top{
  padding: 32rpx 32rpx 48rpx 32rpx;
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
    color: #FF0057;
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
      color: #FF0057;
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
  background-color: #FF0057 !important;
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
  "name": "myWallet",
  "style": {
    "navigationBarTitleText": "我的钱包"
  }
}
</route>
