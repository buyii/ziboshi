<script setup lang="ts">
interface Props {
  item: any

}
const props = withDefaults(defineProps<Props>(), {})

const statusMap: { [key: number]: string } = {
  1: '申请样品',
  2: '审核通过',
  3: '审核驳回',
  4: '已发货',
  5: '运输中',
  6: '已到货',
  7: '确认收货',
  8: '拒绝发货',
  9: '已关闭',
  10: '物流异常',
  11: '完成带货',
  12: '未完成带货',
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
  <view class="store-card">
    <view
      class="status"
      :class="{
        'status-ing': item.status === 1,
        'status-success': item.status === 2 || item.status === 4 || item.status === 5 || item.status === 10,
        'status-refuse': item.status === 3 || item.status === 8,
        'status-apply': item.status === 6 || item.status === 7 }"
    >
      <view class="status-left">
        <view />
      </view>
      <view class="status-right">
        <view />
      </view>
      {{ statusMap[item.status] }}
    </view>
    <view class="store-user">
      <image :src="props.item.avatar" mode="scaleToFill" />
      <view>{{ props.item.nickName }}</view>
    </view>
    <view class="store-box">
      <image :src="props.item.productImg" />
      <view class="store-right">
        <wd-text :text="props.item.productName" :lines="2" />
        <!-- <view class="store-title">
          {{ props.item.productName }}{{ props.item.productName }}
        </view> -->
        <view class="store-price">
          <view class="store-price-left">
            <view class="left-label">
              平台高佣
            </view>
            <view class="price-ratio">
              <view class="price">
                <text>{{ props.item.kolCosRatio }}</text>
                <text>%</text>
              </view>
              <text class="price-num">
                约赚 {{ props.item.kolCosFee }}
              </text>
            </view>
          </view>
          <view class="store-price-right">
            <view class="left-label">
              每单补
            </view>
            <view class="price-ratio">
              <view class="price">
                <text>{{ props.item.kolServiceFee }}</text>
              </view>
              <!-- <text class="price-num">
                约赚 {{ props.item.kolServiceFee }}
              </text> -->
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.store-card{
  background-color: #fff;
  border-radius: 16rpx;
  margin-bottom: 24rpx;
  padding: 32rpx 24rpx;
  position: relative;
}
.status{
  position: absolute;
  top: 0;
  right: 0;
  width: 120rpx;
  height: 52rpx;
  line-height: 52rpx;
  text-align: center;
  background: rgba(14,99,255,0.05);
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 28rpx;
  color: #0E63FF;
  font-style: normal;
  border-radius: 0 16rpx 0 10rpx;
  .status-left{
    position: absolute;
    width: 16rpx;
    height: 16rpx;
    top: 0;
    left: -16rpx;
    background-color: rgba(14,99,255,0.05);
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
    background-color: rgba(14,99,255,0.05);
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
    color: #089D39;
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
.store-user{
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-bottom: 30rpx;
  image{
    width: 40rpx;
    height: 40rpx;
    border-radius: 20rpx;
  }
  view{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 28rpx;
    color: #000000;
    line-height: 28rpx;
    font-style: normal;
  }
}
.store-box{
  display: flex;
  gap: 22rpx;
  image{
    width: 192rpx;
    height: 192rpx;
    border-radius: 16rpx;
  }
  .store-right{
    flex: 1;
    :deep(){
      .wd-text{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #111111;
        line-height: 40rpx;
        font-style: normal;
      }
    }
    .store-price{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 32rpx;
      gap: 30rpx;
      .store-price-left,.store-price-right{
        flex: 1;
        .left-label{
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 24rpx;
          color: #999999;
          line-height: 24rpx;
          text-align: left;
          font-style: normal;
        }
        .price-ratio{
          display: flex;
          align-items: center;
          gap: 8rpx;
          margin-top: 16rpx;
          .price{
            display: flex;
            align-items: flex-end;
            text:nth-child(1){
              font-family: PingFangSC, PingFang SC;
              font-weight: 600;
              font-size: 36rpx;
              color: #089D39;
              line-height: 36rpx;
              font-style: normal;
            }
            text:nth-child(2){
              font-family: PingFangSC, PingFang SC;
              font-weight: 600;
              font-size: 28rpx;
              color: #089D39;
              font-style: normal;
            }
          }
          .price-num{
            width: 112rpx;
            height: 32rpx;
            background: #F4F4F4;
            border-radius: 16rpx;
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 20rpx;
            color: #666666;
            line-height: 32rpx;
            text-align: center;
            font-style: normal;
          }
        }
      }
    }
  }
}
</style>
