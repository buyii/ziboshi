<script setup lang="ts">
import { useMessage, useToast } from 'wot-design-uni'
import type { UploadFileItem, UploadStatusType, UploadSuccessEvent } from 'wot-design-uni/components/wd-upload/types'
import MyPopup from './component/MyPopup.vue'
import ExamplePopup from './component/ExamplePopup.vue'
import { action } from '@/api/common'
import { getProductList } from '@/api/product'
import type { ProductItem } from '@/types/common'
import { productFindAdd } from '@/api/productfind'

// import F2chart from './component/F2chart.vue'
const toast = useToast()
const helpMessage = useMessage('help')
const layoutStore = useLayoutStore()
const userStore = useUserStore()
const { token } = userStore
const statusBarHeight = computed(() => {
  return layoutStore.layoutStore.statusBarHeight
})
const myPopupRef = ref()
const examplePopupRef = ref()
const imgList = ref<UploadFileItem[]>([])
const imgList1 = ref<UploadFileItem[]>([])
const productList = ref<ProductItem[]>([])
const showText = ref<boolean>(false)
const loading = ref<boolean>(false)
const productName = ref('')
const shopName = ref('')
const productType = ref('1')
const remark = ref('')

function onExample(type: number) {
  examplePopupRef.value?.open(type)
}
function toSuccess() {
  uni.navigateTo({
    url: '/pageAi/findLog/index',
    events: {
      // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
      backEvent() {
        imgList.value = []
        imgList1.value = []
        productList.value = []
        showText.value = false
        productName.value = ''
        shopName.value = ''
        productType.value = ''
        remark.value = ''
      },
    },
  })
}
function onShowTextarea() {
  showText.value = !showText.value
}

function onTextBlur(val: any) {
  if (val.value === '') {
    showText.value = false
  }
}

function handleClickLeft() {
  uni.navigateBack()
}

function onSuccess({ file, fileList, formData }: UploadSuccessEvent) {
  console.log(file, fileList, formData)
  let response: any = {}
  if (typeof file.response === 'string') {
    response = JSON.parse(file.response)
  }
  else if (typeof file.response === 'object' && file.response !== null) {
    response = file.response
  }
  const status: UploadStatusType = response.code === 0 ? 'success' : 'fail'
  file.status = status
}

function joinUrl(list: UploadFileItem[]) {
  const urlList = list.filter(item => item.status === 'success').map((item) => {
    let response: any = {}
    if (typeof item.response === 'string') {
      response = JSON.parse(item.response)
    }
    else if (typeof item.response === 'object' && item.response !== null) {
      response = item.response
    }
    return response?.data
  })
  return urlList
}

function getMatchList() {
  const params = {
    productName: productName.value,
    pageNum: 1,
    pageSize: 2,
    orderField: 0,
    source: 3,
  }
  loading.value = true
  getProductList(params).then((res) => {
    if (res.code === 0) {
      const uploadImg = joinUrl(imgList.value)
      const kolImg = joinUrl(imgList1.value)
      const data = {
        productName: productName.value,
        shopName: shopName.value,
        productType: productType.value,
        remark: remark.value,
        uploadImg: uploadImg.join(','),
        kolImg: kolImg.join(','),
      }
      productList.value = res.rows

      if (productList.value.length > 0) {
        myPopupRef.value?.open(data)
        loading.value = false
      }
      else {
        toSucc(data)
      }
    }
    else {
      loading.value = false
    }
  }).catch(() => {
    loading.value = false
  })
}

function toSucc(data: any) {
  productFindAdd({ ...data }).then((res) => {
    loading.value = false
    if (res.code === 0) {
      toSuccess()
    }
  }).catch(() => {
    loading.value = false
  })
}

function helpClick() {
  helpMessage.alert({
    msg: `公开链接商品在选品广场中展示；专属链接商品仅个人可见，从找品记录中查看。`,
    title: '商品类型',
    confirmButtonText: '确 定',
    confirmButtonProps: {
      customClass: 'custom-apply',
    },
  }).then(() => {
    console.log('点击了确定按钮')
  })
}

