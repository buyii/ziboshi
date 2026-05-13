<script setup lang="ts">
import { useToast } from 'wot-design-uni'
import type { ProductDetail, Sample, Skus } from '@/types/common'
import { useLayoutStore } from '@/stores'

interface MyProps {
  detailData: ProductDetail
  helpMessage: any
}
const props = withDefaults(defineProps<MyProps>(), {
})
const toast = useToast()
const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
// const props = withDefaults(defineProps<TabsProps>(), {})

// const emit = defineEmits(['changeTab'])

// const model = defineModel({ default: 1 })
const { setLayoutStore } = useLayoutStore()
const skusList = computed(() => {
  // 把specs中name相同的分类在一起
  const skus = props.detailData.skus

  return skus.map((item) => {
    return {
      ...item,
      specName: item.specName.replace(/【/g, '').replace(/】/g, ''),
    }
  })
})

const specsList = computed(() => {
  // 把specs中name相同的分类在一起
  const specs = props.detailData.specs
  return specs
})

const show = ref<boolean>(false)
const myflag = ref<boolean>(true)
const selectItem = ref<string[]>([])
const selectSku = ref<Skus | null | undefined>()

function itemClick(item: any, specIndex: number) {
  if (!myflag.value) {
    return
  }
  if (selectItem.value[specIndex] === item.itemId) {
    selectItem.value[specIndex] = ''
  }
  else {
    selectItem.value[specIndex] = item.itemId
  }
  const selectItems = selectItem.value.filter(item => item)
  if (selectItems.length === specsList.value.length) {
    const mysku = skusList.value

    const skuItem = mysku.find((item) => {
    // selectItems  中的值是否都在 item.specIds 中
      return selectItems.every((selectItem) => {
        return item.specIds.includes(selectItem)
      })
    })
    selectSku.value = skuItem
  }
  else {
    selectSku.value = null
  }
}

function open(flag = true) {
  myflag.value = flag
  show.value = true
  setLayoutStore({ noScroll: true })
}

function close() {
  show.value = false
  setLayoutStore({ noScroll: false })
}

function onCancel() {
  // 商务申样
  if (userInfo.value.sampleOther === 1) {
    if (!selectSku.value) {
      toast.error({
        msg: '请选择规格',
        zIndex: 9999,
      })
      return
    }
    const data: Sample = {
      activityId: props.detailData.schema.activityId, // 活动id
      productId: props.detailData.schema.productId, // 商品id
      productName: props.detailData.schema.productName, // 商品名称
      cover: props.detailData.schema.cover, // 商品封面
      price: props.detailData.schema.price, // 商品价格
      focKolCosFee: props.detailData.schema.focKolCosFee, // KOL佣金比例
      kolFocServiceFee: props.detailData.schema.kolFocServiceFee, // KOL推广比例
      kolLevel: props.detailData.kolLevel, // 达人等级
      kolGmv: props.detailData.kolGmv, // 达人总GMV
      kolShopSale: props.detailData.kolShopSale, // 达人总橱销
      monthShopSale: props.detailData.monthShopSale, // 月销量
      sampleStock: props.detailData.sampleStock, // 申样库存
      sku: selectSku.value, // 商品规格
    }
    userStore.setSampleData(data)
    uni.navigateTo({
      url: `/pageHome/collectInfo/index?sampleType=2`,
    })
    show.value = false
    setLayoutStore({ noScroll: false })
  }
  else {
    props.helpMessage.alert({
      msg: `您还没有此权限，请联系客服开通！`,
      title: '提示',
      zIndex: 9999,
      confirmButtonText: '我知道了',
      confirmButtonProps: {
        customClass: 'custom-apply',
      },
    }).then(() => {
      console.log('点击了确定按钮')
    })
  }
}

