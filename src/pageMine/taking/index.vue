<script setup lang="ts">
import { useMessage, useToast } from 'wot-design-uni'
import TakingAmount from './component/TakingAmount.vue'
import { useLayoutStore } from '@/stores'
import { applyWithdraw, getLastApplyTime, getWalletAccountsBalance } from '@/api/wallet'

const toast = useToast()
const message = useMessage()
const layoutStore = useLayoutStore()
const statusBarHeight = computed(() => {
  return layoutStore.layoutStore.statusBarHeight
})
const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
const describeList = [
  '单人单月累计提现上限额度30000.00元',
  '每次提现，第三方支付平台将会收取7.5%的提现手续费。(该费用将根据输入金额的7.5%进行计算)',
  '企业提现或个人大额提现建议选择公对公转账',
  '为了避免频繁提现交易，平台限定七天提现一次',
  '如有疑问请及时联系客服',
]
const amount = ref<string>('')
const invoice = ref<string[]>([])
const bankData = ref<any>(null)
const countdown = ref<any>(null)
const channelType = ref<number>(1)
const balanceData = ref({
  kolServiceBalance: 0,
  agentBalance: 0,
})

function handleClickLeft() {
  uni.navigateBack()
}
function onConfirm() {
  if ((!amount.value) || amount.value === '0') {
    toast.error({
      position: 'middle',
      msg: '请输入提现金额',
    })
    return
  }
  if (!channelType.value) {
    toast.error({
      position: 'middle',
      msg: '请选择提现方式',
    })
    return
  }

  let text = ''
  if (channelType.value === 1) {
    if (!bankData.value) {
      toast.error({
        position: 'middle',
        msg: '请选择银行卡',
      })
      return
    }
    console.log(bankData.value)
    // 获取银行卡后四位
    const bankNumber = bankData.value.cardNumber
    const lastFourDigits = bankNumber.slice(-4)
    text = `是否提现至尾号${lastFourDigits}的银行卡？`
  }
  if (channelType.value === 2) {
    if (invoice.value.length < 1) {
      toast.error({
        position: 'middle',
        msg: '请选择填写发票信息',
      })
      return
    }
    if (userInfo.value.enAuth !== 2) {
      toast.error({
        position: 'middle',
        msg: '请先完成公司实名认证',
      })
      return
    }
    text = '确认提交公对公转账？'
  }

  message.confirm({
    msg: text,
    title: '提示',
    confirmButtonProps: {
      customClass: 'custom-taking-btn',
    },
    beforeConfirm: ({ resolve }) => {
      toast.loading({
        loadingType: 'ring',
        loadingColor: '#089D39',
        msg: '提交中...',
      })
      resolve(true)
    },
  }).then(() => {
    console.log('点击了确定按钮')
    // 把balanceType.value 的每个值相加

    const params: any = {
      amount: amount.value,
      channelType: channelType.value,
      balanceType: '3',
    }

    if (channelType.value === 1) {
      params.bankCardId = bankData.value.id
    }
    if (channelType.value === 2) {
      params.invoice = invoice.value.join(',')
    }
    applyWithdraw(params).then((res) => {
      if (res.code === 0) {
        console.log(res.code)
        toast.close()
        uni.navigateTo({
          url: '/pageMine/extractSuccess/index',
        })
      }
      else {
        toast.close()
      }
    }).catch(() => {
      toast.close()
    })
  }).catch(() => {
    console.log('点击了取消按钮')
  })
}
function getBalance() {
  getWalletAccountsBalance().then((res) => {
    if (res.code === 0) {
      balanceData.value = res.data
    }
  })
}
function finishTime() {
  countdown.value = null
}
function getAppleTime() {
  getLastApplyTime().then((res) => {
    if (res.code === 0) {
      if (res.data) {
        // 返回的时间加上7天
        const str = res.data.replace(/-/g, '\/')
        const date = new Date(str)
        date.setDate(date.getDate() + 7)
        const num = new Date(date).getTime() - new Date().getTime()
        if (num > 0) {
          countdown.value = num
        }
        else {
          countdown.value = null
        }
        return
      }
      countdown.value = null
    }
  })
}
onLoad(() => {
  getAppleTime()
  getBalance()
})
</script>

