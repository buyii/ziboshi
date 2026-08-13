<script setup lang="ts">
import { useToast } from 'wot-design-uni'
import Commodity from './component/Commodity.vue'
import { createAndPayOrder } from '@/api/order'
import { getProductList } from '@/api/product'
import { getUserDefaultAddress } from '@/api/common'
import { useLayoutStore } from '@/stores'

const layoutStore = useLayoutStore()
const statusBarHeight = computed(() => {
  return layoutStore.layoutStore.statusBarHeight
})
const toast = useToast()

const loading = ref<boolean>(false)
const productData = ref<any>({})
const addressData = ref()
const itemNum = ref<number>(5)
const remark = ref<string>('')

function handleClickLeft() {
  uni.navigateBack()
}

function onConfirm() {
  if (!addressData.value) {
    toast.error('请选择地址')
    return
  }

  const params: any = {
    productId: productData.value?.productId,
    payType: 3,
    itemNum: itemNum.value,
    addressId: addressData.value?.id,
    remark: remark.value,
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
          uni.redirectTo({
            url: '/pageMine/orderList/index',
          })
        },
      })
    }
  }).catch(() => {
    loading.value = false
  })
}

function getdata() {
  const params = {
    productType: 2, // 1-正常商品 2-体验装
  }
  getProductList(params).then((res) => {
    if (res.code === 0) {
      if (res.rows && res.rows.length > 0) {
        const data = res.rows[0]
        productData.value = data
      }
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
  getdata()
  getDefaultAddress()
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
      <Commodity :payment-data="productData" />
      <view class="guigebox" style="margin-top: 24rpx;">
        <view class="guige">
          <view>购买数量</view>
          <view>
            <wd-input-number v-model="itemNum" :min="5" />
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
      <view class="jifeng">
        <DigitBold :value="((productData!.price * itemNum)).toFixed(1)" int-size="40rpx" decimal-size="28rpx" color="#FF5100" />
        <view class="yingfu">
          应付
        </view>
      </view>
      <button class="puy-btn" :loading="loading" @click="onConfirm">
        去结算
      </button>
    </view>
  </view>
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
  "name": "paymentSample",
  "style": {
    "navigationBarTitleText": "体验装支付"
  }
}
</route>
