<script setup lang="ts">
import { useMessage } from 'wot-design-uni'
import { getPickUrl, getProductDetail } from '@/api/product'
import type { ProductDetail } from '@/types/common'

const layoutStore = useLayoutStore()
const statusBarHeight = computed(() => {
  return layoutStore.layoutStore.statusBarHeight
})
const imgDownloadUrl = import.meta.env.VITE_IMG_DOWNLOAD
const userStore = useUserStore()
const showCopyTip = computed(() => userStore.showCopyTip)
const message = useMessage('seting')
const helpMessage = useMessage('help')
const productId = ref('')
const activityId = ref('')
const pickUrl = ref('')
const checkbox = ref(['0', '1', '2', '3'])
const imgUrl = ref<string | undefined>('')
const detailData = ref<ProductDetail>({
  schema: {
    cosFee: '', // 公开佣金费用
    cosRatio: '', // 公开佣金率
    cover: '', // 商品图片
    focKolCosFee: '', // 预估佣金
    kolFocServiceFee: '', // 预估补贴
    kolServiceFee: '',
    kolCosRatio: '', // 达人佣金率
    kolSampleRequire: '', // 申样要求
    kolServiceRatio: '', // 每单补率
    price: '', // 价格
    productId: '', // 商品id
    productName: '', // 商品名称
    sales: '',
    hasTraffic: '', // 是否投流
    trafficType: '', // 投流方式
    trafficWay: '', // 投流方式
    joinTraffic: '', // 投流方式
  },
  imgs: '', // 商品详情图片
  promotionEndTime: '', // 促销结束时间
  categoryId: '', // 目录id
  categoryName: '', // 目录名称
  sales: '', // 销量
  shopId: '', // 店铺id
  shopName: '', // 店铺名称
  shopSales: '', // 店铺销量
  shopScores: [], // 店铺评分
  productStock: '', // 库存
  sampleStock: '', // 样品库存
  sampleType: '', //
  isAssured: '', // 是否提供安心购服务
  hasSxt: '', // 是否具有短视频随心推资质
  kolLevel: '', // 达人等级
  kolGmv: '', // 达人总gmv
  kolShopSale: '', // 达人店铺销量
  monthShopSale: '', // 月销量
  monthSaleNum: '', // 商品近30天销量
  inPickCar: '', // 是否加入选品车
  logisticsText: '',
  nonShippingArea: '',
  safeguardService: '',
  merchantNickName: '',
  merchantKefuUrl: '',
  remark: '',
  fedex: '',
  skus: [], // 商品规格
  specs: [], // 商品规格
})

function getDetail() {
  getProductDetail({ productId: productId.value, activityId: activityId.value }).then((res) => {
    console.log(res)
    if (res.code === 0) {
      detailData.value = res.data
    }
  })
}
function getUrl() {
  getPickUrl({ productId: productId.value, activityId: activityId.value }).then((res) => {
    if (res.code === 0) {
      pickUrl.value = res.data
    }
  })
}

function helpCopy(text: string) {
  helpMessage.confirm({
    msg: `达人使用该链接带货产生的订单归属为您的业绩。`,
    title: '链接说明',
    confirmButtonText: '确 定',
    cancelButtonText: '不再提醒',
    confirmButtonProps: {
      customClass: 'custom-apply',
    },
    cancelButtonProps: {
      customClass: 'custom-cancel',
    },
  }).then(() => {
    uni.setClipboardData({
      data: text,
      showToast: false,
      success() {
        console.log('success')
      },
    })
  }).catch(() => {
    console.log('点击了取消按钮')
    userStore.setShowCopyTip(false)
    uni.setClipboardData({
      data: text,
      showToast: false,
      success() {
        console.log('success')
      },
    })
  })
}