<template>
  <wd-navbar title="我的钱包" safe-area-inset-top left-arrow fixed :bordered="false" @click-left="handleClickLeft" />
  <view class="taking" :style="{ paddingTop: `${(statusBarHeight || 0) + 44}px` }">
    <view class="amount-box">
      <view class="amount-keti">
        可提现金额
      </view>
      <wd-text custom-class="custom-text" :text="balanceData.agentBalance" mode="price" />
    </view>
    <TakingAmount
      v-model:amount="amount" v-model:channel-type="channelType" v-model:bank-data="bankData"
      v-model:invoice="invoice" :max-amount="balanceData.agentBalance"
    />
    <view class="describe">
      <view v-for="(item, index) in describeList" :key="index" class="describe-item">
        <view>{{ index + 1 }}</view>
        <view>{{ item }}</view>
      </view>
    </view>
  </view>
  <view v-if="countdown" class="timebox">
    <view class="timebox-content">
      <text class="iconfont icon-time" />
      <wd-count-down :time="countdown" @finish="finishTime">
        <template #default="{ current }">
          <view class="time-label">
            <text class="time-label">距</text>
            <text class="text-time">
              {{ current.days >= 10 ? current.days : `0${current.days}` }}
            </text>
            <text class="time-text">天</text>
            <text class="time-text">
              <text>
                {{ current.hours >= 10 ? current.hours : `0${current.hours}` }}h
              </text>
              <text>
                {{ current.minutes >= 10 ? current.minutes : `0${current.minutes}` }}m
              </text>
              <text>
                {{ current.seconds >= 10 ? current.seconds : `0${current.seconds}` }}s
              </text>
            </text>
            <text class="time-label">可提现</text>
          </view>
        </template>
      </wd-count-down>
    </view>
  </view>
  <FootButton v-else label="确认" @confirm="onConfirm" />
</template>

<style scoped lang="scss">
.taking {
  padding-left: 32rpx;
  padding-right: 32rpx;
  .amount-box{
    padding: 64rpx 0;
    text-align: center;
    .amount-keti{
      font-weight: 400;
      font-size: 28rpx;
      color: rgba(102,102,102,0.85);
      line-height: 28rpx;
      margin-bottom: 24rpx;
    }
    :deep(){
      .custom-text{
        font-weight: 500;
        font-size: 96rpx;
        color: #111111;
        line-height: 96rpx;
      }
    }
  }
  .describe {
    padding: 32rpx;
    background-color: #fff;
    border-radius: 24rpx;
    margin-top: 24rpx;

    .describe-item {
      display: flex;
      // align-items: center;
      gap: 16rpx;
      margin-bottom: 16rpx;

      view:nth-child(1) {
        width: 40rpx;
        height: 40rpx;
        background: #F4F4F4;
        border-radius: 8rpx 4rpx 8rpx 4rpx;
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 24rpx;
        color: #666666;
        line-height: 40rpx;
        text-align: center;
        font-style: normal;
      }

      view:nth-child(2) {
        flex: 1;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #666666;
        line-height: 36rpx;
        font-style: normal;
      }
    }
  }
}

.timebox {
  padding-bottom: calc(12rpx + env(safe-area-inset-bottom));
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9;
  padding-top: 6rpx;
  padding-left: 32rpx;
  padding-right: 32rpx;

  .timebox-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 22rpx;
    height: 88rpx;
    background: rgba(8, 157, 57, 0.1);
    border-radius: 8rpx 32rpx 8rpx 32rpx;
  }

  .iconfont {
    font-size: 36rpx;
    color: #089D39;
  }

  .time-label {
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 32rpx;
    color: #089D39;
    line-height: 32rpx;
    font-style: normal;
  }

  .time-text {
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 32rpx;
    color: #089D39;
    line-height: 36rpx;
    font-style: normal;
  }
}
</style>

<style lang="scss">
.custom-taking-btn {
  background-color: #089D39 !important;
}
</style>

<route lang="json">
{
  "layout": "default",
  "name": "taking",
  "style": {
    "navigationBarTitleText": "我的钱包"
  }
}
</route>
