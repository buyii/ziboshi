<script setup lang="ts">
interface RecordItem {
  buyerAppId: string // 购买端appId(1128:抖音，2329:抖音极速版，1112: 火山，32: 西瓜， 13: 头条)
  nickName: string // 昵称
  authorShortId: string // 抖音号
  flowPoint: string // 订单状态(PAY_SUCC:支付完成 REFUND:退款 SETTLE:结算 CONFIRM: 确认收货)
  payTime: string // 支付时间
  settleTime: string // 结算时间
  kolFocServiceFee: number // 预估补贴费
  kolServiceFee: string // 补贴费
  avatar: string // 头像
  orderId: string // 订单号
  agentFee: string // 分红
}
interface Props {
  item: RecordItem
  isTeam?: boolean
}
defineOptions({
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared',
  },
})
const props = withDefaults(defineProps<Props>(), {
  isTeam: false,
})
</script>

<template>
  <view class="records-month">
    <view class="status" :class="{ 'status-success': props.item.flowPoint === 'PAY_SUCC', 'status-refuse': props.item.flowPoint === 'REFUND', 'status-apply': props.item.flowPoint === 'SETTLE', 'status-shouhuo': props.item.flowPoint === 'CONFIRM' }">
      <view class="status-left">
        <view />
      </view>
      <view class="status-right">
        <view />
      </view>
      <template v-if="props.item.flowPoint === 'PAY_SUCC'">
        已付款
      </template>
      <template v-else-if="props.item.flowPoint === 'REFUND'">
        退货退款
      </template>
      <template v-else-if="props.item.flowPoint === 'SETTLE'">
        已结算
      </template>
      <template v-else-if="props.item.flowPoint === 'CONFIRM'">
        已收货
      </template>
    </view>
    <view class="month-item">
      <view class="item-left">
        <image v-if="props.item.avatar" :src="props.item.avatar" />
        <image v-else src="../../../static/deftx.png" />
        <view class="item-info">
          <view v-if="!isTeam" class="item-title">
            <view>{{ props.item.nickName }}</view>
            <view>抖音ID： {{ props.item.authorShortId }}</view>
          </view>
          <view v-else class="item-title">
            <view>推广达人</view>
            <!-- <view>订单号·{{ props.item.orderId }}</view> -->
          </view>
        </view>
      </view>
      <view class="item-numbox">
        <view class="item-time">
          <view class="time-label">
            支付时间
          </view>
          <view class="time">
            {{ props.item.payTime }}
          </view>
        </view>
        <!-- v-if="props.item.flowPoint === 'SETTLE'" settleTime  -->
        <view v-if="props.item.flowPoint === 'SETTLE'" class="item-time">
          <view class="time-label">
            结算时间
          </view>
          <view class="time">
            {{ props.item.settleTime }}
          </view>
        </view>
        <view class="item-right">
          <template v-if="props.isTeam">
            <DigitBold v-if="props.item.flowPoint === 'REFUND' || (!props.item.flowPoint)" :value="0" int-size="32rpx" decimal-size="28rpx" color="#111111" />
            <DigitBold v-else :value="props.item.agentFee" prefix="+" int-size="32rpx" decimal-size="28rpx" color="#111111" />
          </template>
          <template v-else>
            <DigitBold v-if="props.item.flowPoint === 'REFUND' || (!props.item.flowPoint)" :value="0" int-size="32rpx" decimal-size="28rpx" color="#111111" />
            <DigitBold v-else :value="props.item.kolServiceFee" :prefix="props.item.flowPoint === 'REFUND' ? '' : '+'" int-size="32rpx" decimal-size="28rpx" color="#111111" />
          </template>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.records-month{
  background-color: #fff;
  position: relative;
  margin: 0 32rpx 12rpx 32rpx;
  border-radius: 16rpx;
  .status{
    position: absolute;
    top: 0;
    right: 0;
    width: 120rpx;
    height: 52rpx;
    line-height: 52rpx;
    text-align: center;
    background: rgba(14,99,255,0.1);
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 24rpx;
    color: #0E63FF;
    border-radius: 0 16rpx 0 16rpx;
    .status-left{
      position: absolute;
      width: 16rpx;
      height: 16rpx;
      top: 0;
      left: -16rpx;
      background-color: rgba(14,99,255,0.1);
      view{
        width: 16rpx;
        height: 16rpx;
        border-radius: 0 60rpx 0 0;
        background-color: #fff;
      }
    }
    .status-right{
      position: absolute;
      width: 16rpx;
      height: 16rpx;
      right: 0;
      bottom: -16rpx;
      background-color: rgba(14,99,255,0.1);
      view{
        width: 16rpx;
        height: 16rpx;
        border-radius: 0 60rpx 0 0;
        background-color: #fff;
      }
    }
  }
  .status-ing{
    color: #0E63FF;
    background: rgba(14,99,255,0.1);
    .status-left{
      background-color: rgba(14,99,255,0.1);
    }
    .status-right{
      background-color: rgba(14,99,255,0.1);
    }
  }
  .status-success{
    color: #8120E8;
    background: rgba(129, 32, 232, 0.1);
    .status-left{
      background-color: rgba(129, 32, 232,0.1);
    }
    .status-right{
      background-color: rgba(129, 32, 232,0.1);
    }
  }
  .status-refuse{
    color: #FF0057;
    background: rgba(255, 0, 87, 0.1);
    .status-left{
      background-color: rgba(255, 0, 87,0.1);
    }
    .status-right{
      background-color: rgba(255, 0, 87,0.1);
    }
  }
  .status-apply{
    color: #0D9C37;
    background: rgba(13, 156, 55, 0.1);
    .status-left{
      background-color: rgba(13, 156, 55,0.1);
    }
    .status-right{
      background-color: rgba(13, 156, 55,0.1);
    }
  }
  .status-shouhuo{
    background: rgba(0,167,166,0.05);
    color: #00A7A6;
    .status-left{
      background-color: rgba(0,167,166,0.05);
    }
    .status-right{
      background-color: rgba(0,167,166,0.05);
    }
  }
  .month-item{
    // display: flex;
    // align-items: center;
    // justify-content: space-between;
    padding: 32rpx;
    .item-left{
      display: flex;
      align-items: center;
      gap: 20rpx;
      image{
        width: 48rpx;
        height: 48rpx;
        border-radius: 72rpx;
      }
      .item-info{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .item-title{
          view:nth-child(1){
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 24rpx;
            color: #111111;
            line-height: 24rpx;
          }
          view:nth-child(2){
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 20rpx;
            color: #999999;
            line-height: 20rpx;
            margin-top: 14rpx;
          }
          view:nth-child(3){
            font-family: HelveticaNeue;
            font-size: 20rpx;
            color: #999999;
            line-height: 20rpx;
            margin-top: 14rpx;
          }
        }
      }
    }
    .item-numbox{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 68rpx;
      margin-top: 20rpx;
    }
    .item-time{
      .time{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 20rpx;
        color: #444444;
        line-height: 20rpx;
        font-style: normal;
      }
      .time-label{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 20rpx;
        color: #999999;
        line-height: 20rpx;
        font-style: normal;
        margin-bottom: 8rpx;
      }
    }
    .item-right{
      .item-right-label{
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 20rpx;
        color: #666666;
        line-height: 20rpx;
        text-align: right;
        margin-top: 8rpx;
      }
      .iconfont{
        font-size: 24rpx;
        color: #DADADA;
        margin-left: 16rpx;
      }
    }
  }
}
</style>
