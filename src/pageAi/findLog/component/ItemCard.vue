<script setup lang="ts">
import { useMessage, useToast } from 'wot-design-uni'
import { productLogUrgent } from '@/api/productfind'

interface Props {
  item: any
}
const props = withDefaults(defineProps<Props>(), {})
const localItem = ref({ ...props.item })
const imgurl = computed(() => {
  return props.item.uploadProductImg.split(',')[0]
})
const message = useMessage('urgent')
const { success: showSuccess } = useToast()
function onUrgent() {
  message.confirm({
    msg: '确认加急吗?',
    title: '提示',
    cancelButtonProps: {
      customClass: 'custom-shadow1',
    },
    confirmButtonProps: {
      customClass: 'custom-shadow',
    },

  }).then(() => {
    productLogUrgent({
      id: props.item.id,
    }).then((res) => {
      if (res.code === 0) {
        showSuccess(res.msg)
        localItem.value.urgent = '2'
      }
    })
  }).catch(() => {
    console.log('点击了取消按钮')
  })
}

function toDetail() {
  uni.navigateTo({
    url: `/pageHome/details/index?productId=${localItem.value.productId}&activityId=${localItem.value.activityId}`,
  })
}

function imgClick() {
  const list = props.item.uploadProductImg.split(',')
  uni.previewImage({
    current: 0,
    urls: list,
  })
}
function onReason() {
  message.alert({
    msg: localItem.value.auditRemark,
    title: '查看原因',
    confirmButtonText: '知道了',
    confirmButtonProps: {
      customClass: 'custom-shadow',
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
  <view class="store-card">
    <view
      class="cardtype" :class="{
        zhuanshu: localItem.productType === 2,
        gongkai: localItem.productType === 1,
      }
      "
    >
      {{ localItem.productType === 2 ? '专属' : '公开' }}
    </view>
    <view
      class="status"
      :class="{
        'status-shenqing': localItem.status === '1',
        'status-jinxin': localItem.status === '2',
        'status-wancheng': localItem.status === '3',
        'status-jujue': localItem.status === '4',
      }"
    >
      <view class="status-left">
        <view />
      </view>
      <view class="status-right">
        <view />
      </view>
      {{ localItem.status === '1' ? '审核中' : localItem.status === '2' ? '进行中' : localItem.status === '3' ? '已完成' : '已拒绝' }}
    </view>
    <view class="store-box">
      <image :src="imgurl" @click="imgClick" />
      <view class="store-right">
        <view class="store-name">
          <view class="store-name-left">
            店铺名称：
          </view>
          <view class="store-name-right">
            {{ localItem.shopName }}
          </view>
        </view>
        <view class="store-name" style="margin-top: 20rpx;">
          <view class="store-name-left">
            商品信息：
          </view>
          <view class="store-name-right productName">
            {{ localItem.productName }}
          </view>
        </view>
        <view class="foot-box">
          <view class="ctime">
            {{ localItem.createTime }}
          </view>
          <view class="btn-box">
            <wd-button
              v-if="localItem.status === '1'"
              :disabled="localItem.urgent === '2'" size="small" @click="onUrgent"
            >
              {{ localItem.urgent === '1' ? '加急找品' : '已加急' }}
            </wd-button>
            <view v-if="localItem.status === '3'" class="detail" @click="toDetail">
              <text class="text">查看商品</text>
              <text class="iconfont icon-into" />
            </view>
            <view v-if="localItem.status === '4'" class="detail" @click="onReason">
              <text class="text">查看原因</text>
              <text class="iconfont icon-into" />
            </view>
          </view>
        </view>
      </view>
    </view>
    <wd-message-box selector="urgent" />
  </view>
</template>

<style lang="scss" scoped>
.store-card{
  background-color: #fff;
  border-radius: 16rpx;
  margin-bottom: 24rpx;
  padding: 32rpx 24rpx;
  position: relative;
  overflow: hidden;
}
.cardtype{
  width: 100rpx;
  height: 40rpx;
  text-align: center;
  line-height: 40rpx;
  // 沿着中心旋转45度
  transform: rotate(-45deg);
  position: absolute;
  top: 4rpx;
  left: -30rpx;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 20rpx;
  color: #FFFFFF;
  font-style: normal;
}
.zhuanshu{
  background: #fa4350;
}
.gongkai{
  background-color: #4D80F0;
}
.status{
  position: absolute;
  top: 0;
  right: 0;
  width: 120rpx;
  height: 52rpx;
  line-height: 52rpx;
  text-align: center;
  background: rgba(14,99,255,0.05);
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 28rpx;
  color: #0E63FF;
  font-style: normal;
  border-radius: 0 16rpx 0 10rpx;
  .status-left{
    position: absolute;
    width: 16rpx;
    height: 16rpx;
    top: 0;
    left: -16rpx;
    background-color: rgba(14,99,255,0.05);
    view{
      width: 16rpx;
      height: 16rpx;
      border-radius: 0 60rpx 0 0;
      background-color: #fff;
    }
  }
  .status-right{
    position: absolute;
    width: 16rpx;
    height: 16rpx;
    right: 0;
    bottom: -16rpx;
    background-color: rgba(14,99,255,0.05);
    view{
      width: 16rpx;
      height: 16rpx;
      border-radius: 0 60rpx 0 0;
      background-color: #fff;
    }
  }
}
.status-jinxin{
  background: rgba(0,167,166,0.05);
  color: #00A7A6;
  .status-left{
    background-color: rgba(0,167,166,0.05);
  }
  .status-right{
    background-color: rgba(0,167,166,0.05);
  }
}
.status-jujue{
  background: rgba(255, 0, 87, 0.05);
  color: #FF0057;
  .status-left{
    background-color: rgba(255, 0, 87, 0.05);
  }
  .status-right{
    background-color: rgba(255, 0, 87, 0.05);
  }
}
.status-shenqing{
  background: rgba(14, 99, 255, 0.05);
  color: rgba(14, 99, 255, 1);
  .status-left{
    background-color: rgba(14, 99, 255, 0.05);
  }
  .status-right{
    background-color: rgba(14, 99, 255, 0.05);
  }
}
.status-wancheng{
  background: rgba(13, 156, 55, 0.05);
  color: #0D9C37;
  .status-left{
    background-color: rgba(13, 156, 55, 0.05);
  }
  .status-right{
    background-color: rgba(13, 156, 55, 0.05);
  }
}
.store-box{
  display: flex;
  gap: 22rpx;
  image{
    width: 128rpx;
    height: 128rpx;
    border-radius: 16rpx;
  }
  .store-right{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
     .foot-box{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 12rpx;
        :deep(){
          .wd-text{
            flex: 1;
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 28rpx;
            color: #111111;
            line-height: 40rpx;
            font-style: normal;
          }
        }
        .ctime{
          font-family: PingFangSC, PingFang SC;
          font-size: 20rpx;
          color: #666666;
          line-height: 24rpx;
          font-style: normal;

        }
        .btn-box{
          line-height: 24rpx;
          :deep(){
            .wd-button{
              width: 116rpx;
              height: 46rpx;
              background: #FF0057;
              border-radius: 12rpx;
              font-family: PingFangSC, PingFang SC;
              font-weight: 500;
              font-size: 24rpx;
              color: #FFFFFF;
              line-height: 24rpx;
              text-align: left;
              font-style: normal;
            }
          }
          .detail{
            display: flex;
            align-items: center;
            gap: 8rpx;
            .text{
              font-family: PingFangSC, PingFang SC;
              font-weight: 400;
              font-size: 24rpx;
              color: #AAAAAA;
              line-height: 40rpx;
              font-style: normal;
            }
            .iconfont{
              font-size: 24rpx;
              color: #DADADA;
              line-height: 40rpx;
              font-style: normal;
            }
          }
        }
      }
    .store-name{
      display: flex;
      align-items: center;
      .store-name-left{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #999999;
        line-height: 24rpx;
        font-style: normal;
        min-width: 120rpx;
      }
      .store-name-right{
        flex: 1;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #666666;
        line-height: 24rpx;
        font-style: normal;
      }
      .productName{
        line-height: 1.2;
      }
    }
  }
}
</style>

<style lang="scss">
.custom-shadow{
  background-color: #FF0057 !important;
}
</style>
