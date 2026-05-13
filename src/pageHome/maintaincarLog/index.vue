<script setup lang="ts">
import { getLogList } from '@/api/common'

const imgBaseUrl = import.meta.env.VITE_IMG_URL
const layoutStore = useLayoutStore()
const statusBarHeight = computed(() => {
  return layoutStore.layoutStore.statusBarHeight
})

function handleClickLeft() {
  uni.navigateBack()
}

const id = ref('')
const list = ref<any>([])

function getList() {
  getLogList({ carId: id.value }).then((res) => {
    if (res.code === 0) {
      list.value = res.data
    }
  })
}

onLoad((options) => {
  id.value = options?.id
  getList()
})
</script>

<template>
  <wd-navbar title="商品记录" safe-area-inset-top left-arrow fixed :bordered="false" @click-left="handleClickLeft" />
  <view class="tabwarp" :style="{ paddingTop: `${(statusBarHeight || 0) + 44}px` }">
    <view v-for="item in list" :key="item.id" class="tabitem">
      <view>
        <view class="tabtext">
          {{ item.name }}
        </view>
        <view class="suntext">
          <view>
            时间：{{ item.time }}
          </view>
        </view>
      </view>
      <view class="btnbox">
        <view class="jilu">
          类型：{{ item.type === '1' ? '入库' : '出库' }}
        </view>
        <view class="btns">
          数量：{{ item.quantity }}
        </view>
      </view>
    </view>
    <wd-status-tip v-if="list.length <= 0" tip="暂无数据~">
      <template #image>
        <image style="width: 320rpx;height: 344rpx;margin-top: 60rpx;" :src="`${imgBaseUrl}/notData.png`" />
      </template>
    </wd-status-tip>
  </view>
</template>

<style lang="scss" scoped>
.tabwarp{
  padding: 24rpx;
  .tabitem{
    background-color: rgba(255, 0, 87, 0.7);
    padding: 24rpx;
    border-radius: 12rpx;
    color: #fff;
    margin-bottom: 24rpx;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .tabtext{
      font-family: PingFangSC, PingFang SC;
      font-weight: bold;
      font-size: 28rpx;
      color: #fff;
      font-style: normal;
      margin-bottom: 24rpx;
    }
    .suntext{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 22rpx;
      color: #fff;
      font-style: normal;
    }
    :deep(){
      .wd-button{
        background: #FF0057 !important;
        border-radius: 24rpx!important;
        font-size: 24rpx !important;
        font-weight: 500 !important;
      }
      .wd-button__text{
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 24rpx;
      }
    }
    .btnbox{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
      gap: 24rpx;
      .jilu{
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 24rpx;
        color: #FFFFFF;
        line-height: 24rpx;
        text-align: center;
        font-style: normal;
        border-radius: 24rpx;
        padding: 6rpx 20rpx;
        .iconfont{
          font-size: 22rpx;
          color: #FFFFFF;
        }
      }
      .btns{
        display: flex;
        gap: 12rpx;
      }
    }
  }
}
.addbox{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .custom-box{
    padding-top: 12rpx;
    padding-right: 24rpx;
    .addtext{
      color: #ff0056;
    }
  }
}
</style>

<style lang="scss">
.addmsg{
  .myPlaceholder{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 32rpx;
    color: rgba(0,0,0,0.25);
    line-height: 32rpx;
    font-style: normal;
  }
  .wd-input{
    background: #FFFFFF;
    border-radius: 16rpx;
    border: 1rpx solid #E8E8E8;
    padding-left: 24rpx;
    padding-right: 24rpx;
    line-height: 70rpx;
    margin-top: 16rpx;
    &::after{
      display: none !important;
    }
    .myInput{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 32rpx;
      color: 111111;
      line-height: 70rpx;
      font-style: normal;
      width: 460rpx;
      height: 70rpx;

    }
  }
  .suffixtext{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 28rpx;
    color: #FF0057;
    line-height: 28rpx;
    text-align: center;
    font-style: normal;
  }
}
</style>

<route type="page" lang="json">
{
  "layout": "page",
  "name": "logList",
  "style": {
    "navigationBarTitleText": "商品维护"
  }
}
</route>
