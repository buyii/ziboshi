<script setup lang="ts">

</script>

<template>
  <wd-navbar title="消息" safe-area-inset-top fixed :placeholder="true" custom-class="my-navbar" :bordered="false" />
  <view class="banner-wrap">
    开发中
  </view>
</template>

<style scoped lang="scss">
.banner-wrap{
  height: 510rpx;
  width: 100%;
  z-index: 90;
}
</style>

<route lang="json">
{
  "layout": "tabbar",
  "name": "rank",
  "style": {
    "navigationBarTitleText": "消息"
  }
}
</route>
