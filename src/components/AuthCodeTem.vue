<script setup lang="ts">
const props = withDefaults(defineProps<MyProps>(), {
  codeUrl: '',
})

const emit = defineEmits(['changeImg'])

interface MyProps {
  codeUrl: string
  toast?: any
}
// 生成图片路径
async function iamgeToAlbum(base64: string) {
  const base64Data = base64.replace(/^data:image\/\w+;base64,/, '') // Base64数据
  const filePath = `${wx.env.USER_DATA_PATH}/${new Date().getTime()}-temp.png` // 保存路径
  base64ToImage(base64Data, filePath).then((path) => {
    console.log('图片生成成功11112222:', path)
    emit('changeImg', path)
  }).catch((err) => {
    console.error('图片生成失败:', err)
    props.toast?.close()
  })
}

function onSuccess(e: any) {
  iamgeToAlbum(e)
}
</script>

<template>
  <view class="canvasbox">
    <l-painter
      is-canvas-to-temp-file-path
      hidden
      css="background-color: #fff;width: 350rpx; height: 374rpx;padding-top: 24rpx;"
      @success="onSuccess"
    >
      <l-painter-qrcode
        css="width: 320rpx; height: 320rpx;margin: 0 auto;"
        :text="props.codeUrl"
      />
      <l-painter-view>
        <l-painter-text
          text="星佣宝授权专用"
          css="color: #444444; font-size: 24rpx;fontWeight: 400;width: 100%;text-align: center;"
        />
      </l-painter-view>
    </l-painter>
  </view>
</template>

<style scoped lang="scss">
.canvasbox{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
