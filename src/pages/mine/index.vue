<script setup lang="ts">
import { useMessage, useToast } from 'wot-design-uni'
import MyOrder from './component/MyOrder.vue'
import CellOne from './component/CellOne.vue'
import { getUserInfo } from '@/api/index'
import { getAgentInfo, getApplyStatus, getUserAmount } from '@/api/mine'
import { joinAgentTeam } from '@/api/team'
import { countOrderStatus } from '@/api/order'

const toast = useToast()
const message = useMessage('join')
const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
const auditStatus = ref<string>('0')
const joinData = ref<any>({})
const loading = ref<boolean>(false)
const numData = ref<any>({
  agentBalance: '0',
  count: '0',
  kolServiceBalance: '0',
})
const countData = ref<{
  finish: string
  refund: string
  waitPay: string
  waitRece: string
  waitSend: string
}>({
  finish: '0',
  refund: '0',
  waitPay: '0',
  waitRece: '0',
  waitSend: '0',
})

function getCount() {
  countOrderStatus().then((res) => {
    if (res.code === 0) {
      countData.value = res.data
    }
  })
}

function getStatus() {
  getApplyStatus().then((res) => {
    if (res.code === 0) {
      auditStatus.value = res.data.status
    }
  })
}

function getUsers() {
  getUserAmount().then((res) => {
    if (res.code === 0) {
      numData.value = res.data
    }
  })
}

onShow(() => {
  getUserInfo().then((res) => {
    if (res.code === 0) {
      userStore.setUserInfo(res.data)
      getCount()
      getStatus()
      getUsers()
    }
  })
})

function toWallet() {
  uni.navigateTo({
    url: '/pageMine/myWallet/index',
  })
}

function toPoints() {
  uni.navigateTo({
    url: '/pageMine/myPoints/index',
  })
}
function toTeam() {
  uni.navigateTo({
    url: '/pageMine/myTeam/index',
  })
}
function toAuth() {
  uni.navigateTo({
    url: '/pageMine/authManage/index',
  })
}

function joinTeam() {
  message.confirm({
    title: '加入团队',
    confirmButtonProps: {
      customClass: 'custom-shadow',
      loading: loading.value,
    },
    cancelButtonProps: {
      loading: loading.value,
    },
    beforeConfirm: ({ resolve }) => {
      loading.value = true
      joinAgentTeam({ agentCode: joinData.value.agentUserCode }).then((res) => {
        loading.value = false
        if (res.code === 0) {
          resolve(true)
          toast.success('加入成功')
        }
        else {
          resolve(false)
        }
      }).catch(() => {
        loading.value = false
        resolve(false)
      })
    },
  }).then(() => {
    console.log('点击了确定按钮')
  }).catch(() => {
    console.log('点击了取消按钮')
  })
}
function copyId() {
  uni.setClipboardData({
    data: userInfo.value.userCode,
    success() {
      console.log('success')
    },
  })
}

