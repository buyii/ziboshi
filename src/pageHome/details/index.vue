<script setup lang="ts">
// import F2chart from './component/F2chart.vue'
import { useMessage, useToast } from 'wot-design-uni'
import DetailName from './component/DetailName.vue'
import Process from './component/Process.vue'
import Demand from './component/Demand.vue'
import Traffic from './component/Traffic.vue'
import StoreInformation from './component/StoreInformation.vue'
import StoreDetail from './component/StoreDetail.vue'
import DetailFoot from './component/DetailFoot.vue'
import MyPopup from './component/MyPopup.vue'
import ApplyPopup from './component/ApplyPopup.vue'
import { addShopStore, getProductDetail } from '@/api/product'
import { getQRCode, getUserKolList } from '@/api/userKol'
import { getDictList } from '@/api/common'
import type { ProductDetail } from '@/types/common'
import { useTabbar } from '@/composables/useTabbar'

const { setTabbarItemActive } = useTabbar()
const helpMessage = useMessage('help')
const toast = useToast()
const productId = ref('')
const activityId = ref('')
const scene = ref('')
const showCode = ref(false)
const pageScrollTop = ref(0)
const showContent = ref(true)
const myPopupRef = ref()
const authCodePopupRef = ref()
const applyPopupRef = ref()
const imgUrl = ref('')
const codeUrl = ref('')
const currentimg = ref(0)
const dictList = ref<any>([])
const countdown = ref<any>(null)
const yearsNum = ref<number>(0)

function handleClickLeft() {
  uni.navigateBack()
}
function handleToHome() {
  setTabbarItemActive('home')
  uni.switchTab({
    url: '/pages/home/index',
  })
}

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
const swiperList = computed(() => {
  return detailData.value.imgs ? detailData.value.imgs.split(',') : [detailData.value.schema.cover]
})

function helpClick() {
  helpMessage.alert({
    msg: `达人高佣金以外，平台给予额外补贴。该部分收益通过我的钱包直接提现。`,
    title: '每单补',
    confirmButtonText: '确 定',
    confirmButtonProps: {
      customClass: 'custom-apply',
    },
  }).then(() => {
    console.log('点击了确定按钮')
  })
}

function swiperClick(e: any) {
  uni.previewImage({
    current: e.index,
    urls: swiperList.value,
  })
}

function getDetail() {
  getProductDetail({ productId: productId.value, activityId: activityId.value }).then((res) => {
    console.log(res)
    if (res.code === 0) {
      detailData.value = res.data
      showContent.value = false
      // 获取毫秒数
      if (res.data.promotionEndTime) {
        const str = res.data.promotionEndTime.replace(/-/g, '\/')
        countdown.value = new Date(str).getTime() - new Date().getTime()
        // 根据countdown.value 计算有多少年
        yearsNum.value = Math.floor(countdown.value / (1000 * 60 * 60 * 24 * 365))
      }
    }
  })
}

function showApplyPopup(flag = true) {
  applyPopupRef.value?.open(flag)
}

function confirmAuth() {
  getQRCode().then((res) => {
    if (res.code === 0) {
      codeUrl.value = res.data
      showCode.value = true
    }
    else {
      toast.close()
    }
  }).catch(() => {
    toast.close()
  })
}

function changeImg(url: any) {
  toast.close()
  imgUrl.value = url
  authCodePopupRef.value?.open(imgUrl.value)
}

function handleAdd() {
  toast.loading({
    loadingType: 'ring',
    loadingColor: '#FF0057',
    msg: '加载中...',
  })
  getUserKolList({ pageNum: 1, pageSize: 1000 }).then((res) => {
    if (res.code === 0) {
      if (res.total > 0) {
        toast.close()
        myPopupRef.value?.open(res.rows)
      }
      else {
        confirmAuth()
      }
    }
  }).catch(() => {
    toast.close()
  })
}

function updateJoinTraffic() {
  detailData.value.schema.joinTraffic = 1
}

function confirmAdd(list: any[]) {
  const ids = list.map(item => item.id).join(',')
  addShopStore({ productId: productId.value, activityId: activityId.value, kolId: ids }).then((res) => {
    if (res.code === 0) {
      toast.success('添加成功')
      myPopupRef.value?.close()
    }
    else {
      myPopupRef.value?.closeloading()
    }
  }).catch(() => {
    myPopupRef.value?.closeloading()
  })
}

