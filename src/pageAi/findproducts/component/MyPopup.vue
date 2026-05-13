<script setup lang="ts">
import type { Product } from '@/types/common'
import { productFindAdd } from '@/api/productfind'
import { useLayoutStore } from '@/stores'

const props = withDefaults(defineProps<Product>(), {})
const emit = defineEmits(['toSuccess'])
const show = ref<boolean>(false)
const loading = ref<boolean>(false)
const params = ref<any>({})
const { setLayoutStore } = useLayoutStore()
const imgBaseUrl = import.meta.env.VITE_IMG_URL
function open(data: any) {
  params.value = data
  show.value = true
  setLayoutStore({ noScroll: true })
}

function close() {
  show.value = false
  setLayoutStore({ noScroll: false })
}

function onConfirm() {
  loading.value = true
  productFindAdd({ ...params.value }).then((res) => {
    loading.value = false
    if (res.code === 0) {
      show.value = false
      setLayoutStore({ noScroll: false })
      emit('toSuccess')
    }
  }).catch(() => {
    loading.value = false
  })
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
      custom-style="height:1040rpx;border-radius: 32rpx 32rpx 0rpx 0rpx;overflow: hidden;"
      :z-index="999" @close="close"
    >
      <view class="title">
        <view>已为您查找相似产品</view>
        <text class="iconfont icon-close" @click="close" />
      </view>
      <view class="popup-warp">
        <template v-if="props.productList.length > 0">
          <ProductCard :product-list="props.productList" />
          <view class="tips">
            如果以上产品都不是请点击继续提交
          </view>
        </template>
        <wd-status-tip v-else tip="暂无数据~">
          <template #image>
            <image style="width: 320rpx;height: 344rpx;margin-top: 60rpx;" :src="`${imgBaseUrl}/notData.png`" />
          </template>
        </wd-status-tip>
      </view>
      <FootButton label="继续提交" :loading="loading" @confirm="onConfirm" />
    </wd-popup>
  </view>
</template>

<style lang="scss" scoped>
.popup-warp{
  padding: 136rpx 32rpx calc(20rpx + env(safe-area-inset-bottom)) 32rpx;
  .tips{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 28rpx;
    color: #666666;
    line-height: 28rpx;
    text-align: center;
    font-style: normal;
    padding: 20rpx 0 52rpx 0
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
