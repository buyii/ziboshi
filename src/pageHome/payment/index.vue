<script setup lang="ts">
import { useToast } from 'wot-design-uni'
import Commodity from './component/Commodity.vue'
import MyPopup from './component/MyPopup.vue'
import CouponPopup from './component/CouponPopup.vue'
import { createAndPayOrder } from '@/api/order'
import { getMyPoint } from '@/api/wallet'
import { getCoupon, getUserDefaultAddress } from '@/api/common'
import { useLayoutStore } from '@/stores'

const userStore = useUserStore()
const layoutStore = useLayoutStore()
const statusBarHeight = computed(() => {
  return layoutStore.layoutStore.statusBarHeight
})
const toast = useToast()
const paymentData = computed(() => {
  return userStore.paymentData
})
const MyPopupRef = ref()
const CouponPopupRef = ref()
const loading = ref<boolean>(false)
const addressData = ref()
const couponList = ref([])
const selectCoupons = ref([])
const payType = ref<number>(2)
const itemNum = ref<number>(1)
const amountPoint = ref<number>(0)
const remark = ref<string>('')

function handleClickLeft() {
  uni.navigateBack()
}

function confirmAuth() {
  const params: any = {
    productId: paymentData.value?.productId,
    logisticsFee: paymentData.value.logisticsfee,
    payType: payType.value,
    itemNum: itemNum.value,
    addressId: addressData.value?.id,
    remark: remark.value,
  }
  loading.value = true
  createAndPayOrder(params).then((res) => {
    loading.value = false
    if (res.code === 0) {
      // 如果需要支付运费，调用支付接口
      if (res.data.needPay) {
        const data = { ...res.data }
        uni.requestPayment({
          ...data,
          success(res) {
            console.log(`success:${JSON.stringify(res)}`)
            uni.navigateTo({
              url: '/pageHome/applySuccess/index',
            })
          },
          fail(err) {
            console.log(`fail:${JSON.stringify(err)}`)
          },
        })
        return
      }
      uni.navigateTo({
        url: '/pageHome/applySuccess/index',
      })
    }
  }).catch(() => {
    loading.value = false
  })
}

const discount = computed(() => {
  const totalDiscount = selectCoupons.value.reduce((sum: number, coupon: any) => sum + Number(coupon.price), 0)
  return totalDiscount.toFixed(2)
})

function onConfirm() {
  if (!addressData.value) {
    toast.error('请选择地址')
    return
  }

  if (payType.value === 1) {
    MyPopupRef.value.open()
    return
  }

  const filterCoupon = selectCoupons.value.filter((item: any) => item.type !== 1)
  const couponId = filterCoupon.map((item: any) => item.id).join(',')
  const params: any = {
    productId: paymentData.value?.productId,
    payType: payType.value,
    itemNum: itemNum.value,
    addressId: addressData.value?.id,
    remark: remark.value,
    couponId,
  }
  loading.value = true
  createAndPayOrder(params).then((res) => {
    loading.value = false
    if (res.code === 0) {
      const data = { ...res.data }
      uni.requestPayment({
        ...data,
        success(res) {
          console.log(`success:${JSON.stringify(res)}`)
          uni.navigateTo({
            url: '/pageHome/applySuccess/index',
          })
        },
        fail(err) {
          console.log(`fail:${JSON.stringify(err)}`)
        },
      })
    }
  }).catch(() => {
    loading.value = false
  })
}

function getPoint() {
  getMyPoint().then((res) => {
    if (res.code === 0) {
      amountPoint.value = res.data.amount ? Number(res.data.amount) : 0
    }
  })
}

function getDefaultAddress() {
  if (addressData.value)
    return
  getUserDefaultAddress().then((res) => {
    if (res.code === 0) {
      addressData.value = res.data ? res.data : null
    }
  })
}

function getYouHui() {
  getCoupon().then((res) => {
    if (res.code === 0) {
      couponList.value = res.data || []
      selectCoupons.value = couponList.value.filter((item: any) => item.type === 1)
    }
  })
}

function selectCoupon() {
  CouponPopupRef.value.open()
}

function toAddress() {
  uni.navigateTo({
    url: `/pageRank/addressManage/index?select=select`,
    events: {
      // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
      backChange(data: any) {
        addressData.value = data
      },
    },
  })
}

onShow(() => {
  getPoint()
  getDefaultAddress()
  getYouHui()
})

onLoad((options) => {
  if (options?.itemNum) {
    itemNum.value = Number(options?.itemNum)
  }
})
</script>

