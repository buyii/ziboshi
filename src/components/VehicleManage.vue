<script setup lang="ts">
import { useMessage, useToast } from 'wot-design-uni'
import { addCar, getCarList } from '@/api/common'

const layoutStore = useLayoutStore()
const statusBarHeight = computed(() => {
  return layoutStore.layoutStore.statusBarHeight
})

const toast = useToast()
const delmessage = useMessage('add')
const value = ref('')
const value1 = ref('')
const list = ref<any>([])

function onAddCar() {
  value.value = ''
  delmessage.confirm({
    title: '添加商品',
    confirmButtonProps: {
      customClass: 'custom-shadow',
    },
    beforeConfirm: ({ resolve }) => {
      toast.loading({
        loadingType: 'ring',
        loadingColor: '#FF0057',
        msg: '添加...',
      })
      if (!value.value) {
        toast.error('请输入商品名称')
        resolve(false)
      }
      else if (!value1.value) {
        toast.error('请输入商品数量')
        resolve(false)
      }
      else {
        resolve(true)
      }
    },
  }).then(() => {
    addCar({ name: value.value, quantity: value1.value }).then((res) => {
      if (res.code === 0) {
        getList()
      }
    })
  })
}

function onWeiHu(item: any, type: any) {
  uni.navigateTo({
    url: `/pageHome/maintaincar/index?name=${item.name}&id=${item.id}&quantity=${item.quantity}&type=${type}`,
  })
}

function onJiLu(item: any) {
  uni.navigateTo({
    url: `/pageHome/maintaincarLog/index?id=${item.id}`,
  })
}

function getList() {
  getCarList().then((res) => {
    if (res.code === 0) {
      list.value = res.data
    }
  })
}

onMounted(() => {
  getList()
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
  <wd-navbar title="商品登记" safe-area-inset-top fixed :bordered="false" />
  <view class="addbox" :style="{ paddingTop: `${(statusBarHeight || 0) + 44}px` }">
    <view class="custom-box" @click="onAddCar">
      <view class="addtext">
        添加商品
      </view>
    </view>
  </view>
  <view class="tabwarp">
    <view v-for="item in list" :key="item.id" class="tabitem">
      <view>
        <view class="tabtext">
          {{ item.name }}
        </view>
        <view class="suntext">
          <view>
            创建时间：{{ item.time }}
          </view>
          <view style="margin-top: 10rpx;">
            库存：{{ item.quantity }}
          </view>
        </view>
      </view>
      <view class="btnbox">
        <view class="jilu" @click="onJiLu(item)">
          商品记录
          <text class="iconfont icon-into" />
        </view>
        <view class="btns">
          <wd-button size="small" @click="onWeiHu(item, '1')">
            商品入库
          </wd-button>
          <wd-button size="small" @click="onWeiHu(item, '2')">
            商品出库
          </wd-button>
        </view>
      </view>
    </view>
  </view>
  <wd-message-box custom-class="addmsg" selector="add">
    <wd-input
      v-model="value"
      placeholder-class="myPlaceholder"
      custom-input-class="myInput"
      :cursor-spacing="100"
      placeholder="请输入商品名称"
    />
    <wd-input
      v-model="value1"
      type="number"
      placeholder-class="myPlaceholder"
      custom-input-class="myInput"
      :cursor-spacing="100"
      placeholder="请输入数量"
    />
  </wd-message-box>
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
