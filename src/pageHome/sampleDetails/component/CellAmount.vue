<script setup lang="ts">
const { detailData } = defineProps({
  detailData: {
    type: Object,
    default: () => ({}),
  },
})

const list = ref([
  {
    title: '直播价',
    key: 'price',
    suffix: '元',
  },
  {
    title: '达人高佣',
    key1: 'kolCosRatio',
    key: 'kolCosFee',
    prefix: '约赚',
    suffix: '元',
  },
  {
    title: '每单补',
    key1: '',
    key: 'kolServiceFee',
    prefix: '约补',
    suffix: '元',
  },
])
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
    <wd-cell v-for="(item, i) in list" :key="i">
      <view>
        {{ item.prefix }}{{ detailData[item.key] }}{{ item.suffix }}
      </view>
      <template #title>
        <view>
          <view style="display: inline-block">
            {{ item.title }}
          </view>
          <view v-if="item.key1" style="display: inline-block" class="title1">
            <wd-text :text="detailData[item.key1]">
              <template #suffix>
                <text class="ratio-suffix">%</text>
              </template>
            </wd-text>
          </view>
        </view>
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
  .title1{
    margin-left: 16rpx;
    :deep(){
      .wd-text{
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 32rpx;
        color: #111111;
        line-height: 32rpx;
      }
    }
  }
  .ratio-suffix{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 24rpx;
    color: #111111;
    line-height: 24rpx;
  }
  :deep(){
    .wd-cell__wrapper{
      padding-top: 24rpx;
      padding-bottom: 24rpx;
      align-items: center;
    }
    .wd-cell__left{
      display: flex;
      align-items: center;
    }
    .wd-cell__title{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 28rpx;
      color: #666666;
      line-height: 28rpx;
    }
    .wd-icon-arrow-right{
      .wd-cell__value{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #111111;
        line-height: 28rpx;
      }
    }
  }
}
</style>
