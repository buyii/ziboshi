<script setup lang="ts">
interface Props {
  item: any
}

const props = withDefaults(defineProps<Props>(), {})
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
      <view class="item-left">
        <image :src="props.item.productImg" />
        <view class="item-info">
          <view class="item-title">
            <wd-text :text="props.item.productName" :lines="1" />
            <view class="item_id">
              ID: {{ props.item.productId }}
            </view>
          </view>
          <view class="item-user">
            <image class="img" src="../../../static/logo.svg" />
            <view class="item-user-name">
              庄强
            </view>
          </view>
        </view>
      </view>
      <view class="item-right">
        <view>
          <wd-text text="538">
            <template #prefix>
              <text class="prefix1">+</text>
            </template>
            <template #suffix>
              <text class="suffix1">.99</text>
            </template>
          </wd-text>
          <view class="item-right-label">
            <view class="right-riqi">
              3-5
            </view>
            <view class="right-time">
              23:00
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24rpx 32rpx;
    .item-left{
      display: flex;
      align-items: center;
      gap: 20rpx;
      image{
        width: 144rpx;
        height: 144rpx;
        border-radius: 16rpx;
      }
      .item-info{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 130rpx;
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
        }
        .item-user{
          display: flex;
          align-items: center;
          gap: 16rpx;
          .img{
            width: 40rpx;
            height: 40rpx;
            border-radius: 20rpx;
          }
          .item-user-name{
            font-family: PingFangSC, PingFang SC;
            font-weight: 500;
            font-size: 24rpx;
            color: #000000;
            line-height: 24rpx;
            font-style: normal;
          }
        }
      }
    }
    .item-right{
      display: flex;
      align-items: center;
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
        display: flex;
        align-items: center;
        gap: 8rpx;
        justify-content: flex-end;
        margin-top: 16rpx;
        .right-riqi{
          font-family: HelveticaNeue;
          font-size: 20rpx;
          color: #999999;
          line-height: 20rpx;
          font-style: normal;
        }
        .right-time{
          font-family: HelveticaNeue;
          font-size: 20rpx;
          color: #666666;
          line-height: 20rpx;
          font-style: normal;
        }
      }
    }
  }
}
</style>