function onConfirm() {
  if (!selectSku.value) {
    toast.error({
      msg: '请选择规格',
      zIndex: 9999,
    })
    return
  }
  const data: Sample = {
    activityId: props.detailData.schema.activityId, // 活动id
    productId: props.detailData.schema.productId, // 商品id
    productName: props.detailData.schema.productName, // 商品名称
    cover: props.detailData.schema.cover, // 商品封面
    price: props.detailData.schema.price, // 商品价格
    focKolCosFee: props.detailData.schema.focKolCosFee, // KOL佣金比例
    kolFocServiceFee: props.detailData.schema.kolFocServiceFee, // KOL推广比例
    kolLevel: props.detailData.kolLevel, // 达人等级
    kolGmv: props.detailData.kolGmv, // 达人总GMV
    kolShopSale: props.detailData.kolShopSale, // 达人总橱销
    monthShopSale: props.detailData.monthShopSale, // 月销量
    sampleStock: props.detailData.sampleStock, // 申样库存
    sku: selectSku.value, // 商品规格
  }
  userStore.setSampleData(data)
  uni.navigateTo({
    url: `/pageHome/collectInfo/index?sampleType=1`,
  })
  show.value = false
  setLayoutStore({ noScroll: false })
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
  <root-portal>
    <wd-popup
      v-model="show"
      position="bottom"
      custom-style="border-radius: 32rpx 32rpx 0rpx 0px;overflow: hidden;"
      :z-index="999" @close="close"
    >
      <view class="title">
        <view>{{ myflag ? '申请规格' : '规格' }}</view>
        <text class="iconfont icon-close" @click="close" />
      </view>
      <view class="popup-warp" :class="{ 'popup-warp-flag': !myflag, 'popup-pad1': skusList.length === 1 && (!myflag), 'popup-pad2': skusList.length === 2 && (!myflag) }">
        <view class="product-card">
          <view class="product-box">
            <image :src="props.detailData?.schema.cover" />
            <view class="product-right">
              <view class="product-title">
                {{ props.detailData?.schema.productName }}
              </view>
              <view v-if="selectSku" class="product-price-left">
                <text>{{ selectSku.effectivePrice }}元</text>
                <text>库存: {{ selectSku.stockNum || 0 }}</text>
              </view>
              <view v-else class="product-price-left">
                <text>{{ props.detailData?.schema.price }}元</text>
                <text>库存: {{ props.detailData?.productStock || 0 }}</text>
              </view>
            </view>
          </view>
        </view>
        <view v-for="(spec, specInde) in specsList" :key="spec.name">
          <view class="skus-title">
            {{ spec.name }}
          </view>
          <view class="skus-warp">
            <view v-for="item in spec.specItems" :key="item.itemId" class="skus-item" :class="{ active: (selectItem[specInde] === item.itemId) && myflag }" @click="itemClick(item, specInde)">
              <view class="sku-name">
                {{ item.itemName }}
              </view>
            </view>
          </view>
        </view>
        <template v-if="myflag && (props.detailData.kolLevel || props.detailData.kolShopSale || props.detailData.kolGmv)">
          <view class="tiaojianlabel">
            免费申样条件：
          </view>
          <view class="tiaojianitem">
            <text v-if="props.detailData.kolShopSale">
              总销量 ≥ {{ formatNumber(props.detailData.kolShopSale) }}
            </text>
            <text v-if="props.detailData.monthShopSale" class="gan">/</text>

            <text v-if="props.detailData.monthShopSale">
              月销单量 ≥ {{ props.detailData.monthShopSale }}
            </text>
            <text v-if="props.detailData.kolLevel" class="gan">/</text>

            <text v-if="props.detailData.kolLevel">
              达人等级 ≥ Lv{{ props.detailData.kolLevel }}
            </text>
            <text v-if="props.detailData.kolGmv" class="gan">/</text>

            <text v-if="props.detailData.kolGmv">
              30天GMV ≥ {{ formatNumber(props.detailData.kolGmv) }}
            </text>
          </view>
        </template>
      </view>
      <FootButtonGroup v-if="myflag" cancel-label="商务申样" :cancel-class="userInfo.sampleOther === 1 ? '' : 'cancelDis'" confirm-label="达人申样" fixed @on-confirm="onConfirm" @on-cancel="onCancel" />
    </wd-popup>
  </root-portal>
</template>

<style lang="scss" scoped>
.title{
  display: flex;
  z-index: 99;
  background-color: #fff;
  align-items: center;
  justify-content: space-between;
  height: 116rpx;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 36rpx;
  color: #000000;
  text-align: left;
  font-style: normal;
  padding: 0 48rpx;
  text{
    font-size: 28rpx;
  }
  .icon-close{
    font-size: 32rpx;
  }
}
.popup-warp{
  padding: 0 32rpx;
  padding-bottom: calc(150rpx + env(safe-area-inset-bottom));
  max-height: 900rpx;
  overflow-y: auto;
  .skus-title{
    margin-top: 24rpx;
    font-size: 30rpx;
  }
  .skus-warp{
    display: flex;
    flex-wrap: wrap;
    gap: 20rpx;
    padding: 20rpx 0;
  }
  .skus-item{
    padding: 10rpx 24rpx;
    border-radius: 36rpx;
    background: #f8f8f8;
    .sku-name{
      flex: 1;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 24rpx;
      color: #222222;
      line-height: 1.4;
      font-style: normal;
    }
  }
  .active{
    background: #FF0057;
    color: #fff;
    .sku-name{
      color: #fff;
    }
    .sku-price{
      color: #fff;
    }
  }
  .tiaojianlabel{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 28rpx;
    color: #ff0056;
    line-height: 40rpx;
    font-style: normal;
    margin-top: 10rpx;
    margin-bottom: 10rpx;
    margin-left: 24rpx;
  }
  .tiaojianitem{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 24rpx;
    color: #333333;
    line-height: 40rpx;
    font-style: normal;
    margin-left: 50rpx;
    .gan{
      margin: 0 10rpx;
      color: #ff0056;
    }
  }
}
.popup-warp-flag{
  padding-bottom: env(safe-area-inset-bottom);
}
.popup-pad1{
  padding-bottom: calc(100rpx + env(safe-area-inset-bottom));
}
.popup-pad2{
  padding-bottom: calc(50rpx + env(safe-area-inset-bottom));
}

.product-card{
  background-color: #fff;
}
.product-box{
  display: flex;
  gap: 22rpx;
  image{
    width: 128rpx;
    height: 128rpx;
    border-radius: 32rpx;
  }
  .product-right{
    flex: 1;
    .product-title{
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 28rpx;
      color: #111111;
      line-height: 36rpx;
      font-style: normal;
    }
    .product-price-left{
      margin-top: 12rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      text:nth-child(1){
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 30rpx;
        color: #FF0057;
        font-style: normal;
      }
      text:nth-child(2){
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #111111;
        font-style: normal;
      }
    }
  }
}
</style>
