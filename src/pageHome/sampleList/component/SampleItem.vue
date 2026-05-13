<script setup lang="ts">
import { getPickUrl } from '@/api/product'

const { item } = defineProps<Props>()
interface Props {
  item: any
}

const statusMap: { [key: number]: string } = {
  1: '申请样品',
  2: '审核通过',
  3: '审核驳回',
  4: '已发货',
  5: '运输中',
  6: '已到货',
  7: '确认收货',
  8: '拒绝发货',
  9: '已关闭',
  10: '物流异常',
  11: '完成带货',
  12: '未完成带货',
}

function toDetails() {
  uni.navigateTo({
    url: `/pageHome/sampleDetails/index?id=${item.id}`,
  })
}
function toHomeDetails() {
  uni.navigateTo({
    url: `/pageHome/details/index?productId=${item.productId}&activityId=${item.activityId}`,
  })
}
function copyId() {
  getPickUrl({ productId: item.productId, activityId: item.activityId }).then((res) => {
    if (res.code === 0) {
      uni.setClipboardData({
        data: res.data,
        success() {
          console.log('success')
        },
      })
    }
  })
}
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
  <view class="car-item">
    <view
      class="status"
      :class="{
        'status-ing': item.status === 1,
        'status-success': item.status === 2 || item.status === 4 || item.status === 5 || item.status === 10,
        'status-refuse': item.status === 3 || item.status === 8,
        'status-apply': item.status === 6 || item.status === 7 }"
    >
      <view class="status-left">
        <view />
      </view>
      <view class="status-right">
        <view />
      </view>
      {{ statusMap[item.status] }}
    </view>
    <view v-if="item.logisticsOrder" class="order">
      <view>物流单号</view>
      <view>
        <text>{{ item.logisticsOrder }}</text>
        <text class="iconfont icon-copy" @click.stop="copyOrder(item.logisticsOrder)" />
      </view>
    </view>
    <view v-else class="order">
      <view>订单号</view>
      <view>{{ item.applyOrderId }}</view>
    </view>
    <view class="item-content" @click="toHomeDetails">
      <view class="item-left">
        <image :src="item.productImg" />
      </view>
      <view class="item-right">
        <view class="item-title">
          <wd-text v-if="item.trafficType" :text="item.productName" color="#000000" :lines="2" size="28rpx">
            <template #prefix>
              <text style="display: inline-flex;gap: 6rpx;">
                <text v-if="item.trafficType.includes('1')" class="warningmark">
                  随心推
                </text>
                <text v-if="item.trafficType.includes('2')" class="primarymark">
                  千川全域
                </text>
              </text>
            </template>
          </wd-text>
          <wd-text v-else :text="item.productName" color="#000000" :lines="2" size="28rpx" />
        </view>
        <view class="item-cost">
          <view>
            <view>价格</view>
            <view>
              <wd-text :text="item.price">
                <template #prefix>
                  <text class="prefix">¥</text>
                </template>
              </wd-text>
            </view>
          </view>
          <view>
            <view>高佣</view>
            <view>
              <wd-text :text="item.kolCosRatio">
                <template #suffix>
                  <text class="suffix">%</text>
                </template>
              </wd-text>
            </view>
          </view>
          <view>
            <view>每单补</view>
            <view>
              <wd-text :text="item.kolServiceFee" />
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="item-foot">
      <view class="foot-left">
        <view class="foot-user">
          <image :src="item.avatar" />
          <view>{{ item.nickName }}</view>
        </view>
        <view class="createTime">
          {{ item.createTime }}
        </view>
      </view>
      <view class="foot-right">
        <wd-button type="text" @click="copyId">
          <text class="iconfont icon-rotate xuanz" />
          复制链接
        </wd-button>
        <view class="line" />
        <wd-button type="text" @click="toDetails">
          查看详情
          <text class="iconfont icon-into" />
        </wd-button>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.car-item{
  background-color: #fff;
  padding: 32rpx;
  border-radius: 16rpx;
  overflow: hidden;
  margin-bottom: 24rpx;
  position: relative;
  .status{
    position: absolute;
    top: 0;
    right: 0;
    height: 52rpx;
    line-height: 52rpx;
    text-align: center;
    background: rgba(14,99,255,0.1);
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 24rpx;
    color: #0E63FF;
    border-radius: 0 16rpx 0 16rpx;
    padding: 0 24rpx;
    .status-left{
      position: absolute;
      width: 16rpx;
      height: 16rpx;
      top: 0;
      left: -16rpx;
      background-color: rgba(14,99,255,0.1);
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
      background-color: rgba(14,99,255,0.1);
      view{
        width: 16rpx;
        height: 16rpx;
        border-radius: 0 60rpx 0 0;
        background-color: #fff;
      }
    }
  }
  .status-ing{
    color: #0E63FF;
    background: rgba(14,99,255,0.1);
    .status-left{
      background-color: rgba(14,99,255,0.1);
    }
    .status-right{
      background-color: rgba(14,99,255,0.1);
    }
  }
  .status-success{
    color: #8120E8;
    background: rgba(129, 32, 232, 0.1);
    .status-left{
      background-color: rgba(129, 32, 232,0.1);
    }
    .status-right{
      background-color: rgba(129, 32, 232,0.1);
    }
  }
  .status-refuse{
    color: #FF0057;
    background: rgba(255, 0, 87, 0.1);
    .status-left{
      background-color: rgba(255, 0, 87,0.1);
    }
    .status-right{
      background-color: rgba(255, 0, 87,0.1);
    }
  }
  .status-apply{
    color: #0D9C37;
    background: rgba(13, 156, 55, 0.1);
    .status-left{
      background-color: rgba(13, 156, 55,0.1);
    }
    .status-right{
      background-color: rgba(13, 156, 55,0.1);
    }
  }
  .order{
    view:nth-child(1){
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 24rpx;
      color: #999999;
      line-height: 24rpx;
    }
    view:nth-child(2){
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 28rpx;
      color: #666666;
      line-height: 28rpx;
      margin-top: 12rpx;
    }
    .iconfont{
      font-size: 26rpx;
      color: #999999;
      margin-left: 16rpx;
    }
  }
  .item-content{
    display: flex;
    gap: 30rpx;
    align-items: center;
    margin-top: 24rpx;
    .item-left{
      image{
        width: 180rpx;
        height: 180rpx;
        border-radius: 16rpx;
      }
    }
    .item-right{
      flex: 1;
      .item-title{
        :deep(){
          .wd-text{
            flex: 1;
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 28rpx;
            color: #111111;
            line-height: 40rpx;
          }
        }
        .warningmark{
          padding: 2rpx 12rpx;
          border-radius: 12rpx 4rpx 12rpx 4rpx;
          background: #f24e88;
          font-size: 20rpx;
          display: inline-block;
          color: rgb(255, 255, 255);
          transition: opacity .3s;
          vertical-align: middle;
          line-height: initial;
          margin-right: 6rpx;
        }
        .primarymark{
          padding: 2rpx 12rpx;
          border-radius: 12rpx 4rpx 12rpx 4rpx;
          background: #5d2ed9;
          font-size: 20rpx;
          display: inline-block;
          color: rgb(255, 255, 255);
          transition: opacity .3s;
          vertical-align: middle;
          line-height: initial;
          margin-right: 6rpx;
        }
      }
      .item-cost{
        display: flex;
        justify-content: space-between;
        margin-top: 32rpx;
        view{
          view:nth-child(1){
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 24rpx;
            color: #999999;
            line-height: 24rpx;
          }
          view:nth-child(2){
            margin-top: 12rpx;
            display: flex;
            gap: 8rpx;
            :deep(){
              .wd-text{
                font-family: PingFangSC, PingFang SC;
                font-weight: 600;
                font-size: 32rpx;
                color: #FF0057;
                line-height: 32rpx;
                text-align: left;
                font-style: normal;
              }
            }
            .suffix{
              font-family: PingFangSC, PingFang SC;
              font-weight: 600;
              font-size: 24rpx;
              color: #FF0057;
              line-height: 40rpx;
              text-align: left;
              font-style: normal;
            }
            .prefix{
              font-family: PingFangSC, PingFang SC;
              font-weight: 600;
              font-size: 24rpx;
              color: #FF0057;
              line-height: 40rpx;
              text-align: left;
              font-style: normal;
            }
          }
          .amount{
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 20rpx;
            color: #666666;
            line-height: 20rpx;
            padding: 6rpx 10rpx;
            background: #F8F8F8;
            border-radius: 6rpx;
          }
        }
      }
    }
  }
  .item-foot{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 32rpx;
    .foot-left{
      .foot-user{
        display: flex;
        align-items: center;
        gap: 8rpx;
        image{
          width: 40rpx;
          height: 40rpx;
          border-radius: 20rpx;
        }
        view{
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 20rpx;
          color: #000000;
          line-height: 20rpx;
        }
      }
      .createTime{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #000000;
        line-height: 24rpx;
        margin-top: 16rpx;
      }
    }
    .foot-right{
      display: flex;
      align-items: center;
      gap: 24rpx;
      :deep(){
        .wd-button__text{
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: 28rpx;
          color: #FF0057;
          line-height: 28rpx;
        }
      }
      .xuanz{
        display: inline-block;
        font-size: 22rpx;
        color: rgba(255, 0, 87, 0.45);
        transform: rotate(-45deg); /* 逆时针旋转 45 度 */
        transform-origin: center; /* 设置旋转中心为元素的中心 */
      }
      .iconfont{
        display: inline-block;
        font-size: 24rpx;
        color: rgba(255, 0, 87, 0.45);
      }
      .line{
        width: 2rpx;
        height: 12rpx;
        background-color: rgba(255, 0, 87, 0.25);
      }
    }
  }
}
</style>
