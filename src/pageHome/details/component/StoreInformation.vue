<script setup lang="ts">
import SafeguardPopup from './SafeguardPopup.vue'
import type { ProductDetail } from '@/types/common'

interface MyProps {
  detailData: ProductDetail
  dictList: any[]
}
const props = withDefaults(defineProps<MyProps>(), {
})

const safeguardPopupRef = ref()

const safeguardService = computed(() => {
  return props.detailData.safeguardService || ''
})

const dicts = computed(() => {
  const list = props.dictList.filter((e) => {
    return safeguardService.value.includes(e.dictValue)
  })
  return list
})

const dictNames = computed(() => {
  const names = dicts.value.map((e) => {
    return e.dictLabel
  })
  return names.join(',')
})

function showDic() {
  safeguardPopupRef.value.open()
}

function toStore() {
  uni.navigateTo({
    url: `/pageHome/storeDetails/index?shopId=${props.detailData.shopId}`,
  })
}
// function toKefu() {
//   if (props.detailData.merchantKefuUrl) {
//     wx.openCustomerServiceChat({
//       extInfo: { url: props.detailData.merchantKefuUrl },
//       corpId: 'wwca77aaa53e45d173',
//       success(res) {
//         console.log('打开客服会话成功', res)
//       },
//       fail(err) {
//         console.log('打开客服会话失败', err)
//       },
//     })
//   }
// }
</script>

<script lang="ts">
export default {
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
function filterScore(value: string) {
  const scoreMap: Record<string, string> = {
    物流体验分: '物流',
    商品体验分: '商品',
    商家服务分: '服务',
    商家体验分: '体验',
  }
  return scoreMap[value] || value
}
</script>

<template>
  <view class="store-title">
    商品信息
  </view>
  <view class="storewarp">
    <view class="name-box" @click="toStore">
      <!-- <view>
        <wd-img width="74rpx" height="74rpx" round :src="viteimg" />
      </view> -->
      <view class="store-information">
        <view class="store-name">
          <view class="store-left">
            <!-- <view class="left-label">
              店铺 ·
            </view> -->
            <view class="left-name">
              {{ props.detailData.shopName }}
            </view>
          </view>
          <text class="iconfont icon-into" />
        </view>
        <view class="sales">
          <text class="sales-label">
            销量
          </text>
          <text class="sales-num">
            {{ formatNumber(props.detailData.shopSales) }}+
          </text>
        </view>
        <view class="score">
          <view v-for="item in props.detailData.shopScores" :key="item.id" class="score-item">
            <text class="score-label">
              {{ filterScore(item.text) }}
            </text>
            <text class="score-num">
              {{ item.score === '0' || item.score === 0 ? '--' : item.score }}分
            </text>
          </view>
        </view>
      </view>
    </view>
    <view class="cell-box">
      <wd-cell v-if="props.detailData.fedex" title="发货快递" center custom-value-class="cell-right" custom-title-class="cell-left" :value="props.detailData.fedex" />
      <wd-cell v-if="props.detailData.logisticsText" title="发货信息" center custom-value-class="cell-right" custom-title-class="cell-left" :value="props.detailData.logisticsText" />
      <wd-cell v-if="props.detailData.nonShippingArea" title="不发货地区" center custom-value-class="cell-right" custom-title-class="cell-left" :value="props.detailData.nonShippingArea" />
    </view>
    <view v-if="props.detailData.safeguardService" class="cell-box">
      <wd-cell title="保障" center custom-value-class="cell-right1" custom-title-class="cell-left" :value="dictNames" is-link @click="showDic" />
    </view>
    <!-- <view class="cell-box">
      <wd-cell title="联系招商" center custom-value-class="cell-right1" custom-title-class="cell-left" :value="props.detailData.merchantNickName" is-link @click="toKefu" />
    </view> -->
    <view v-if="props.detailData.sampleType === 2 && props.detailData.remark" class="cell-box">
      <wd-cell title="备注" center custom-value-class="cell-right1" custom-title-class="cell-left" :value="props.detailData.remark" />
    </view>
  </view>
  <SafeguardPopup ref="safeguardPopupRef" :dicts="dicts" />
</template>

<style lang="scss" scoped>
.store-title{
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 28rpx;
  color: #000000;
  line-height: 28rpx;
  font-style: normal;
  margin: 32rpx 0 24rpx 0;
}
.storewarp {
  background-color: #fff;
  border-radius: 16rpx;
  padding-top: 24rpx;
  .name-box{
    display: flex;
    align-items: center;
    height: 144rpx;
    background-color: rgba(0,0,0,0.02);
    margin: 0 24rpx;
    border-radius: 16rpx;
    padding-right: 10rpx;
    .store-information{
      flex: 1;
      padding-left: 18rpx;
    }
    .store-name{
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      view{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #111111;
        line-height: 28rpx;
        text-align: left;
        font-style: normal;
      }
      text{
        font-size: 20rpx;
        color: #BABABA;
      }
      .store-left{
        display: flex;
        align-items: center;
        gap: 8rpx;
        .left-label{
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 28rpx;
          color: #111111;
          line-height: 28rpx;
          text-align: left;
          font-style: normal;
        }
        .left-name{
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 28rpx;
          color: #111111;
          line-height: 28rpx;
          text-align: left;
          font-style: normal;
        }
      }
    }
    .sales{
      margin-top: 8rpx;
      font-size: 20rpx;
      text-align: left;
      .sales-label{
        color: #999999;
      }
      .sales-num{
        color: #444444;
        margin-left: 2rpx;
      }
    }
    .score{
      display: flex;
      font-size: 20rpx;
      margin-top: 12rpx;
      .score-item{
        flex: 1;
        text-align: left;
        .score-label{
          color: #999999;
        }
        .score-num{
          color: #444444;
          margin-left: 2rpx;
        }
      }
    }
  }
  .cell-box{
    overflow: hidden;
    position: relative;
    padding: 0 30rpx 0 0;
    :deep(){
      .wd-cell__wrapper{
        padding: 0;
        height: 80rpx;
      }
      .wd-cell__right{
        flex: none;
      }
      .cell-left{
        width: 160rpx;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #999999;
        line-height: 28rpx;
        font-style: normal;
      }
      .wd-text{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #999999;
        line-height: 28rpx;
        font-style: normal;
      }
      .cell-right{
        width: 400rpx;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #333333;
        line-height: 28rpx;
        font-style: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .cell-right1{
        width: 400rpx;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #333333;
        font-style: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .action{
      position: absolute;
      text-align: center;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 64rpx;
      line-height: 64rpx;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 24rpx;
      color: #999999;
      font-style: normal;
      background-color: #fff;
    }
  }
  .cell-box-show{
    height: auto;
  }
}
</style>
