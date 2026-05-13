<script setup lang="ts">
import CellAmount from './component/CellAmount.vue'
import CellUser from './component/CellUser.vue'
import LogisticsInfo from './component/LogisticsInfo.vue'
import { useLayoutStore } from '@/stores'
import { getSampleLogDetail } from '@/api/sample'

const id = ref('')
const layoutStore = useLayoutStore()
const statusBarHeight = computed(() => {
  return layoutStore.layoutStore.statusBarHeight
})

const detailData = ref<any>()

function handleClickLeft() {
  uni.navigateBack()
}
function onConfirm() {
  uni.navigateTo({
    url: `/pageHome/detailshare/index?productId=${detailData.value.productId}&activityId=${detailData.value.activityId}`,
  })
}
function getDetail() {
  getSampleLogDetail({ id: id.value }).then((res) => {
    if (res.code === 0) {
      detailData.value = res.data
    }
  })
}
onLoad((options) => {
  id.value = options?.id
  getDetail()
})
</script>

<template>
  <wd-navbar title="" safe-area-inset-top left-arrow fixed custom-style="background: transparent;" :bordered="false" @click-left="handleClickLeft" />
  <view class="nav-bg" :style="{ height: `${statusBarHeight + 44}px` }" />
  <template v-if="detailData">
    <view class="dingdan">
      <image src="../../static/svg/dingdanbg.svg" />
      <view class="dingdan-text">
        <view>{{ detailData.status === 1 ? '待审核' : detailData.status === 2 ? '待发货' : detailData.status === 3 ? '已拒绝' : detailData.status === 4 ? '待收货' : '已完成' }}</view>
        <view>订单号 · {{ detailData.applyOrderId }}</view>
      </view>
    </view>
    <view class="address">
      <view class="address-box">
        <view class="address-user">
          <view>{{ detailData.receivingName }}</view>
          <view>{{ detailData.receivingPhone }}</view>
        </view>
        <view class="address-text">
          {{ detailData.receivingAddress }}
        </view>
      </view>
      <text class="iconfont icon-address" />
    </view>
    <view class="content-box">
      <view class="goods-box">
        <image class="goods-img" :src="detailData.productImg" />
        <view class="goods-content">
          <view class="shop">
            <image :src="detailData.productImg" />
            <view class="shop-name">
              {{ detailData.shopName }}
            </view>
          </view>
          <view>
            <view class="goods-title">
              <wd-text :text="detailData.productName" :lines="1" />
            </view>
            <view class="goods-id">
              商品ID · {{ detailData.productId }}
            </view>
          </view>
        </view>
      </view>
      <CellAmount :detail-data="detailData" />
      <CellUser :detail-data="detailData" />
      <image class="syxx" src="../../static/svg/syxx.svg" />
      <LogisticsInfo :detail-data="detailData" />
    </view>
    <view class="btn-box">
      <FootButton label="复制链接" icon="icon-rotate" plain fixed @confirm="onConfirm" />
    </view>
  </template>
</template>

<style scoped lang="scss">
.nav-bg{
  width: 100%;
  background: linear-gradient( 180deg, #FFF4F7 0%, #FFFFFF 100%);
}
.dingdan{
  height: 144rpx;
  position: relative;
  padding: 32rpx 24rpx;
  background: #FFFFFF;
  image{
    width: 100%;
    height: 100%;
  }
  .dingdan-text{
    position: absolute;
    top: 32rpx;
    left: 24rpx;
    padding: 32rpx;
    view:nth-child(1){
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 36rpx;
      color: #FFFFFF;
      line-height: 36rpx;
    }
    view:nth-child(2){
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 28rpx;
      color: rgba(255,255,255,0.85);
      line-height: 28rpx;
      margin-top: 16rpx;
    }
  }
}
.address{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 28rpx 32rpx 32rpx 58rpx;
  .address-box{
    flex: 1;
    .address-user{
      display: flex;
      align-items: center;
      gap: 24rpx;
      view:nth-child(1){
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 32rpx;
        color: #000000;
        line-height: 32rpx;
      }
      view:nth-child(2){
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #666666;
        line-height: 28rpx;
      }
    }
    .address-text{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 28rpx;
      color: #444444;
      line-height: 28rpx;
      margin-top: 20rpx;
    }
  }
  text{
    font-size: 28rpx;
    color: #DADADA;
  }
}
.content-box{
  padding: 24rpx;
  padding-bottom: calc(100rpx + env(safe-area-inset-bottom));
}
.goods-box{
  display: flex;
  align-items: center;
  gap: 16rpx;
  padding: 32rpx;
  background: #FFFFFF;
  border-radius: 16rpx;
  .goods-img{
    width: 176rpx;
    height: 176rpx;
    border-radius: 16rpx;
  }
  .goods-content{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 176rpx;
    .shop{
      display: flex;
      align-items: center;
      gap: 12rpx;
      image{
        width: 40rpx;
        height: 40rpx;
        border-radius: 20rpx;
      }
      .shop-name{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #666666;
        line-height: 28rpx;
      }
    }
    .goods-title{
      margin-bottom: 24rpx;
      :deep(){
        .wd-text{
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 32rpx;
          color: #444444;
          line-height: 32rpx;
        }
      }
    }
    .goods-id{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 24rpx;
      color: #999999;
      line-height: 24rpx;
    }
  }
}
.syxx{
  height: 32rpx;
  width: 138rpx;
  margin: 32rpx 0;
}
.btn-box{
  :deep(){
    .iconfont{
      transform: rotate(-45deg); /* 逆时针旋转 45 度 */
      transform-origin: center; /* 设置旋转中心为元素的中心 */
      font-size: 28rpx !important;
    }
  }
}
</style>

<route lang="json">
{
  "layout": "default",
  "name": "sampleDetails",
  "style": {
    "navigationBarTitleText": "申样详情"
  }
}
</route>
