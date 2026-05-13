<script setup lang="ts">
import { productInOrOut } from '@/api/common'

const name = ref('')
const id = ref('')
const quantity = ref('')
const beizhu = ref('')
const numbers = ref('')
const type = ref('1')
const loading = ref(false)

function handleClickLeft() {
  uni.navigateBack()
}

function onConfirm() {
  if (!numbers.value) {
    uni.showToast({
      title: '请输入数量',
      icon: 'error',
    })
    return
  }
  productInOrOut({ type: type.value, carId: id.value, quantity: numbers.value }).then((res) => {
    if (res.code === 0) {
      uni.showToast({
        title: res.msg,
        icon: 'success',
      })
      uni.navigateBack()
    }
  })
}

onLoad((options) => {
  name.value = options?.name
  id.value = options?.id
  quantity.value = options?.quantity
  type.value = options?.type
})
</script>

<template>
  <view class="banner-worp">
    <wd-navbar :title="type === '1' ? '商品入库' : '商品出库'" safe-area-inset-top left-arrow :placeholder="false" :bordered="false" @click-left="handleClickLeft" />
  </view>
  <view class="card-warp">
    <view class="linecla">
      商品名称：{{ name }}
    </view>
    <wd-gap bg-color="#f8f8f8" />
    <view class="linecla">
      商品库存：{{ quantity }}
    </view>
    <wd-gap bg-color="#f8f8f8" />
    <wd-cell-group>
      <wd-input
        v-model="numbers"
        :label="type === '1' ? '入库数量' : '出库数量'"
        type="number"
        :cursor-spacing="100"
        placeholder-class="myPlaceholder"
        custom-input-class="myInput"
        placeholder="请输入"
      />
      <wd-gap bg-color="#f8f8f8" />
      <wd-textarea v-model="beizhu" label="备注信息" placeholder="请输入" />
    </wd-cell-group>
    <FootButton label="确认" :loading="loading" @confirm="onConfirm" />
  </view>
</template>

<style lang="scss" scoped>
.tab-box{
  background-color: #fff;
}
.banner-worp {
  position: fixed;
  left: 0;
  top: 0;
  height: 180rpx;
  width: 100%;
  z-index: 99;
  background: linear-gradient( 180deg, #FFF4F6 0%, #FFFFFF 100%);;
  .img-banner{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 0;
    width: 100%;
    height: 300rpx;
  }
  :deep(){
    .wd-navbar{
      background-color: transparent;
      .wd-navbar__title{
        color: #000
      }
    }
  }
}
.search-box{
  padding: 0 32rpx;
  background-color: #fff;
}
.card-warp{
  padding-top: 180rpx;
  padding-left: 26rpx;
  padding-right: 26rpx;
  .linecla{
    font-family: PingFangSC, PingFang SC;
    font-weight: bold;
    font-size: 28rpx;
    font-style: normal;
    padding: 16rpx 0;
  }
}
</style>

<route type="page" lang="json">
{
  "layout": "page",
  "name": "maintaincar",
  "style": {
    "navigationBarTitleText": "商品维护"
  }
}
</route>
