<script setup lang="ts">
import ExpertsItem from './component/ExpertsItem.vue'
import { useLayoutStore } from '@/stores'

const layoutStore = useLayoutStore()

const tabs = [
  {
    title: '综合',
    key: '1',
  },
  {
    title: '销量',
    key: '2',
  },
  {
    title: '价格',
    key: '3',
  },
]
const expertsTab = ref<string>('1')
function handleClickLeft() {
  uni.navigateBack()
}
function handleChange() {

}
const statusBarHeight = computed(() => {
  const num = uni.upx2px(320)
  return layoutStore.layoutStore.statusBarHeight + num
})
</script>

<template>
  <wd-navbar title="搜索" safe-area-inset-top left-arrow :bordered="false" @click-left="handleClickLeft">
    <template #left>
      <wd-icon name="close" size="28rpx" />
    </template>
  </wd-navbar>
  <view class="search-box">
    <wd-search hide-cancel custom-input-class="inputClass" placeholder-class="placeholderClass" placeholder="搜索ID或者名称" />
  </view>
  <view class="tab-wrap">
    <LineTabs v-model="expertsTab" :tabs="tabs" @on-change="handleChange" />
  </view>
  <view class="experts-list">
    <scroll-view class="scroll-Y" :style="{ top: `${(statusBarHeight || 0)}px` }" :scroll-y="true">
      <view class="card-warp">
        <ExpertsItem />
        <ExpertsItem />
        <ExpertsItem />
        <ExpertsItem />
        <ExpertsItem />
        <ExpertsItem />
        <ExpertsItem />
        <ExpertsItem />
        <ExpertsItem />
        <ExpertsItem />
        <ExpertsItem />
        <ExpertsItem />
        <ExpertsItem />
        <view class="my-loadmore">
          <text class="iconfont icon-asd" /> 哎呀到底了～
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
.search-box{
  padding: 16rpx 32rpx;
  background-color: #fff;
  :deep(.wd-search){
    background: transparent;
    padding: 0px !important;
    .inputClass{
      background: rgba(255,255,255,0);
    }
    .wd-search__block{
      height: 72rpx;
      border-radius: 48rpx;
      background: rgba(255,255,255,0.85);
      border: 4rpx solid #000000;
      .wd-search__field,.wd-search__cover{
        background: transparent;
      }
    }
    .wd-icon-search{
      position: absolute;
      left: 24rpx;
      color: #000000;
      font-weight: 400;
      font-size: 32rpx;
    }
    .placeholderClass{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 24rpx;
      color: #999999;
      font-style: normal;
    }
  }
}
.tab-wrap{
  background-color: #fff;
}
.experts-list{
  margin-top: 16rpx;
  background-color: #fff;
  .scroll-Y{
    z-index: 0;
    transition: all 0.3s ease; /* 添加平滑过渡效果 */
    position: absolute;
    bottom: 0;
  }
  .card-warp{
    background-color: #fff;
    // padding-bottom: env(safe-area-inset-bottom);
    .my-loadmore{
      height: env(safe-area-inset-bottom);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 24rpx;
      color: #999999;
      font-style: normal;
      background-color: #F4F4F4;
    }
  }
}
</style>

<route lang="json">
{
  "layout": "default",
  "name": "searchexperts",
  "style": {
    "navigationBarTitleText": "搜索"
  }
}
</route>
