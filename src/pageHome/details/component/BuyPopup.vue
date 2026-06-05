<script setup lang="ts">
import { useLayoutStore } from '@/stores'

interface MyProps {
  detailData: any
}
const props = withDefaults(defineProps<MyProps>(), {
  detailData: {},
})

const userStore = useUserStore()
const show = ref<boolean>(false)
const itemNum = ref<number>(1)
const { setLayoutStore } = useLayoutStore()

function onConfirm() {
  const data = { ...props.detailData }
  console.log(data, 'data')
  userStore.setPaymentData(data)
  uni.navigateTo({
    url: `/pageHome/payment/index?itemNum=${itemNum.value}`,
  })
  close()
}

function open() {
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
      <view class="popup-warp">
        <view class="store-card">
          <view class="store-box">
            <view class="store-content">
              <image :src="props.detailData.cover" />
              <view class="store-right">
                <view class="store-title">
                  <wd-text :text="props.detailData.productName" :lines="2" />
                </view>
                <view class="store-price">
                  <DigitBold :value="props.detailData.price" int-size="48rpx" decimal-size="32rpx" color="#FF5100" />
                </view>
              </view>
            </view>
          </view>
        </view>
        <wd-cell v-for="item in props.detailData.productSpec" :key="item.itemId" :title="item.name" vertical custom-title-class="cell-title" custom-class="cell-custom">
          <wd-button size="small">
            {{ item.itemName }}
          </wd-button>
        </wd-cell>
        <wd-cell title="数量" custom-title-class="cell-title" custom-class="cell-custom">
          <wd-input-number v-model="itemNum" />
        </wd-cell>
      </view>
      <FootButton label="确 定" @confirm="onConfirm" />
    </wd-popup>
  </view>
</template>

<style lang="scss" scoped>
.popup-warp{
  padding: 32rpx;
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
