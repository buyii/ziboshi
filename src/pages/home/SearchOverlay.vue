<script setup lang="ts">
import { getSearchLog, removeSearchLog } from '@/api/common'

const value = ref<string>('')
const recordList = ref<any[]>([])
const hotList = ref<any[]>([])
const instance = getCurrentInstance()

function getLog() {
  getSearchLog().then((res) => {
    if (res.code === 0) {
      recordList.value = res.data.self || []
      hotList.value = res.data.hot || []
    }
  })
}

function reremoveLog() {
  removeSearchLog().then((res) => {
    if (res.code === 0) {
      recordList.value = []
    }
  })
}

function search() {
  const _this = instance?.proxy
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  const eventChannel = _this?.getOpenerEventChannel()
  eventChannel.emit('backEvent', value.value)
  uni.navigateBack()
}

function itemClick(item: string) {
  value.value = item
  search()
}

function close() {
  search()
}

onLoad((options: any) => {
  value.value = options.productName || ''
  getLog()
})
</script>

<template>
  <view class="search-wrapper">
    <view class="search-top">
      <view class="title-box">
        <text class="iconfont icon-close" @click="close" />
        <view class="title">
          搜 索
        </view>
      </view>
      <view class="search-box">
        <MySearch v-model="value" :custom-focus="true" placeholder="输入商品名称/ID/链接" @search="search" />
      </view>
    </view>
    <view v-if="recordList.length > 0" class="record-box">
      <view class="record-title">
        <view class="title-label">
          历史记录
        </view>
        <text class="iconfont icon-deleteAsh" @click="reremoveLog" />
      </view>
      <view class="record-list">
        <view v-for="item in recordList" :key="item" class="record-item" @click="itemClick(item)">
          {{ item }}
        </view>
      </view>
    </view>

    <view v-if="hotList.length > 0" class="record-box">
      <view class="record-title">
        <view class="title-label">
          热门搜索
        </view>
        <!-- <text class="iconfont icon-refresh" /> -->
      </view>
      <view class="record-list">
        <view v-for="item in hotList" :key="item" class="record-item" @click="itemClick(item)">
          {{ item }}
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.search-wrapper{
  background: #F8F8F8;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  .search-top{
    width: 100%;
    height: 288rpx;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    gap: 20rpx;
    .title-box{
      position: relative;
      width: 100%;
      .iconfont{
        position: absolute;
        left: 32rpx;
        top: 0;
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 28rpx;
        color: #000000;
        line-height: 88rpx;
        font-style: normal;
        z-index: 99;
        height: 88rpx;
      }
      .title{
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 36rpx;
        color: #000000;
        line-height: 88rpx;
        text-align: center;
        font-style: normal;
        width: 100%;
        height: 88rpx;
      }
    }
    .search-box{
      padding: 0 32rpx 16rpx 32rpx;
      width: 100%;
      box-sizing: border-box;
      :deep(.wd-search){
        background: rgba(255,255,255,1);
        padding: 0px !important;
        border-radius: 44rpx;
        border: 4rpx solid #000000;
        overflow: hidden;
        .inputClass{
          background: rgba(255,255,255,0);
        }
        .wd-search__block{
          background: rgba(255,255,255,1);
          height: 80rpx;
          .wd-search__field,.wd-search__cover{
            background: transparent;
          }
        }
        .wd-icon-search{
          position: absolute;
          left: 20rpx;
          color: #000000;
          font-weight: 400;
          font-size: 28rpx;
        }
        .placeholderClass{
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 28rpx;
          color: #999999;
          font-style: normal;
        }
        .sousuo{
          display: flex;
          align-items: center;
          .wd-button{
            background-color: #089D39;
            color: #fff;
            font-size: 28rpx;
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            margin-right: 14rpx;
          }
        }
      }
    }
  }
  .record-box{
    padding: 30rpx;
    .record-title{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title-label{
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 32rpx;
        color: #000000;
        line-height: 32rpx;
        font-style: normal;
      }
      .iconfont{
        font-size: 28rpx;
        line-height: 28rpx;
        color: #BABABA;
      }
    }
    .record-list{
      display: flex;
      gap: 24rpx;
      flex-wrap: wrap;
      padding-top: 32rpx;
      .record-item{
        padding: 16rpx 32rpx;
        background: #FFFFFF;
        border-radius: 16rpx;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #444444;
        line-height: 28rpx;
        text-align: center;
        font-style: normal;
      }
    }
  }
}
</style>

<route lang="json">
{
"layout": "default",
"name": "SearchOverlay",
"style": {
"navigationBarTitleText": "搜索"
}
}
</route>
