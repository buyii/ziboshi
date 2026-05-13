<script setup lang="ts">
import { getUserKolList } from '@/api/userKol'
import { useLayoutStore } from '@/stores'

interface Pagination {
  pageNum: number
  pageSize: number
  total: number
}
const emit = defineEmits(['onConfirm'])
const show = ref<boolean>(false)
const state = ref()
const selectItem = ref<any>([])
const pagination = ref<Pagination>({
  pageNum: 1,
  pageSize: 10,
  total: 0,
})
const kolList = ref<any>([])
const flag = ref<boolean>(false)
const { setLayoutStore } = useLayoutStore()

function open() {
  show.value = true
  setLayoutStore({ noScroll: true })
  getSelectList()
}

function close() {
  show.value = false
  setLayoutStore({ noScroll: false })
}

function onConfirm() {
  emit('onConfirm', selectItem.value, flag.value)
  show.value = false
  setLayoutStore({ noScroll: false })
}

function getSelectList() {
  getUserKolList({ pageNum: pagination.value.pageNum, pageSize: pagination.value.pageSize }).then((res) => {
    if (res.code === 0) {
      pagination.value.total = res.total
      if (pagination.value.pageNum === 1) {
        kolList.value = res.rows
      }
      else {
        kolList.value = kolList.value.concat(res.rows)
      }
    }
    else {
      state.value = 'error'
    }
  }).catch(() => {
    state.value = 'error'
  })
}

function scrolltolower() {
  if (pagination.value.pageNum * pagination.value.pageSize >= pagination.value.total) {
    state.value = 'finished'
    return
  }
  state.value = 'loading'
  pagination.value.pageNum++
  getSelectList()
}
function loadmore() {
  state.value = 'loading'
  getSelectList()
}

function itemClick1() {
  if (selectItem.value.length > 0) {
    return
  }
  flag.value = !flag.value
  selectItem.value = []
}

function itemClick(item: any) {
  if (flag.value) {
    return
  }
  // 多选
  const i = selectItem.value.findIndex((item1: any) => item1.id === item.id)
  if (i > -1) {
    selectItem.value.splice(i, 1)
  }
  else {
    selectItem.value.push(item)
  }
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
        <view>达人选择</view>
        <text class="iconfont icon-close" @click="close" />
      </view>
      <MyScrollView top="116rpx" :fixed="false" :state="state" @scrolltolower="scrolltolower" @loadmore="loadmore">
        <view class="popup-warp">
          <view class="checkboxitem" @click="itemClick1">
            <wd-checkbox :model-value="flag" checked-color="#FF0057" size="large" :disabled="selectItem.length > 0" shape="square" />
            <view class="item-content">
              <view class="name">
                商务申样
              </view>
            </view>
          </view>
          <view v-for="item in kolList" :key="item.id" class="checkboxitem" @click="itemClick(item)">
            <wd-checkbox
              :model-value="selectItem.findIndex((item1: any) => item1.id === item.id) > -1 ? true : false"
              checked-color="#FF0057" size="large" shape="square" :disabled="flag"
            />
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
                  粉丝 · {{ item.fans }}
                </view>
              </view>
            </view>
          </view>
        </view>
      </MyScrollView>
      <FootButton label="确认" @confirm="onConfirm" />
    </wd-popup>
  </view>
</template>

<style lang="scss" scoped>
.popup-warp{
  position: relative;
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
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
