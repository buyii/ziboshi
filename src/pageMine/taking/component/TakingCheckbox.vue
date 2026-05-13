<script setup lang="ts">
interface Props {
  amountData: any
}

const props = withDefaults(defineProps<Props>(), {})
const balanceType = defineModel<number[]>('balanceType', {
  required: true,
})
const amount = defineModel<string>('amount', {
  required: true,
})
function handleChange() {
  amount.value = ''
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
  <view class="taking-checkbox">
    <wd-checkbox-group v-model="balanceType" checked-color="#FF0057" size="large" shape="square" @change="handleChange">
      <view class="checkboxitem">
        <view class="item-content">
          <view class="item-label">
            个人收益金额
          </view>
          <view class="item-amount">
            {{ props.amountData.kolServiceBalance }}
            <text class="amount-unit">元</text>
          </view>
        </view>
        <wd-checkbox :model-value="1" :disabled="props.amountData.kolServiceBalance <= 0" />
      </view>
      <view class="checkboxitem">
        <view class="item-content">
          <view class="item-label">
            团队收益金额
          </view>
          <view class="item-amount">
            {{ props.amountData.agentBalance }}
            <text class="amount-unit">元</text>
          </view>
        </view>
        <wd-checkbox :model-value="2" :disabled="props.amountData.agentBalance <= 0" />
      </view>
    </wd-checkbox-group>
  </view>
</template>

<style lang="scss" scoped>
.taking-checkbox{
  background-color: #fff;
  border-radius: 24rpx;
  margin-top: 24rpx;
  overflow: hidden;
}
.checkboxitem{
  height: 96rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32rpx;
  .item-content{
    flex: 1;
    display: flex;
    align-items: center;
    gap: 32rpx;
    .item-label{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 28rpx;
      color: #999999;
      line-height: 28rpx;
      font-style: normal;
    }
    .item-amount{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 28rpx;
      color: #111111;
      line-height: 28rpx;
      font-style: normal;
      .amount-unit{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #666666;
        line-height: 28rpx;
        font-style: normal;
      }
    }
  }
  :deep(){
    .wd-checkbox{
      margin-bottom: 0;
    }
    .wd-checkbox__label{
      margin: 0;
    }
  }
}
</style>
