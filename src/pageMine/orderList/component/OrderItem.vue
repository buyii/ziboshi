<script setup lang="ts">
import { useMessage, useToast } from 'wot-design-uni'
import { confirmOrder, payOrder } from '@/api/order'

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits(['onRefresh'])
const message = useMessage('shouhuo')
const toast = useToast()
interface Props {
  item: any
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

function onRefund1() {
  uni.navigateTo({
    url: `/pageMine/orderRefund/index?orderId=${props.item.orderId}&totalPayAmount=${props.item.totalPayAmount}`,
  })
}

function confirmReceipt() {
  const params = {
    orderId: props.item.orderId,
  }
  message.confirm({
    msg: '是否确认收货吗?',
    title: '提示',
    cancelButtonProps: {
      customClass: 'custom-shadow1',
    },
    confirmButtonProps: {
      customClass: 'custom-shadow',
    },

  }).then(() => {
    toast.show('确认收货成功')
    confirmOrder(params).then((res) => {
      if (res.code === 0) {
        toast.show('确认收货成功')
        emit('onRefresh')
      }
    })
  }).catch(() => {
    console.log('点击了取消按钮')
  })
}

function toLogistics() {
  uni.navigateTo({
    url: `/pageMine/orderLogistics/index?orderId=${props.item.orderId}`,
  })
}

function buyAgain() {
  uni.navigateTo({
    url: `/pageHome/details/index?productId=${props.item.productId}`,
  })
}

function toPay() {
  const params = {
    orderId: props.item.orderId,
  }
  payOrder(params).then((res) => {
    if (res.code === 0) {
      const data = { ...res.data }
      uni.requestPayment({
        ...data,
        success(res) {
          uni.navigateTo({
            url: '/pageHome/applySuccess/index',
          })
        },
        fail(err) {
          console.log(`fail:${JSON.stringify(err)}`)
        },
      })
    }
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
    <view
      class="status"
      :class="{
        'status-ing': props.item.status === 1,
        'status-success': props.item.status === 2,
        'status-apply': props.item.status === 4,
        'status-refuse': props.item.status === 3,
        'status-queren': props.item.status === 5,
        'status-daipingjia': props.item.status === 7,
        'status-tuikuan': props.item.status === 8 || props.item.status === 9,
      }"
      @click="toLogistics"
    >
      {{ statusMap[props.item.status] }}
    </view>
    <view class="order" @click="toLogistics">
      <view>订单编号</view>
      <view>{{ props.item.orderId }}</view>
    </view>
    <view class="item-content" @click="toLogistics">
      <view class="item-left">
        <image :src="props.item.productImg" />
      </view>
      <view class="item-right">
        <view class="item-title">
          <wd-text :text="props.item.productName" color="#000000" :lines="2" size="28rpx" />
        </view>
        <view class="item-cost">
          <view class="cost1">
            <view>{{ props.item.unit }}</view>
            <view class="cost2">
              <view class="cost-text">
                运费：{{ props.item.logisticsFee }}元
              </view>
              <view class="cost-text">
                x{{ props.item.itemNum || 1 }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="item-foot">
      <view v-if="props.item.payType === 1" class="jiage">
        <DigitBold :value="props.item.totalPayAmount" suffix="积分" int-size="48rpx" decimal-size="48rpx" suffix-size="28rpx" color="#000000" />
      </view>
      <view v-else class="jiage">
        {{ props.item.status === 1 ? '应付：' : '' }}<DigitBold :value="props.item.totalPayAmount" prefix="¥" int-size="48rpx" decimal-size="48rpx" prefix-size="28rpx" color="#000000" />
      </view>
      <view class="btns">
        <wd-button v-if="props.item.status === 1" size="small" custom-class="custom-btntext" @click="toPay">
          去支付
        </wd-button>
        <wd-button v-if="props.item.status === 3" size="small" custom-class="custom-btntext1" @click="buyAgain">
          再来一单
        </wd-button>
        <wd-button v-if="(props.item.status === 2 || props.item.status === 4) && props.item.payType !== 1" size="small" custom-class="custom-btntext1" @click="onRefund1">
          申请退款
        </wd-button>
        <wd-button v-if="props.item.status === 4" size="small" custom-class="custom-btntext" @click="confirmReceipt">
          确认收货
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
    }
  }
}
</style>

<style lang="scss">
.custom-shadow{
  background-color: #089D39 !important;
}
</style>
