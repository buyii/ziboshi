<script setup lang="ts">
import { useMessage } from 'wot-design-uni'
import type { Item } from '../type'

import ItemContent from './ItemContent.vue'

interface Props {
  isBatch?: boolean
  item: Item
}

const props = withDefaults(defineProps<Props>(), {
  isBatch: false,
})
const emit = defineEmits(['onDel'])
const message = useMessage('itemmsgbox')
const checkbox = defineModel<boolean>('checkbox', {
  required: true,
})

function toDetails() {
  if (props.isBatch) {
    checkbox.value = !checkbox.value
  }
  else {
    uni.navigateTo({
      url: `/pageHome/details/index?productId=${props.item.productId}&activityId=${props.item.activityId}`,
    })
  }
}
function onDel() {
  message.confirm({
    msg: '确认删除?',
    title: '提示',
    cancelButtonProps: {
      customClass: 'custom-shadow1',
    },
    confirmButtonProps: {
      customClass: 'custom-shadow',
    },
  }).then(() => {
    emit('onDel', props.item)
  }).catch(() => {
    console.log('点击了取消按钮')
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
  <view class="car-warper">
    <wd-swipe-action>
      <view class="car-item">
        <view class="item-content">
          <view v-if="isBatch" class="item-checkbox">
            <wd-checkbox v-model="checkbox" size="large" shape="square" checked-color="#FF0057" />
          </view>
          <ItemContent :item="props.item" @on-to-details="toDetails" />
        </view>
      </view>
      <template #right>
        <view class="action" @click="onDel">
          <text class="iconfont icon-deletedSlide" />
          <view>删除</view>
        </view>
      </template>
    </wd-swipe-action>
  </view>
  <wd-message-box selector="itemmsgbox" />
</template>

<style lang="scss" scoped>
.car-warper{
  margin-top: 24rpx;
  clip-path: inset(0 round 18rpx); // 强制裁剪为圆角
  overflow: hidden;
  background-color: #FF0057;
}
.car-item{
  background-color: #fff;
  padding: 32rpx;
  border-radius: 16rpx;
  overflow: hidden;
  .item-content{
    display: flex;
    align-items: center;
    .item-checkbox{
      margin-right: 30rpx;
    }
    .item-left{
      image{
        width: 192rpx;
        height: 192rpx;
        background: linear-gradient( 180deg, #FAFAFA 0%, #F4F4F4 100%);
        border-radius: 16rpx;
      }
      .item-num{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #999999;
        line-height: 24rpx;
        margin-top: 16rpx;
      }
    }
    .item-right{
      flex: 1;
      .item-title{
        :deep(){
          .wd-text{
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 28rpx;
            color: #111111;
            line-height: 40rpx;
          }
        }
      }
      .item-cost{
        display: flex;
        justify-content: space-between;
        margin-top: 36rpx;
        view{
          view:nth-child(1){
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 24rpx;
            color: #999999;
            line-height: 24rpx;
            margin-bottom: 12rpx;
          }
          view:nth-child(3){
            margin-top: 16rpx;
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 20rpx;
            color: #666666;
            line-height: 20rpx;
            padding: 6rpx 20rpx;
            background: #F8F8F8;
            border-radius: 16rpx;
          }
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

<style lang="scss">
.custom-shadow{
  background-color: #FF0057 !important;
}
</style>
