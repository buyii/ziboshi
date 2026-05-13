<script setup lang="ts">
import type { Item } from '../type'

interface MyProps {
  item: Item
}
const props = withDefaults(defineProps<MyProps>(), {})

const emit = defineEmits(['onAuth'])

function toAuth() {
  emit('onAuth')
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
  <view class="car-item">
    <!-- <view class="leve">
      <text class="iconfont icon-grade" />
      <text class="tet">Lv{{ props.item.level }}</text>
    </view> -->
    <view class="item-content">
      <view class="item-left">
        <image class="img" :src="props.item.avatar" />
      </view>
      <view class="item-right">
        <view class="item-title">
          <wd-text :text="props.item.nickName" color="#000000" :lines="2" size="28rpx" />
          <view class="dyId">
            抖音号 · {{ props.item.douyinId }}
          </view>
        </view>
      </view>
      <view class="foot-card">
        <view class="foot-num">
          {{ props.item.applySampleCount || 0 }}
        </view>
        <view class="foot-label">
          总领样数
        </view>
      </view>
    </view>
    <view class="foot-item">
      <view v-if="props.item.expiresStatus === '2'" class="expiresStatus">
        <wd-button
          custom-class="custom-guoqi" size="small"
          @click="toAuth"
        >
          授权过期
        </wd-button>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.car-item{
  margin-top: 24rpx;
  background-color: #fff;
  padding: 32rpx;
  border-radius: 16rpx;
  overflow: hidden;
  position: relative;
  .leve{
    border-radius: 458rpx 0rpx 0rpx 458rpx;
    border: 2rpx solid #FF0057;
    position: absolute;
    right: 0;
    top: 40rpx;
    padding: 10rpx 16rpx;
    color: #FF0057;
    display: flex;
    align-items: center;
    gap: 8rpx;
    .iconfont{
      font-size: 22rpx;
    }
    .tet{
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 24rpx;
      color: #FF0057;
      line-height: 24rpx;
      font-style: normal;
    }
  }
  .item-content{
    display: flex;
    gap: 30rpx;
    align-items: center;
    .item-left{
      width: 96rpx;
      height: 96rpx;
      .img{
        width: 96rpx;
        height: 96rpx;
        border-radius: 48rpx;
      }
    }
    .item-right{
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 16rpx;
      .item-title{
        :deep(){
          .wd-text{
            font-family: PingFangSC, PingFang SC;
            font-weight: 500;
            font-size: 28rpx;
            color: #000000;
            line-height: 28rpx;
          }
        }
        .dyId{
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 24rpx;
          color: #666666;
          line-height: 24rpx;
          margin-top: 16rpx;
        }
      }
    }
    .foot-card{
      border-radius: 16rpx;
      border: 1rpx solid #EEEEEE;
      padding: 16rpx;
      text-align: center;
      .foot-num{
        font-family: DINAlternate, DINAlternate;
        font-weight: bold;
        font-size: 36rpx;
        color: #000000;
        line-height: 28rpx;
        font-style: normal;
      }
      .foot-label{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 20rpx;
        color: #999999;
        line-height: 20rpx;
        font-style: normal;
        margin-top: 14rpx;
      }
    }
  }
  .foot-item{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 16rpx;
    .expiresStatus{
      flex: 1;
      display: flex;
      justify-content: flex-end;
      padding-top: 16rpx;
      :deep(){
        .custom-guoqi{
          height: 60rpx;
          font-family: PingFangSC, PingFang SC;
          background: rgba(255, 0, 87, 0.1);
          border-radius: 16rpx;
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: 28rpx;
          color: #FF0057;
          line-height: 28rpx;
          font-style: normal;
        }
      }
    }
  }
}
.action{
  height: 100%;
  width: 128rpx;
  background: #FF0057;
  border-radius: 0rpx 16rpx 16rpx 0rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  text{
    font-size: 32rpx;
    color: #FFFFFF;
  }
  view{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 20rpx;
    color: rgba(255,255,255,0.85);
    line-height: 20rpx;
  }
}
</style>
