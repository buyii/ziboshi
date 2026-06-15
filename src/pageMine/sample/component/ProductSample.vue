<script setup lang="ts">
import { payOrder } from '@/api/order'

const props = withDefaults(defineProps<Props>(), {})

interface Props {
  itemData: any
}

const userStore = useUserStore()
function toPay() {
  const data = { ...props.itemData }
  userStore.setPaymentData(data)
  uni.navigateTo({
    url: `/pageHome/paymentSample/index?itemNum=1`,
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
    <view class="item-content">
      <view class="item-left">
        <image :src="props.itemData.cover" />
      </view>
      <view class="item-right">
        <view class="item-title">
          <wd-text :text="props.itemData.productName" color="#000000" :lines="2" size="28rpx" />
        </view>
        <view class="item-cost">
          <view class="cost1">
            <view>{{ props.itemData.unit }}</view>
            <view class="cost2">
              <!-- <view class="cost-text">
                运费：{{ props.itemData.logisticsFee }}元
              </view> -->
              <view class="cost-text">
                x{{ props.itemData.itemNum || 1 }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="item-foot">
      <view class="jiage">
        <DigitBold :value="props.itemData.price" prefix="¥" int-size="48rpx" decimal-size="48rpx" prefix-size="28rpx" color="#000000" />
      </view>
      <view class="btns">
        <wd-button size="small" custom-class="custom-btntext" @click="toPay">
          购 买
        </wd-button>
      </view>
    </view>
  </view>
  <wd-message-box selector="shouhuo" />
  <wd-toast />
</template>

<style lang="scss" scoped>
.car-item{
  background-color: #fff;
  padding: 24rpx;
  border-radius: 16rpx;
  overflow: hidden;
  margin-bottom: 24rpx;
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
    .text{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 28rpx;
      color: #BABABA;
      line-height: 28rpx;
      font-style: normal;
      margin-left: 8rpx;
    }
  }
  .item-content{
    display: flex;
    gap: 30rpx;
    align-items: center;
    margin-top: 24rpx;
    padding-bottom: 24rpx;
    border-bottom: 4rpx solid #EEEEEE;
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
  .item-foot{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 30rpx;
    .jiage{
      font-weight: 400;
      font-size: 24rpx;
      color: #999999;
      line-height: 24rpx;
      display: flex;
      align-items: center;
    }
    .btns{
      display: flex;
      align-items: center;
      gap: 12rpx;
      padding: 2rpx 0;
    }
    :deep(){
      .custom-btntext{
        font-family: PingFangSC, PingFang SC;
        background: #089D39;
        border-radius: 10rpx;
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 24rpx;
        color: #fff;
        line-height: 24rpx;
      }
      .custom-btntext1{
        background: #FFFFFF;
        border-radius: 8rpx;
        border: 1rpx solid #000000;
        font-weight: 500;
        font-size: 24rpx;
        color: #000000;
        line-height: 24rpx;
      }
      .custom-btndel{
        background: #FE2928;
        border-radius: 8rpx;
        font-weight: 500;
        font-size: 24rpx;
        color: #ffffff;
        line-height: 24rpx;
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
