<script setup lang="ts">
defineOptions({
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const props = withDefaults(defineProps<Props>(), {})

interface Props {
  datasList: any[]
}

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

<template>
  <view class="records-wrap">
    <view v-for="item in props.datasList" :key="item.id" class="revenue-item">
      <view class="item-top">
        <view class="bianhao">
          订单编号{{ item.orderId }}
        </view>
        <view class="revenue-num">
          <view>+{{ item.kolFocServiceFee }}</view>
        </view>
      </view>
      <view class="item-user">
        <view class="user-box">
          <img class="user-img" :src="item.avatar" alt="">
          <view class="user-name">
            {{ item.userName }}
          </view>
        </view>
        <view
          v-if="item.status === 2" class="daishou"
          :class="{
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
        <img class="item-img" :src="item.productImg" alt="">
        <view class="item-desc">
          <view class="item-name">
            <wd-text :text="item.productName" color="#000000" :lines="2" size="28rpx" />
          </view>
          <view class="item-time">
            <text class="iconfont icon-time icon" />
            {{ item.paySuccessTime }}
          </view>
        </view>
        <view class="item-num">
          <view class="num">
            {{ item.itemNum }}
          </view>
          <view class="unt">
            数量
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.records-wrap{
  .revenue-item{
    background: #FFFFFF;
    border-radius: 16rpx;
    padding: 32rpx 28rpx;
    margin-bottom: 16rpx;
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
      .revenue-num{
        text-align: right;
        font-weight: 500;
        font-size: 32rpx;
        color: #FF0057;
        line-height: 32rpx;
      }
    }
    .item-user{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 20rpx 0;
      .user-box{
        display: flex;
        align-items: center;
        gap: 8rpx;
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
      .daishou{
        text-align: right;
        font-weight: 400;
        font-size: 24rpx;
        color: #AAAAAA;
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
    .item-content{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .item-img{
        width: 128rpx;
        height: 128rpx;
        border-radius: 8rpx;
      }
      .item-desc{
        height: 128rpx;
        margin-left: 22rpx;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .item-name{
          font-size: 28rpx;
          color: #111111;
          line-height: 36rpx;
        }
        .item-time{
          display: flex;
          align-items: center;
          gap: 8rpx;
          font-weight: 400;
          font-size: 24rpx;
          color: #999999;
          line-height: 24rpx;
          .icon{
            font-weight: 400;
            font-size: 24rpx;
            color: #999999;
            line-height: 24rpx;
          }
        }
      }
      .item-num{
        text-align: center;
        .num{
          font-weight: 500;
          font-size: 36rpx;
          color: #222222;
          line-height: 36rpx;
          margin-bottom: 8rpx;
        }
        .unt{
          font-weight: 400;
          font-size: 24rpx;
          color: #BABABA;
          line-height: 20rpx;
        }
      }
    }
  }
}
</style>
