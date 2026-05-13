<script setup lang="ts">
import codebg from '@/static/codebg.png'

interface Props {
  baseImg: any
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
    console.log('图片生成成功11112222:', path)
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
      css="background-color: #fff;width: 630rpx; height: 910rpx;"
      @success="onSuccess"
    >
      <l-painter-view css="height: 88rpx; background: #f6d9e3">
        <l-painter-text
          :text="userInfo.userName"
          css="padding: 30rpx 0 0 38rpx;font-family: PingFangSC, PingFang SC;font-weight: 400;font-size: 36rpx;color: #111111;"
        />
      </l-painter-view>
      <l-painter-view css="position: absolute;left: 38rpx; top: 88rpx; ">
        <l-painter-text
          text="邀请人"
          css="font-family: PingFangSC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #666666;"
        />
      </l-painter-view>
      <l-painter-view css="position: absolute;right: 32rpx; top: 40rpx; ">
        <l-painter-text
          :text="`ID · ${userInfo.userCode}`"
          css="font-family: PingFangSC, PingFang SC;font-weight: 400;font-size: 24rpx;color: #666666;"
        />
      </l-painter-view>
      <l-painter-image
        :src="userInfo.avatar"
        css="position: absolute;left: 0;right: 0rpx;top: 138rpx;width: 170rpx; height: 170rpx;margin: 0 auto;border-radius: 50%;overflow: hidden;"
      />
      <l-painter-image
        :src="codebg"
        css="width: 630rpx; height: 830rpx;background: #f6d9e3;border-radius: 0 0 32rpx 32rpx;overflow: hidden;"
      />
      <l-painter-image
        :src="props.baseImg"
        css="position: absolute; bottom: 0rpx; width: 460rpx; height: 460rpx;margin: 112rpx auto;"
      />
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
