<script setup lang="ts">
interface Props {
  tabdata: string
  list: any[]
  dateRange: any
}

defineOptions({
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared',
  },
})
const props = defineProps<Props>()

function toRecord() {
  const type = props.tabdata === '1' ? 'user' : 'team'
  uni.navigateTo({
    url: `/pageRank/incomeRecord/index?type=${type}&startTime=${props.dateRange.startDate}&endTime=${props.dateRange.endDate}`,
  })
}
</script>

<template>
  <view class="records-wrap">
    <view class="records-label">
      <view v-if="tabdata === '1'">
        个人收益记录
      </view>
      <view v-if="tabdata === '2'">
        团队收益记录
      </view>
      <view @click="toRecord">
        更多
        <text class="iconfont icon-into" />
      </view>
    </view>
    <view class="records-list">
      <view class="top-sticky">
        <view class="month">
          {{ dateRange.showStartDate }}
        </view>
        <text class="iconfont icon-rotate" />
        <view class="month">
          {{ dateRange.showEndDate }}
        </view>
      </view>
      <template v-for="item in props.list" :key="item.productId">
        <RecordsMonth v-if="tabdata === '1'" :item="item" :start-time="dateRange.startDate" :end-time="dateRange.endDate" />
        <UserRecords v-if="tabdata === '2'" :item="item" is-team="1" :start-time="dateRange.startDate" :end-time="dateRange.endDate" />
      </template>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.records-wrap{
  padding-top: 40rpx;
  .records-label{
    display: flex;
    align-items: center;
    justify-content: space-between;
    view:nth-child(1){
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 32rpx;
      color: #111111;
    }
    view:nth-child(2){
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 28rpx;
      color: #AAAAAA;
      text{
        font-size: 24rpx;
        color: #DADADA;
      }
    }
  }
  .records-list{
    .top-sticky{
      padding: 24rpx 0;
      background-color: #f8f8f8;
      display: flex;
      align-items: center;
    }
    .icon-rotate{
      color: #444444;
      font-size: 16rpx;
      margin: 0 16rpx;
    }
    .month{
      display: flex;
      justify-content: space-between;
      color: #444444;
      font-size: 28rpx;
    }
  }
}
</style>
