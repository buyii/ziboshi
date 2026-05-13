<script setup lang="ts">
export interface TabsProps {
  itemList: any[] // tabs列表
}

const props = withDefaults(defineProps<TabsProps>(), {})

const emit = defineEmits(['tabClick'])
const modelValue = defineModel<string>()
function handleClick() {
  emit('tabClick')
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
    <wd-tabs v-model="modelValue" slidable="always" :map-num="100000" @click="handleClick">
      <block key="0">
        <wd-tab title="全部" name="0" />
      </block>
      <block v-for="item in props.itemList" :key="item.categoryId">
        <wd-tab :title="item.name" :name="item.categoryId" />
      </block>
    </wd-tabs>
  </view>
</template>

<style lang="scss" scoped>
.tabwarp {
  :deep(){
    .wd-tabs{
      background: transparent;
      &.nav-container{
        align-items: center;
      }
    }
    .wd-tabs__nav{
      height: 96rpx;
      background-color: transparent;
    }
    .wd-tabs{
      &__nav-item{
        height: 96rpx;
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 28rpx;
        color: #444444;
        font-style: normal;
        padding: 0 20rpx !important;
      }
      .is-active{
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 32rpx;
        color: #FF0057;
        font-style: normal;
      }
    }

    .wd-tabs__line{
      background: #FF0057;
      height: 16rpx;
      opacity: 0.15;
      border-radius: 200rpx;
    }
  }
  .tabitem{
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 160rpx;
    height: 64rpx;
    border-radius: 16rpx;
    .tabtext{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 28rpx;
      color: #444444;
      line-height: 28rpx;
    }
  }
  .active{
    .tabtext{
      color: #FF0057;
    }
  }
}
</style>
