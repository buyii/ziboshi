<script setup lang="ts">
const emit = defineEmits(['tabClick'])

const modelValue = defineModel<number>()

function tabClick(v: number) {
  modelValue.value = v
  emit('tabClick')
}

function toTeamPerson() {
  uni.navigateTo({
    url: `/pageRank/incomeTeamDetails/index`,
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
  <view class="tabwarp">
    <view class="tab-left">
      <view class="tabitem" :class="{ 'active-tab': modelValue === 1 }" @click="tabClick(1)">
        已结算
      </view>
      <view class="tabitem" :class="{ 'active-tab': modelValue === 2 }" @click="tabClick(2)">
        未结算
      </view>
    </view>
    <view class="tab-right">
      <wd-button type="text" @click="toTeamPerson">
        更多
        <text class="iconfont icon-into" />
      </wd-button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.tabwarp{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 28rpx;
  .tab-left{
    display: flex;
    align-items: center;
    gap: 32rpx;
  }
  .tab-right{
    :deep(){
      .wd-button__text{
        font-weight: 400;
        font-size: 24rpx;
        color: #AAAAAA;
        line-height: 24rpx;
      }
    }
    .iconfont{
      display: inline-block;
      font-size: 24rpx;
      color: #DADADA;
    }
  }
  .tabitem{
    width: 144rpx;
    height: 64rpx;
    background: #FFFFFF;
    border-radius: 16rpx;
    font-weight: 400;
    font-size: 28rpx;
    color: #666666;
    text-align: center;
    line-height: 64rpx;
  }
  .active-tab{
    background: #089D39;
    color: #FFFFFF;
    .iconfont{
      color: #FFFFFF;
    }
    .label{
      color: #FFFFFF;
    }
  }

}
</style>
