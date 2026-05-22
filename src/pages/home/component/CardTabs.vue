<script setup lang="ts">
interface TabItem {
  id: number
  name: string
  icons: string[]
}

interface TabsProps {
  itemList: TabItem[] // tabs列表
}
const props = withDefaults(defineProps<TabsProps>(), {})
const emit = defineEmits(['tabChange'])
const orderField = defineModel('orderField', {
  required: true,
})

const sortType = defineModel<0 | 1 | 2 | number>('sortType', {
  required: true,
})

function tabClick(item: any) {
  if (orderField.value === item.id) {
    if (sortType.value <= 1) {
      orderField.value = 0
      sortType.value = 0
    }
    else {
      sortType.value = sortType.value - 1
    }
  }
  else {
    orderField.value = item.id
    sortType.value = 2
  }
  emit('tabChange')
}
</script>

<template>
  <view class="tabwarp">
    <view v-for="item in props.itemList" :key="item.id" class="tabitem" :class="{ activetab: orderField === item.id }" @click="tabClick(item)">
      <view class="tabtext">
        {{ item.name }}
      </view>
      <view v-if="item.icons && item.icons.length > 0" class="iconbox" :class="{ iconRise: sortType === 2, iconFall: sortType === 1 }">
        <text v-for="(icon, i) in item.icons" :key="icon" class="tabicon iconfont" :class="`tabicon${i + 1} ${icon} `" />
      </view>
    </view>
    <slot />
  </view>
</template>

<style lang="scss" scoped>
.tabwarp {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .tabitem{
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 24rpx;
    height: 64rpx;
    border-radius: 16rpx;
    .tabtext{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 24rpx;
      color: #111111;
      font-style: normal;
    }
    .iconbox{
      display: flex;
      align-items: center;
      margin-left: 8rpx;
      .tabicon{
        font-size: 20rpx;
        color: #DADADA;
      }
      .tabicon1{
        margin-right: -4rpx;
      }
      .tabicon2{
        margin-left: -4rpx;
      }
    }

  }
  .activetab{
    .tabtext{
      font-weight: 600;
      color: #089D39;
    }
    .iconRise{
      .tabicon1{
        color: #089D39;
      }
    }
    .iconFall{
      .tabicon2{
        color: #089D39;
      }
    }
  }
  .tabiconright{
    color: #089D39;
    font-size: 32rpx;
  }
}
</style>
