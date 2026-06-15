<script setup lang="ts">
import { useMessage } from 'wot-design-uni'

const userStore = useUserStore()

const message = useMessage('kefu')

const orderData = computed(() => {
  return userStore.orderData
})

function aaa(data: any) {
  message.confirm({
    msg: '即将联系客服，确定吗?',
    title: '提示',
    cancelButtonProps: {
      customClass: 'custom-shadow1',
    },
    confirmButtonProps: {
      customClass: 'custom-shadow',
    },

  }).then(() => {
    wx.openCustomerServiceChat({
      extInfo: { url: data.configValue },
      corpId: 'wwca77aaa53e45d173',
      success(res) {
        console.log('打开客服会话成功', res)
      },
      fail(err) {
        console.log('打开客服会话失败', err)
      },
    })
  }).catch(() => {
    console.log('点击了取消按钮')
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
  <view class="car-item">
    <view class="order">
      <view>订单编号</view>
      <view>{{ orderData.orderId }}</view>
    </view>
    <view class="item-content">
      <view class="item-left">
        <image :src="orderData.productImg" />
      </view>
      <view class="item-right">
        <view class="item-title">
          <wd-text :text="orderData.productName" color="#000000" :lines="2" size="28rpx" />
        </view>
        <view class="item-cost">
          <view class="cost1">
            <view>规格：{{ orderData.unit }}</view>
            <view class="cost2">
              <view class="cost-text">
                运费：{{ orderData.logisticsFee }}元
              </view>
              <view class="cost-text">
                x{{ orderData.itemNum || 1 }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="bot-box">
      <wd-button size="small" @click="aaa">
        联系客服
      </wd-button>
    </view>
  </view>
  <wd-message-box selector="shouhuo" />
  <wd-message-box selector="kefu" />
  <wd-toast />
</template>

<style lang="scss" scoped>
.car-item{
  background-color: #fff;
  padding: 24rpx;
  border-radius: 16rpx;
  overflow: hidden;
  position: relative;
  .status{
    position: absolute;
    top: 0;
    right: 0;
    height: 52rpx;
    line-height: 52rpx;
    text-align: center;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 24rpx;
    color: #666666;
    border-radius: 0 16rpx 0 16rpx;
    padding: 0 24rpx;
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
  .order{
    display: flex;
    gap: 12rpx;
    align-items: center;
    view:nth-child(1){
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 24rpx;
      color: #999999;
      line-height: 24rpx;
    }
    view:nth-child(2){
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 26rpx;
      color: #666666;
      line-height: 26rpx;
    }
  }
  .bot-box{
    display: flex;
    justify-content: flex-end;
    :deep(){
      .wd-button{
        width: 128rpx;
        height: 48rpx;
        background: rgba(8, 157, 57, 0.1);
        text-align: center;
        line-height: 48rpx;
        border-radius: 4rpx;
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 20rpx;
        color: #089D39;
      }
    }
  }
  .item-content{
    display: flex;
    gap: 30rpx;
    align-items: center;
    margin-top: 24rpx;
    padding-bottom: 24rpx;
    .item-left{
      image{
        width: 128rpx;
        height: 128rpx;
        border-radius: 8rpx;
      }
    }
    .item-right{
      flex: 1;
      .item-title{
        :deep(){
          .wd-text{
            flex: 1;
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 28rpx;
            color: #111111;
            line-height: 40rpx;
          }
        }
        .warningmark{
          padding: 2rpx 12rpx;
          border-radius: 12rpx 4rpx 12rpx 4rpx;
          background: #f24e88;
          font-size: 20rpx;
          display: inline-block;
          color: rgb(255, 255, 255);
          transition: opacity .3s;
          vertical-align: middle;
          line-height: initial;
          margin-right: 6rpx;
        }
        .primarymark{
          padding: 2rpx 12rpx;
          border-radius: 12rpx 4rpx 12rpx 4rpx;
          background: #5d2ed9;
          font-size: 20rpx;
          display: inline-block;
          color: rgb(255, 255, 255);
          transition: opacity .3s;
          vertical-align: middle;
          line-height: initial;
          margin-right: 6rpx;
        }
      }
      .item-cost{
        margin-top: 16rpx;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #999999;
        line-height: 24rpx;
        .cost1{
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16rpx;
          .cost2{
            display: flex;
            align-items: center;
            gap: 20rpx;
            .cost-text{
              padding: 8rpx 20rpx;
              background: #F4F4F4;
              border-radius: 4rpx;
              font-weight: 400;
              font-size: 20rpx;
              color: #999999;
              line-height: 20rpx;
              text-align: center;
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
.custom-shadow{
  background-color: #089D39 !important;
}
</style>
