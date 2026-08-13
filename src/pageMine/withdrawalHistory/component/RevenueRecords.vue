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
  dateRange: any
  datasList: any[]
}

function maskedBankNumber(cnum: any) {
  const num = cnum || ''
  return num.slice(-4)
}
</script>

<template>
  <view class="records-wrap">
    <view class="records-time">
      <view class="top-sticky">
        <view class="month">
          {{ props.dateRange.showStartDate }}
        </view>
        <text class="iconfont icon-rotate" />
        <view class="month">
          {{ props.dateRange.showEndDate }}
        </view>
      </view>
    </view>
    <view class="item-box">
      <view v-for="item in props.datasList" :key="item.id" class="month-item">
        <view class="item-left">
          <view>{{ item.applyTime }}</view>
          <view>{{ item.applyDay }}</view>
        </view>
        <view class="line" />
        <view class="item-right">
          <view class="right1">
            <view class="tight-text">
              <view>提现至</view>
              <view>
                <text>{{ item.bankName }}</text>
                <text>●●●●</text>
                <text> {{ maskedBankNumber(item.cardNumber) }}</text>
              </view>
            </view>
            <view class="right-amount">
              <DigitBold v-if="item.status === '1' || item.status === '3' || item.status === '5'" :value="item.amount" int-size="32rpx" decimal-size="24rpx" color="#444444" />
              <DigitBold v-if="item.status === '2' || item.status === '4'" :value="item.amount" int-size="32rpx" decimal-size="24rpx" color="#FF0057" />
              <view v-if="item.status === '1'" class="status">
                申请中
              </view>
              <view v-if="item.status === '2'" class="status">
                审核通过
              </view>
              <view v-if="item.status === '3'" class="status">
                审核驳回
              </view>
              <view v-if="item.status === '4'" class="status">
                交易成功
              </view>
              <view v-if="item.status === '5'" class="status">
                交易失败
              </view>
            </view>
          </view>
          <view class="remarks">
            <view class="mark-item">
              <view class="mark-label">
                个人所得税：
              </view>
              <view class="mark-num">
                {{ item.taxIndividualAmount }}
              </view>
            </view>
            <view class="mark-item">
              <view class="mark-label">
                手续费：
              </view>
              <view class="mark-num">
                {{ item.paymentFee }}
              </view>
            </view>
            <view class="mark-item">
              <view class="mark-label">
                到账金额：
              </view>
              <view class="mark-num">
                {{ item.paymentAmount }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.records-wrap{
  .records-time{
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: #f8f8f8;
    margin-bottom: 4rpx;
    .top-sticky{
      padding: 0 0 24rpx 0;
      position: sticky;
      top: 0;
      background-color: #f8f8f8;
      z-index: 1; /* 确保层级足够高 */
      display: flex;
      align-items: center;
    }
    .icon-rotate{
      color: #444444;
      font-size: 16rpx;
      margin: 0 16rpx;
    }
    .month{
      display: flex;
      justify-content: space-between;
      color: #444444;
      font-size: 28rpx;
    }
  }
  .item-box{
    border-radius: 16rpx;
    overflow: hidden;
  }
  .month-item{
    display: flex;
    align-items: center;
    // min-height: 144rpx;
    // padding: 38rpx 32rpx;
    background-color: #ffffff;
    margin-bottom: 8rpx;
    .item-left{
      padding: 38rpx 36rpx 38rpx 32rpx;
      view:nth-child(1){
        font-family: HelveticaNeue;
        font-size: 28rpx;
        color: #111111;
        line-height: 28rpx;
        font-style: normal;
      }
      view:nth-child(2){
        font-family: HelveticaNeue;
        font-size: 24rpx;
        color: #999999;
        line-height: 24rpx;
        font-style: normal;
        margin-top: 16rpx;
      }
    }
    .line{
      width: 4rpx;
      background-color: #EEEEEE;
      align-self: stretch;
    }
    .item-right{
      flex: 1;
      padding: 38rpx 32rpx 28rpx 28rpx;
      .right1{
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .remarks{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #444444;
        margin-top: 24rpx;
        .mark-item{
          display: flex;
          align-items: center;
          gap: 12rpx;
          margin-bottom: 8rpx;
          .mark-label{
            width: 160rpx;
            text-align: right;
          }
          .mark-num{
            flex: 1;
          }
        }
      }
      .tight-text{
        view:nth-child(1){
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 20rpx;
          color: #999999;
          line-height: 20rpx;
          font-style: normal;
        }
        view:nth-child(2){
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          color: #111111;
          font-style: normal;
          margin-top: 12rpx;
          display: flex;
          align-items: center;
          text:nth-child(1){
            font-size: 28rpx;
            line-height: 28rpx;
          }
          text:nth-child(2){
            margin-left: 24rpx;
            font-size: 10rpx;
            line-height: 10rpx;
            letter-spacing: 6rpx;
          }
          text:nth-child(3){
            margin-left: 12rpx;
            font-size: 24rpx;
            line-height: 24rpx;
          }
        }
      }
      .right-amount{
        .status{
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: 20rpx;
          color: #999999;
          line-height: 20rpx;
          font-style: normal;
          text-align: center;
          margin-top: 10rpx;
        }
      }
    }
  }
}
</style>
