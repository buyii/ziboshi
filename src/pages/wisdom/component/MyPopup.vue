<script setup lang="ts">
import ExpertsItem from './ExpertsItem.vue'
import { useLayoutStore } from '@/stores'

const emit = defineEmits(['confirmAdd', 'confirmAuth'])
const show = ref<boolean>(false)
const state = ref()
const { setLayoutStore } = useLayoutStore()

const kolList = ref<any>([])
const selectItem = ref<any>()

function open(list: any) {
  kolList.value = list
  selectItem.value = null
  show.value = true
  setLayoutStore({ noScroll: true })
}

function close() {
  show.value = false
  setLayoutStore({ noScroll: false })
}

function itemClick(item: any) {
  if (item.expiresStatus === '2') {
    return
  }
  selectItem.value = item
}

function onConfirm() {
  if (!selectItem.value) {
    uni.showToast({
      title: '请选择达人',
      icon: 'none',
    })
    return
  }
  setLayoutStore({ noScroll: false })
  show.value = false
  emit('confirmAdd', selectItem.value)
}

function onAuth() {
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
  <root-portal>
    <wd-popup
      v-model="show" position="bottom"
      custom-style="height: 1156rpx;border-radius: 32rpx 32rpx 0rpx 0rpx;overflow: hidden;"
      :z-index="999" @close="close"
    >
      <view class="title">
        <view>选择达人</view>
        <text class="iconfont icon-close" @click="close" />
      </view>
      <MyScrollView top="116rpx" :fixed="false" :state="state">
        <view class="popup-warp">
          <view v-for="item in kolList" :key="item.id" class="item-box" @click="itemClick(item)">
            <ExpertsItem :item="item" />
            <view v-if="item.expiresStatus === '2'" class="expiresStatus">
              <wd-button
                custom-class="custom-guoqi" size="small"
                @click="onAuth"
              >
                授权过期
              </wd-button>
            </view>
            <wd-checkbox v-else :model-value="selectItem && (selectItem.id === item.id) ? true : false" shape="square" size="large" checked-color="#FF0057" />
          </view>
          <view class="btn-box">
            <wd-button @click="onAuth">
              <text class="iconfont icon-add" />
              <text>添加达人</text>
            </wd-button>
          </view>
        </view>
      </MyScrollView>

      <FootButton label="确 定" fixed @confirm="onConfirm" />
    </wd-popup>
  </root-portal>
</template>

<style lang="scss" scoped>
.popup-warp{
  position: relative;
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
  .item-box{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 60rpx;
    .expiresStatus{
      flex: 1;
      display: flex;
      justify-content: flex-end;
      padding-top: 16rpx;
      :deep(){
        .custom-guoqi{
          font-family: PingFangSC, PingFang SC;
          background: rgba(255, 0, 87, 0.1);
          border-radius: 16rpx;
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: 24rpx;
          color: #FF0057;
          line-height: 24rpx;
          font-style: normal;
        }
      }
    }
  }
  .btn-box{
    padding: 40rpx;
    text-align: center;
    .iconfont{
      font-size: 20rpx;
      color: #650022;
      font-weight: 500 !important;
      margin-right: 10rpx;
    }
    :deep(){
      .wd-button{
        flex: 1;
        background: #FFE5EE !important;
        font-size: 26rpx !important;
        color: #650022 !important;
        font-weight: 500 !important;
      }
      .wd-button__text{
        display: flex;
        align-items: center;
        justify-content: center;
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
