<script setup lang="ts">
import { useMessage } from 'wot-design-uni'
import { delAddress } from '@/api/address'

const props = withDefaults(defineProps<MyProps>(), {
  list: [],
  select: false,
})
const emit = defineEmits(['onRefresh', 'goBack'])
const message = useMessage()
interface MyProps {
  list: any
  select: boolean
}
const selectItem = ref(null)
function onClick(item: any) {
  if (props.select) {
    selectItem.value = item
    emit('goBack', item)
  }
}

function onDel(item: any, event?: Event) {
  message.confirm({
    msg: '确认删除?',
    title: '提示',
    cancelButtonProps: {
      customClass: 'custom-shadow1',
    },
    confirmButtonProps: {
      customClass: 'custom-shadow',
    },

  }).then(() => {
    delAddress({ id: item.id }).then((res) => {
      console.log(res)
      if (res.code === 0) {
        emit('onRefresh')
      }
    })
  }).catch(() => {
    console.log('点击了取消按钮')
  })
}
function onEdit(item: any) {
  uni.navigateTo({
    url: `/pageRank/addAddress/index?type=edit&id=${item.id}`,
  })
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
  <view v-for="item in props.list" :key="item" class="address-item" :class="{ active: selectItem === item }" @click="onClick(item)">
    <text v-if="selectItem === item" class="iconfont icon-select" />
    <view class="flex items-center justify-between">
      <view class="flex items-end gap-2">
        <view class="name">
          {{ item.name }}
        </view>
        <view class="phone">
          {{ item.phone }}
        </view>
      </view>
      <view class="btn">
        <text class="iconfont icon-deleteAsh" @click.stop="onDel(item)" />
        <text class="iconfont icon-editAsh" @click.stop="onEdit(item)" />
      </view>
    </view>
    <view class="address">
      {{ item.area }} {{ item.detail }}
    </view>
    <view v-if="item.isDefault === '2'" class="user-box">
      默认地址
    </view>
  </view>
  <wd-message-box />
</template>

<style lang="scss" scoped>
.address-item{
  position: relative;
  background: #FFFFFF;
  border-radius: 16rpx;
  border: 2rpx solid transparent;
  padding: 30rpx 32rpx;
  margin-bottom: 20rpx;
  .icon-select{
    position: absolute;
    top: -2rpx;
    right: -2rpx;
    color: #089D39;
  }
  .name{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 32rpx;
    color: #111111;
    line-height: 32rpx;
    font-style: normal;
  }
  .phone{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 24rpx;
    color: #444444;
    line-height: 24rpx;
    font-style: normal;
  }
  .btn{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40rpx;
    color: #111111;
    .iconfont{
      font-size: 32rpx;
    }
  }
  .address{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 24rpx;
    color: #666666;
    font-style: normal;
    margin-top: 28rpx;
  }
  .user-box{
    width: 128rpx;
    height: 48rpx;
    background: rgba(8, 157, 57, 0.1);
    text-align: center;
    line-height: 48rpx;
    border-radius: 4rpx;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 20rpx;
    color: #089D39;
    font-style: normal;
    margin-top: 20rpx;
  }
}
.active{
  border: 2rpx solid #089D39;
}
</style>

<style lang="scss">
.custom-shadow{
  background-color: #089D39 !important;
}
</style>
