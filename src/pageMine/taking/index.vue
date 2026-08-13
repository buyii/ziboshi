<script setup lang="ts">
import { useMessage, useToast } from 'wot-design-uni'
import TakingAmount from './component/TakingAmount.vue'
import { useLayoutStore } from '@/stores'
import { applyWithdraw, getWalletAccountsBalance, onSign } from '@/api/wallet'

const toast = useToast()
const message = useMessage()
const layoutStore = useLayoutStore()
const statusBarHeight = computed(() => {
  return layoutStore.layoutStore.statusBarHeight
})
const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
const bankData = computed(() => userStore.selectBank)
const describeList = [
  '单人单月累计提现上限额度30000.00元，单次最小提现金额为100元',
  '每次提现，第三方支付平台将会收取7.5%的提现手续费。(该费用将根据输入金额的7.5%进行计算)',
  '企业提现或个人大额提现建议选择公对公转账',
  '个人提现部分，平台需代扣个人所得税，缴税标准参照国家税务总局2025第16号文件执行。',
  '如有疑问请及时联系客服',
]
const amount = ref<string>('')
const invoice = ref<string[]>([])
const channelType = ref<number>(1)
const balanceData = ref({
  kolServiceBalance: 0,
  agentBalance: 0,
})

function handleClickLeft() {
  uni.navigateBack()
}
function onConfirm() {
  // return
  if ((!amount.value) || amount.value === '0') {
    toast.error({
      position: 'middle',
      msg: '请输入提现金额',
    })
    return
  }
  if (Number(amount.value) < 100) {
    toast.error({
      position: 'middle',
      msg: '最小提现金额为100',
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

    if (channelType.value === 1) {
      aaa()
      return
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

function bbb(params: any) {
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
}
function aaa() {
  const params: any = {
    amount: amount.value,
    channelType: channelType.value,
    bankCardId: bankData.value.id,
    balanceType: '3',
  }
  onSign(params).then((res) => {
    if (res.code === 0) {
      if (res.data.need) {
        toast.close()
        uni.navigateTo({
          url: `/pageMine/takingVerification/index?faceSignUrl=${res.data.faceSignUrl}`,
        })
      }
      else {
        bbb(params)
      }
    }
  }).catch(() => {
    toast.close()
  })
}
function getBalance() {
  getWalletAccountsBalance().then((res) => {
    if (res.code === 0) {
      balanceData.value = res.data
    }
  })
}
function showImg() {
  uni.previewImage({
    current: 0,
    urls: ['https://imgs.xingyongbao.cn/sys/mini/077055c50b1a1429d5ce39843df76983.jpg', 'https://imgs.xingyongbao.cn/sys/mini/be4bd297f84ebaef2f0804f03430432a.jpg'],
  })
}
function xieyi() {
  wx.downloadFile({
    url: 'https://imgs.xingyongbao.cn/sys/mini/protocol.pdf',
    success(res) {
      const filePath = res.tempFilePath
      wx.openDocument({
        filePath,
        success() {
          console.log('打开文档成功')
        },
      })
    },
  })
}

onLoad(() => {
  getBalance()
})
</script>

<template>
  <wd-navbar title="提现" safe-area-inset-top left-arrow fixed :bordered="false" @click-left="handleClickLeft" />
  <view class="taking" :style="{ paddingTop: `${(statusBarHeight || 0) + 44}px` }">
    <view class="amount-box">
      <view class="amount-keti">
        可提现金额
      </view>
      <wd-text custom-class="custom-text" :text="balanceData.agentBalance" />
    </view>
    <TakingAmount
      v-model:amount="amount" v-model:channel-type="channelType"
      v-model:invoice="invoice" :max-amount="balanceData.agentBalance"
    />
    <view class="describe">
      <view v-for="(item, index) in describeList" :key="index" class="describe-item">
        <view>{{ index + 1 }}</view>
        <view>{{ item }}</view>
      </view>
      <view class="btn-box">
        <wd-button type="text" @click="showImg">
          缴税规则
        </wd-button>
        <wd-button type="text" @click="xieyi">
          签约协议
        </wd-button>
      </view>
    </view>
  </view>
  <FootButton label="确认" @confirm="onConfirm" />
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
.btn-box{
  display: flex;
  gap: 30rpx;
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
    "navigationBarTitleText": "提现"
  }
}
</route>