function handleCopy() {
  console.log(checkbox.value)
  let text = ''
  if (checkbox.value.includes('0')) {
    text = `${detailData.value.schema.productName}`
  }
  if (checkbox.value.includes('1')) {
    text = `${text}
【店铺】${detailData.value.shopName}`
  }
  if (checkbox.value.includes('2')) {
    text = `${text}
【售价】${detailData.value.schema.price}`
  }
  if (checkbox.value.includes('3')) {
    text = `${text}
【佣金率】${detailData.value.schema.kolCosRatio}%`
  }

  text = `${text}
${pickUrl.value}`
  if (showCopyTip.value) {
    helpCopy(text)
  }
  else {
    uni.setClipboardData({
      data: text,
      showToast: false,
      success() {
        console.log('success')
      },
    })
  }
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
      success() {

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
  if (!imgUrl.value) {
    return
  }
  uni.saveImageToPhotosAlbum({
    filePath: imgUrl.value,
    success() {
      uni.showToast({
        title: '保存成功！',
      })
    },
    fail(err) {
      console.log('图片保存失败', err)
    },
  })
}

function getImg() {
  console.log(imgDownloadUrl)
  const url = `${imgDownloadUrl}?a=${detailData.value.schema.cover}`
  uni.getImageInfo({
    src: url,
    success(image) {
      imgUrl.value = image.path
      onAuth()
    },
    fail(image) {
      console.log(image)
    },
  })
  // const filePath = `${wx.env.USER_DATA_PATH}/${new Date().getTime()}-temp.png` // 保存路径
  // getImgBase64({ src: url, filePath }).then((path) => {
  //   imgUrl.value = path?.imgUrl
  //   onAuth()
  // }).catch((err) => {
  //   console.error('图片生成失败:', err)
  // })
}

function myPreview() {
  const list = [detailData.value.schema.cover]
  uni.previewImage({
    current: 0,
    urls: list,
  })
}
function handleClickLeft() {
  uni.navigateBack()
}

onShow(() => {
  if (productId.value && activityId.value) {
    getUrl()
  }
})
onLoad((options) => {
  productId.value = options?.productId || ''
  activityId.value = options?.activityId || ''
  getDetail()
  getUrl()
})
</script>

<template>
  <wd-navbar title="编辑分享内容" safe-area-inset-top left-arrow fixed :bordered="false" custom-style="background: #fff;" @click-left="handleClickLeft" />
  <view class="apply-warp" :style="{ paddingTop: `${(statusBarHeight || 0) + 44}px` }">
    <view class="contbox">
      <view class="imgtitle">
        <view class="text">
          图片素材
        </view>
        <wd-button size="small" @click="getImg">
          图片保存
        </wd-button>
      </view>
      <view class="imgbox">
        <img class="img" :src="detailData.schema.cover" alt="" @click="myPreview">
      </view>
    </view>
    <view class="contbox">
      <view class="imgtitle">
        <view class="text">
          文案素材
        </view>
        <!-- <wd-button size="small">
          复制推广文案信息
        </wd-button> -->
      </view>
      <view class="textbox">
        <view class="ptext">
          <wd-icon v-if="checkbox.includes('0')" name="check-circle-filled" size="26rpx" color="#111111" />
          <wd-icon v-else name="round" size="26rpx" color="#111111" />
          {{ detailData.schema.productName }}
        </view>
        <view class="ptext">
          <wd-icon v-if="checkbox.includes('1')" name="check-circle-filled" size="26rpx" color="#111111" />
          <wd-icon v-else name="round" size="26rpx" color="#111111" />
          【店铺】{{ detailData.shopName }}
        </view>
        <view class="ptext">
          <wd-icon v-if="checkbox.includes('2')" name="check-circle-filled" size="26rpx" color="#111111" />
          <wd-icon v-else name="round" size="26rpx" color="#111111" />
          【售价】{{ detailData.schema.price }}
        </view>
        <view class="ptext">
          <wd-icon v-if="checkbox.includes('3')" name="check-circle-filled" size="26rpx" color="#111111" />
          <wd-icon v-else name="round" size="26rpx" color="#111111" />
          【佣金率】{{ detailData.schema.kolCosRatio }}%
        </view>
        <view class="ptext">
          【下单链接】{{ pickUrl }}
        </view>
      </view>
    </view>
    <wd-message-box selector="help" custom-class="helpmsg" />
  </view>
  <view class="botbox">
    <view class="checkwarp">
      <wd-checkbox-group v-model="checkbox" checked-color="#ff0056" inline>
        <wd-checkbox model-value="0">
          商品名称
        </wd-checkbox>
        <wd-checkbox model-value="1">
          店铺
        </wd-checkbox>
        <wd-checkbox model-value="2">
          售价
        </wd-checkbox>
        <wd-checkbox model-value="3">
          佣金率
        </wd-checkbox>
      </wd-checkbox-group>
    </view>
    <wd-button block @click="handleCopy">
      <text>复制文案素材</text>
    </wd-button>
  </view>
  <wd-message-box selector="seting" />
</template>

<style scoped lang="scss">
.apply-warp{
  padding: 0 24rpx;
  .contbox{
    background-color: #fff;
    padding: 24rpx;
    border-radius: 24rpx;
    margin-top: 24rpx;
    .imgtitle{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16rpx;
      .text{
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 28rpx;
        color: #ff0056;
        line-height: 28rpx;
        text-align: left;
        font-style: normal;
      }
      :deep(){
        .wd-button{
          background-color: #FF0056 !important;
          color: #fff !important;
          font-size: 24rpx !important;
          line-height: 20rpx !important;
          height: 50rpx !important;
          font-family: PingFangSC, PingFang SC !important;
          font-weight: 400 !important;
          border-radius: 14rpx;
        }
      }
    }
    .imgbox{
      background-color: #F8F8F8;
      padding: 16rpx;
      border-radius: 16rpx;
      .img{
        width: 200rpx;
        height: 200rpx;
      }
    }
    .textbox{
      background-color: #F8F8F8;
      padding: 16rpx;
      border-radius: 16rpx;
      .ptext{
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 28rpx;
        line-height: 1.6;
        margin-bottom: 20rpx;
        word-break: break-all;
        color: #111111;
      }
    }
  }
  :deep(){
    .helpmsg{
      .wd-message-box__title{
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 36rpx;
        color: #000000;
        line-height: 36rpx;
        text-align: left;
        font-style: normal;
      }
      .wd-message-box__content{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #666666;
        line-height: 40rpx;
        text-align: left;
        font-style: normal;
        margin-top: 12rpx;
      }
      .wd-message-box__actions{
        display: flex;
        justify-content: flex-end;
      }
      .custom-apply{
        width: 220rpx;
        height: 80rpx;
        background: #FF0057 !important;
        border-radius: 16rpx 40rpx 40rpx 16rpx !important;
      }
      .custom-cancel{
        width: 220rpx;
        height: 80rpx;
        background: #FAFAFA !important;
        border-radius: 40rpx 16rpx 16rpx 40rpx !important;
      }
    }
  }
}
.botbox{
  padding-bottom: calc(12rpx + env(safe-area-inset-bottom));
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9;
  padding-top: 6rpx;
  padding-left: 32rpx;
  padding-right: 32rpx;
  :deep(){
    .wd-button{
      flex: 1;
      height: 88rpx !important;
      background: #FF0057 !important;
      border-radius: 8rpx 32rpx 8rpx 32rpx !important;
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
  .checkwarp{
    margin-bottom: 24rpx;

  }
}
</style>

<style lang="scss">
.custom-shadow{
  background-color: #FF0057 !important;
}
</style>

<route lang="json">
{
  "layout": "default",
  "name": "detailshare",
  "style": {
    "navigationBarTitleText": "详情分享"
  }
}
</route>
