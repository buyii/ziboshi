<script setup lang="ts">
interface MyProps {
  swiperList: any[]
}
const props = withDefaults(defineProps<MyProps>(), {})

function swiperClick(index: number) {
  uni.previewImage({
    current: index,
    urls: props.swiperList,
  })
}
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
  <view class="store-detail">
    <image class="title-img" src="../../../static/svg/detail.svg" />
    <view class="detail-imgs">
      <image
        v-for="(item, i) in props.swiperList"
        :key="item"
        class="detail-img"
        :src="item"
        mode="widthFix"
        @click="swiperClick(i)"
      />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.store-detail{
  .title-img{
    margin-left: 32rpx;
    margin-bottom: 24rpx;
    width: 104rpx;
    height: 32rpx;
  }
}
.detail-imgs{
  padding: 0 24rpx;
  font-size: 0px;
  .detail-img{
    width: 100%;
  }
}
</style>
