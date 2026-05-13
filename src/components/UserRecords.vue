<script setup lang="ts">
interface RecordItem {
  userId: string // 用户id
  userName: string // 用户名称
  userCode: string // 用户code
  avatar: string // 头像
  kolFocServiceFee: string // 预估每单补
  focAgentFee: string // 分红
  effectKolFocServiceFee: string // 有效补贴
  paySuccessTime: string // 支付时间
}
interface Props {
  item: RecordItem
  isTeam?: string
  startTime?: string
  endTime?: string
}

const props = withDefaults(defineProps<Props>(), {
  isTeam: '',
})

function toDetails() {
  const userId = props.item.userId
  uni.navigateTo({
    url: `/pageRank/incomeTeamDetails/index?type=team&userId=${userId}&&isTeam=${props.isTeam}&startTime=${props.startTime}&endTime=${props.endTime}`,
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
  <view class="records-month" @click="toDetails">
    <view class="month-item">
      <view class="item-left">
        <image v-if="props.item.avatar" :src="props.item.avatar" />
        <image v-else src="../static/deftx.png" />
        <view class="item-info">
          <view class="item-title">
            <view>{{ props.item.userName }}</view>
            <view>ID·{{ props.item.userCode }}</view>
          </view>
        </view>
      </view>
      <view class="item-right">
        <view>
          <DigitBold :value="props.item.kolFocServiceFee" int-size="28rpx" decimal-size="28rpx" color="#444444" />
          <view class="item-right-label">
            用户全部补贴
          </view>
        </view>
      </view>
      <view class="item-right">
        <view>
          <DigitBold :value="props.item.focAgentFee" int-size="32rpx" decimal-size="26rpx" color="#444444" />
          <view class="item-right-label">
            我的全部分红
          </view>
        </view>
        <text class="iconfont icon-into" />
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.records-month{
  background-color: #fff;
  border-radius: 16rpx;
  .month-item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 32rpx;
    .item-left{
      display: flex;
      align-items: center;
      gap: 20rpx;
      image{
        width: 88rpx;
        height: 88rpx;
        border-radius: 72rpx;
      }
      .item-info{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .item-title{
          view:nth-child(1){
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 24rpx;
            color: #111111;
            line-height: 24rpx;
          }
          view:nth-child(2){
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 20rpx;
            color: #999999;
            line-height: 20rpx;
            margin-top: 14rpx;
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
