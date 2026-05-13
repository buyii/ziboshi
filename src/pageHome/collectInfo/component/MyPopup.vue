<script setup lang="ts">
import ExpertsItem from './ExpertsItem.vue'
import { useLayoutStore } from '@/stores'

const emit = defineEmits(['confirmAuth', 'changeItem'])
const show = ref<boolean>(false)
const state = ref()
const { setLayoutStore } = useLayoutStore()

const kolList = ref<any>([])

function open(list: any) {
  show.value = true
  setLayoutStore({ noScroll: true })
  kolList.value = list
}
function close() {
  show.value = false
  setLayoutStore({ noScroll: false })
}

function itemClick(item: any) {
  show.value = false
  setLayoutStore({ noScroll: false })
  emit('changeItem', item)
}

function onConfirm() {
  emit('confirmAuth')
}

// 暴露方法
defineExpose({
  open,
  close,
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
      position="bottom"
      custom-style="height: 1156rpx;border-radius: 32rpx 32rpx 0rpx 0rpx;overflow: hidden;"
      :z-index="999" @close="close"
    >
      <view class="title">
        <view>领样达人</view>
        <text class="iconfont icon-close" @click="close" />
      </view>
      <MyScrollView top="116rpx" :fixed="false" :state="state">
        <view class="popup-warp">
          <view v-for="item in kolList" :key="item.id">
            <ExpertsItem :item="item" @item-click="itemClick" />
          </view>
        </view>
      </MyScrollView>
      <FootButton label="立即授权" icon="icon-qrCode" @confirm="onConfirm" />
    </wd-popup>
  </view>
</template>

<style lang="scss" scoped>
.popup-warp{
  position: relative;
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
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
