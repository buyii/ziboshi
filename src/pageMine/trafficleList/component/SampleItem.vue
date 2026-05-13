<script setup lang="ts">
import { getPickUrl } from '@/api/product'
import type { Sample } from '@/types/common'

const { item } = defineProps<Props>()
interface Props {
  item: any
}

const statusMap: { [key: number]: string } = {
  1: '已报名',
  2: '已上传',
  3: '已上传',
  4: '已投流',
  5: '已拒绝',
}

const userStore = useUserStore()

function uploadLink(type: string) {
  const data: Sample = {
    activityId: item.activityId, // 活动id
    productId: item.productId, // 商品id
    productName: item.productName, // 商品名称
    cover: item.productImg, // 商品封面
    price: item.price, // 商品价格
    focKolCosFee: item.kolCosFee, // KOL佣金比例
    kolFocServiceFee: item.kolServiceFee, // KOL推广比例
    kolLevel: item.kolLevel, // 达人等级
    kolGmv: item.kolGmv, // 达人总GMV
    kolShopSale: item.kolShopSale, // 达人总橱销
    monthShopSale: item.monthShopSale, // 月销量
    sampleStock: item.sampleStock, // 申样库存
    sku: null,
  }
  userStore.setSampleData(data)
  uni.navigateTo({
    url: `/pageHome/applyTraffic/index?id=${item.id}&type=${type}`,
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
        'status-success': item.status === 2 || item.status === 3,
        'status-apply': item.status === 4,
        'status-refuse': item.status === 5,
      }"
    >
      <view class="status-left">
        <view />
      </view>
      <view class="status-right">
        <view />
      </view>
      {{ statusMap[item.status] }}
    </view>
    <view v-if="item.douyinId" class="order">
      <view>投流抖音号</view>
      <view>{{ item.douyinId }}</view>
    </view>
    <view class="item-content">
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
        <view v-if="item.status === 1" class="item-cost1">
          <wd-button custom-class="custom-btntext" @click="uploadLink('1')">
            上传链接
          </wd-button>
        </view>
        <view v-else class="item-cost">
          <view class="cost1">
            <view>合作码：{{ item.coopCode }}</view>
            <wd-button size="small" custom-class="custom-btntext" @click="uploadLink('2')">
              再次申请
            </wd-button>
          </view>
          <view v-if="item.trafficRemark">
            备注：{{ item.trafficRemark }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.car-item{
  background-color: #fff;
  padding: 24rpx;
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
    display: flex;
    gap: 12rpx;
    align-items: center;
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
      font-size: 26rpx;
      color: #666666;
      line-height: 26rpx;
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
        margin-top: 16rpx;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #999999;
        line-height: 24rpx;
        .cost1{
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16rpx;
          :deep(){
            .custom-btntext{
              font-family: PingFangSC, PingFang SC;
              background: rgba(255, 0, 87, 0.1);
              border-radius: 10rpx;
              font-family: PingFangSC, PingFang SC;
              font-weight: 500;
              font-size: 24rpx;
              color: #FF0057;
              line-height: 24rpx;
              font-style: normal;
            }
          }
        }
      }
      .item-cost1{
        margin-top: 16rpx;
        display: flex;
        justify-content: flex-end;
        :deep(){
          .custom-btntext{
            font-family: PingFangSC, PingFang SC;
            background: rgba(255, 0, 87, 0.1);
            border-radius: 10rpx;
            font-family: PingFangSC, PingFang SC;
            font-weight: 500;
            font-size: 24rpx;
            color: #FF0057;
            line-height: 24rpx;
            font-style: normal;
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