function scanCcode() {
  uni.scanCode({
    success: (res) => {
      console.log('扫码结果:', res)
      const result = res.result
      const type = result.split('###')[1].split('=')[1]
      if (type === '1') {
        const userCode = result.split('###')[0]
        getAgentInfo({
          userCode,
          source: 1,
        }).then((res) => {
          if (res.code === 0) {
            joinData.value = res.data
            joinTeam()
          }
        })
      }
    },
    fail: (err) => {
      console.error('扫码失败:', err)
    },
  })
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
</script>

<template>
  <view class="mine-page">
    <view class="banner-wrap">
      <wd-navbar title="" safe-area-inset-top fixed :placeholder="true" custom-class="my-navbar" :bordered="false" />
      <view class="user-info">
        <view class="user-img">
          <image
            :src="userInfo.avatar"
            mode="scaleToFill"
          />
        </view>
        <view class="user-rignt">
          <view class="user-name">
            <view class="name">
              {{ userInfo.userName }}
            </view>
            <view class="user-scan">
              <text class="iconfont icon-scan1" @click="scanCcode" />
            </view>
          </view>
          <view class="user-id">
            ID · {{ userInfo.userCode }}
            <text class="iconfont icon-copy" @click.stop="copyId" />
          </view>
          <view class="status-box">
            <view class="user-status">
              <view v-if="userInfo.inAuth === 2 || userInfo.enAuth === 2" class="auth" @click="toAuth">
                <text>已认证</text>
              </view>
              <view v-if="userInfo.inAuth === 1 || userInfo.enAuth === 1" class="notauth">
                <text>认证中</text>
              </view>
              <view v-if="userInfo.inAuth === 0 || userInfo.inAuth === 0" class="notauth" @click="toAuth">
                <text>未认证</text>
              </view>
            </view>
            <view class="user-status1">
              <view v-if="userInfo.amountType === 2" class="auth">
                <text class="iconfont icon-grade" />
                <text>代理</text>
              </view>
              <view v-else class="notauth">
                <text class="iconfont icon-grade" />
                <text>会员</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="content">
      <view class="team-box">
        <view v-if="userInfo.amountType === 2" class="team-item" @click="toWallet">
          <image src="../../static/svg/wallet.svg" />
          <view>
            <view class="team-title">
              我的收益
            </view>
            <view class="team-desc">
              {{ numData.agentBalance }}元
              <text class="iconfont icon-into" />
            </view>
          </view>
        </view>
        <view v-else class="team-item" @click="toPoints">
          <image src="../../static/svg/points.svg" />
          <view>
            <view class="team-title">
              我的积分
            </view>
            <view class="team-desc">
              {{ numData.kolServiceBalance }}
              <text class="iconfont icon-into" />
            </view>
          </view>
        </view>
        <view class="team-item" @click="toTeam">
          <image src="../../static/svg/team.svg" />
          <view>
            <view class="team-title">
              我的客户
            </view>
            <view class="team-desc">
              {{ numData.count }}人
              <text class="iconfont icon-into" />
            </view>
          </view>
        </view>
      </view>
      <MyOrder :count-data="countData" />
      <CellOne :amount-type="userInfo.amountType" :audit-status="auditStatus" />
    </view>
    <!-- <view class="isbottom" /> -->
    <wd-message-box selector="join" custom-class="jonmsg">
      <view class="join-box">
        <img class="join-img" :src="joinData.agentAvatar" alt="">
        <view class="join-text">
          {{ joinData.agentUserName }}邀请您加入团队
        </view>
        <view class="join-text">
          是否加入？
        </view>
      </view>
    </wd-message-box>
    <wd-message-box selector="apply" custom-class="applymsg" />
  </view>
</template>

<style scoped lang="scss">
.mine-page{
  padding-bottom: env(safe-area-inset-bottom);
  .isbottom{
    height: calc(var(--wot-tabbar-height) + env(safe-area-inset-bottom) + 16rpx);
  }
  .mytitle{
    font-weight: 500;
    font-size: 64rpx;
    color: #000000;
    line-height: 64rpx;
    text-align: left;
    padding-left: 32rpx;
  }
  :deep(){
    .my-navbar{
      background-color: transparent !important;
    }
    .jonmsg{
      .wd-message-box__content{
        max-height: 600rpx !important;
      }
    }
    .applymsg{
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
        background: #089D39 !important;
        border-radius: 16rpx 40rpx 40rpx 16rpx !important;
      }
    }
  }
}
.banner-wrap{
  height: 386rpx;
  width: 100%;
  background: linear-gradient( 180deg, rgba(255,36,87,0.05) 0%, rgba(248,248,248,0) 100%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .user-info{
    display: flex;
    align-items: center;
    padding: 0 32rpx;
    padding-bottom: 32rpx;
    .user-img{
      width: 144rpx;
      height: 144rpx;
      border-radius: 72rpx;
      overflow: hidden;
      image{
        width: 100%;
        height: 100%;
      }
    }
    .user-rignt{
      flex: 1;
      margin-left: 32rpx;
      .user-name{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .name{
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: 40rpx;
          color: #000000;
          line-height: 40rpx;
        }
        // .user-scan{

        // }
      }
      .user-id{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #666666;
        line-height: 28rpx;
        margin-top: 20rpx;
        .iconfont{
          font-size: 26rpx;
          color: #999999;
          margin-left: 16rpx;
        }
      }
      .status-box{
        display: flex;
        gap: 10rpx;
        align-items: center;
        margin-top: 16rpx;
      }
      .user-status{
        display: flex;
        align-items: center;
        gap: 16rpx;
        .auth{
          display: flex;
          align-items: center;
          justify-content: center;
          width: 96rpx;
          height: 48rpx;
          background: #089D39;
          border-radius: 16rpx;
          text{
            font-family: PingFangSC, PingFang SC;
            font-weight: 500;
            font-size: 24rpx;
            color: #FFFFFF;
            line-height: 24rpx;
            font-style: normal;
          }
        }
        .notauth{
          display: flex;
          align-items: center;
          justify-content: center;
          width: 96rpx;
          height: 48rpx;
          background: rgba(131, 164, 142, 0.25);
          border-radius: 16rpx;
          text{
            font-family: PingFangSC, PingFang SC;
            font-weight: 500;
            font-size: 24rpx;
            color: #FFFFFF;
            line-height: 24rpx;
            font-style: normal;
          }
        }
      }
      .user-status1{
        .auth{
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6rpx;
          width: 128rpx;
          height: 48rpx;
          background: rgba(255, 108, 32, 0.15);
          border-radius: 16rpx;
          text{
            font-family: PingFangSC, PingFang SC;
            font-weight: 500;
            font-size: 24rpx;
            color: #FF6C20;
            line-height: 24rpx;
            font-style: normal;
          }
          .iconfont{
            font-size: 20rpx;
          }
        }
        .notauth{
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6rpx;
          width: 128rpx;
          height: 48rpx;
          background: rgba(8, 157, 57, 0.25);
          border-radius: 16rpx;
          text{
            font-family: PingFangSC, PingFang SC;
            font-weight: 500;
            font-size: 24rpx;
            color: #089D39;
            line-height: 24rpx;
            font-style: normal;
          }
          .iconfont{
            font-size: 20rpx;
          }
        }
      }
    }
    .score{
      .score-num{
        font-family: DINAlternate, DINAlternate;
        font-weight: bold;
        font-size: 64rpx;
        color: #8A0A28;
        line-height: 64rpx;
        text-align: left;
        font-style: normal;
      }
      .score-desc{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 20rpx;
        color: #8A0A28;
        line-height: 20rpx;
        text-align: right;
        font-style: normal;
        margin-top: 16rpx;
      }
    }
  }
}
.content{
  padding: 0 24rpx;
  .team-box{
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24rpx;
    margin-top: 16rpx;
    image{
      width: 100rpx;
      height: 100rpx;
    }
    .team-item{
      flex: 1;
      display: flex;
      align-items: center;
      padding: 34rpx 32rpx;
      background-color: #ffffff;
      border-radius: 16rpx;
      gap: 20rpx;
      .team-title{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 32rpx;
        color: #111111;
        line-height: 32rpx;
      }
      .team-desc{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #AAAAAA;
        line-height: 24rpx;
        margin-top: 16rpx;
        text{
          font-size: 20rpx;
          color: #DADADA;
        }
      }
    }
  }
}
.join-box{
  height: 600rpx;
  .join-img{
    width: 200rpx;
    height: 200rpx;
    border-radius: 50%;
    margin: 110rpx 0 60rpx 0;
  }
  .join-text{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 36rpx;
    color: #111111;
    line-height: 60rpx;
    text-align: center;
  }
}
</style>

<style lang="scss">
.custom-shadow{
  background-color: #089D39 !important;
}
</style>

<route lang="json">
{
  "layout": "tabbar",
  "name": "mine",
  "style": {
    "navigationBarTitleText": "我的"
  }
}
</route>
