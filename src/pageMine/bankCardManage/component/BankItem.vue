<script setup lang="ts">
import { useMessage, useToast } from 'wot-design-uni'
import { delBankCard } from '@/api/bank'

interface Props {
  item: any
  type: string
}

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits(['onDelSuccess', 'onBack'])
const message = useMessage()
const toast = useToast()

function onEdit() {
  const data = {
    id: props.item.id,
    cardHolder: props.item.cardHolder,
    cardNumber: props.item.cardNumber,
    bank: props.item.bank,
    branch: props.item.branch,
    identityCard: props.item.identityCard,
    phone: props.item.phone,
  }
  uni.navigateTo({
    url: `/pageMine/addBankCard/index?data=${JSON.stringify(data)}`,
  })
}

function onDel() {
  message.confirm({
    title: '删除银行卡',
    msg: '确定要删除该银行卡吗？',
    confirmButtonProps: {
      customClass: 'custom-shadow',
    },
    beforeConfirm: ({ resolve }) => {
      toast.loading({
        loadingType: 'ring',
        loadingColor: '#FF0057',
        msg: '删除中...',
      })
      resolve(true)
    },
  }).then(() => {
    delBankCard({ id: props.item.id }).then((res) => {
      toast.close()
      if (res.code === 0) {
        toast.success(res.msg)
        emit('onDelSuccess')
      }
    }).catch(() => {
      toast.close()
    })
  })
}
function onSelect() {
  if (props.type === 'select') {
    emit('onBack', props.item)
  }
}
// 银行卡号qian
const lastBankNumber = computed(() => {
  const num = props.item?.cardNumber || ''
  return num.slice(0, 4)
})
// 脱敏银行卡号
const maskedBankNumber = computed(() => {
  const num = props.item?.cardNumber || ''
  return num.slice(-4)
})
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
  <view class="myaction">
    <wd-swipe-action :disabled="type === 'select'">
      <view class="bank-box" @click="onSelect">
        <view class="bank-info">
          <img class="bank-icon" src="../../../static/svg/bankIcon.svg">
          <view>
            <view class="bank-name">
              {{ props.item?.bankName }}
            </view>
            <view class="bank-label">
              储蓄卡
            </view>
          </view>
        </view>
        <view class="bank-number">
          <text class="num">{{ lastBankNumber }}</text>
          <text class="dian">●●●●</text>
          <text class="dian">●●●●</text>
          <text class="num">{{ maskedBankNumber }}</text>
        </view>
      </view>
      <template #right>
        <view class="action-box">
          <view class="action1" @click="onEdit">
            <text class="iconfont icon-editSlide" />
            <view>编辑</view>
          </view>
          <view class="action" @click="onDel">
            <text class="iconfont icon-deletedSlide" />
            <view>删除</view>
          </view>
        </view>
      </template>
    </wd-swipe-action>
  </view>
  <wd-message-box />
  <wd-toast />
</template>

<style lang="scss">
.custom-taking-btn{
  background-color: #FF0057 !important;
}
</style>

<style scoped lang="scss">
.myaction{
  margin-top: 32rpx;
  clip-path: inset(0 round 32rpx); // 强制裁剪为圆角
  overflow: hidden;
  background-color: #41C06E;
}
.bank-box{
  height: 270rpx;
  background: #2F856D;
  border-radius: 32rpx;
  .bank-info{
    display: flex;
    align-items: center;
    gap: 24rpx;
    padding: 48rpx 0 0 48rpx;
    .bank-icon{
      width: 72rpx;
      height: 72rpx;
    }
    .bank-name{
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 32rpx;
      color: rgba(255,255,255,0.85);
      line-height: 32rpx;
      font-style: normal;
    }
    .bank-label{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 24rpx;
      color: rgba(255,255,255,0.65);
      line-height: 24rpx;
      font-style: normal;
      margin-top: 16rpx;
    }
  }
  .bank-number{
    padding: 62rpx 0 0 48rpx;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    font-style: normal;
    display: flex;
    align-items: center;
    gap: 20rpx;
    .dian{
      font-size: 26rpx;
      line-height: 1;
      letter-spacing: 4rpx;
    }
    .num{
      font-size: 40rpx;
      line-height: 40rpx;
    }
  }
}
.action-box{
  height: 100%;
  display: flex;
}
.action1{
  height: 100%;
  width: 128rpx;
  background: #41C06E;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  text{
    font-size: 32rpx;
    color: #FFFFFF;
  }
  view{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 20rpx;
    color: rgba(255,255,255,0.85);
    line-height: 20rpx;
  }
}
.action{
  height: 100%;
  width: 128rpx;
  background: #FF0057;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  text{
    font-size: 32rpx;
    color: #FFFFFF;
  }
  view{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 20rpx;
    color: rgba(255,255,255,0.85);
    line-height: 20rpx;
  }
}
</style>

<style lang="scss">
.custom-shadow{
  background-color: #FF0057 !important;
}
.delmsg{
  .myPlaceholder{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 32rpx;
    color: rgba(0,0,0,0.25);
    line-height: 32rpx;
    font-style: normal;
  }
  .wd-input{
    background: #FFFFFF;
    border-radius: 16rpx;
    border: 1rpx solid #E8E8E8;
    padding-left: 24rpx;
    padding-right: 24rpx;
    line-height: 96rpx;
    &::after{
      display: none !important;
    }
    .myInput{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 32rpx;
      color: 111111;
      line-height: 96rpx;
      font-style: normal;
      width: 460rpx;
      height: 96rpx;

    }
  }
  .suffixtext{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 28rpx;
    color: #FF0057;
    line-height: 28rpx;
    text-align: center;
    font-style: normal;
  }
}
</style>
