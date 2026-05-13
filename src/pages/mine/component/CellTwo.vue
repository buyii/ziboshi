<script setup lang="ts">
const list = ref([
  {
    title: '银行卡管理',
    icon: 'icon-bankUser',
    url: '/pageMine/bankCardManage/index',
  },
  {
    title: '地址管理',
    icon: 'icon-addressUser',
    url: '/pageRank/addressManage/index?type=manage',
  },
  {
    title: '认证管理',
    icon: 'icon-sampleUser',
    url: '/pageMine/authManage/index',
  },
  {
    title: '设置',
    icon: 'icon-setUser',
    url: '/pageMine/setupPage/index',
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
    <wd-cell v-for="(item, i) in list" :key="i" :to="item.url" :title="item.title" is-link>
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
  .iconfont{
    font-size: 32rpx;
    color: #111111;
  }
}
</style>
