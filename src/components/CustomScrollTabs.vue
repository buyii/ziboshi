<script setup lang="ts">
import type { Item } from '@/types/common'

interface TabsProps {
  itemList: Item[] // tabs列表
  bg?: string // 背景色
}

const props = withDefaults(defineProps<TabsProps>(), {})
const emit = defineEmits(['tabChange', 'changeCalendar'])
const instance = getCurrentInstance()
const modelValue = defineModel<number>('activeTab', {
  required: true,
})

const translateX = ref<number>(0)
const myCalendarRef = ref()
async function itemClick(item: any) {
  const itemBox = await querySelect(instance?.proxy, '#itembox', {
    rect: true,
    size: true,
  })
  const itemContent = await querySelect(instance?.proxy, '#itemContent', {
    rect: true,
    size: true,
  })

  const itemId = `#item${item.id}`
  const itemRect = await querySelect(instance?.proxy, itemId, {
    rect: true,
    size: true,
  })

  if (!itemRect || !itemContent || typeof itemRect.left !== 'number' || typeof itemContent.left !== 'number' || typeof itemRect.width !== 'number' || typeof itemBox?.width !== 'number' || typeof itemContent.width !== 'number') {
    console.warn('itemRect or itemContent is undefined or missing properties')
    return
  }

  const a = itemRect.left - itemContent.left + itemRect.width / 2
  const c = itemBox.width / 2
  modelValue.value = item.id
  emit('tabChange')
  myCalendarRef.value.clear()
  if (itemContent.width - itemBox.width < 0) {
    return
  }
  if (a > c) {
    translateX.value = a - c
    if (a - c > itemContent.width - itemBox.width) {
      translateX.value = itemContent.width - itemBox.width
      return
    }
    translateX.value = a - c
  }
  else {
    translateX.value = 0
  }
}
function showCalendar() {
  myCalendarRef.value.onShow()
}

function changeCalendar(value: any) {
  modelValue.value = 0
  translateX.value = 0
  emit('changeCalendar', value)
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
  <view class="tabBox" :style="{ backgroundColor: bg }">
    <view id="itembox" class="itembox">
      <view id="itemContent" class="itemContent" :style="{ transform: `translateX(${-translateX}px)` }">
        <view
          v-for="item in props.itemList" :id="`item${item.id}`" :key="item.id"
          class="item" :class="{ active: modelValue === item.id }" @click="itemClick(item)"
        >
          {{ item.name }}
        </view>
      </view>
    </view>
    <view class="tabright">
      <text class="iconfont icon-calendares" @click="showCalendar" />
    </view>
  </view>
  <root-portal>
    <MyCalendar ref="myCalendarRef" is-range @change="changeCalendar" />
  </root-portal>
</template>

<style lang="scss" scoped>
.tabBox{
  width: 100vw;
  padding: 20rpx 32rpx;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  .tabright{
    width: 60rpx;
    text-align: right;
    font-size: 32rpx;
    color: #FF0057;
  }
}
.itembox{
  flex: 1;
  overflow: hidden;
  .itemContent{
    display: inline-flex;
    flex-wrap: nowrap;
    gap: 20rpx;
    transition: transform 0.3s;
    .item{
      height: 64rpx;
      min-width: 160rpx;
      line-height: 64rpx;
      background-color: #fff;
      color: #444444;
      font-size: 28rpx;
      padding: 0 12rpx;
      border-radius: 16rpx;
      box-sizing: border-box;
      text-align: center;
    }
    .active{
      color: #FF0057;
    }
  }
}
</style>
