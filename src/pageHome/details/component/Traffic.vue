<script setup lang="ts">
import { useMessage } from 'wot-design-uni'
import type { ProductDetail, Sample } from '@/types/common'
import { productTrafficSignup } from '@/api/product'

interface MyProps {
  detailData: ProductDetail
  toast: any
}
const props = withDefaults(defineProps<MyProps>(), {
})
const emit = defineEmits(['updateJoinTraffic'])
const message = useMessage('canyu')

function toApplyTraffic() {
  message.confirm({
    title: '参与提醒',
    cancelButtonText: '暂不参与',
    confirmButtonText: '我要参与',
    cancelButtonProps: {
      customClass: 'custom-shadow1',
    },
    confirmButtonProps: {
      customClass: 'custom-shadow',
    },

  }).then(() => {
    productTrafficSignup({
      activityId: props.detailData.schema.activityId,
      productId: props.detailData.schema.productId,
    }).then((res) => {
      if (res.code === 0) {
        props.toast.success('参与成功')
        emit('updateJoinTraffic', 1)
      }
    })
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
  <view class="detail-demand">
    <view class="demand-title">
      <view class="title">
        投流描述
      </view>
      <view v-if="props.detailData.schema.joinTraffic === 1" class="canyu">
        已参与
      </view>
    </view>
    <view class="guigebox">
      <view class="guige">
        <view>{{ props.detailData.schema.trafficWay }}</view>
        <wd-button v-if="props.detailData.schema.joinTraffic === 0" size="small" @click="toApplyTraffic">
          参与投流
        </wd-button>
      </view>
    </view>
  </view>
  <wd-message-box selector="canyu" custom-class="canyumsg">
    <view class="canyu-box">
      点击参与后，请到 <text class="canyu-text">“我的 — 我的投流”</text> 列表中查看，并上传投流信息
    </view>
  </wd-message-box>
</template>

<style lang="scss" scoped>
.detail-demand{
  padding: 32rpx 24rpx 16rpx 24rpx;
  background: #fff;
  border-radius: 16rpx;
  margin-top: 24rpx;
  .demand-title{
    margin-bottom: 12rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title{
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 28rpx;
      color: #000000;
      line-height: 28rpx;
      font-style: normal;
    }
    .canyu{
      font-family: PingFangSC, PingFang SC;
      font-weight: bold;
      font-size: 24rpx;
      color: #444444;
      line-height: 24rpx;
      font-style: normal;
    }

  }
  .guigebox{
    background-color: #FFFFFF;
    border-radius: 16rpx;
  }
  .guige{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24rpx;
    min-height: 60rpx;
    font-size: 28rpx;
    font-style: normal;
    view:nth-child(1){
      color: #999999;
      flex: 1;
    }
    view:nth-child(2){
      color: #111111;
      text{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #BABABA;
        line-height: 28rpx;
        font-style: normal;
      }
    }
    :deep(){
      .wd-button{
        background-color: #FF0056 !important;
        color: #fff !important;
        font-size: 26rpx !important;
        line-height: 24rpx !important;
        font-family: PingFangSC, PingFang SC !important;
        font-weight: 400 !important;
      }
    }
  }
}
.canyu-box{
  margin: 40rpx 0;
  line-height: 1.8;
  .canyu-text{
    font-weight: bold;
  }
}
</style>

<style lang="scss">
.custom-shadow{
  background-color: #FF0057 !important;
}
.canyumsg{
  .wd-message-box__body{
    padding: 30rpx 30rpx 0 30rpx !important;
  }
  .wd-message-box__actions{
    padding-top: 36rpx !important;
  }
  .wd-message-box__content{
    max-height: 640rpx !important;
  }
}
</style>
