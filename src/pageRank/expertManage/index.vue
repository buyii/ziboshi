<script setup lang="ts">
import { useToast } from 'wot-design-uni'
import ExpertItem from './component/ExpertItem.vue'
import type { Item } from './type'
import { useLayoutStore } from '@/stores'
import { getQRCode, getUserKolList } from '@/api/userKol'

interface Pagination {
  pageNum: number
  pageSize: number
  total: number
}
const imgBaseUrl = import.meta.env.VITE_IMG_URL
const layoutStore = useLayoutStore()
const statusBarHeight = computed(() => {
  return layoutStore.layoutStore.statusBarHeight
})
const toast = useToast()
const authCodePopupRef = ref()
const state = ref()
const imgUrl = ref('')
const codeUrl = ref('')
const loading = ref<boolean>(false)
const showCode = ref<boolean>(false)
const kolList = ref<Item[]>([])
const pagination = ref<Pagination>({
  pageNum: 1,
  pageSize: 10,
  total: 0,
})
function handleClickLeft() {
  uni.navigateBack()
}

function changeImg(url: any) {
  toast.close()
  imgUrl.value = url
  authCodePopupRef.value?.open(imgUrl.value)
}

function confirmAuth() {
  toast.loading({
    loadingType: 'ring',
    loadingColor: '#FF0057',
    msg: '加载中...',
  })
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

function getDataList() {
  getUserKolList({ pageNum: pagination.value.pageNum, pageSize: pagination.value.pageSize }).then((res) => {
    if (res.code === 0) {
      pagination.value.total = res.total
      if (pagination.value.pageNum === 1) {
        kolList.value = res.rows
      }
      else {
        kolList.value = kolList.value.concat(res.rows)
      }
      pagination.value.total = res.total
      state.value = null
      loading.value = false
    }
    else {
      state.value = 'error'
      loading.value = false
    }
  }).catch(() => {
    state.value = 'error'
    loading.value = false
  })
}
function scrolltolower() {
  if (pagination.value.pageNum * pagination.value.pageSize >= pagination.value.total) {
    state.value = 'finished'
    return
  }
  state.value = 'loading'
  pagination.value.pageNum++
  getDataList()
}
function loadmore() {
  state.value = 'loading'
  getDataList()
}
onShow(() => {
  getDataList()
})
</script>

<template>
  <wd-navbar title="授权达人" safe-area-inset-top left-arrow fixed :bordered="false" @click-left="handleClickLeft" />
  <view :style="{ paddingTop: `${(statusBarHeight || 0) + 44}px` }" class="car-page">
    <!-- <scroll-view :style="{ top: `` }" class="scroll-Y" :scroll-y="true">
      <view v-for="(item, i) in kolList" :key="i" class="scroll-item">
        <ExpertItem :item="item" />
      </view>
    </scroll-view> -->
    <MyScrollView :top="`${(statusBarHeight || 0) + 44}px`" :fixed="false" :state="state" @scrolltolower="scrolltolower" @loadmore="loadmore">
      <view v-if="kolList.length > 0" class="scroll-content">
        <view v-for="(item, i) in kolList" :key="i" class="scroll-item">
          <ExpertItem :item="item" @on-auth="confirmAuth" />
        </view>
      </view>
      <wd-status-tip v-if="kolList.length <= 0 && !loading" tip="暂无数据~">
        <template #image>
          <image style="width: 320rpx;height: 344rpx;margin-top: 60rpx;" :src="`${imgBaseUrl}/notData.png`" />
        </template>
      </wd-status-tip>
    </MyScrollView>
    <FootButton label="立即授权" icon="icon-qrCode" fixed @confirm="confirmAuth" />
  </view>
  <AuthCodePopup ref="authCodePopupRef" />
  <AuthCodeTem v-if="showCode" :code-url="codeUrl" :toast="toast" @change-img="changeImg" />
</template>

<style scoped lang="scss">
.car-page{
  .search-wrap{
    background-color: #fff;
    border-radius: 32rpx;
    overflow: hidden;
    margin: 24rpx 32rpx 0;
    .search-box{
      padding: 16rpx 8rpx;
      :deep(.wd-search){
        background: transparent;
        padding: 0px !important;
        .inputClass{
          background: rgba(255,255,255,0);
        }
        .wd-search__block{
          height: 72rpx;
          border-radius: 48rpx;
          background: rgba(255,255,255,0.85);
          .wd-search__field,.wd-search__cover{
            background: transparent;
          }
        }
        .wd-icon-search{
          position: absolute;
          left: 24rpx;
          color: #000000;
          font-weight: 400;
          font-size: 32rpx;
        }
        .placeholderClass{
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 24rpx;
          color: #999999;
          font-style: normal;
        }
      }
    }
    .tab-box{
      border-top: 2rpx solid #EEEEEE;
    }
  }
  .label-all{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 32rpx;
    color: #000000;
    line-height: 32rpx;
    padding-left: 32rpx;
    padding-top: 32rpx;
    padding-bottom: 24rpx;
  }
  .scroll-Y{
    transition: all 0.3s ease; /* 添加平滑过渡效果 */
    position: fixed;
    .scroll-item{
      padding: 0 32rpx;
    }
  }
}
.scroll-content{
  padding-bottom: calc(100rpx + env(safe-area-inset-bottom));
}
.btnleft{
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 32rpx;
  color: #FF0057;
  line-height: 32rpx;
  margin-right: 28rpx;
  text{
    color: #FF0057;
  }
}
.checkbox-all{
  width: 180rpx;
  // margin-right: 40rpx;
}
</style>

<route lang="json">
{
  "layout": "default",
  "name": "expertManage",
  "style": {
    "navigationBarTitleText": "授权达人"
  }
}
</route>
