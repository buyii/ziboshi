<script setup lang="ts">
interface RecordItem {
  buyerAppId: string // 购买端appId(1128:抖音，2329:抖音极速版，1112: 火山，32: 西瓜， 13: 头条)
  nickName: string // 昵称
  authorShortId: string // 抖音号
  flowPoint: string // 订单状态(PAY_SUCC:支付完成 REFUND:退款 SETTLE:结算 CONFIRM: 确认收货)
  payTime: string // 支付时间
  kolFocServiceFee: number // 预估补贴费
  kolServiceFee: string // 补贴费
  avatar: string // 头像
}
interface Props {
  item: RecordItem
}
defineOptions({
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared',
  },
})
const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
  <view class="records-month">
    <view class="month-item">
      <view class="item-left">
        <image v-if="props.item.avatar" :src="props.item.avatar" />
        <image v-else src="../../../static/deftx.png" />
        <view class="item-info">
          <view class="item-title">
            <view>{{ props.item.nickName }}</view>
            <view>抖音ID·{{ props.item.authorShortId }}</view>
            <view>2025-3-24 10:00</view>
          </view>
        </view>
      </view>
      <view class="item-right">
        <view>
          <DigitBold v-if="props.item.flowPoint === 'SETTLE'" :value="props.item.kolFocServiceFee" prefix="+" int-size="32rpx" decimal-size="28rpx" color="#FF0057" />
          <DigitBold v-else :value="props.item.kolServiceFee" prefix="+" int-size="32rpx" decimal-size="28rpx" color="#999999" />
          <view v-if="props.item.flowPoint === 'PAY_SUCC'" class="item-right-label">
            已付款
          </view>
          <view v-else-if="props.item.flowPoint === 'REFUND'" class="item-right-label">
            退货退款
          </view>
          <view v-else-if="props.item.flowPoint === 'SETTLE'" class="item-right-label">
            已结算
          </view>
          <view v-else-if="props.item.flowPoint === 'CONFIRM'" class="item-right-label">
            已收货
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.records-month{
  background-color: #fff;
  .month-item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 32rpx;
    .item-left{
      display: flex;
      align-items: center;
      gap: 20rpx;
      image{
        width: 88rpx;
        height: 88rpx;
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
