<script setup lang="ts">
interface Props {
  item: any
  showRight?: boolean
  userId?: string
  startTime?: string
  endTime?: string
}

const props = withDefaults(defineProps<Props>(), {
  showRight: true,
  userId: '',
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
      <view class="user-box">
        <img class="user-img" :src="item.avatar" alt="">
        <view class="user-name">
          {{ item.userName }}
        </view>
      </view>
      <view class="item-content">
        <image :src="props.item.productImg" />
        <view class="item-info">
          <view class="item-title">
            <wd-text :text="props.item.productName" :lines="2" />
          </view>
          <view class="info-foot">
            <view class="info-time">
              <text class="iconfont icon-time icon" />
              <text>{{ props.item.paySuccessTime }}</text>
            </view>
            <view class="info-num">
              下单数量
              <text class="num">{{ props.item.itemNum }}</text>
            </view>
          </view>
        </view>
        <view class="shouyi">
          <view>
            <DigitBold :value="props.item.focAgentFee" int-size="32rpx" decimal-size="32rpx" prefix="+" color="#999999" />
          </view>
          <view class="jiesuan">
            未结算
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
        color: #DA261D;
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
        color: #666666;
      }
    }
    .user-box{
      display: flex;
      align-items: center;
      gap: 8rpx;
      margin: 20rpx 0;
    }
    .user-img{
      width: 32rpx;
      height: 32rpx;
      border-radius: 56rpx;
      border: 2rpx solid #FFFFFF;
    }
    .user-name{
      font-weight: 400;
      font-size: 24rpx;
      color: #111111;
      line-height: 24rpx;
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
          gap: 32rpx;
          .info-time{
            display: flex;
            align-items: center;
            gap: 8rpx;
            font-weight: 400;
            font-size: 24rpx;
            color: #999999;
            line-height: 24rpx;
            .icon{
              font-size: 24rpx;
              color: #999999;
            }
          }
          .info-num{
            display: flex;
            align-items: center;
            gap: 8rpx;
            font-weight: 400;
            font-size: 24rpx;
            color: #999999;
            line-height: 24rpx;
            .num{
              font-weight: 500;
              font-size: 24rpx;
              color: #222222;
              line-height: 24rpx;
            }
          }
        }
      }
      .shouyi{
        text-align: right;
        .jiesuan{
          font-weight: 400;
          font-size: 24rpx;
          color: #BABABA;
          line-height: 24rpx;
          margin-top: 8rpx;
        }
      }
    }
  }
}
</style>