function getDict() {
  getDictList({ dictType: 'product_safeguard_service' }).then((res) => {
    if (res.code === 0) {
      dictList.value = res.data
    }
  })
}

// const chartRef = ref<ComponentPublicInstance<{ getServerData: () => void }> | null>(null)

onLoad((options) => {
  getDict()
  if (options?.scene) {
    scene.value = options?.scene
    // 对options?.scene 进行解码
    const sceneData = decodeURIComponent(options?.scene)
    const scenes = sceneData.split(',')
    productId.value = scenes[1] || ''
    activityId.value = scenes[0] || ''
  }
  else {
    productId.value = options?.productId || ''
    activityId.value = options?.activityId || ''
  }
  getDetail()
})

onPageScroll((e) => {
  pageScrollTop.value = e.scrollTop
})
</script>

<template>
  <view class="detail-box">
    <wd-navbar title="" safe-area-inset-top left-arrow fixed :bordered="false">
      <template #capsule>
        <view class="capsule-box">
          <wd-icon name="thin-arrow-left" size="28rpx" color="#ffffff" @click="handleClickLeft" />
          <wd-icon v-if="scene" name="home" size="44rpx" color="#ffffff" @click="handleToHome" />
        </view>
        <!-- <wd-navbar-capsule /> -->
      </template>
    </wd-navbar>
    <wd-skeleton
      :loading="showContent" animation="gradient" theme="paragraph" :row-col="[
        [
          { width: '100%', height: '750rpx' },
        ],
        [
          { width: '130rpx', height: '56rpx', marginLeft: '32rpx' },
        ],
        [
          { width: '72rpx', height: '24rpx', marginLeft: '60rpx' },
          { width: '128rpx', height: '20rpx', marginLeft: '38rpx' },
          { flex: '1', height: '0rpx' },
        ],
        [
          { width: '332rpx', height: '136rpx', marginLeft: '32rpx', type: 'rect' },
          { width: '332rpx', height: '136rpx', marginRight: '32rpx', type: 'rect' },
        ],
        [
          { width: '148rpx', height: '24rpx', marginLeft: '32rpx' },
          { width: '160rpx', height: '24rpx', marginLeft: '32rpx' },
          { flex: '1', height: '0rpx' },
        ],
        [
          { flex: '1', height: '236rpx', marginLeft: '32rpx', marginRight: '32rpx', type: 'rect' },
        ],
        [
          { flex: '1', height: '236rpx', marginLeft: '32rpx', marginRight: '32rpx', type: 'rect' },
        ],
      ]"
    >
      <view class="detail-top">
        <!-- <image :src="detailData?.schema.cover" style="width: 750rpx;height: 750rpx;" /> -->
        <wd-swiper
          v-model:current="currentimg"
          height="750rpx"
          :list="swiperList"
          autoplay
          :indicator="{ type: 'fraction' }"
          indicator-position="bottom-right"
          @click="swiperClick"
        />
      </view>
      <view v-if="countdown" class="detail-time">
        <view v-if="yearsNum > 2" class="youxiao">
          长期有效
        </view>
        <template v-else>
          <text class="iconfont icon-clock" />
          <wd-count-down
            :time="countdown"
          >
            <template #default="{ current }">
              <view class="time-box">
                剩余
                <text class="text-time">
                  {{ current.days >= 10 ? current.days : `0${current.days}` }}
                </text>
                天
                <text class="text-time">
                  <text>
                    {{ current.hours >= 10 ? current.hours : `0${current.hours}` }}
                  </text>
                  :
                  <text>
                    {{ current.minutes >= 10 ? current.minutes : `0${current.minutes}` }}
                  </text>
                  :
                  <text>
                    {{ current.seconds >= 10 ? current.seconds : `0${current.seconds}` }}
                  </text>
                </text>
                结束
              </view>
            </template>
          </wd-count-down>
        </template>
      </view>
      <view class="detail-amount">
        <view class="amount-box">
          <view class="amount-left">
            <view class="amount">
              <text>￥</text>
              <text>{{ detailData?.schema.price }}</text>
            </view>
            <view class="amount-sub">
              <view>到手价</view>
              <view>公开佣金 {{ detailData?.schema.cosRatio }}%</view>
            </view>
          </view>
          <view>
            <view class="detail-sales">
              <view>总销量 <text>{{ formatNumber(detailData.sales) }}</text></view>
              <view class="category-box">
                <view class="category">
                  类目: <text>{{ detailData.categoryName }}</text>
                </view>
                <wd-divider vertical color="#EEEEEE" />
                <view class="guige" @click="showApplyPopup(false)">
                  <text class="text">规格</text>
                  <text class="iconfont icon-into" />
                </view>
              </view>
            </view>
          </view>
        </view>

        <view class="detail-commission">
          <view class="commission-item itemflex1">
            <view class="commission-label">
              达人高佣
            </view>
            <view class="commission-shuju">
              <view class="commission-ratio">
                {{ detailData?.schema.kolCosRatio }}<text>%</text>
              </view>
              <view class="commission-number">
                每单预估<text>{{ detailData?.schema.focKolCosFee }}</text>元
              </view>
            </view>
          </view>
          <view class="commission-item" @click.stop="helpClick">
            <view class="commission-label">
              <view class="mlabel">
                每单补
              </view>
              <view class="helpbox">
                <wd-icon name="help-circle-filled" custom-class="help-icon" />
              </view>
            </view>
            <view class="commission-shuju bujusc">
              <view class="commission-number">
                预估
              </view>
              <view class="commission-ratio">
                {{ detailData?.schema.kolFocServiceFee }}<text>元</text>
              </view>
              <!-- <view class="commission-number">
                每单预估 <text>{{ detailData?.schema.kolServiceRatio }}</text> %
              </view> -->
            </view>
          </view>
        </view>
      </view>
      <view class="detail-content">
        <!-- 商品信息 -->
        <DetailName :detail-data="detailData" />

        <!-- 领样要求 -->
        <template v-if="detailData.sampleType === 1">
          <Demand :detail-data="detailData" />

          <!-- 领样流程 -->
          <Process />
        </template>
        <!-- 投流 -->
        <template v-if="detailData.schema.hasTraffic === 1">
          <Traffic :detail-data="detailData" :toast="toast" @update-join-traffic="updateJoinTraffic" />
        </template>

        <!-- <F2chart ref="chartRef" /> -->

        <!-- 商品信息 -->
        <StoreInformation :detail-data="detailData" :dict-list="dictList" />
      </view>
      <!-- 详情页 -->
      <StoreDetail :swiper-list="swiperList" />
      <!-- 操作按钮 inPickCar -->
      <DetailFoot v-model="detailData" :page-scroll-top="pageScrollTop" :help-message="helpMessage" @add="handleAdd" @show-apply-popup="showApplyPopup" />
      <MyPopup ref="myPopupRef" @confirm-add="confirmAdd" @confirm-auth="confirmAuth" />
      <AuthCodePopup ref="authCodePopupRef" />
      <AuthCodeTem v-if="showCode" :code-url="codeUrl" :toast="toast" @change-img="changeImg" />
      <ApplyPopup ref="applyPopupRef" :detail-data="detailData" :help-message="helpMessage" />
    </wd-skeleton>
    <wd-message-box selector="help" custom-class="helpmsg" />
  </view>