<template>
  <view class="topbg" />
  <wd-navbar title="" safe-area-inset-top left-arrow fixed :bordered="false" custom-style="background: transparent;" @click-left="handleClickLeft" />
  <view class="collect-warp" :style="{ paddingTop: `${(statusBarHeight || 0) + 49}px` }">
    <view class="top-warp">
      <view class="top-left">
        <view class="lefttitle">
          待支付
        </view>
      </view>
      <view class="top-right">
        <image src="../../static/svg/bubble.svg" />
      </view>
    </view>

    <view v-if="addressData" class="dizhibox" @click="toAddress">
      <view class="dizhiLeft">
        <view class="dizhiname">
          <view class="name">
            {{ addressData.name }}
          </view>
          <view class="phone">
            {{ addressData.phone }}
          </view>
        </view>
        <view class="address">
          {{ addressData.area }} {{ addressData.detail }}
        </view>
      </view>
      <view class="dizhiRight">
        <text class="iconfont icon-address" />
      </view>
    </view>

    <view v-else class="add-box" @click="toAddress">
      <view><wd-icon name="add1" size="30rpx" /></view>
      <view class="add-text">
        新增地址
      </view>
    </view>
    <view class="warp111">
      <Commodity :payment-data="paymentData" />
      <view class="guigebox" style="margin-top: 24rpx;">
        <view class="guige">
          <view>支付方式</view>
          <view>
            <wd-radio-group v-model="payType" shape="button" checked-color="#089D39">
              <wd-radio :value="2">
                现金支付
              </wd-radio>
              <wd-radio :value="1">
                积分兑换
              </wd-radio>
            </wd-radio-group>
          </view>
        </view>
        <!-- <view class="guige">
        <view>运费</view>
        <view>
          {{ paymentData?.exclusivePrice }}元
        </view>
      </view> -->
        <view class="guige">
          <view>购买数量</view>
          <view>
            <wd-input-number v-model="itemNum" />
          </view>
        </view>
      </view>

      <view class="guigebox" style="margin-top: 24rpx;">
        <view class="guige">
          <view>优惠券</view>
          <view @click="selectCoupon">
            - ¥ {{ payType === 2 ? discount : 0 }}
            <text class="iconfont icon-into" />
          </view>
        </view>
        <view class="guige">
          <view>运费</view>
          <view>
            + {{ payType === 1 ? paymentData?.logisticsfee || 0 : 0 }} 元
          </view>
        </view>
        <view class="guige">
          <view>我要留言</view>
          <view>
            <wd-input v-model="remark" no-border clearable placeholder="备注" custom-input-class="custom-input" />
          </view>
        </view>
      </view>
    </view>

    <view class="botbox">
      <view v-if="payType === 1" class="jifeng">
        <view class="jifengbox">
          <DigitBold :value="paymentData!.price * itemNum" int-size="40rpx" color="#FF5100" suffix=" 积分" suffix-size="24rpx" />
          <DigitBold v-if="paymentData.logisticsfee && Number(paymentData?.logisticsfee) > 0" :value="paymentData?.logisticsfee" int-size="40rpx" color="#FF5100" suffix=" 运费" suffix-size="24rpx" />
        </view>
        <view class="jifengnum">
          当前可用 <DigitBold :value="amountPoint" int-size="24rpx" color="#FF5100" /> 积分
        </view>
      </view>
      <view v-else class="jifeng">
        <DigitBold :value="((paymentData!.price * itemNum) - Number(discount)).toFixed(2)" int-size="40rpx" decimal-size="28rpx" color="#FF5100" />
        <view class="yingfu">
          应付
        </view>
      </view>
      <button class="puy-btn" :loading="loading" @click="onConfirm">
        去结算
      </button>
    </view>
  </view>
  <MyPopup ref="MyPopupRef" :amount-point="amountPoint" :price="paymentData!.price" @confirm-auth="confirmAuth" />
  <CouponPopup ref="CouponPopupRef" v-model="selectCoupons" :list="couponList" />
</template>

