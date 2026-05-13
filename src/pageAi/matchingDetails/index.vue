<script setup lang="ts">
import type { ProductItem } from '@/types/common'
import { getUserMatchDetail } from '@/api/applyMatch'

const status = ref()
const productList = ref<ProductItem[]>([])
const state = ref()
const scrollRef = ref()
const timer = ref()

function handleClickLeft() {
  // 返回时清除定时器
  clearTimeout(timer.value)
  uni.navigateBack()
}
function getDataList() {
  getUserMatchDetail({}).then((res) => {
    if (res.code === 0) {
      status.value = res.data.status
      const list = res.data.list || []
      productList.value = [...list]
      // 如果status为1，表示正在匹配中,过一秒再去请求找个接口
      if (status.value === 1) {
        timer.value = setTimeout(() => {
          getDataList()
        }, 5000)
      }
      else {
        clearTimeout(timer.value)
      }
    }
    else {
      state.value = 'error'
    }
    uni.stopPullDownRefresh()
  }).catch(() => {
    uni.stopPullDownRefresh()
    state.value = 'error'
  })
}

function loadmore() {
  state.value = 'loading'
  getDataList()
}
onShow(() => {
  getDataList()
})

onBeforeUnmount(() => {
  clearTimeout(timer.value)
})
</script>

<template>
  <view class="pagebox">
    <view class="headbox">
      <wd-navbar title="智能匹配" safe-area-inset-top left-arrow :bordered="false" @click-left="handleClickLeft" />
      <view class="headtab">
        为您推荐专属爆品，仅供参考
      </view>
    </view>
    <template v-if="status === 3 || status === 4 || status === 5 || status === 9">
      <MyScrollView
        ref="scrollRef"
        top="320rpx" :state="state"
        :not-data="status === 4 || status === 5 || status === 9"
        :tip="status === 5 ? '授权过期~' : status === 5 ? '匹配异常' : '暂无数据'"
        @loadmore="loadmore"
      >
        <view class="card-warp">
          <ProductCard :product-list="productList" />
        </view>
      </MyScrollView>
    </template>
    <view v-if="status === 1" class="status-box">
      <view class="template">
        <view class="loader">
          <view class="loader7">
            <view />
            <view />
          </view>
        </view>
        <view class="text">
          智能匹配中
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.pagebox {
  .headbox{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    .headtab{
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 32rpx;
      color: #FF0057;
      line-height: 32rpx;
      font-style: normal;
      background-color: #fff;
      padding: 48rpx 0 48rpx 32rpx;
    }
  }
  .card-warp{
    padding-left: 26rpx;
    padding-right: 26rpx;
    :deep(){
      .wd-divider{
        text-align: center;
        justify-content: center;
        &::before{
          display: none;
        }
        &::after{
          display: none;
        }
      }
    }
  }
}
.status-box{
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .loader7 {
    display: inline-block;
    position: relative;
    width: 270rpx;
    height: 270rpx;
    view {
      position: absolute;
      border: 4px solid transparent;
      opacity: 0;
      width: 0;
      height: 0;
      border-radius: 50%;
      animation: loader 2s cubic-bezier(0, 0.2, 0.8, 1) infinite, bounce 2s infinite alternate;
      animation-fill-mode: forwards, forwards;
    }
    view:nth-child(2) {
      animation-delay: -1s;
    }
    .text {
      animation: bounce 2s infinite;
    }
    @keyframes bounce {
      0% {
        border: 4px solid #FF0056;
        color: #FF0056;
      }

      25% {
        border: 4px solid #ffc404;
        color: #ffc404;
      }

      50% {
        border: 4px solid #09fc1d;
        color: #09fc1d;
      }

      75% {
        border: 4px solid #0752f4;
        color: #0752f4;
      }
      100% {
        border: 4px solid #f909f9;
        color: #f909f9;
      }
    }

    @keyframes loader {
      0% {
        top: 130rpx;
        left: 130rpx;
        width: 0;
        height: 0;
        opacity: 1;
      }
      80% {
        top: 0px;
        left: 0px;
        width: 260rpx;
        height: 260rpx;
        opacity: 0;
      }
      100% {
        top: 130rpx;
        left: 130rpx;
        width: 0;
        height: 0;
        opacity: 0;
      }
    }
  }
  .text {
    margin-top: 40rpx;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 32rpx;
    color: #666666;
    line-height: 32rpx;
    font-style: normal;
    text-align: center;
    // animation: bounce2 2s infinite alternate;
  }
  @keyframes bounce2 {
    0% {
      color: #FF0056;
    }

    25% {
      color: #FF0056;
    }

    50% {
      color: #09fc1d;
    }

    75% {
      color: #FF0056;
    }

    100% {
      color: #f909f9;
    }
  }
  .template {
    padding: 50px;
    text-align: center;
    color: #999;
  }
}
</style>

<route lang="json">
{
  "layout": "default",
  "name": "matchingRecords",
  "style": {
    "navigationBarTitleText": "匹配记录"
  }
}
</route>