</template>

<style scoped lang="scss">
.detail-box{
  padding-bottom: calc(260rpx + env(safe-area-inset-bottom));
  :deep(){
    .wd-navbar{
      background-color: transparent;
    }
    .wd-navbar__left{
      .wd-icon-arrow-left{
        color: #ffffff;
      }
    }
  }
  .capsule-box{
    display: flex;
    gap: 32rpx;
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
.detail-top{
  position: relative;
  width: 100%;
  height: 750rpx;
  .image{
    width: 750rpx;
    height: 750rpx;
  }
  :deep(){
    .wd-swiper__track{
      border-radius: 0rpx;
    }
  }
}
.detail-time{
  margin: 0 auto;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient( 225deg, #FFF1F6 0%, #FFD2E2 100%);
  color: #FF0057;
  .iconfont{
    margin-right: 32rpx;
  }
  .time-box{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 32rpx;
    color: #111111;
    line-height: 32rpx;
    font-style: normal;
  }
  .text-time{
    font-family: PingFangSC, PingFang SC;
    font-weight: bold;
    font-size: 32rpx;
    color: #FF0057;
    line-height: 32rpx;
    font-style: normal;
    margin: 0 6rpx;
  }
  .youxiao{
    font-size: 30rpx;
  }
}
.detail-amount{
  padding: 32rpx;
  background-color: #fff;
  .amount-box{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .amount{
    display: flex;
    align-items: start;
    text:nth-child(1){
      font-family: DINAlternate, DINAlternate;
      font-weight: bold;
      font-size: 28rpx;
      color: #000000;
      line-height: 28rpx;
      font-style: normal;
      margin-right: 6rpx;
    }
    text:nth-child(2){
      font-family: DINAlternate, DINAlternate;
      font-weight: bold;
      font-size: 56rpx;
      color: #000000;
      line-height: 56rpx;
      font-style: normal;
    }
  }
  .amount-sub{
    display: flex;
    align-items: center;
    padding-left: 28rpx;
    margin-top: 10rpx;
    view:nth-child(1){
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 24rpx;
      color: #999999;
      line-height: 24rpx;
      font-style: normal;
    }
    view:nth-child(2){
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 20rpx;
      color: #666666;
      line-height: 20rpx;
      font-style: normal;
      margin-left: 38rpx;
    }
  }
  .detail-sales{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 24rpx;
    color: #999999;
    line-height: 24rpx;
    font-style: normal;
    gap: 32rpx;
    text-align: right;
    text{
      color: #444444;
    }
    .category-box{
      display: flex;
      margin-top: 32rpx;
      align-items: center;
      .category{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #BABABA;
        line-height: 24rpx;
        font-style: normal;
        text{
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 24rpx;
          color: #BABABA;
          line-height: 24rpx;
          font-style: normal;
        }
      }
      .guige{
        width: 104rpx;
        height: 48rpx;
        background: #FFFFFF;
        border-radius: 20rpx;
        border: 2rpx solid rgba(0,0,0,0.05);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4rpx;
        .text{
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 24rpx;
          color: #999999;
          line-height: 24rpx;
          font-style: normal;
        }
        .iconfont{
          font-size: 20rpx;
          color: #000000;
          line-height: 20rpx;
        }
      }
    }

  }
  .detail-commission{
    display: flex;
    gap: 22rpx;
    justify-content: space-between;
    margin-top: 32rpx;
    .commission-item{
      background: #FAFAFA;
      border-radius: 16rpx;
      border: 1rpx solid #F4F4F4;
      padding: 24rpx 32rpx;
      min-width: 200rpx;
      .commission-label{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #666666;
        line-height: 24rpx;
        font-style: normal;
        margin-bottom: 16rpx;
        display: flex;
        align-items: center;
        .helpbox{
          line-height: 18rpx;
          margin-left: 8rpx;
          :deep(){
            .help-icon{
              font-size: 30rpx;
              color: #FF4600;
            }
          }
        }
      }
      .commission-shuju{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .commission-ratio{
          font-family: DINAlternate, DINAlternate;
          font-weight: bold;
          font-size: 30rpx;
          color: #FF0057;
          line-height: 30rpx;
          font-style: normal;
          text{
            font-size: 24rpx;
          }
        }
        .commission-number{
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 20rpx;
          color: #999999;
          line-height: 24rpx;
          font-style: normal;
          text{
            font-size: 24rpx;
            color: #111111;
            margin: 0 4rpx;
          }
        }
      }
      .bujusc{
        gap: 20rpx;
        justify-content: flex-start;
      }
    }
    .itemflex1{
      flex: 1;
    }
  }
}
.detail-content{
  padding: 20rpx 32rpx 32rpx 32rpx;
  .cell-box1{
    overflow: hidden;
    position: relative;
    padding: 0 30rpx 0 0;
    background-color: #fff;
    :deep(){
      .wd-cell__wrapper{
        padding: 0;
        height: 80rpx;
      }
      .wd-cell__right{
        flex: none;
      }
      .cell-left{
        width: 160rpx;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #999999;
        line-height: 28rpx;
        font-style: normal;
      }
      .wd-text{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #999999;
        line-height: 28rpx;
        font-style: normal;
      }
      .cell-right1{
        width: 400rpx;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #333333;
        font-style: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>

<route lang="json">
{
  "layout": "default",
  "name": "details",
  "page-meta": true,
  "style": {
    "navigationBarTitleText": "详情"
  }
}
</route>
