<script setup lang="ts">
import AddMemberPopup from './component/AddMemberPopup.vue'
import MemberCodeTem from './component/MemberCodeTem.vue'
import TeamUser from './component/TeamUser.vue'
import { useLayoutStore } from '@/stores'

import { getMyTeamData, getMyTeamMemberList, myQRCode } from '@/api/team'

interface Pagination {
  pageNum: number
  pageSize: number
  total: number
}

const layoutStore = useLayoutStore()
const scrollTop1 = computed(() => {
  const h = 540
  const num = uni.upx2px(h)
  return layoutStore.layoutStore.statusBarHeight + num
})

const activeTab = ref(7)
const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
const orderType = ref<number>(0)
function handleClickLeft() {
  uni.navigateBack()
}

const showCode = ref(false)
const addMemberPopupPopupRef = ref()
const baseImg = ref('')
const imgUrl = ref('')
const userName = ref('')
const state = ref()
const loading = ref<boolean>(false)
const dataList = ref<any>([])
const teamData = ref<any>({
  focAgentFee: 0,
  teamMember: 0,
  totalKolFocServiceFee: 0,
})
const startTime = ref()
const endTime = ref()
const pagination = ref<Pagination>({
  pageNum: 1,
  pageSize: 10,
  total: 0,
})

function confirmUser() {
  baseImg.value = ''
  myQRCode().then((res) => {
    if (res.code === 0) {
      baseImg.value = res.data
      showCode.value = true
    }
  })
}

function changeImg(url: any) {
  imgUrl.value = url
  addMemberPopupPopupRef.value?.open(imgUrl.value)
}
const itemList: any[] = [
  {
    id: 7,
    name: '近七天',
  },
  {
    id: 30,
    name: '近一个月',
  },
  {
    id: 90,
    name: '近三个月',
  },
  {
    id: 183,
    name: '近半年',
  },
]

function onDelSuccess() {
  getDataList()
}
function changeCalendar(date: any) {
  startTime.value = date.startDate
  endTime.value = date.endDate
  pagination.value.pageNum = 1
  getDataList()
}
function sortClick() {
  if (orderType.value === 1) {
    orderType.value = 2
  }
  else if (orderType.value === 2) {
    orderType.value = 0
  }
  else {
    orderType.value = 1
  }
  pagination.value.pageNum = 1
  getDataList()
}
function sortClick1() {
  if (orderType.value === 3) {
    orderType.value = 4
  }
  else if (orderType.value === 4) {
    orderType.value = 0
  }
  else {
    orderType.value = 3
  }
  pagination.value.pageNum = 1
  getDataList()
}
function tabChange() {
  const day = activeTab.value
  const dates = getNDaysRange(day)
  startTime.value = dates.start
  endTime.value = dates.end
  pagination.value.pageNum = 1
  getDataList()
}

