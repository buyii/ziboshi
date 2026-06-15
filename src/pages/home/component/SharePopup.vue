<script setup lang="ts">
import { useLayoutStore } from '@/stores'

const emit = defineEmits(['onPoster'])
const show = ref<boolean>(false)
const { setLayoutStore } = useLayoutStore()

const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)

function open() {
  show.value = true
  setLayoutStore({ noScroll: true })
}

function close() {
  show.value = false
  setLayoutStore({ noScroll: false })
}

function sharePoster() {
  emit('onPoster')
  close()
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
      position="bottom" custom-style="border-radius: 32rpx 32rpx 0rpx 0rpx;overflow: hidden;"
      :z-index="999" @close="close"
    >
      <view v-if="userInfo.amountType === 2" class="popup-title">
        分享
      </view>
      <view v-else class="popup-title">
        分享下单可获得积分
      </view>
      <view class="popup-warp">
        <view class="share-item">
          <wd-button open-type="share" custom-class="share-btn">
            <image class="img" src="@/static/svg/weixin.svg" mode="widthFix" />
            <text class="text">分享给好友</text>
          </wd-button>
        </view>
        <view class="share-item" @click="sharePoster">
          <image class="img" src="@/static/svg/haibao.svg" mode="widthFix" />
          <text class="text">分享海报</text>
        </view>
      </view>
    </wd-popup>
  </view>
</template>

<style lang="scss" scoped>
.popup-title{
  height: 90rpx;
  line-height: 90rpx;
  text-align: center;
  font-size: 32rpx;
  font-weight: 500;
}
.popup-warp{
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 30rpx 32rpx 100rpx 32rpx;
  .share-item{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .img{
      width: 80rpx;
      height: 80rpx;
    }
    .text{
      margin-top: 12rpx;
      font-size: 24rpx;
      color: #000000;
    }
  }
  :deep(){
    .share-btn{
      flex: 1;
      background-color: transparent !important;
      height: auto !important;
      padding: 0 !important;
      .wd-button__text{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
    .wd-button--active{
      background-color: transparent !important;
      background: transparent !important;
      &::before{
        background-color: transparent !important;
        background: transparent !important;
      }
    }
  }
}
</style>
