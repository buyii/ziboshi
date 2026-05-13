<script setup lang="ts">
import SelectionItem from './SelectionItem.vue'
import ButtonGroup from './ButtonGroup.vue'
import type { Comprehensive, Item } from '@/types/common'
import { useLayoutStore } from '@/stores'

const emit = defineEmits(['onConfirm'])

const comprehensive = defineModel<Comprehensive>({
  required: true,
})

const selectionItemRef = ref()
const show = ref<boolean>(false)
const { setLayoutStore } = useLayoutStore()

const selectionTabList = ref<Item[]>([
  { id: 1, name: '0 - 5000', value: [0, 5000] },
  { id: 2, name: '5000 - 10000', value: [5000, 10000] },
  { id: 3, name: '10000以上', value: [10000, ''] },
])
function open() {
  show.value = true
  setLayoutStore({ noScroll: true })
  console.log('open')
}

function close() {
  show.value = false
  setLayoutStore({ noScroll: false })
}

function onConfirm() {
  emit('onConfirm')
  show.value = false
  setLayoutStore({ noScroll: false })
}

function onCancel() {
  selectionItemRef.value?.clearSelection()

  comprehensive.value = {
    maxPrice: '', // 最大价格
    minPrice: '', // 最小价格
    maxCosRatio: '', // 最大佣金率
    minCosRatio: '', // 最小佣金率
    maxKolServiceRatio: '', // 最大每单补率
    minKolServiceRatio: '', // 最小每单补率
    maxSales: '', // 最大销量
    minSales: '', // 最小销量
  }
}

// 暴露方法
defineExpose({
  open,
})
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
  <view>
    <wd-popup
      v-model="show"
      position="bottom" custom-style="height: 1156rpx;border-radius: 32rpx 32rpx 0rpx 0rpx;overflow: hidden;"
      :z-index="999" @close="close"
    >
      <view class="title">
        <view>综合筛选</view>
        <text class="iconfont icon-close" @click="close" />
      </view>
      <view class="popup-warp">
        <view>
          <SelectionInput v-model="comprehensive" :keys="['minPrice', 'maxPrice']" :labels="['开始价格', '结束价格']" label="价格" />
          <SelectionInput v-model="comprehensive" :keys="['minCosRatio', 'maxCosRatio']" :labels="['百分比', '百分比']" label="佣金率" />
          <SelectionInput v-model="comprehensive" :keys="['minKolServiceRatio', 'maxKolServiceRatio']" :labels="['百分比', '百分比']" label="补贴率" />
          <SelectionItem ref="selectionItemRef" v-model="comprehensive" :keys="['minSales', 'maxSales']" label="总销量" :tab-list="selectionTabList" />
        </view>
      </view>
      <ButtonGroup cancel-label="清空" confirm-label="确认" fixed @on-confirm="onConfirm" @on-cancel="onCancel" />
    </wd-popup>
  </view>
</template>

<style lang="scss" scoped>
.popup-warp{
  padding: 0 48rpx;
  position: relative;
  padding-top: 116rpx;
  height: calc(100% - 216rpx - env(safe-area-inset-bottom));
  overflow-y: auto;
}
.title{
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  display: flex;
  z-index: 99;
  background-color: #fff;
  align-items: center;
  justify-content: space-between;
  height: 116rpx;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 36rpx;
  color: #000000;
  text-align: left;
  font-style: normal;
  padding: 0 48rpx;
  text{
    font-size: 28rpx;
  }
}
</style>
