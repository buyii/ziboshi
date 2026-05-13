<script setup lang="ts">
interface Props {
  balanceData: any
  redData: any
}
const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits(['typeClick', 'onReceive', 'showTips', 'showSuccTips'])
const active = defineModel<number>()
const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
function tabClick(num: number) {
  if (userInfo.value.userType !== '03') {
    return
  }
  active.value = num
  emit('typeClick')
}

function onReceive() {
  emit('onReceive')
}

function showTips() {
  emit('showTips')
}

function showSuccTips() {
  emit('showSuccTips')
}

const amount = computed(() => {
  if (active.value === 1) {
    return props.balanceData?.kolServiceBalance || '0.00'
  }
  return props.balanceData?.agentBalance || '0.00'
})
const amount1 = computed(() => {
  if (active.value === 1) {
    return props.balanceData?.kolFocServiceFee || '0.00'
  }
  return props.balanceData?.focAgentFee || '0.00'
})
function toTaking() {
  uni.navigateTo({
    url: `/pageMine/taking/index?active=${active.value}`,
  })
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
  <view class="incomebox">
    <image v-show="active === 1" src="../../../static/svg/walletbg.svg" />
    <image v-show="active === 2" src="../../../static/svg/walletbg1.svg" />
    <view class="income-tab-bg" />
    <view class="income-content">
      <view class="income-tab">
        <view :class="{ active: active === 1 }" @click="tabClick(1)">
          个人收益
        </view>
        <view :class="{ 'active': active === 2, 'disabled-mtab': userInfo.userType !== '03' }" @click="tabClick(2)">
          团队收益
        </view>
      </view>
      <view class="income-item">
        <view class="income-item-left">
          <wd-text :text="amount">
            <template #prefix>
              <text class="price-prefix">¥</text>
            </template>
          </wd-text>
          <view class="left-label">
            可提现
          </view>
        </view>
        <view class="income-item-right">
          <wd-button :disabled="amount <= 0" @click="toTaking">
            <text>立即提现</text>
            <text class="iconfont icon-into" />
          </wd-button>
        </view>
      </view>
      <view class="daijiesuan">
        <wd-text :text="amount1">
          <template #prefix>
            <text class="price-prefix">待结算金额</text>
          </template>
        </wd-text>
      </view>
    </view>
  </view>
  <view v-if="active === 2" class="tips">
    <text class="iconfont icon-notice" />
    <text>团队收益按团队总成员收益的10%计算</text>
  </view>
  <view v-if="active === 1 && redData.join && (redData.status <= 5)" class="activity">
    <view v-if="redData.status === 1" class="hongbao-box">
      <view class="activity-amount">
        专属补贴：<text class="isamount">{{ redData.bonusAmount }}</text>
      </view>
      <view class="activity-progress" @click="onReceive">
        <wd-button size="small">
          点击领取
        </wd-button>
      </view>
    </view>
    <view v-else class="activity-box" :class="{ pbtm: redData.status === 5 }" @click="showTips">
      <view class="activity-amount">
        奖励金：<text class="isamount">{{ redData.bonusAmount }}</text>
        <wd-icon name="help-circle-filled" custom-class="help-icon" />
      </view>
      <view v-if="redData.status === 5" class="activity-progress progress-succ">
        <view class="progress-label">
          任务完成：
        </view>
        <view style="display: flex;align-items: center;" @click.stop="showSuccTips">
          <wd-button size="small">
            领取奖励
          </wd-button>
        </view>
      </view>
      <view v-else class="activity-progress">
        <view class="progress-label">
          完成进度：
        </view>
        <wd-progress :percentage="redData.ratio * 100" color="#ff0056" />
      </view>
    </view>
  </view>
  <!-- <view v-if="active === 1 && redData.join && redData.status === 1" class="hongbao" @click="onReceive">
    <wd-button>
      点 击 领 取
    </wd-button>
  </view> -->
</template>

<style lang="scss" scoped>
.incomebox{
  height: 288rpx;
  position: relative;
  padding-top: 4rpx;
  image{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 9;
  }
  .income-tab-bg{
    height: 112rpx;
    background: #FE2457;
    box-shadow: inset 0rpx 1rpx 0rpx 0rpx rgba(255,255,255,0.8);
    border-radius: 16rpx 16rpx 0rpx 0rpx;
    margin: 0 2rpx;
    opacity: 0.25;
  }
  .income-content{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
  }
  .income-tab{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 112rpx;
    background-color: transparent;
    view{
      flex: 1;
      text-align: center;
      height: 112rpx;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 30rpx;
      color: #111111;
      line-height: 112rpx;
    }
    .active{
      font-weight: 600;
      font-size: 32rpx;
      color: #111111;
      line-height: 112rpx;
    }
    .disabled-mtab{
      color: rgba(155, 38, 64, 0.25);
    }
  }
  .income-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx 48rpx 16rpx 48rpx;
    .income-item-left{
      :deep(){
        .wd-text{
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: 44rpx;
          color: #333333;
          line-height: 44rpx;
        }
      }
      .price-prefix{
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 32rpx;
        color: #333333;
        line-height: 32rpx;
      }
      .left-label{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #999999;
        line-height: 28rpx;
        margin-top: 14rpx;
      }
    }
    .income-item-right{
      :deep(){
        .wd-button{
          width: 176rpx;
          height: 64rpx;
          background: rgba(254, 36, 87, 0.1);
          border-radius: 32rpx;
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: 24rpx;
          color: #FF2457;
          line-height: 24rpx;
          min-width: auto;
        }
      }
      .iconfont{
        font-size: 24rpx;
        color: rgba(255,36,87,0.45);
        margin-left: 8rpx;
      }
    }
  }
  .daijiesuan{
    padding-left: 48rpx;
    :deep(){
      .wd-text{
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 26rpx;
        color: #999999;
        line-height: 26rpx;
      }
    }
    .price-prefix{
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 24rpx;
      color: #999999;
      line-height: 24rpx;
      margin-right: 10rpx;
    }
  }
}
.tips{
  margin-top: -80rpx;
  margin-right: 2rpx;
  height: 128rpx;
  background: rgba(254, 36, 87, 0.25);
  box-shadow: inset 0rpx 1rpx 0rpx 0rpx rgba(255,255,255,0.8);
  border-radius: 0rpx 0rpx 16rpx 16rpx;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 22rpx;
  padding-bottom: 24rpx;
  text{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 24rpx;
    color: #7C172E;
    line-height: 24rpx;
    font-style: normal;
  }
  text:nth-child(1){
    color: #B14B62;
  }
}
.activity{
  margin-top: -80rpx;
  margin-right: 2rpx;
  height: 150rpx;
  background: rgba(254, 36, 87, 0.25);
  box-shadow: inset 0rpx 1rpx 0rpx 0rpx rgba(255,255,255,0.8);
  border-radius: 0rpx 0rpx 16rpx 16rpx;
  display: flex;
  align-items: flex-end;
  padding-left: 48rpx;
  padding-right: 16rpx;
  .activity-box{
    flex: 1;
    padding-bottom: 14rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 42rpx;
    .activity-amount{
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 30rpx;
      color: #7C172E;
      line-height: 32rpx;
      .isamount{
        font-size: 32rpx;
        color: #FF2457;
      }
      :deep(){
        .help-icon{
          margin-left: 10rpx;
          font-size: 32rpx;
          color: #FF2457;
        }
      }
    }
    .activity-progress{
      display: flex;
      align-items: center;
      gap: 6rpx;
      width: 280rpx;
      .progress-label{
        font-size: 24rpx;
      }
      :deep(){
        .wd-progress{
          flex: 1;
        }
        .wd-button{
          background-color: #FF0056 !important;
          color: #fff !important;
          font-size: 28rpx !important;
          line-height: 32rpx !important;
          font-family: PingFangSC, PingFang SC !important;
          font-weight: 500 !important;
        }
      }
    }
    .progress-succ{
      width: 300rpx;
      .progress-label{
        font-size: 28rpx;
      }
    }
  }
  .pbtm{
    padding-bottom: 10rpx;
  }
  .hongbao-box{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 42rpx;
    padding-right: 40rpx;
    padding-bottom: 10rpx;
    .activity-amount{
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 30rpx;
      color: #7C172E;
      line-height: 32rpx;
      .isamount{
        font-size: 32rpx;
        color: #FF2457;
      }
    }
    .activity-progress{
      display: flex;
      align-items: center;
      :deep(){
        .wd-button{
          background-color: #FF0056 !important;
          color: #fff !important;
          font-size: 28rpx !important;
          line-height: 32rpx !important;
          font-family: PingFangSC, PingFang SC !important;
          font-weight: 500 !important;
        }
      }
    }
  }
}
.hongbao{
  margin-top: -80rpx;
  margin-right: 2rpx;
  height: 148rpx;
  padding-top: 10rpx;
  // background: rgba(254, 36, 87, 0.25);
  // box-shadow: inset 0rpx 1rpx 0rpx 0rpx rgba(255,255,255,0.8);
  border-radius: 0rpx 0rpx 16rpx 16rpx;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-left: 48rpx;
  padding-right: 48rpx;
  padding-bottom: 2rpx;
  :deep(){
    .wd-button{
      width: 200rpx !important;
      min-width: auto !important;
      height: 60rpx !important;
      background-color: #FF0056 !important;
      color: #fff !important;
      font-size: 30rpx !important;
      font-family: PingFangSC, PingFang SC !important;
      font-weight: 400 !important;
    }
  }
}
</style>
