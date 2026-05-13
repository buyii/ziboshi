<script setup lang="ts">
import { getIncomeData } from '@/api/mine'
import type { User } from '@/types/common'

interface MyProps {
  userInfo: User // tabs列表
}
const props = withDefaults(defineProps<MyProps>(), {})

const emit = defineEmits(['tabClick'])

interface Data {
  label: string
  value: 'payAmount' | 'payOrderCount' | 'kolFocCosFee' | 'kolFocServiceFee' | 'effectAmount' | 'effectOrderCount' | 'effectKolFocCosFee' | 'effectKolFocServiceFee' | 'settleAmount' | 'settleOrderCount' | 'settleKolFocCosFee' | 'settleKolServiceFee' | 'focAgentFee' | 'effectFocAgentFee' | 'settleAgentFee'
  prefix?: string
  class?: string
  format?: (val: number | string) => number | string
}

const dateRange = ref({
  startTime: '',
  endTime: '',
})

const dataConts = ref({
  payAmount: '',
  payOrderCount: '',
  kolFocCosFee: '',
  kolFocServiceFee: '',
  focAgentFee: '',
  effectAmount: '',
  effectOrderCount: '',
  effectKolFocCosFee: '',
  effectKolFocServiceFee: '',
  effectFocAgentFee: '',
  settleAmount: '',
  settleOrderCount: '',
  settleKolFocCosFee: '',
  settleKolServiceFee: '',
  settleAgentFee: '',
})

const dataTabValue = defineModel()

const tabValue = ref('today')
function tabClick(value: string) {
  tabValue.value = value
  const datas = getRange(value)
  dateRange.value = {
    startTime: datas.start,
    endTime: datas.end,
  }
  getDetail()
}
function toMore() {
  uni.navigateTo({
    url: `/pageMine/myData/index?dataTab=${dataTabValue.value}`,
  })
}
function toRule() {
  uni.navigateTo({
    url: `/pageMine/rulePage/index`,
  })
}
function dataTabClick(value: string) {
  if (props.userInfo.userType !== '03') {
    return
  }
  dataTabValue.value = value
  getDetail()
  emit('tabClick')
}

onMounted(() => {
  tabClick(tabValue.value)
})
function getDetail() {
  getIncomeData({ ...dateRange.value, queryType: dataTabValue.value }).then((res) => {
    if (res.code === 0) {
      dataConts.value = res.data
    }
  })
}

