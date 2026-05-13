<script setup lang="ts">
const { detailData } = defineProps({
  detailData: {
    type: Object,
    default: () => ({}),
  },
})

const nodes = computed(() => detailData.nodes || [])

const active = ref(0)
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
  <view class="steps-box">
    <wd-steps vertical :active="active">
      <wd-step v-for="(item, index) in nodes" :key="index">
        <template #icon>
          <view class="icon" :class="{ 'icon-active': index === active }">
            <wd-icon name="check-bold" />
          </view>
        </template>
        <template #title>
          <view class="title">
            {{ item.statusName }}
          </view>
        </template>
        <template #description>
          <view v-if="item.remark" class="description">
            备注：{{ item.remark }}
          </view>
          <view class="description">
            {{ item.time }}
          </view>
          <view v-if="item.logisticsNodes && item.logisticsNodes.length > 0" class="logbox">
            <view v-for="(e, i) in item.logisticsNodes" :key="e.time" class="logitem" :class="{ nobor: i === item.logisticsNodes.length - 1 }">
              <view class="logdesc">
                {{ e.desc }}
              </view>
              <view class="logtime">
                {{ e.time }}
              </view>
            </view>
          </view>
        </template>
      </wd-step>
    </wd-steps>
  </view>
</template>

<style lang="scss" scoped>
.icon{
  :deep(){
    width: 40rpx;
    height: 40rpx;
    overflow: hidden;
    .wd-icon{
      font-size: 24rpx;
      width: 40rpx;
      height: 40rpx;
      background-color: #FFFFFF;
      color: #FF0057;
      line-height: 40rpx;
      text-align: center;
      border-radius: 12rpx;
    }
  }
}
.icon-active{
  :deep(){
    width: 40rpx;
    height: 40rpx;
    overflow: hidden;
    .wd-icon{
      font-size: 24rpx;
      width: 40rpx;
      height: 40rpx;
      background-color: #FF0057;
      color: #fff;
      line-height: 40rpx;
      text-align: center;
      border-radius: 12rpx;
    }
  }
}
.title{
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 32rpx;
  color: #222222;
  line-height: 32rpx;
}
.description{
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 24rpx;
  color: #666666;
  line-height: 24rpx;
  margin-top: 16rpx;
}
.logbox{
  margin-top: 24rpx;
  color: #666666;
  .logitem{
    padding-bottom: 12rpx;
    margin-bottom: 12rpx;
    border-bottom: 2rpx solid #DADADA;
    .logdesc{
      margin-bottom: 10rpx;
      line-height: 1.4;
    }
  }
  .nobor{
    border-bottom: none;
    padding-bottom: 0;
    margin-bottom: 0;
  }
}
.steps-box{
  :deep(){
    .wd-step{
      padding-bottom: 32rpx;
    }
    .wd-step__header{
      top: 40rpx !important;
    }
    .wd-step__line{
      left: 0 !important;
      right: 0 !important;
      margin: 0 auto !important;
      width: 6rpx !important;
      background-color: #DADADA;
    }
    .wd-step__icon{
      background-color: transparent;
      display: flex;
      justify-content: center;
    }
    .wd-step__content{
      padding: 24rpx 32rpx;
      background-color: #ffffff;
      border-radius: 16rpx;
      margin-left: 70rpx !important;
    }
  }
}
</style>
