<script setup lang="ts">
const { detailData } = defineProps({
  detailData: {
    type: Object,
    default: () => ({}),
  },
})

const list = ref([
  {
    title: '带货达人',
    custom: true,
    valueKey: '',
  },
  {
    title: '创建时间',
    valueKey: 'createTime',
  },
  {
    title: '物流单号',
    valueKey: 'logisticsOrder',
    copy: true,
  },
])
function copyOrder(text: string) {
  uni.setClipboardData({
    data: text,
    success() {
      console.log('success')
    },
  })
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
  <view class="cell-wrap">
    <wd-cell v-for="(item, i) in list" :key="i" :title="item.title">
      <view class="custom-value" style="height: 32px;">
        <view v-if="item.custom" class="value-user">
          <image :src="detailData.avatar" />
          <view>{{ detailData.nickName }}</view>
        </view>
        <view v-else class="value-text">
          <text>
            {{ detailData[item.valueKey] }}
          </text>
          <text v-if="item.copy && detailData[item.valueKey]" class="iconfont icon-copy" @click.stop="copyOrder(detailData[item.valueKey])" />
        </view>
      </view>
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
      padding-top: 16rpx;
      padding-bottom: 16rpx;
      align-items: center;
    }
    .wd-cell__left{
      display: flex;
      align-items: center;
      flex: none;
    }
    .wd-right{
      text-align: right;
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
  .custom-value{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .value-user{
      display: flex;
      align-items: center;
      gap: 16rpx;
      image{
        width: 48rpx;
        height: 48rpx;
        border-radius: 24rpx;
      }
      view{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #111111;
        line-height: 28rpx;
      }
    }
    .value-text{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 28rpx;
      color: #111111;
      line-height: 28rpx;
      .iconfont{
        font-size: 26rpx;
        color: #999999;
        margin-left: 16rpx;
      }
    }
  }
}
</style>
