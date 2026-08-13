<script setup lang="ts">
import { useLayoutStore } from '@/stores'

const props = withDefaults(defineProps<MyProps>(), {
  list: [],
  itemNum: 1,
})
const imgBaseUrl = import.meta.env.VITE_IMG_URL
interface MyProps {
  list: any
  itemNum: number
}
const modelValue = defineModel<any>({
  default: [],
  required: true,
})

const show = ref<boolean>(false)
const selectList = ref<any>([])
const { setLayoutStore } = useLayoutStore()

function onConfirm() {
  // 触发事件并传递选中的优惠券列表
  modelValue.value = selectList.value
  close()
}

function itemClick(item: any) {
  // 选中优惠券
  if (selectList.value.some((i: any) => i.id === item.id)) {
    selectList.value = selectList.value.filter((i: any) => i.id !== item.id)
  }
  else {
    selectList.value.push(item)
  }
}

function open() {
  selectList.value = [...modelValue.value]
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
      position="bottom" custom-style="height: 900rpx;border-radius: 32rpx 32rpx 0rpx 0rpx;overflow: hidden;"
      :z-index="999" @close="close"
    >
      <!-- threshold   deadline -->
      <view class="popup-warp">
        <template v-if="props.list.length >= 1">
          <view v-for="item in props.list" :key="item.id" @click="itemClick(item)">
            <!--  -->
            <x-coupon
              :value="item.calType === 1 ? item.price : `${item.discounts / 100}折`" :title="item.name" color="#24d192" background-color="#e1f6ee"
              :type="item.calType === 1 ? 'money' : ''"
              :desc="`${Number(item.threshold) > 0 ? `满${item.threshold}可用` : '无门槛'} - ${item.deadline === 1 ? '无期限' : ''}`" :validity="item.type === 1 ? `优惠券x${props.itemNum}` : '优惠券x1'"
              :show-btn="false" :select="selectList.some((i: any) => i.id === item.id)"
            />
          </view>
        </template>
        <wd-status-tip v-if="props.list.length < 1" tip="暂无优惠券~">
          <template #image>
            <image style="width: 320rpx;height: 344rpx;margin-top: 60rpx;" :src="`${imgBaseUrl}/notData1.png`" />
          </template>
        </wd-status-tip>
        <view class="zhanwei" />
      </view>
      <FootButton label="确 定" @confirm="onConfirm" />
    </wd-popup>
  </view>
</template>

<style lang="scss" scoped>
.popup-warp{
  height: 100%;
  padding: 32rpx;
  overflow-y: auto;
  .zhanwei{
    height: calc(150rpx + env(safe-area-inset-bottom));
  }
  :deep(){
    .cell-custom{
      padding: 0;
      margin-top: 32rpx;
      .wd-cell__wrapper{
        padding: 0;
      }
      .cell-title{
        font-weight: bold;
        font-size: 28rpx;
        color: #111111;
      }
      .wd-cell__right{
        margin-top: 24rpx !important;
      }
      .wd-button{
        background: #089D39 !important;
      }
    }
  }
  .store-card{
    background-color: #fff;
    border-radius: 16rpx;
  }
  .store-box{
    display: flex;
    align-items: center;
    gap: 22rpx;
    .store-content{
      flex: 1;
      display: flex;
      gap: 22rpx;
    }
    .num-box{
      text-align: center;
      .num1{
        font-weight: 500;
        font-size: 40rpx;
        color: #000000;
        line-height: 40rpx;
      }
      .num2{
        margin-top: 8rpx;
        font-weight: 400;
        font-size: 16rpx;
        color: #999999;
        line-height: 16rpx;
      }
    }
    image{
      width: 176rpx;
      height: 176rpx;
      border-radius: 8rpx;
    }
    .store-right{
      height: 176rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      .store-title{
        font-weight: 400;
        font-size: 28rpx;
        color: #111111;
        :deep(){
          .wd-text{
            font-weight: 400;
            font-size: 28rpx;
            color: #111111;
            line-height: 36rpx;
          }
        }
      }
      .store-price{
        font-weight: 500;
        font-size: 48rpx;
        color: #FF5100;
        line-height: 48rpx;
      }
    }
  }
}
</style>