function handleSubmit() {
  const uploadImg = joinUrl(imgList.value)
  const kolImg = joinUrl(imgList1.value)

  if (!productName.value) {
    toast.error('请输入产品信息')
    return
  }

  if (!shopName.value) {
    toast.error('请输入店铺信息')
    return
  }

  if (uploadImg.length < 2) {
    toast.error('至少上传两张图片')
    return
  }
  if (kolImg.length < 1) {
    toast.error('请上传带货达人主页图片')
    return
  }
  if (!productType.value) {
    toast.error('请选择商品类型')
    return
  }

  if (!remark.value) {
    toast.error('请输入备注')
    return
  }
  getMatchList()
}
</script>

<template>
  <wd-navbar title="找品申请" safe-area-inset-top left-arrow fixed :bordered="false" @click-left="handleClickLeft" />
  <view :style="{ paddingTop: `${(statusBarHeight || 0) + 44}px` }" class="findproducts-box">
    <view class="tupian-title">
      <view>
        <view class="title1">
          至少上传两张图片
        </view>
        <view class="title2">
          我们将为您识别出图片信息
        </view>
      </view>
      <view class="shili" @click="onExample(1)">
        <text class="text">查看示例</text>
        <text class="iconfont icon-into" />
      </view>
    </view>
    <view view class="upload-box">
      <wd-upload
        v-model:file-list="imgList"
        multiple
        custom-evoke-class="custom-evoke-class"
        :header="{
          Authorization: `Bearer ${token}`,
        }"
        :form-data="{
          prefix: 'find',
        }"
        :limit="2"
        :size-type="['compressed']"
        image-mode="aspectFill"
        :action="action" @success="onSuccess"
      />
    </view>
    <view class="info-box">
      <view class="info-box-item">
        <view class="info-label">
          产品信息
        </view>
        <view class="info-value">
          <wd-input v-model="productName" :maxlength="200" :clearable="true" :cursor-spacing="100" placeholder="请输入" no-border />
        </view>
      </view>
      <view class="info-box-item">
        <view class="info-label">
          店铺信息
        </view>
        <view class="info-value">
          <wd-input v-model="shopName" :maxlength="50" :cursor-spacing="100" :clearable="true" placeholder="请输入" no-border />
        </view>
      </view>
    </view>

    <view class="daren-title">
      <view>
        <view class="daren-title1">
          带货达人
        </view>
        <view class="daren-title2">
          打开达人主页截图上传
        </view>
      </view>
      <view class="shili" @click="onExample(2)">
        <text class="text">查看示例</text>
        <text class="iconfont icon-into" />
      </view>
    </view>
    <view view class="upload-box">
      <wd-upload
        v-model:file-list="imgList1"
        custom-evoke-class="custom-evoke-class"
        :header="{
          Authorization: `Bearer ${token}`,
        }"
        :form-data="{
          prefix: 'find',
        }"
        :limit="1"
        :size-type="['compressed']"
        image-mode="aspectFill" :action="action" @success="onSuccess"
      />
    </view>
    <view class="info-box">
      <view class="info-box-item">
        <view class="info-label">
          商品类型
        </view>
        <view class="info-value">
          <wd-radio-group v-model="productType" checked-color="#FF0056" shape="button">
            <wd-radio value="1">
              公开链接
            </wd-radio>
            <wd-radio value="2">
              专属链接
            </wd-radio>
          </wd-radio-group>
          <view class="helpbox" @click.stop="helpClick">
            <wd-icon name="help-circle-filled" custom-class="help-icon" />
          </view>
        </view>
      </view>
    </view>
    <view class="beizhu-title">
      备注
    </view>
    <view class="textarea-box">
      <view v-if="!showText" class="word-view" @click="onShowTextarea">
        <view><wd-icon name="edit-1" size="24rpx" /></view>
        <view class="word-text">
          点击空白区域输入
        </view>
      </view>
      <wd-textarea
        v-if="showText"
        v-model="remark"
        :auto-height="true"
        :cursor-spacing="100"
        :auto-focus="true"
        :show-confirm-bar="false"
        confirm-type="done"
        placeholder="请输入" @blur="onTextBlur"
      />
    </view>
    <FootButton label="提交" :loading="loading" fixed @confirm="handleSubmit" />
    <MyPopup ref="myPopupRef" :product-list="productList" @to-success="toSuccess" />
    <ExamplePopup ref="examplePopupRef" />
    <wd-message-box selector="help" custom-class="helpmsg" />
  </view>
