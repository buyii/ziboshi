<script setup lang="ts">
const show = ref<boolean>(false)
const imgBaseUrl = import.meta.env.VITE_IMG_URL
function open() {
  show.value = true
}

function close() {
  show.value = false
}

// 暴露方法
defineExpose({
  open,
  close,
})
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
  <wd-overlay :show="show" :z-index="99999" custom-style="background: rgba(43, 3, 17, 0.45);backdrop-filter: blur(10px);" @click.stop="close">
    <view class="poster-popup">
      <view class="poster-wrapper" @click.stop="">
        <view class="name-box">
          <text class="iconfont icon-close" @click="close" />
          <view class="name-content" />
        </view>
        <view class="poster-content">
          <view class="steps">
            <text class="iconfont icon-scan1" />
            <view class="label">
              微信扫码添加客服
            </view>
          </view>
          <view class="code-box">
            <image class="code-img" show-menu-by-longpress :src="`${imgBaseUrl}/kefu.png`" />
          </view>
          <view class="btn-box">
            <view class="jiantou">
              <view class="jiantoul" />
              <view class="jiantour" />
            </view>
            <view class="btn">
              <text>长按识别二维码，添加您的专属客服吧～</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </wd-overlay>
</template>

<style lang="scss" scoped>
.poster-popup{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.poster-wrapper{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 662rpx;
  // height: 1192rpx;
  border-radius: 32rpx;
  overflow: hidden;
  .name-box {
    height: 80rpx;
    width: 100%;
    background: #089D39;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .iconfont{
      color: #fff;
      font-size: 28rpx;
      margin-right: 28rpx;
    }
  }
  .poster-content{
    flex: 1;
    width: 100%;
    background: #fff;
    .steps{
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20rpx 32rpx;
      gap: 16rpx;
      .iconfont{
        font-size: 34rpx;
        color: #000000;
      }
      .label{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 34rpx;
        color: #000000;
        line-height: 34rpx;
        font-style: normal;
      }
    }
    .code-box{
      width: 594rpx;
      height: 446rpx;
      text-align: center;
      margin: 12rpx auto;
      display: flex;
      align-items: center;
      justify-content: center;
      .code-img{
        width: 430rpx;
        height: 430rpx;
      }
      .pointer{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        border: 4rpx solid #089D39;
        mask: conic-gradient(at 32rpx 24rpx, transparent 75%, blue 75%) 0 0 / calc(100% - 32rpx) calc(100% - 24rpx);
      }
    }
  }
  .img-wrapper{
    width: 630rpx;
    height: 710rpx;
    border-radius: 32rpx;
    overflow: hidden;
    position: relative;
    image{
      width: 100%;
      height: 100%;
    }
    .close{
      width: 80rpx;
      height: 80rpx;
      background: rgba(255,255,255,0.65);
      border-radius: 0rpx 32rpx 0rpx 32rpx;
      backdrop-filter: blur(4px);
      text-align: center;
      line-height: 80rpx;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  .btn-box{
    padding: 32rpx;
    .jiantou{
      width: 100%;
      height: 12rpx;
      background-color: #089D39;
      display: flex;
      justify-content: center;
      .jiantoul{
        flex: 1;
        background-color: #fff;
        border-radius: 0 0 24rpx 0;
      }
      .jiantour{
        flex: 1;
        background-color: #fff;
        border-radius: 0 0 0 32rpx;
      }
    }
    .btn{
      flex: 1;
      height: 60rpx;
      background: #089D39;
      border-radius: 24rpx;
      font-size: 26rpx;
      font-weight: 500;
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      color: #FFFFFF;
      line-height: 60rpx;
      text-align: center;
      font-style: normal;
      letter-spacing: 2rpx;
    }
  }
  .quanxian{
    padding: 0 32rpx;
    .quanxian-title{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 32rpx;
      color: #111111;
      line-height: 32rpx;
      font-style: normal;
      margin-bottom: 26rpx;
    }
    .quanxian-item{
      display: flex;
      align-items: center;
      gap: 16rpx;
      margin-bottom: 20rpx;
      .tet{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #999999;
        line-height: 24rpx;
        font-style: normal;
      }
      :deep(){
        .wd-icon{
          background: #089D39;
          border-radius: 8rpx 8rpx 30rpx 30rpx;
          width: 28rpx;
          height: 28rpx;
          text-align: center;
          line-height: 26rpx;
        }
      }
    }
  }
}
</style>