const userList: Data[] = [
  { label: '全部GMV', value: 'payAmount', prefix: '¥', format: formatMineNumber },
  { label: '全部单量', value: 'payOrderCount' },
  { label: '全部佣金', value: 'kolFocCosFee', prefix: '¥', format: formatDecimal },
  { label: '全部补贴', value: 'kolFocServiceFee', prefix: '¥', class: 'redColor', format: formatDecimal },
  { label: '有效GMV', value: 'effectAmount', format: formatMineNumber },
  { label: '有效单量', value: 'effectOrderCount', prefix: '¥' },
  { label: '有效佣金', value: 'effectKolFocCosFee', prefix: '¥', format: formatDecimal },
  { label: '有效补贴', value: 'effectKolFocServiceFee', prefix: '¥', class: 'redColor', format: formatDecimal },
  { label: '结算GMV', value: 'settleAmount', format: formatMineNumber },
  { label: '结算单量', value: 'settleOrderCount', prefix: '¥' },
  { label: '结算佣金', value: 'settleKolFocCosFee', prefix: '¥', format: formatDecimal },
  { label: '结算补贴', value: 'settleKolServiceFee', prefix: '¥', class: 'redColor', format: formatDecimal },
]
const teamList: Data[] = [
  { label: '全部GMV', value: 'payAmount', prefix: '¥', format: formatMineNumber },
  { label: '全部单量', value: 'payOrderCount' },
  { label: '全部补贴', value: 'kolFocServiceFee', prefix: '¥', format: formatDecimal },
  { label: '全部分红', value: 'focAgentFee', prefix: '¥', class: 'redColor', format: formatDecimal },
  { label: '有效GMV', value: 'effectAmount', format: formatMineNumber },
  { label: '有效单量', value: 'effectOrderCount', prefix: '¥' },
  { label: '有效补贴', value: 'effectKolFocServiceFee', prefix: '¥', format: formatDecimal },
  { label: '有效分红', value: 'effectFocAgentFee', prefix: '¥', class: 'redColor', format: formatDecimal },
  { label: '结算GMV', value: 'settleAmount', format: formatMineNumber },
  { label: '结算单量', value: 'settleOrderCount', prefix: '¥' },
  { label: '结算补贴', value: 'settleKolServiceFee', prefix: '¥', format: formatDecimal },
  { label: '结算分红', value: 'settleAgentFee', prefix: '¥', class: 'redColor', format: formatDecimal },
]
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
  <view class="data-wrap">
    <image v-show="dataTabValue === '1'" mode="widthFix" src="../../../static/svg/dataBg.svg" />
    <image v-show="dataTabValue === '2'" mode="widthFix" class="fanzhuang" src="../../../static/svg/dataBg.svg" />
    <view class="top-bg" />
    <view class="data-content">
      <view class="data-tab">
        <view :class="{ active: dataTabValue === '1' }" @click="dataTabClick('1')">
          个人数据
        </view>
        <view :class="{ 'disabled-mtab': userInfo.userType !== '03', 'active': dataTabValue === '2' }" @click="dataTabClick('2')">
          团队数据
        </view>
      </view>
      <view class="totalled-wrap">
        <view class="time-tab">
          <view class="tab-item" :class="{ 'active-tab': tabValue === 'today' }" @click="tabClick('today')">
            今天
          </view>
          <view class="tab-item" :class="{ 'active-tab': tabValue === 'yesterday' }" @click="tabClick('yesterday')">
            昨天
          </view>
          <view class="tab-item" :class="{ 'active-tab': tabValue === 'week' }" @click="tabClick('week')">
            本周
          </view>
          <view class="tab-item" :class="{ 'active-tab': tabValue === 'month' }" @click="tabClick('month')">
            本月
          </view>
          <view
            class="tab-right" @click="toMore"
          >
            <view>更多</view>
            <text class="iconfont icon-into" />
          </view>
          <!-- <view :class="{ 'active-tab': tabValue === 'custom' }" class="custom-tab" @click="tabClick('custom')">
            <text class="iconfont icon-time" />
            <text class="label">自定义</text>
          </view> -->
        </view>
        <view v-if="dataTabValue === '1'" class="data-chart">
          <view v-for="item in userList" :key="item.label" class="data-item">
            <view>{{ item.label }}</view>
            <view v-if="item.value === 'settleKolFocCosFee'">
              --
            </view>
            <view v-else :class="item.class">
              {{ item.class ? '+' : '' }}{{ item.format ? item.format(dataConts[item.value] || 0) : dataConts[item.value] || 0 }}
            </view>
          </view>
        </view>

        <view v-if="dataTabValue === '2'" class="data-chart">
          <view v-for="item in teamList" :key="item.label" class="data-item">
            <view>{{ item.label }}</view>
            <view :class="item.class">
              {{ item.class ? '+' : '' }}{{ item.format ? item.format(dataConts[item.value] || 0) : dataConts[item.value] || 0 }}
            </view>
          </view>
        </view>
      </view>
      <view class="rulebox">
        <wd-button type="text" @click="toRule">
          规则详情<wd-icon name="arrow-right" />
        </wd-button>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.data-wrap{
  height: 584rpx;
  position: relative;
  overflow: hidden;
  border-radius: 32rpx;
  image{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
  }
  .fanzhuang{
    transform: rotateY(180deg);
  }
  .top-bg{
    position: absolute;
    top: 1rpx;
    left: 2rpx;
    right: 2rpx;
    bottom: 1rpx;
    height: 128rpx;
    background-color: #FFC8D5;
    z-index: 2;
    border-radius: 34rpx 34rpx 0rpx 0rpx;
  }
  .data-content{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 5;
    .data-tab{
      display: flex;
      align-items: center;
      justify-content: space-between;
      view{
        flex: 1;
        height: 96rpx;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 30rpx;
        color: #9B2640;
        text-align: center;
        line-height: 96rpx;
      }
      .disabled-mtab{
        color: rgba(155, 38, 64, 0.25);
      }
      .active{
        font-weight: 600;
        font-size: 32rpx;
      }
    }
    .totalled-wrap{
      padding: 32rpx 32rpx 0 32rpx;
    }
    .totalled{
      padding: 28rpx 32rpx;
      background: #FFFFFF;
      border-radius: 16rpx;
      border: 1rpx solid #EAEAEA;
      .totalled-label{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #999999;
        line-height: 24rpx;
        margin-bottom: 32rpx;
      }
      .totalled-value{
        :deep(){
          .wd-text{
            font-family: PingFangSC, PingFang SC;
            font-weight: 500;
            font-size: 56rpx;
            color: #111111;
            line-height: 64rpx;
          }
        }
        .prefix{
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: 40rpx;
          color: #111111;
          line-height: 64rpx;
        }
      }
    }
    .time-tab{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .tab-item{
        min-width: 96rpx;
        height: 48rpx;
        border-radius: 8rpx;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #666666;
        text-align: center;
        line-height: 48rpx;
      }
      .custom-tab{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8rpx;
        .iconfont{
          font-size: 28rpx;
          line-height: 28rpx;
          color: #979797;
          margin-left: 8rpx;
        }
        .label{
          font-size: 28rpx;
          color: #666666;
          margin-right: 8rpx;
        }
      }
      .active-tab{
        color: #FF0057;
        font-weight: 600;
        .iconfont{
          color: #FF0057;
        }
        .label{
          color: #FF0057;
        }
      }
      .tab-right{
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 28rpx;
        color: #8A0A28;
        display: flex;
        align-items: center;
        gap: 6rpx;
        text:nth-child(2){
          margin-top: 6rpx;
          font-size: 24rpx;
          line-height: 28rpx;
          color: rgba(138, 10, 40, 0.25);
        }
      }
    }
    .data-chart{
      background-color: #fff;
      display: grid;
      grid-template-columns: repeat(4, 1fr); /* 每行4个元素 */
      border-radius: 16rpx;
      padding-top: 26rpx;
      .data-item{
        height: 106rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        view:nth-child(1){
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 24rpx;
          color: #999999;
          line-height: 24rpx;
        }
        view:nth-child(2){
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: 28rpx;
          color: #111111;
          line-height: 28rpx;
          margin-top: 14rpx;
        }
        .redColor{
          color: #FF0056 !important;
        }
      }
    }
  }
  .rulebox{
    text-align: center;
    box-shadow: inset 0rpx 1rpx 0rpx 0rpx #EEEEEE;
    :deep(){
      .wd-button{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #AAAAAA;
        text-align: center;
        font-style: normal;
      }
      .wd-icon{
        margin-left: 4rpx;
        font-size: 24rpx;
        color: #AAAAAA;
      }
    }
  }
}
</style>
