<script setup lang="ts">
import { useLayoutStore } from '@/stores'

import ruleimg from '@/static/svg/ruleimg.svg'

const layoutStore = useLayoutStore()
const statusBarHeight = computed(() => {
  return layoutStore.layoutStore.statusBarHeight
})
function handleClickLeft() {
  uni.navigateBack()
}
</script>

<template>
  <wd-navbar title="收益规则" safe-area-inset-top left-arrow fixed :bordered="false" @click-left="handleClickLeft" />
  <view class="page-box" :style="{ paddingTop: `${(statusBarHeight || 0) + 44}px` }">
    <img class="banimg" :src="ruleimg">
    <view class="rile-item">
      <view class="item-label">
        全部
      </view>
      <view class="item-value">
        下单支付的统计
      </view>
    </view>
    <view class="rile-item">
      <view class="item-label">
        有效
      </view>
      <view class="item-value">
        下单支付且未退货退款的统计
      </view>
    </view>
    <view class="rile-item">
      <view class="item-label">
        结算
      </view>
      <view class="item-value">
        已锁定结算的统计
      </view>
    </view>
    <view class="rile-item">
      <view class="item-label">
        佣金
      </view>
      <view class="item-value">
        通过橱窗销售商品产生的收益
      </view>
    </view>
    <view class="rile-item">
      <view class="item-label">
        补贴
      </view>
      <view class="item-value">
        通过星佣宝复制链接或添加橱窗产生的收益
      </view>
    </view>
    <view class="rile-item">
      <view class="item-label">
        分红
      </view>
      <view class="item-value">
        通过邀请星佣宝用户加入团队，按团队成员总收益计量，平台给予分红
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.page-box{
  padding: 32rpx;
  background-color: #FFFFFF;
  min-height: 100vh;
  box-sizing: border-box;
  .banimg{
    width: 686rpx;
    height: 246rpx;
    margin-top: 32rpx;
  }
  .rile-item{
    margin-top: 48rpx;
    padding-bottom: 16rpx;
    .item-label{
      display: inline-block;
      font-family: PingFangSC, PingFang SC;
      font-weight: 600;
      font-size: 36rpx;
      color: #111111;
      line-height: 22rpx;
      text-align: left;
      font-style: normal;
      border-bottom: 16rpx solid #FFC7DA;
    }
    .item-value{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 32rpx;
      color: #444444;
      line-height: 44rpx;
      text-align: left;
      font-style: normal;
      margin-top: 18rpx;
    }
  }
}
</style>

<route lang="json">
{
  "layout": "default",
  "name": "rulePage",
  "style": {
    "navigationBarTitleText": "收益规则"
  }
}
</route>
