<script setup lang="ts">
function handleClickLeft() {
  uni.navigateBack()
}
const faceSignUrl = ref('')

onLoad((options) => {
  faceSignUrl.value = options?.faceSignUrl
})
</script>

<template>
  <wd-navbar title="身份验证" safe-area-inset-top fixed :bordered="false" @click-left="handleClickLeft" />
  <web-view :src="faceSignUrl" />
</template>

<style scoped lang="scss">

</style>

<route lang="json">
{
  "layout": "default",
  "name": "takingVerification",
  "style": {
    "navigationBarTitleText": "身份验证"
  }
}
</route>
