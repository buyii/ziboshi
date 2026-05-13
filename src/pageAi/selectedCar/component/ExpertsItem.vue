<script setup lang="ts">
interface MyProps {
  item: any
}

const props = withDefaults(defineProps<MyProps>(), {})
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
  <view class="item-warp">
    <image :src="props.item.avatar" mode="scaleToFill" />
    <view class="item-content">
      <view class="item-name">
        <view>{{ props.item.nickName }}</view>
        <view v-if="props.item.douyinId">
          抖音ID · {{ props.item.douyinId }}
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.item-warp{
  flex: 1;
  display: flex;
  align-items: center;
  gap: 20rpx;
  padding: 32rpx;
  image{
    width: 96rpx;
    height: 96rpx;
    border-radius: 64rpx;
  }
  .item-content{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .item-name{
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 96rpx;
      view:nth-child(1){
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #111111;
        font-style: normal;
      }
      view:nth-child(2){
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #999999;
        font-style: normal;
      }
    }
    .item-bot{
      width: 128rpx;
      height: 64rpx;
      border-radius: 16rpx;
      border: 1rpx solid rgba(255,0,87,0.25);
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 28rpx;
      color: #FF0057;
      line-height: 64rpx;
      text-align: center;
      font-style: normal;
    }
    .notstand{
      color: #999999;
      border: 1rpx solid #EEEEEE;
    }
  }
}
</style>