<style scoped lang="scss">
.botbox{
  position: fixed;
  padding-bottom: calc(12rpx + env(safe-area-inset-bottom));
  background-color: #fff;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 6rpx;
  padding-left: 32rpx;
  padding-right: 32rpx;
  .yingfu{
    margin-top: 16rpx;
    font-weight: 400;
    font-size: 24rpx;
    color: #999999;
    line-height: 24rpx;
  }
  .puy-btn{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12rpx;
    width: 360rpx;
    height: 88rpx !important;
    background: #089D39 !important;
    border-radius: 16rpx 200rpx 200rpx 16rpx !important;
    font-weight: 500 !important;
    font-size: 36rpx !important;
    color: #FFFFFF !important;
    // line-height: 88rpx !important;
    margin: 0;
  }
  // :deep(){
  //   .wd-button{
  //     width: 360rpx;
  //     height: 88rpx !important;
  //     background: #089D39 !important;
  //     border-radius: 16rpx 200rpx 200rpx 16rpx !important;
  //     font-weight: 500 !important;
  //     font-size: 36rpx !important;
  //     color: #FFFFFF !important;
  //     line-height: 36rpx !important;
  //   }
  // }
}
.jifeng{
  padding: 12rpx 0;
  .jifengnum{
    margin-top: 16rpx;
    display: flex;
    align-items: center;
    gap: 4rpx;
    font-weight: 400;
    font-size: 24rpx;
    color: #999999;
    line-height: 24rpx;
  }
  .jifengbox{
    display: flex;
    align-items: center;
    gap: 12rpx;
  }
}
.topbg{
  position: fixed;
  height: 400rpx;
  width: 100%;
  background: linear-gradient( 180deg, #DEFFE9 0%, #FFFFFF 100%);
}
.collect-warp{
  position: relative;
  z-index: 2;
  padding-bottom: calc(120rpx + env(safe-area-inset-bottom));
  .top-warp{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 32rpx;
    background-color: transparent;
    .top-left{
      .lefttitle{
        font-weight: 600;
        font-size: 48rpx;
        color: #000000;
        line-height: 48rpx;
      }
      .left-desc{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #666666;
        line-height: 24rpx;
        font-style: normal;
        margin-top: 20rpx;
      }
    }
    .top-right{
      image{
        width: 102rpx;
        height: 80rpx;
      }
    }
  }
  .dizhibox{
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #FFFFFF;
    border-radius: 16rpx;
    margin-top: 32rpx;
    padding: 34rpx 32rpx;
    .dizhiLeft{
      .dizhiname{
        display: flex;
        gap: 24rpx;
        .name{
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: 32rpx;
          color: #000000;
          line-height: 32rpx;
          font-style: normal;
        }
        .phone{
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 28rpx;
          color: #666666;
          line-height: 28rpx;
          font-style: normal;
        }
      }
      .address{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #444444;
        line-height: 28rpx;
        font-style: normal;
        margin-top: 24rpx;
        line-height: 1.4;
      }
    }
    .dizhiRight{
      margin-left: 20rpx;
      .iconfont{
        font-size: 28rpx;
        color: #111111;
      }
    }
  }
  .add-box{
    height: 160rpx;
    background: #FFFFFF;
    border-radius: 16rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 32rpx;
    .add-text{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 24rpx;
      color: #666666;
      line-height: 24rpx;
      font-style: normal;
    }
    .change-box{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .change-label{
        display: flex;
        align-items: center;
        padding-right: 30rpx;
        .label-text{
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 24rpx;
          color: #AAAAAA;
          line-height: 24rpx;
          font-style: normal;
        }
        .iconfont{
          font-size: 24rpx;
          line-height: 24rpx;
          color: #DADADA;
          margin-left: 4rpx;
        }
      }
    }
    .tips{
      display: flex;
      align-items: center;
      margin: 0 32rpx;
      padding: 16rpx 16rpx 16rpx 24rpx;
      background: rgba(255,0,87,0.05);
      border-radius: 16rpx;
      border: 1rpx solid rgba(255,0,87,0.1);
      .tips-left{
        flex: 1;
        display: flex;
        align-items: center;
        gap: 20rpx;
        .iconfont{
          font-size: 32rpx;
          color: #089D39;
        }
        .tips-text{
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 24rpx;
          color: #089D39;
          line-height: 24rpx;
          font-style: normal;
        }
      }
      :deep(){
        .wd-button{
          width: 144rpx;
          height: 64rpx;
          background: #089D39;
          border-radius: 20rpx;
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: 24rpx;
          color: #FFFFFF;
          line-height: 24rpx;
          font-style: normal;
          min-width: auto;
        }
      }
    }
  }
  .warp111{
    padding: 0 32rpx;
  }
  .guigebox{
    background-color: #FFFFFF;
    border-radius: 16rpx;
  }
  .guige{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12rpx 24rpx;
    min-height: 80rpx;
    font-size: 28rpx;
    font-style: normal;
    view:nth-child(1){
      color: #999999;
      min-width: 160rpx;
    }
    view:nth-child(2){
      flex: 1;
      color: #111111;
      line-height: 1.4;
      text-align: right;
      text{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #BABABA;
        line-height: 28rpx;
        font-style: normal;
      }
    }
    :deep(){
      .wd-radio.is-button.is-checked .wd-radio__label {
        background-color: #089D39 !important;
        color: #FFFFFF !important;
        border-color: #089D39 !important;
      }
      .custom-input{
        text-align: right;
      }
    }
  }
}
</style>

<route lang="json">
{
  "layout": "default",
  "name": "payment",
  "style": {
    "navigationBarTitleText": "支付结算"
  }
}
</route>
