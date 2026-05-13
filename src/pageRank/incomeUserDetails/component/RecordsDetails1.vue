<script setup lang="ts">
interface RecordItem {
  orderNumber: string // 订单流水号
  orderCount: string // 单量
  productId: string // 商品id
  productName: string // 商品名称
  productImg: string // 商品图片
  kolFocServiceFee: number // 预估推广补贴
  kolServiceFee: number // 补贴
  paySuccessTime: string // 支付成功时间
  flowPoint: string // 订单状态(PAY_SUCC:支付完成 REFUND:退款 SETTLE:结算 CONFIRM: 确认收货)
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
        <image :src="props.item.productImg" />
        <view class="item-info">
          <view class="item-title">
            <wd-text :text="props.item.productName" :lines="1" />
            <view class="item_id">
              商品ID·{{ props.item.productId }}
            </view>
            <view class="item_time">
              {{ props.item.paySuccessTime }}
            </view>
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
        border-radius: 16rpx;
      }
      .item-info{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .item-title{
          :deep(){
            .wd-text{
              font-family: PingFangSC, PingFang SC;
              font-weight: 400;
              font-size: 24rpx;
              color: #111111;
              line-height: 24rpx;
            }
          }
          .item_id{
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 20rpx;
            color: #999999;
            line-height: 20rpx;
            margin-top: 14rpx;
          }
          .item_time{
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
      :deep(){
        .wd-text{
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: 32rpx;
          color: #FF0057;
          line-height: 32rpx;
          text-align: center;
          font-style: normal;
        }
      }
      .prefix1{
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 32rpx;
        color: #FF0057;
        line-height: 32rpx;
        text-align: center;
        font-style: normal;
      }
      .suffix1{
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 24rpx;
        color: #FF0057;
        line-height: 24rpx;
        text-align: center;
        font-style: normal;
      }
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
