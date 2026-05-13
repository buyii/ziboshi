<script setup lang="ts">
interface MyProps {
  estimate: number | string
}
const props = withDefaults(defineProps<MyProps>(), {
})
const emit = defineEmits(['onNext', 'onPrev'])

function onPrev() {
  emit('onPrev')
}
function onNext() {
  emit('onNext')
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
  <view class="step">
    <view class="step-name">
      <view>第二步</view>
      <!-- <view>1</view> -->
    </view>
    <view class="step-content">
      <view class="step-title">
        打开<text>“抖音”</text>进入<text>“橱窗管理”</text>
      </view>
      <view class="step-title">
        点击添加的商品进入商品详情
      </view>
      <view class="step-title">
        再点击<text>“详情”</text>
      </view>
      <view class="step-center">
        <view class="center-top">
          <view>抖in好物<wd-icon name="arrow-right" size="20rpx" /></view>
          <view>包邮</view>
        </view>
        <view class="jieshao">
          商品文字介绍示意商品文字介绍示意商品文字介绍示意商品文字介绍示意
        </view>
        <view class="jiange" />
        <view class="amplify">
          <view>
            <text>详情</text>
            <wd-icon name="arrow-right" size="26rpx" />
          </view>
        </view>
      </view>
      <view class="step-tip">
        <text>提示：</text>
        <text>预估返佣金</text>
        <text>{{ props.estimate }}</text>
        <text>元</text>
      </view>
      <view class="step-tip1">
        购样订单在抖音结算后，返还佣金到达人抖音号中
      </view>
    </view>
    <view class="next-btn">
      <wd-button @click="onPrev">
        <wd-icon name="arrow-left" size="28rpx" />上一步
      </wd-button>
      <wd-button @click="onNext">
        下一步<wd-icon name="arrow-right" size="28rpx" />
      </wd-button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.step{
  width: 622rpx;
  .step-name{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 48rpx;
    view:nth-child(1){
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 48rpx;
      color: #FFFFFF;
      line-height: 48rpx;
      font-style: normal;
    }
    view:nth-child(2){
      width: 80rpx;
      height: 80rpx;
      background: #FFFFFF;
      border-radius: 24rpx;
      border: 2rpx solid #979797;
      font-family: YouSheBiaoTiHei;
      font-size: 48rpx;
      color: #000000;
      line-height: 80rpx;
      text-align: center;
      font-style: normal;
    }
  }
  .step-content{
    background: linear-gradient( 180deg, #FAF7F8 0%, #F9F5F6 100%);
    border-radius: 32rpx;
    padding: 72rpx 46rpx 50rpx 48rpx;
    .step-title{
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 32rpx;
      color: #111111;
      line-height: 32rpx;
      font-style: normal;
      margin-bottom: 32rpx;
      text{
        color: #FF0057;
      }
    }
    .step-center{
      position: relative;
      padding: 24rpx 32rpx;
      background: #FFFFFF;
      border-radius: 16rpx;
      .center-top{
        display: flex;
        align-items: center;
        gap: 12rpx;
        view:nth-child(1){
          width: 112rpx;
          height: 28rpx;
          background: linear-gradient( 90deg, #FF77A5 0%, #FF0057 100%);
          border-radius: 2rpx;
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 20rpx;
          color: #FFFFFF;
          line-height: 28rpx;
          text-align: center;
          font-style: normal;
        }
        view:nth-child(2){
          width: 56rpx;
          height: 26rpx;
          background: #FFFFFF;
          border-radius: 2rpx;
          border: 1rpx solid #FFB900;
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 20rpx;
          color: #FFB900;
          line-height: 26rpx;
          text-align: center;
          font-style: normal;
        }
      }
      .jieshao{
        width: 384rpx;
        height: 64rpx;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #111111;
        line-height: 32rpx;
        text-align: left;
        font-style: normal;
        margin-top: 18rpx;
      }
      .jiange{
        height: 28rpx;
        background: #FFB900;
        border-radius: 2rpx;
        opacity: 0.1;
        margin-top: 14rpx;
      }
      .amplify{
        position: absolute;
        top: -12rpx;
        right: 0;
        width: 108rpx;
        height: 108rpx;
        border: 4rpx solid #FF0057;
        border-radius: 66rpx;
        background: #FFFFFF;
        box-shadow: 0rpx 16rpx 48rpx 0rpx rgba(27,40,75,0.2);
        display: flex;
        align-items: center;
        justify-content: flex-end;
        overflow: hidden;
        view{
          width: 96rpx;
          height: 44rpx;
          background: #EDEFF4;
          border-radius: 200rpx 0rpx 0rpx 200rpx;
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 24rpx;
          color: #666666;
          line-height: 24rpx;
          font-style: normal;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
      }
    }
    .step-tip{
      display: flex;
      align-items: center;
      margin-top: 32rpx;
      text:nth-child(1){
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #444444;
        line-height: 24rpx;
        font-style: normal;
      }
      text:nth-child(2),text:nth-child(4){
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #444444;
        line-height: 24rpx;
        font-style: normal;
      }
      text:nth-child(3){
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #FF0057;
        line-height: 24rpx;
        font-style: normal;
      }
    }
    .step-tip1{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 24rpx;
      color: #666666;
      line-height: 24rpx;
      font-style: normal;
      margin-top: 20rpx;
    }
  }
  .next-btn{
    display: flex;
    justify-content: center;
    margin-top: 32rpx;
    gap: 34rpx;
    :deep(){
      .wd-button:nth-child(1){
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 20rpx !important;
        width: 250rpx !important;
        height: 96rpx !important;
        background: #6C0025 !important;
        border-radius: 40rpx 16rpx 16rpx 40rpx !important;
        font-family: PingFangSC, PingFang SC !important;
        font-weight: 500 !important;
        font-size: 36rpx !important;
        color: #FFFFFF !important;
        line-height: 96rpx !important;
        text-align: center !important;
        font-style: normal !important;
      }
      .wd-button:nth-child(2){
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 20rpx !important;
        width: 250rpx !important;
        height: 96rpx !important;
        background: #B4003D !important;
        border-radius: 16rpx 40rpx 40rpx 16rpx !important;
        font-family: PingFangSC, PingFang SC !important;
        font-weight: 500 !important;
        font-size: 36rpx !important;
        color: #FFFFFF !important;
        line-height: 96rpx !important;
        text-align: center !important;
        font-style: normal !important;
      }
    }
  }
}
</style>
