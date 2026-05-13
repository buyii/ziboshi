<script setup lang="ts">
import { useToast } from 'wot-design-uni'
import type { ProductDetail, Sample, Skus } from '@/types/common'
import { useLayoutStore } from '@/stores'

interface MyProps {
  dicts: any[]
}
const props = withDefaults(defineProps<MyProps>(), {
})

const { setLayoutStore } = useLayoutStore()

const show = ref<boolean>(false)

function open(flag = true) {
  show.value = true
  setLayoutStore({ noScroll: true })
}

function close() {
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
      position="bottom"
      custom-style="border-radius: 32rpx 32rpx 0rpx 0px;overflow: hidden;"
      :z-index="999" @close="close"
    >
      <view class="title">
        <view class="title1">
          服务保障
        </view>
        <text class="iconfont icon-close" @click="close" />
      </view>
      <view class="popup-warp">
        <view v-for="item in props.dicts" :key="item.dictValue" class="dicitem">
          <view class="itemLabel">
            {{ item.dictLabel }}
          </view>
          <view class="itemremark">
            {{ item.remark }}
          </view>
        </view>
      </view>
    </wd-popup>
  </view>
</template>

<style lang="scss" scoped>
.title{
  display: flex;
  z-index: 99;
  background-color: #fff;
  align-items: center;
  justify-content: space-between;
  height: 116rpx;
  font-family: PingFangSC, PingFang SC;
  font-weight: bold;
  font-size: 36rpx;
  color: #000000;
  font-style: normal;
  padding: 0 48rpx;
  .title1{
    flex: 1;
    color: #313131;
    text-align: center;
  }
  text{
    font-size: 28rpx;
  }
  .icon-close{
    font-size: 32rpx;
  }
}
.popup-warp{
  padding: 0 64rpx;
  padding-bottom: env(safe-area-inset-bottom);
  .dicitem{
    margin-bottom: 36rpx;
    .itemLabel{
      font-weight: 500;
      color: #232323;
    }
    .itemremark{
      margin-top: 20rpx;
      font-family: PingFangSC, PingFang SC;
      font-size: 24rpx;
      line-height: 1.6;
      color: #727272;
      font-style: normal;
    }
  }
}
</style>
