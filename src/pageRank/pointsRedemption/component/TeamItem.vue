<script setup lang="ts">
interface Props {
  item: any
  showRight?: boolean
  startTime?: string
  endTime?: string
}

const props = withDefaults(defineProps<Props>(), {
  showRight: true,
})

// 1：待付款，2：支付成功，3：支付失败，4：已发货，5：确认收货，7：待评价，8：退款中，9：退款完成
const statusMap: { [key: number]: string } = {
  1: '待支付',
  2: '待发货',
  3: '交易关闭',
  4: '待收货',
  5: '已收货',
  7: '待评价',
  8: '退款中',
  9: '退款完成',
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
  <view class="records-month">
    <view class="month-item">
      <view class="item-top">
        <view class="bianhao">
          订单编号{{ props.item.orderId }}
        </view>
        <view
          class="status" :class="{
            'status-ing': item.status === 1,
            'status-success': item.status === 2,
            'status-apply': item.status === 4,
            'status-refuse': item.status === 3,
            'status-queren': item.status === 5,
            'status-daipingjia': item.status === 7,
            'status-tuikuan': item.status === 8 || item.status === 9,
          }"
        >
          {{ statusMap[item.status] }}
        </view>
      </view>
      <view class="item-content">
        <image :src="props.item.productImg" />
        <view class="item-info">
          <view class="item-title">
            <wd-text :text="props.item.productName" :lines="2" />
          </view>
          <view class="info-foot">
            <view class="foot-left">
              <!-- <view class="yunfei">
                运费：10元
              </view> -->
              <view class="shuliang">
                x{{ props.item.itemNum }}
              </view>
            </view>
            <view class="foot-right">
              <DigitBold :value="props.item.totalPayAmount" int-size="48rpx" decimal-size="48rpx" prefix="-" color="#000000" />
              积分
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.records-month{
  background-color: #fff;
  border-radius: 16rpx;
  margin-bottom: 24rpx;
  .month-item{
    padding: 32rpx 28rpx;
    .item-top{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 32rpx;
      .bianhao{
        font-weight: 400;
        font-size: 24rpx;
        color: #666666;
        line-height: 24rpx;
      }
      .status{
        font-weight: 500;
        font-size: 24rpx;
        color: #666666;
        line-height: 24rpx;
      }
      .status-ing{
        color: #666666;
      }
      .status-success{
        color: #EF942B;
      }
      .status-refuse{
        color: #BABABA;
      }
      .status-apply{
        color: #5084F3;
      }
      .status-queren{
        color: #000000;
      }
      .status-tuikuan{
        color: #DA261D;
      }
    }
    .item-content{
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20rpx;
      image{
        width: 128rpx;
        height: 128rpx;
        border-radius: 16rpx;
      }
      .item-info{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 128rpx;
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
        }
        .info-foot{
          display: flex;
          align-items: center;
          justify-content: space-between;
          .foot-left{
            display: flex;
            align-items: center;
            gap: 16rpx;
          }
          .foot-right{
            display: flex;
            gap: 8rpx;
            font-weight: 400;
            font-size: 24rpx;
            color: #999999;
            line-height: 24rpx;
            align-items: baseline;
          }
          .yunfei{
            padding: 8rpx 20rpx;
            background: #F4F4F4;
            border-radius: 4rpx;
            font-weight: 400;
            font-size: 20rpx;
            color: #999999;
            line-height: 20rpx;
          }
          .shuliang{
            padding: 8rpx 20rpx;
            background: #F4F4F4;
            border-radius: 4rpx;
            font-weight: 400;
            font-size: 20rpx;
            color: #999999;
            line-height: 20rpx;
          }
        }
      }
    }
  }
}
</style>