function getDataList() {
  const params = {
    startTime: startTime.value,
    endTime: endTime.value,
    orderType: orderType.value,
    userName: userName.value,
    pageNum: pagination.value.pageNum,
    pageSize: pagination.value.pageSize,
  }
  loading.value = true
  getMyTeamMemberList(params).then((res) => {
    if (res.code === 0) {
      if (pagination.value.pageNum === 1) {
        dataList.value = [...res.rows]
      }
      else {
        dataList.value = [...dataList.value, ...res.rows]
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

function getteamData() {
  getMyTeamData().then((res) => {
    if (res.code === 0) {
      teamData.value = res.data
    }
  })
}

function search() {
  pagination.value.pageNum = 1
  getDataList()
}

onShareAppMessage ((res) => {
  if (res.from === 'button') { // 来自页面内分享按钮
    console.log(res.target)
  }
  if (userInfo.value && userInfo.value.userCode && userInfo.value.userType === '03') {
    return {
      title: '滋博仕',
      path: `/pages/home/index?userCode=${userInfo.value.userCode}`,
    }
  }
  return {
    title: '滋博仕',
    path: '/pages/home/index',
  }
})
onShareTimeline (() => {
  if (userInfo.value && userInfo.value.userCode && userInfo.value.userType === '03') {
    return {
      title: '滋博仕',
      path: `/pages/home/index?userCode=${userInfo.value.userCode}`,
    }
  }
  return {
    title: '滋博仕',
    path: '/pages/home/index',
  }
})

onLoad(() => {
  const dates = getNDaysRange(activeTab.value)
  startTime.value = dates.start
  endTime.value = dates.end
  getteamData()
  getDataList()
})
</script>

<template>
  <view class="topbox" :style="{ top: `0px` }">
    <wd-navbar title="我的客户" safe-area-inset-top left-arrow :bordered="false" @click-left="handleClickLeft" />
    <view class="search-box">
      <MySearch v-model="userName" @search="search" @clear="search" />
    </view>
    <view class="team-top">
      <view class="top-item">
        <view class="item-num">
          {{ teamData.teamMember || 0 }}
        </view>
        <view class="item-label">
          客户数量
        </view>
      </view>
      <view class="top-item">
        <view class="item-num">
          {{ teamData.totalKolFocServiceFee || 0 }}
        </view>
        <view class="item-label">
          已结算
          <!-- {{ userInfo.amountType === 2 ? '收益' : '积分' }} -->
        </view>
      </view>
      <view class="top-item">
        <view class="item-num">
          {{ teamData.focAgentFee || 0 }}
        </view>
        <view class="item-label">
          未结算
          <!-- {{ userInfo.amountType === 2 ? '收益' : '积分' }} -->
        </view>
      </view>
    </view>
    <view class="sort-box">
      <view class="sort-item" :class="{ active1: orderType === 1, active2: orderType === 2 }" @click="sortClick">
        <text class="sort-text">时间排序</text>
        <view class="iconbox">
          <wd-icon custom-class="up" name="caret-up-small" />
          <wd-icon custom-class="down" name="caret-down-small" />
        </view>
      </view>
      <view class="sort-item" :class="{ active1: orderType === 3, active2: orderType === 4 }" @click="sortClick1">
        <text class="sort-text">收益排序</text>
        <view class="iconbox">
          <wd-icon custom-class="up" name="caret-up-small" />
          <wd-icon custom-class="down" name="caret-down-small" />
        </view>
        <!-- <text class="iconfont icon-order" /> -->
      </view>
    </view>
    <CustomScrollTabs
      v-model:active-tab="activeTab"
      :item-list="itemList"
      bg="#f8f8f8"
      @tab-change="tabChange"
      @change-calendar="changeCalendar"
    />
  </view>
  <view :style="{ top: `${(scrollTop1 || 0)}px` }" class="scroll-box">
    <MyScrollView top="0px" :fixed="false" :state="state" @scrolltolower="scrolltolower" @loadmore="loadmore">
      <view class="list-box">
        <template v-for="(item) in dataList" :key="item.userId">
          <TeamUser :item="item" :start-time="startTime" :end-time="endTime" @on-del-success="onDelSuccess" />
        </template>
      </view>
    </MyScrollView>
  </view>
  <FootButton label="添加成员" icon="icon-qrCode" fixed @confirm="confirmUser" />
  <AddMemberPopup ref="addMemberPopupPopupRef" />
  <MemberCodeTem v-if="showCode" :base-img="baseImg" @change-img="changeImg" />
</template>

<style scoped lang="scss">
.topbox{
  position: fixed;
  left: 0;
  width: 100vw;
}
.search-box{
  padding: 16rpx 32rpx;
  background-color: #fff;
}
.team-top{
  display: flex;
  justify-content: space-around;
  padding: 32rpx 0;
  background-color: #fff;
  border-radius: 24rpx 24rpx 0rpx 0rpx;
  box-shadow: inset 0rpx -1rpx 0rpx 0rpx rgba(238,238,238,0.5);
  .top-item{
    flex: 1;
    text-align: center;
    .item-num{
      font-family: PingFangSC, PingFang SC;
      font-weight: 600;
      font-size: 32rpx;
      color: #000000;
      line-height: 32rpx;
      font-style: normal;
    }
    .item-label{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 24rpx;
      color: #666666;
      line-height: 24rpx;
      font-style: normal;
      margin-top: 16rpx;
    }
  }
}
.sort-box{
  display: flex;
  align-items: center;
  background-color: #fff;
  .sort-item{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 96rpx;
    gap: 10rpx;
    .sort-text{
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 28rpx;
      color: #666666;
      line-height: 32rpx;
      font-style: normal;

    }
    .iconbox{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 40rpx;
      color: #DADADA;
      line-height: 14rpx;
    }
    .iconfont{
      line-height: 28rpx;
      font-size: 24rpx;
      color: #DADADA;
    }
  }
  .active1{
    .sort-text{
      color: #089D39;
    }
    .iconbox{
      :deep(){
        .up{
          color: #089D39;
        }
      }
    }
  }
  .active2{
    .sort-text{
      color: #089D39;
    }
    .iconbox{
      :deep(){
        .down{
          color: #089D39;
        }
      }
    }
  }
  .active{
    .sort-text{
      color: #089D39;
    }
  }
}
.tab-box{
  padding: 32rpx;
  display: flex;
  align-items: center;
  .tableft{
    width: 626rpx;
  }
  .tabright{
    width: 60rpx;
    text-align: right;
    font-size: 32rpx;
    color: #089D39;
  }
}
.scroll-box{
  position: fixed;
  width: 100%;
  bottom: calc(100rpx + env(safe-area-inset-bottom));
  :deep(){
    .myloadmore{
      height: auto !important;
      padding: 20rpx 0;
    }
  }
}
// .list-box{
//   padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
// }
</style>

<route lang="json">
{
  "layout": "default",
  "name": "myTeam",
  "style": {
    "navigationBarTitleText": "我的客户"
  }
}
</route>
