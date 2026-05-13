<script setup lang="ts">
import { useLayoutStore } from '@/stores'

const layoutStore = useLayoutStore()
const statusBarHeight = computed(() => {
  return layoutStore.layoutStore.statusBarHeight
})
const pageScrollTop = ref(0)

const list = [
  {
    label: '新增粉丝',
    value: '115.3w',
  },
  {
    label: '新增视频',
    value: '4',
  },
  {
    label: '直播场次',
    value: '32',
  },
  {
    label: '总销量',
    value: '98',
  },
  {
    label: '总销售额',
    value: '6.6w',
  },
]

function handleClickLeft() {
  uni.navigateBack()
}

onLoad(() => {
  // chartRef.value.getServerData()
})

onPageScroll((e) => {
  pageScrollTop.value = e.scrollTop
})
</script>

<template>
  <wd-navbar title="" safe-area-inset-top left-arrow fixed :bordered="false" custom-style="background: transparent;" @click-left="handleClickLeft" />
  <view class="detail-top">
    <view :style="{ height: `${(statusBarHeight || 0) + 44}px` }" />
    <view class="top-info">
      <view class="info-left">
        <view class="info-img">
          <image src="../../static/logo.svg" />
        </view>
        <view class="info-text">
          <view>Faker LOL五冠王中单</view>
          <view>抖音ID · 993459054</view>
        </view>
      </view>
      <view class="info-right">
        <wd-text text="2995">
          <template #suffix>
            <text class="price-suffix">.3w</text>
          </template>
        </wd-text>
        <view class="right-label">
          粉丝数量
        </view>
      </view>
    </view>
  </view>
  <view class="data-box">
    <view class="data-label">
      近30天数据情况
    </view>
    <view class="data-chart">
      <view v-for="item in list" :key="item.label" class="data-item">
        <view>{{ item.value }}</view>
        <view>{{ item.label }}</view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.detail-top{
  width: 100%;
  height: 368rpx;
  background: linear-gradient( 180deg, rgba(255,36,87,0.15) 0%, rgba(248,248,248,0) 100%), #FFFFFF;
  display: flex;
  flex-direction: column;
  .top-info{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32rpx;
    .info-left{
      display: flex;
      align-items: center;
      gap: 32rpx;
      .info-img{
        width: 128rpx;
        height: 128rpx;
        border-radius: 64rpx;
        overflow: hidden;
        image{
          width: 100%;
          height: 100%;
        }
      }
      .info-text{
        view:nth-child(1){
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: 32rpx;
          color: #111111;
          line-height: 32rpx;
          font-style: normal;
        }
        view:nth-child(2){
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 24rpx;
          color: #999999;
          line-height: 24rpx;
          font-style: normal;
          margin-top: 24rpx;
        }
      }
    }
    .info-right{
      :deep(){
        .wd-text{
          font-family: PingFangSC, PingFang SC;
          font-weight: 600;
          font-size: 36rpx;
          color: #FF0057;
          line-height: 36rpx;
        }
      }
      .price-suffix{
        font-family: PingFangSC, PingFang SC;
        font-weight: 600;
        font-size: 28rpx;
        color: #FF0057;
        line-height: 28rpx;
      }
      .right-label{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #999999;
        line-height: 24rpx;
        text-align: right;
        margin-top: 20rpx;
      }
    }
  }
}
.data-box{
  padding: 32rpx;
  .data-label{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 28rpx;
    color: #000000;
    line-height: 28rpx;
    margin-bottom: 32rpx;
  }
  .data-chart{
    background-color: #fff;
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 每行三个元素 */
    border-radius: 16rpx;
    .data-item{
      height: 144rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      view:nth-child(1){
        font-family: PingFangSC, PingFang SC;
        font-weight: 600;
        font-size: 40rpx;
        color: #111111;
        line-height: 40rpx;
      }
      view:nth-child(2){
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #999999;
        line-height: 24rpx;
        margin-top: 16rpx;
      }
    }
  }
}
</style>

<route lang="json">
{
  "layout": "default",
  "name": "expertDetails",
  "style": {
    "navigationBarTitleText": "达人基本信息"
  }
}
</route>
