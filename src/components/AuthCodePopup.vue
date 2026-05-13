<script setup lang="ts">
import { useMessage } from 'wot-design-uni'

const show = ref<boolean>(false)
const imgUrl = ref<string>('')
const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)

const message = useMessage('seting')
const qxList = [
  '同步账号基础信息及查看账号运营数据',
  '高佣商品任选资格，支持一键添加橱窗',
  '海量高佣 + 补贴商品免费申样',
  '大数据智能选品，为您匹配适合您带货账号的产品',
]
function open(url: string) {
  console.log('open')
  show.value = true
  imgUrl.value = url
}

function close() {
  show.value = false
}

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
  <wd-popup v-model="show" :z-index="9999" custom-style="background: rgba(43, 3, 17, 0.45);backdrop-filter: blur(10px);" @click.stop="close">
    <view class="poster-popup">
      <view class="poster-wrapper" @click.stop="">
        <view class="name-box">
          <text class="iconfont icon-close" @click="close" />
          <!-- <image class="imgbgr" src="../../../static/svg/codetr.svg" /> -->
          <view class="name-content">
            <view class="img-box">
              <image class="imgbg" src="../static/svg/codetl.svg" />
              <image class="img" :src="userInfo.avatar" />
            </view>
            <view class="name-value">
              <view class="name-text">
                {{ userInfo.userName }}
              </view>
              <view class="name-sub">
                星佣宝用户
              </view>
            </view>
          </view>
        </view>
        <view class="poster-content">
          <view class="steps">
            <text class="iconfont icon-tiktok" />
            <view class="line-label">
              打开抖音
            </view>
            <text class="iconfont icon-searchFor" />
            <view class="line-label">
              搜索 - 扫一扫
            </view>
            <text class="iconfont icon-scan1" />
          </view>
          <view class="code-box">
            <img class="code-img" :src="imgUrl">
            <view class="pointer" />
          </view>
          <view class="btn-box">
            <view class="jiantou">
              <view class="jiantoul" />
              <view class="jiantour" />
            </view>
            <wd-button block @click="onAuth">
              <text>保存到相册</text>
            </wd-button>
          </view>
          <view class="quanxian">
            <view class="quanxian-title">
              授权≠签约；成功后获得以下权限
            </view>
            <view v-for="item in qxList" :key="item" class="quanxian-item">
              <wd-icon name="check" color="#fff" size="16rpx" />
              <text class="tet">{{ item }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </wd-popup>
  <wd-message-box selector="seting" />
</template>

<style lang="scss" scoped>
.poster-popup{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.poster-wrapper{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 662rpx;
  height: 1192rpx;
  border-radius: 32rpx;
  overflow: hidden;
  .name-box {
    height: 160rpx;
    width: 100%;
    position: relative;
    .iconfont{
      position: absolute;
      right: 40rpx;
      top: 40rpx;
      color: #fff;
      font-size: 28rpx;
    }
    .name-content{
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      gap: 16rpx;
      background: #FF0057;
      .img-box{
        width: 130rpx;
        height: 130rpx;
        position: relative;
        margin-left: 6rpx;
        .imgbg{
          width: 100%;
          height: 100%;
        }
        .img{
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          width: 80rpx;
          height: 80rpx;
          border-radius: 40rpx;
        }
      }
      .name-value{
        .name-text{
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: 32rpx;
          color: #FFFFFF;
          line-height: 32rpx;
          font-style: normal;
        }
        .name-sub{
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 24rpx;
          color: rgba(255,255,255,0.65);
          line-height: 24rpx;
          font-style: normal;
          margin-top: 12rpx;
        }
      }
    }

  }
  .poster-content{
    flex: 1;
    width: 100%;
    background: #fff;
    .steps{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20rpx 32rpx;
      gap: 16rpx;
      .iconfont{
        font-size: 48rpx;
        color: #000000;
      }
      .line-label{
        flex: 1;
        text-align: center;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #999999;
        line-height: 24rpx;
        font-style: normal;
        border-top: 2rpx solid #DADADA;
        align-self: flex-end;
        padding-top: 22rpx;
        margin-top: 48rpx;
      }
    }
    .code-box{
      width: 594rpx;
      height: 446rpx;
      text-align: center;
      margin: 12rpx auto;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      .code-img{
        width: 350rpx;
        height: 374rpx;
      }
      .pointer{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        border: 4rpx solid #FF0057;
        mask: conic-gradient(at 32rpx 24rpx, transparent 75%, blue 75%) 0 0 / calc(100% - 32rpx) calc(100% - 24rpx);
      }
    }
  }
  .img-wrapper{
    width: 630rpx;
    height: 710rpx;
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
    padding: 32rpx;
    .jiantou{
      width: 100%;
      height: 12rpx;
      background-color: #FF0057;
      display: flex;
      justify-content: center;
      .jiantoul{
        flex: 1;
        background-color: #fff;
        border-radius: 0 0 24rpx 0;
      }
      .jiantour{
        flex: 1;
        background-color: #fff;
        border-radius: 0 0 0 32rpx;
      }
    }
    :deep(){
      .wd-button{
        flex: 1;
        height: 88rpx !important;
        background: #FF0057 !important;
        border-radius: 24rpx!important;
        font-size: 32rpx !important;
        font-weight: 500 !important;
      }
      .wd-button__text{
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 32rpx;
      }
    }
  }
  .quanxian{
    padding: 0 32rpx;
    .quanxian-title{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 32rpx;
      color: #111111;
      line-height: 32rpx;
      font-style: normal;
      margin-bottom: 26rpx;
    }
    .quanxian-item{
      display: flex;
      align-items: center;
      gap: 16rpx;
      margin-bottom: 20rpx;
      .tet{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #999999;
        line-height: 24rpx;
        font-style: normal;
      }
      :deep(){
        .wd-icon{
          background: #FF0057;
          border-radius: 8rpx 8rpx 30rpx 30rpx;
          width: 28rpx;
          height: 28rpx;
          text-align: center;
          line-height: 26rpx;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.custom-shadow{
  background-color: #FF0057 !important;
}
</style>
