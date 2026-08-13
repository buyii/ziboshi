<script setup lang="ts">
interface Props {
  codeImg: string
  detailData: any
}
const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits(['changeImg'])

const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
// 生成图片路径
async function iamgeToAlbum(base64: string) {
  const base64Data = base64.replace(/^data:image\/\w+;base64,/, '') // Base64数据
  const filePath = `${wx.env.USER_DATA_PATH}/${new Date().getTime()}-temp.png` // 保存路径
  base64ToImage(base64Data, filePath).then((path) => {
    emit('changeImg', path)
  }).catch((err) => {
    console.error('图片生成失败:', err)
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
      css="position: relative;width: 670rpx; height: 1128rpx;"
      @success="onSuccess"
    >
      <l-painter-image
        :src="props.detailData.cover"
        css="object-fit: fill; object-position: 50% 50%; position: absolute; top: 0;left:0; width: 100%; height: 1128rpx"
      />
      <l-painter-view css="position: absolute; top: 0;left:0;width: 302rpx;height: 80rpx;margin-left: 22rpx;margin-top: 40rpx;background: rgba(255,255,255,0.96);border-radius: 48rpx;padding: 8rpx">
        <l-painter-image
          :src="userInfo.avatar"
          css="width: 80rpx; height: 80rpx; border-radius: 50%"
        />
        <l-painter-view
          css="margin-top: 8rpx; padding-left: 16rpx; display: inline-block"
        >
          <l-painter-text
            :text="userInfo.userName"
            css="display: block; padding-bottom: 0rpx; color: #111111; font-size: 28rpx;fontWeight: 500"
          />
          <l-painter-text
            text="给您推荐了样品海报"
            css="color: #444444; font-size: 20rpx;fontWeight: 400"
          />
        </l-painter-view>
      </l-painter-view>
      <l-painter-view
        css="position: absolute; bottom: 0;left:0;padding: 20rpx 30rpx 0rpx 30rpx; box-sizing: border-box; width: 100%;height: 260rpx;background: rgba(255,255,255,1);"
      >
        <l-painter-view css="margin-top:40rpx;padding-right:190rpx;">
          <l-painter-text
            :text="props.detailData.productName"
            css="line-clamp: 2; color: #111111; font-size: 28rpx; fontWeight: 500;line-height: 1em"
          />
        </l-painter-view>
        <l-painter-view css="vertical-align: bottom; margin-top:20rpx;line-height: 1em">
          <l-painter-text text="¥" css="font-weight: 600; font-size: 24rpx; color: #000000; margin-left:10rpx;line-height: 1em" />
          <l-painter-text :text="props.detailData.price" css="font-weight: bold; font-size: 36rpx; color: #000000;margin-left:8rpx;line-height: 1em" />
        </l-painter-view>
        <l-painter-image
          :src="props.codeImg"
          css="width: 180rpx; height: 180rpx;position: absolute; bottom: 40rpx; right: 32rpx;padding: 0"
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
