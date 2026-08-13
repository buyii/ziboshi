<script setup lang="ts">
import { useMessage } from 'wot-design-uni'

const message = useMessage('seting')
const show = ref<boolean>(false)
const imgUrl = ref<string>('')
function open(url: string) {
  console.log('open')
  show.value = true
  imgUrl.value = url
}

function close() {
  show.value = false
}

// // 生成图片路径
// async function iamgeToAlbum(type: 1 | 2) {
//   const base64Data = imgUrl.value.replace(/^data:image\/\w+;base64,/, '') // Base64数据
//   const filePath = `${wx.env.USER_DATA_PATH}/${new Date().getTime()}-temp.png` // 保存路径
//   base64ToImage(base64Data, filePath).then((path) => {
//     if (type === 1) {
//       saveIamge(path)
//     }
//     else {
//       shareIamge(path)
//     }
//   }).catch((err) => {
//     console.error('图片保存失败:', err)
//   })
// }

function toSeting() {
  message.confirm({
    msg: '需要授权保存到相册，是否去设置开启？',
    title: '提示',
    zIndex: 99999,
    confirmButtonText: '去设置',
    cancelButtonProps: {
      customClass: 'custom-shadow1',
    },
    confirmButtonProps: {
      customClass: 'custom-shadow',
    },

  }).then(() => {
    uni.openSetting({
      success(settingRes) {
        // 用户在设置页授权后可再次尝试保存
        // if (settingRes.authSetting['scope.writePhotosAlbum']) {
        //   saveIamge()
        // }
      },
    })
  }).catch(() => {
    console.log('点击了取消按钮')
  })
}

function onAuth() {
  uni.authorize({
    scope: 'scope.writePhotosAlbum',
    success() {
      saveIamge()
    },
    fail() {
      // 授权失败，提示并引导用户去设置
      toSeting()
    },
  })
}

// 图片添加到相册
function saveIamge() {
  uni.saveImageToPhotosAlbum({
    filePath: imgUrl.value,
    success() {
      console.log('图片保存成功')
      uni.showToast({
        title: '保存成功！',
      })
    },
    fail(err) {
      console.log('图片保存失败', err)
    },
  })
}

// 图片添加到相册
function shareIamge() {
  wx.showShareImageMenu({
    needShowEntrance: true,
    path: imgUrl.value,
  })
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
  <wd-overlay :show="show" :z-index="99999" custom-style="background: rgba(43,3,17,0.45);backdrop-filter: blur(40px)">
    <view class="poster-wrapper">
      <view class="img-wrapper">
        <image :src="imgUrl" mode="widthFix" />
        <view class="close" @click="close">
          <wd-icon name="close" size="24rpx" color="#000000" />
        </view>
      </view>
      <view class="btn-box">
        <view @click="shareIamge">
          <text class="iconfont icon-share" />
        </view>
        <view @click="onAuth">
          <text class="iconfont icon-pictureWhite" />
        </view>
      </view>
    </view>
  </wd-overlay>
  <wd-message-box selector="seting" />
</template>

<style lang="scss" scoped>
.poster-wrapper{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50rpx;
  height: 100%;
  .img-wrapper{
    width: 670rpx;
    height: 1128rpx;
    border-radius: 32rpx;
    overflow: hidden;
    position: relative;
    image{
      width: 100%;
      height: 100%;
    }
    .close{
      width: 80rpx;
      height: 80rpx;
      background: rgba(255,255,255,0.65);
      border-radius: 0rpx 32rpx 0rpx 32rpx;
      backdrop-filter: blur(4px);
      text-align: center;
      line-height: 80rpx;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  .btn-box{
    width: 100%;
    height: 112rpx;
    display: flex;
    align-items: center;
    justify-content: space-around;
    view{
      width: 112rpx;
      height: 112rpx;
      background: rgba(255, 255, 255, 0.15);
      text-align: center;
      line-height: 112rpx;
      border-radius: 50rpx;
      text{
        font-size: 48rpx;
        color: #FFFFFF;
      }
    }
  }
}
</style>

<style lang="scss">
.custom-shadow{
  background-color: #089D39 !important;
}
</style>
