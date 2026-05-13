<script setup lang="ts">
import { useMessage, useToast } from 'wot-design-uni'
import MyPopup from './MyPopup.vue'
import ApplyPopup from './ApplyPopup.vue'
import NotQualifyPopup from './NotQualifyPopup.vue'
import { addShopStore, getProductDetail } from '@/api/product'
import { getQRCode, getUserKolList } from '@/api/userKol'
import type { ProductDetail } from '@/types/common'

const { item } = defineProps<Props>()
const emit = defineEmits(['onToDetails'])
const helpMessage = useMessage('help')
const myPopupRef = ref()
const authCodePopupRef = ref()
const notQualifyPopupRef = ref()
const applyPopupRef = ref()
const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
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
  monthShopSale: '', // 月销量
  kolShopSale: '', // 达人店铺销量
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
interface Props {
  item: any
}
const toast = useToast()

const codeUrl = ref('')
const imgUrl = ref('')
const showCode = ref(false)
function toDetails() {
  emit('onToDetails')
}
function copyId() {
  uni.navigateTo({
    url: `/pageHome/detailshare/index?productId=${item.productId}&activityId=${item.activityId}`,
  })
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
function confirmAdd(list: any[]) {
  const ids = list.map(item => item.id).join(',')
  addShopStore({ productId: item.productId, activityId: item.activityId, kolId: ids }).then((res) => {
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
function changeImg(url: any) {
  toast.close()
  imgUrl.value = url
  authCodePopupRef.value?.open(imgUrl.value)
}
function showApplyPopup() {
  getProductDetail({ productId: item.productId, activityId: item.activityId }).then((res) => {
    if (res.code === 0) {
      detailData.value = res.data
      applyPopupRef.value?.open(true)
    }
  })
}
function showPopup() {
  if (item.sampleType === 1) {
    if ((Number(userInfo.value.score) <= 3)) {
      toast.error('抱歉，您的星佣分值≤3分，暂不支持免费领样')
      return
    }
    showApplyPopup()// 免费领样时的弹窗
  }
  else {
    notQualifyPopupRef.value?.open(1) // 成本购样时的弹窗
  }
}
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
  <view class="car-item">
    <view class="item-content" @click.stop="toDetails">
      <view class="item-left">
        <image :src="item.cover" />
      </view>
      <view class="item-right">
        <view class="item-title">
          <wd-text v-if="item.trafficType" :text="item.productName" color="#000000" :lines="2" size="28rpx">
            <template #prefix>
              <text style="display: inline-flex;gap: 6rpx;">
                <text v-if="item.trafficType.includes('1')" class="warningmark">
                  随心推
                </text>
                <text v-if="item.trafficType.includes('2')" class="primarymark">
                  千川全域
                </text>
              </text>
            </template>
          </wd-text>
          <wd-text v-else :text="item.productName" color="#000000" :lines="2" size="28rpx" />
        </view>
        <view class="item-cost">
          <view>
            <view>到手价格</view>
            <view>
              <wd-text :text="item.price">
                <template #prefix>
                  <text class="prefix">¥</text>
                </template>
              </wd-text>
            </view>
          </view>
          <view>
            <view>达人高佣</view>
            <view>
              <wd-text :text="item.kolCosRatio">
                <template #suffix>
                  <text class="suffix">%</text>
                </template>
              </wd-text>
            </view>
          </view>
          <view>
            <view>每单补</view>
            <view>
              <wd-text :text="item.kolFocServiceFee" />
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="item-foot">
      <wd-button type="text" custom-class="custom-btntext" @click.stop="copyId">
        <wd-icon name="file-copy" size="30rpx" color="#999999" />
        商务推品
      </wd-button>
      <wd-button type="text" custom-class="custom-btntext" @click.stop="handleAdd">
        <wd-icon name="add-rectangle" size="30rpx" color="#999999" />
        添加橱窗
      </wd-button>
      <wd-button custom-class="custom-linyang" size="small" @click.stop="showPopup">
        {{ item.sampleType === 1 ? '免费领样' : '成本购样' }}
      </wd-button>
    </view>
  </view>
  <MyPopup ref="myPopupRef" @confirm-add="confirmAdd" @confirm-auth="confirmAuth" />
  <AuthCodePopup ref="authCodePopupRef" />
  <AuthCodeTem v-if="showCode" :code-url="codeUrl" :toast="toast" @change-img="changeImg" />
  <NotQualifyPopup ref="notQualifyPopupRef" :detail-data="item" />
  <ApplyPopup ref="applyPopupRef" :detail-data="detailData" :help-message="helpMessage" />
  <root-portal class="myhelp">
    <wd-message-box selector="help" custom-class="myhelpmsg" />
  </root-portal>
</template>

<style lang="scss" scoped>
.car-item{
  background-color: #fff;
  overflow: hidden;
  position: relative;
  .status{
    position: absolute;
    top: 0;
    right: 0;
    width: 120rpx;
    height: 52rpx;
    line-height: 52rpx;
    text-align: center;
    background: rgba(14,99,255,0.1);
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 24rpx;
    color: #0E63FF;
    border-radius: 0 16rpx 0 16rpx;
    .status-left{
      position: absolute;
      width: 16rpx;
      height: 16rpx;
      top: 0;
      left: -16rpx;
      background-color: rgba(14,99,255,0.1);
      view{
        width: 16rpx;
        height: 16rpx;
        border-radius: 0 60rpx 0 0;
        background-color: #fff;
      }
    }
    .status-right{
      position: absolute;
      width: 16rpx;
      height: 16rpx;
      right: 0;
      bottom: -16rpx;
      background-color: rgba(14,99,255,0.1);
      view{
        width: 16rpx;
        height: 16rpx;
        border-radius: 0 60rpx 0 0;
        background-color: #fff;
      }
    }
  }
  .order{
    view:nth-child(1){
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 24rpx;
      color: #999999;
      line-height: 24rpx;
    }
    view:nth-child(2){
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 28rpx;
      color: #666666;
      line-height: 28rpx;
      margin-top: 12rpx;
    }
  }
  .item-content{
    display: flex;
    gap: 30rpx;
    align-items: center;
    .item-left{
      image{
        width: 180rpx;
        height: 180rpx;
        border-radius: 16rpx;
      }
    }
    .item-right{
      flex: 1;
      .item-title{
        :deep(){
          .wd-text{
            flex: 1;
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 28rpx;
            color: #111111;
            line-height: 40rpx;
          }
        }
        .warningmark{
          padding: 2rpx 12rpx;
          border-radius: 12rpx 4rpx 12rpx 4rpx;
          background: #f24e88;
          font-size: 20rpx;
          display: inline-block;
          color: rgb(255, 255, 255);
          transition: opacity .3s;
          vertical-align: middle;
          line-height: initial;
          margin-right: 6rpx;
        }
        .primarymark{
          padding: 2rpx 12rpx;
          border-radius: 12rpx 4rpx 12rpx 4rpx;
          background: #5d2ed9;
          font-size: 20rpx;
          display: inline-block;
          color: rgb(255, 255, 255);
          transition: opacity .3s;
          vertical-align: middle;
          line-height: initial;
          margin-right: 6rpx;
        }
      }
      .item-cost{
        display: flex;
        justify-content: space-between;
        margin-top: 32rpx;
        view{
          view:nth-child(1){
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 24rpx;
            color: #999999;
            line-height: 24rpx;
          }
          view:nth-child(2){
            margin-top: 12rpx;
            display: flex;
            gap: 8rpx;
            :deep(){
              .wd-text{
                font-family: PingFangSC, PingFang SC;
                font-weight: 600;
                font-size: 32rpx;
                color: #FF0057;
                line-height: 32rpx;
                text-align: left;
                font-style: normal;
              }
            }
            .prefix{
              font-family: PingFangSC, PingFang SC;
              font-weight: 600;
              font-size: 24rpx;
              color: #FF0057;
              line-height: 40rpx;
              text-align: left;
              margin-right: 4rpx;
              font-style: normal;
            }
            .suffix{
              font-family: PingFangSC, PingFang SC;
              font-weight: 600;
              font-size: 24rpx;
              color: #FF0057;
              line-height: 40rpx;
              text-align: left;
              font-style: normal;
            }
          }
          .amount{
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 20rpx;
            color: #666666;
            line-height: 20rpx;
            padding: 6rpx 10rpx;
            background: #F8F8F8;
            border-radius: 6rpx;
          }
        }
      }
    }
  }
  .item-foot{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20rpx;
    :deep(){
      .custom-btntext{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #444444;
        line-height: 28rpx;
      }
      .custom-linyang{
        height: 64rpx;
        font-family: PingFangSC, PingFang SC;
        background: rgba(255, 0, 87, 0.1);
        border-radius: 16rpx;
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 28rpx;
        color: #FF0057;
        line-height: 28rpx;
        font-style: normal;
      }
    }
    .iconfont{
      display: inline-block;
      font-size: 24rpx;
      color: rgba(255, 0, 87, 0.45);
    }
    .line{
      width: 2rpx;
      height: 12rpx;
      background-color: rgba(255, 0, 87, 0.25);
    }
  }
}
</style>

<style lang="scss">
.myhelpmsg{
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
    display: flex !important;
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
</style>
