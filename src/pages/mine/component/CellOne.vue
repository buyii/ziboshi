<script setup lang="ts">
import { getMyCarCount } from '@/api/pickCar'
import { getUnViewCount } from '@/api/productfind'
import { getConfirmCount } from '@/api/sample'

const myCar = ref(0)
const vewCount = ref(0)
const confirmCount = ref(0)

const list = ref([
  {
    title: '我的选品车',
    icon: 'icon-selectedUser',
    url: '/pageAi/selectedCar/index',
    valueKey: ref(myCar),
  },
  {
    title: '授权达人',
    icon: 'icon-expertUser',
    url: '/pageRank/expertManage/index',
  },
  {
    title: '申样列表',
    icon: 'icon-sampleUser',
    url: '/pageHome/sampleList/index',
    valueKey: ref(confirmCount),
  },
  {
    title: '找品记录',
    icon: 'icon-categoryUser',
    url: '/pageAi/seekRecord/index',
    valueKey: ref(vewCount),
  },
  {
    title: '我的投流',
    icon: 'icon-subsidy',
    url: '/pageMine/trafficleList/index',
  },
])

function getDataList() {
  getMyCarCount({}).then((res) => {
    if (res.code === 0) {
      myCar.value = res.data
    }
  })
  getUnViewCount({}).then((res) => {
    if (res.code === 0) {
      vewCount.value = res.data
    }
  })
  getConfirmCount({}).then((res) => {
    if (res.code === 0) {
      confirmCount.value = res.data
    }
  })
}

onShow(() => {
  getDataList()
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
  <view class="cell-wrap">
    <wd-cell v-for="(item, i) in list" :key="i" :title="item.title" :to="item.url" :value="item.valueKey" is-link>
      <view v-if="item.valueKey" class="custom-value">
        {{ item.valueKey }}
      </view>
      <template #icon>
        <text class="iconfont" :class="item.icon" />
      </template>
    </wd-cell>
  </view>
</template>

<style lang="scss" scoped>
.cell-wrap{
  margin-top: 20rpx;
  background-color: #ffffff;
  border-radius: 16rpx;
  overflow: hidden;
  :deep(){
    .wd-cell__wrapper{
      padding-top: 24rpx;
      padding-bottom: 24rpx;
    }
    .wd-cell__left{
      display: flex;
      align-items: center;
    }
    .wd-cell__title{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 28rpx;
      color: #333333;
      margin-left: 32rpx;
    }
    .wd-icon-arrow-right{
      color: #BABABA;
    }
  }
  .custom-value{
    height: 40rpx;
    display: inline-block;
    background: rgba(255,66,36,0.05);
    border-radius: 20rpx;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 24rpx;
    color: #FF4224;
    line-height: 40rpx;
    text-align: center;
    padding: 0 14rpx;
  }
  .iconfont{
    font-size: 32rpx;
    color: #111111;
  }
}
</style>
