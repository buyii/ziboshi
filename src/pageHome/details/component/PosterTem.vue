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
        :src="props.detailData.schema.cover"
        css="object-fit: cover; object-position: 50% 50%; position: absolute; top: 0;left:0; width: 100%; height: 1128rpx"
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
        <l-painter-view css="vertical-align: middle;margin-top:8rpx">
          <l-painter-view css="display: inline-block">
            <l-painter-text
              text="达人佣金"
              css="font-weight: 400; font-size: 24rpx; color: #696A6A;line-height: 1em"
            />
            <l-painter-view css="margin-top:8rpx;line-height: 1em">
              <l-painter-text text="约赚" css="font-weight: 400; font-size: 20rpx; color: #666666;line-height: 1em" />
              <l-painter-text :text="props.detailData.schema.focKolCosFee" css="font-weight: 400; font-size: 20rpx; color: #111111;margin-left: 8rpx;line-height: 1em" />
            </l-painter-view>
          </l-painter-view>
          <l-painter-view css="display: inline-block;vertical-align: bottom;margin-left: 16rpx;line-height: 1em">
            <l-painter-text :text="props.detailData.schema.kolCosRatio" css="font-weight: bold; font-size: 68rpx; color: #FF0057;line-height: 1em" />
            <l-painter-text text="%" css="font-weight: bold; font-size: 48rpx; color: #FF0057;line-height: 1em" />
          </l-painter-view>
        </l-painter-view>
        <l-painter-view css="vertical-align: bottom; margin-top:10rpx;line-height: 1em">
          <l-painter-text text="到手价" css="font-weight: 400; font-size: 20rpx; color: #000000;line-height: 1em" />
          <l-painter-text text="¥" css="font-weight: 600; font-size: 24rpx; color: #000000; margin-left:10rpx;line-height: 1em" />
          <l-painter-text :text="props.detailData.schema.price" css="font-weight: bold; font-size: 36rpx; color: #000000;margin-left:8rpx;line-height: 1em" />
          <!-- <l-painter-text text=".9" css="font-weight: bold; font-size: 24rpx; color: #000000;line-height: 1em" /> -->
        </l-painter-view>
        <l-painter-view css="margin-top:34rpx;padding-right:190rpx;">
          <l-painter-text
            :text="props.detailData.schema.productName"
            css="line-clamp: 1; color: #111111; font-size: 28rpx; fontWeight: 500;line-height: 1em"
          />
          <!-- <l-painter-text
            text="M2芯片让你感受极致流畅"
            css="display: block; margin-top: 10rpx; color: #444444; font-size: 20rpx; fontWeight: 500;line-height: 1em"
          /> -->
        </l-painter-view>
        <l-painter-image
          :src="props.codeImg"
          css="width: 180rpx; height: 180rpx;position: absolute; bottom: 40rpx; right: 32rpx;padding: 0"
        />
        <!-- <l-painter-qrcode
          css="width: 180rpx; height: 180rpx;position: absolute; bottom: 40rpx; right: 32rpx;padding: 0"
          text="limeui.qcoon.cn"
        /> -->
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
