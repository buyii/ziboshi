<script setup lang="ts">
interface Props {
  amountType: any
}
const props = withDefaults(defineProps<Props>(), {})

const list = ref([
  {
    title: '代理申请',
    icon: 'icon-grade',
    url: '/pageMine/myteamAdd/index',
    show: props.amountType === 1,
  },
  {
    title: '体验装申请',
    icon: 'icon-cost',
    url: '/pageMine/myteamAdd/index',
    show: props.amountType === 2,
  },
  {
    title: '我的地址',
    icon: 'icon-addressUser1',
    url: '/pageRank/addressManage/index?type=manage',
    show: true,
  },
  {
    title: '我的优惠券',
    icon: 'icon-subsidy',
    url: '/pageMine/myCoupon/index',
    show: true,
  },
  {
    title: '银行卡管理',
    icon: 'icon-bankUser',
    url: '/pageMine/bankCardManage/index',
    show: true,
  },
  {
    title: '认证',
    icon: 'icon-sampleUser',
    url: '/pageMine/authManage/index',
    show: true,
  },
  {
    title: '设置',
    icon: 'icon-setUser',
    url: '/pageMine/setupPage/index',
    show: true,
  },
])
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
  <view class="cell-wrap">
    <wd-cell v-for="(item, i) in list.filter(e => e.show)" :key="i" :title="item.title" :to="item.url" is-link>
      <template #icon>
        <text class="iconfont" :class="item.icon" />
      </template>
    </wd-cell>
  </view>
</template>

<style lang="scss" scoped>
.cell-wrap{
  margin-top: 20rpx;
  background-color: #ffffff;
  border-radius: 16rpx;
  overflow: hidden;
  :deep(){
    .wd-cell__wrapper{
      padding-top: 24rpx;
      padding-bottom: 24rpx;
    }
    .wd-cell__left{
      display: flex;
      align-items: center;
    }
    .wd-cell__title{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 28rpx;
      color: #333333;
      margin-left: 32rpx;
    }
    .wd-icon-arrow-right{
      color: #BABABA;
    }
  }
  .custom-value{
    height: 40rpx;
    display: inline-block;
    background: rgba(255,66,36,0.05);
    border-radius: 20rpx;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 24rpx;
    color: #FF4224;
    line-height: 40rpx;
    text-align: center;
    padding: 0 14rpx;
  }
  .iconfont{
    font-size: 32rpx;
    color: #111111;
  }
}
</style>
