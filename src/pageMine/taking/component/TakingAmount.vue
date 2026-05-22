<script setup lang="ts">
import { useToast } from 'wot-design-uni'

interface Props {
  maxAmount: any
}

const props = withDefaults(defineProps<Props>(), {})
const amount = defineModel<string>('amount', {
  required: true,
})
const channelType = defineModel<number | undefined>('channelType', {
  required: true,
})
const bankData = defineModel<any>('bankData', {
  required: true,
})
const invoice = defineModel<string[]>('invoice', {
  required: true,
})

const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)

const toast = useToast()

function onInput(value: any) {
  // 第一位不能是0和小数点
  let numvalue = value.value
  if (numvalue && (numvalue.startsWith('0') || numvalue.startsWith('.'))) {
    numvalue = ''
  }

  const num = Number(numvalue)
  if (num > props.maxAmount) {
    nextTick(() => {
      amount.value = props.maxAmount.toString()
    })
  }
  else {
    nextTick(() => {
      if (num <= 0) {
        amount.value = ''
      }
      else {
        if (numvalue && numvalue.includes('.')) {
          // 只能出现一个小数点
          let parts = numvalue.split('.')
          if (parts.length > 2) {
            parts = parts.slice(0, 2)
          }
          // 把字符串保留两位小数
          if (parts[1].length > 2) {
            amount.value = `${parts[0]}.${parts[1].slice(0, 2)}`
          }
          else {
            amount.value = `${parts[0]}.${parts[1]}`
          }
        }
        else {
          amount.value = numvalue
        }
      }
    })
  }
}

function allWithdrawal() {
  amount.value = props.maxAmount
}

function radioChange() {
  bankData.value = null
  invoice.value = []
}

function toSelect() {
  if (userInfo.value.inAuth !== 2) {
    toast.error({
      position: 'middle',
      msg: '请先完成个人实名认证',
    })
    return
  }
  if (channelType.value === 1) {
    uni.navigateTo({
      url: '/pageMine/bankCardManage/index?type=select',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        backEvent(data: any) {
          bankData.value = data
        },
      },
    })
  }
}
function toSelect1() {
  if (userInfo.value.enAuth !== 2) {
    toast.error({
      position: 'middle',
      msg: '请先完成公司实名认证',
    })
    return
  }
  if (channelType.value === 2) {
    uni.navigateTo({
      url: '/pageMine/myAccount/index',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        backEvent(data: any) {
          invoice.value = data
        },
      },
    })
  }
}
</script>

<script lang="ts">
export default {
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
</script>

<template>
  <view class="taking-amount">
    <view class="amount-label">
      提现金额
    </view>
    <view class="amount-input">
      <wd-input v-model="amount" size="large" :cursor-spacing="100" type="digit" placeholder="" @input="onInput">
        <template #suffix>
          <wd-button custom-class="amount-button" type="text" @click="allWithdrawal">
            全部
          </wd-button>
        </template>
      </wd-input>
    </view>
    <view>
      <wd-radio-group v-model="channelType" inline shape="dot" checked-color="#089D39" @change="radioChange">
        <view class="radio-item">
          <wd-radio :value="1">
            个人提现
          </wd-radio>
          <view class="select-box" @click="toSelect">
            <text v-if="bankData" class="select-txt acitvetxt">{{ bankData.bankName }}({{ bankData.cardNumber.slice(-4) }})</text>
            <text v-else class="select-txt">请选择银行卡</text>
            <text class="iconfont icon-into" />
          </view>
        </view>
        <view class="radio-item">
          <wd-radio :value="2">
            公对公转账
          </wd-radio>
          <view class="select-box" @click="toSelect1">
            <img v-if="invoice.length > 0" class="acitveimg" :src="invoice[0]" alt="">
            <text v-else class="select-txt">请上传电子凭证</text>
            <text class="iconfont icon-into" />
          </view>
        </view>
      </wd-radio-group>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.taking-amount{
  padding: 32rpx 32rpx 0 32rpx;
  background-color: #fff;
  border-radius: 24rpx;
  margin-top: 24rpx;
  .amount-label{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 28rpx;
    color: #111111;
    line-height: 28rpx;
    font-style: normal;
  }
  .amount-input{
    :deep(){
      .wd-input{
        padding: 34rpx 0 12rpx 0;
      }
      .wd-input::after{
        background-color: #EEEEEE !important;
      }
      .wd-input__inner{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 48rpx !important;
        color: #000000;
        line-height: 48rpx;
        font-style: normal;
      }
      .amount-button{
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 28rpx;
        color: #089D39;
        line-height: 28rpx;
        font-style: normal;
      }
    }
  }
  .radio-item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 28rpx 0;
    :deep(){
      .wd-radio__label{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx !important;
        color: #666666;
        font-style: normal;
        margin-left: 24rpx;
      }
    }
    .select-box{
      display: flex;
      align-items: center;
      .select-txt{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #AAAAAA;
        line-height: 24rpx;
        text-align: center;
        font-style: normal;
      }
      .acitvetxt{
        color: #111111;
      }
      .acitveimg{
        width: 64rpx;
        height: 64rpx;
        border-radius: 12rpx;
      }
      .iconfont{
        color: #DADADA;
        font-size: 24rpx;
        line-height: 1;
        margin-left: 6rpx;
      }
    }
  }
}
</style>
