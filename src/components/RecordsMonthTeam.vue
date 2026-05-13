<script setup lang="ts">
interface RecordItem {
  orderNumber: string // 订单流水号
  orderCount: string // 单量
  productId: string // 商品id
  productName: string // 商品名称
  productImg: string // 商品图片
  kolFocServiceFee: number // 预估推广补贴
  paySuccessTime: string // 支付成功时间
  totalPayAmount: string // 总GMV
  kolFocCosFee: string // 总佣金
  focAgentFee: string // 分红
  effectKolFocServiceFee: string // 有效补贴
}
interface Props {
  item: RecordItem
  showRight?: boolean
  userId?: string
  isTeam?: string
  startTime?: string
  endTime?: string
}

const props = withDefaults(defineProps<Props>(), {
  showRight: true,
  userId: '',
  isTeam: '',
})

const userStore = useUserStore()

function toDetails() {
  if (!props.showRight) {
    return
  }
  const productId = props.item.productId
  userStore.setProductData(props.item)
  if (props.userId) {
    uni.navigateTo({
      url: `/pageRank/incomeUserDetails/index?type=user&productId=${productId}&userId=${props.userId}&isTeam=${props.isTeam}&startTime=${props.startTime}&endTime=${props.endTime}`,
    })
  }
  else {
    uni.navigateTo({
      url: `/pageRank/incomeUserDetails/index?type=user&productId=${productId}&isTeam=${props.isTeam}&startTime=${props.startTime}&endTime=${props.endTime}`,
    })
  }
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
  <view class="records-month" @click="toDetails">
    <view class="month-item">
      <view class="item-left">
        <image :src="props.item.productImg" />
        <view class="item-info">
          <view class="item-title">
            <wd-text :text="props.item.productName" :lines="1" />
            <view class="item_id">
              ID: {{ props.item.productId }}
            </view>
          </view>
          <view class="footbox">
            <view>
              <view class="foot-num">
                {{ props.item.totalPayAmount }}
              </view>
              <view class="label-prefix">
                {{ !showRight ? 'GMV' : '全部GMV' }}
              </view>
            </view>
            <view>
              <view class="foot-num">
                {{ props.item.orderCount }}
              </view>
              <view class="label-prefix">
                {{ !showRight ? '单量' : '全部单量' }}
              </view>
            </view>
            <view>
              <view class="foot-num">
                {{ props.item.kolFocServiceFee }}
              </view>
              <view class="label-prefix">
                {{ !showRight ? '补贴' : '全部补贴' }}
              </view>
            </view>
            <view>
              <view class="foot-num">
                {{ props.item.focAgentFee }}
              </view>
              <view class="label-prefix">
                {{ !showRight ? '分红' : '全部分红' }}
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="item-right">
        <text v-if="props.showRight" class="iconfont icon-into" />
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.records-month{
  background-color: #fff;
  border-radius: 16rpx;
  margin-bottom: 24rpx;
  .month-item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24rpx 32rpx;
    .item-left{
      display: flex;
      align-items: center;
      gap: 20rpx;
      image{
        width: 144rpx;
        height: 144rpx;
        border-radius: 16rpx;
      }
      .item-info{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 130rpx;
        .item-title{
          :deep(){
            .wd-text{
              font-family: PingFangSC, PingFang SC;
              font-weight: 400;
              font-size: 24rpx;
              color: #111111;
              line-height: 24rpx;
            }
          }
          .item_id{
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 20rpx;
            color: #999999;
            line-height: 20rpx;
            margin-top: 14rpx;
          }
        }
        .footbox{
          display: flex;
          align-items: center;
          // justify-content: space-around;
          justify-content: space-between;
          padding-right: 30rpx;
          .foot-num{
            font-family: DINAlternate, DINAlternate;
            font-weight: bold;
            font-size: 28rpx;
            color: #222222;
            line-height: 28rpx;
            font-style: normal;
            text-align: center;
          }
          .label-prefix{
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 20rpx;
            color: #BABABA;
            line-height: 20rpx;
            text-align: center;
            margin-top: 6rpx;
          }
        }
      }
    }
    .item-right{
      display: flex;
      align-items: center;
      .item-right-label{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 20rpx;
        color: #999999;
        line-height: 20rpx;
        margin-top: 8rpx;
        text-align: right;
        min-width: 80rpx;
      }
      .iconfont{
        font-size: 24rpx;
        color: #DADADA;
        margin-left: 16rpx;
      }
    }
  }
}
</style>
