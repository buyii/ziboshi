<script setup lang="ts">
import { useLayoutStore } from '@/stores'

const emit = defineEmits(['confirm'])
const show = ref<boolean>(false)
const selectItem = ref<any>(null)
const list = ref<any>([])
const { setLayoutStore } = useLayoutStore()

function open(userKolList: any, id: string | number) {
  selectItem.value = null
  show.value = true
  setLayoutStore({ noScroll: true })
  list.value = userKolList
  if (id) {
    selectItem.value = list.value.find((item: any) => item.id === id)
  }
}

function itemClick(item: any) {
  if (selectItem.value && (item.id === selectItem.value.id)) {
    selectItem.value = null
  }
  else {
    selectItem.value = item
  }
}
function close() {
  show.value = false
  setLayoutStore({ noScroll: false })
}

function onConfirm() {
  emit('confirm', selectItem.value)
  show.value = false
  setLayoutStore({ noScroll: false })
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
      position="bottom" custom-style="height: 1156rpx;border-radius: 32rpx 32rpx 0rpx 0rpx;overflow: hidden;"
      :z-index="999" @close="close"
    >
      <view class="title">
        <view>达人选择</view>
        <text class="iconfont icon-close" @click="close" />
      </view>
      <view class="popup-warp">
        <view v-for="item in list" :key="item.id" class="checkboxitem" @click="itemClick(item)">
          <wd-checkbox :model-value="selectItem && (item.id === selectItem.id) ? true : false" checked-color="#FF0057" size="large" shape="square" />
          <view class="item-content">
            <image
              :src="item.avatar"
              mode="scaleToFill"
            />
            <view class="user-text">
              <view class="name">
                {{ item.nickName }}
              </view>
              <view class="desc">
                粉丝 · {{ item.fans || 0 }}
              </view>
            </view>
          </view>
        </view>
      </view>
      <FootButton label="确认" :disabled="!selectItem" @confirm="onConfirm" />
    </wd-popup>
  </view>
</template>

<style lang="scss" scoped>
.popup-warp{
  position: relative;
  padding-top: 116rpx;
  height: calc(100% - 216rpx - env(safe-area-inset-bottom));
  overflow-y: auto;
  .checkboxitem{
    display: flex;
    align-items: center;
    gap: 48rpx;
    padding: 32rpx 0 32rpx 44rpx;
    .item-content{
      display: flex;
      align-items: center;
      gap: 18rpx;
      image{
        width: 80rpx;
        height: 80rpx;
        border-radius: 40rpx;
      }
      .user-text{
        .name{
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 28rpx;
          color: #000000;
          line-height: 28rpx;
        }
        .desc{
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 24rpx;
          color: #666666;
          line-height: 24rpx;
          margin-top: 12rpx;
        }
      }
    }
    :deep(){
      .wd-checkbox{
        margin-bottom: 0;
      }
    }
  }
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