</template>

<style scoped lang="scss">
.findproducts-box{
  padding: 48rpx;
  padding-bottom: calc(130rpx + env(safe-area-inset-bottom));
  .tupian-title{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 48rpx;
    .title1{
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 40rpx;
      color: #111111;
      line-height: 40rpx;
      font-style: normal;
    }
    .title2{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 24rpx;
      color: #999999;
      line-height: 24rpx;
      font-style: normal;
      margin-top: 16rpx;
    }
    .shili{
      width: 176rpx;
      height: 64rpx;
      background: #EEEEEE;
      border-radius: 32rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10rpx;
      .text{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #111111;
        line-height: 24rpx;
        text-align: left;
        font-style: normal;
      }
      .iconfont{
        font-size: 24rpx;
        color: #BABABA;
      }
    }
  }
  .upload-box{
    margin-top: 32rpx;
    :deep(){
      .wd-upload{
        flex-wrap: nowrap;
      }
      .wd-upload__preview{
        width: 290rpx;
        height: 290rpx;
      }
      .custom-evoke-class{
        width: 290rpx;
        height: 290rpx;
        background: #FFFFFF;
        border-radius: 32rpx;
      }
    }
  }
  .info-box{
    background: #FFFFFF;
    border-radius: 16rpx;
    padding: 0 32rpx;
    margin-top: 12rpx;
    .info-box-item{
      height: 96rpx;
      display: flex;
      align-items: center;
      gap: 16rpx;
      .info-label{
        width: 120rpx;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #111111;
        line-height: 28rpx;
        text-align: center;
        font-style: normal;
      }
      .info-value{
        flex: 1;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #111111;
        text-align: left;
        font-style: normal;
        display: flex;
        align-items: center;
        justify-content: space-between;
        :deep(){
          .wd-input{
            width: 100%;
          }
          .wd-radio__label{
            padding: 6rpx 20rpx;
            font-size: 24rpx;
            height: 54rpx;
          }
          .wd-input__inner{
            flex: 1;
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 24rpx;
            color: #111111;
            line-height: 24rpx;
            font-style: normal;
          }
        }
        .helpbox{
          line-height: 40rpx;
          margin-left: 18rpx;
          :deep(){
            .help-icon{
              font-size: 40rpx;
              color: #FF4600;
            }
          }
        }
      }
    }
  }
  .daren-title{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 48rpx;
    .daren-title1{
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 32rpx;
      color: #111111;
      line-height: 32rpx;
      font-style: normal;
    }
    .daren-title2{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 24rpx;
      color: #999999;
      line-height: 24rpx;
      font-style: normal;
      margin-top: 16rpx;
    }
    .shili{
      width: 176rpx;
      height: 64rpx;
      background: #EEEEEE;
      border-radius: 32rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10rpx;
      .text{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #111111;
        line-height: 24rpx;
        text-align: left;
        font-style: normal;
      }
      .iconfont{
        font-size: 24rpx;
        color: #BABABA;
      }
    }
  }
  .beizhu-title{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 32rpx;
    color: #111111;
    line-height: 32rpx;
    font-style: normal;
    margin-top: 24rpx;
  }
  .textarea-box{
    background: #FFFFFF;
    border-radius: 16rpx;
    margin-top: 24rpx;
    .word-view{
      height: 128rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #DADADA;
      .word-text{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #DADADA;
      }
    }
    :deep(){
      .wd-textarea{
        min-height: 128rpx;
        border-radius: 16rpx;
        padding: 10rpx !important;
      }
      .wd-textarea::after {
        display: none !important;
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
</style>

<route lang="json">
{
  "layout": "default",
  "name": "findproducts",
  "style": {
    "navigationBarTitleText": "找品申请"
  }
}
</route>
