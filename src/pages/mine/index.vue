<script setup lang="ts">
import { useMessage, useToast } from 'wot-design-uni'
import SalesVolume from './component/SalesVolume.vue'
import CellOne from './component/CellOne.vue'
import CellTwo from './component/CellTwo.vue'
import FractionPopup from './component/FractionPopup.vue'
import { getUserInfo } from '@/api/index'
import { getAgentInfo, getApplyStatus } from '@/api/mine'
import { joinAgentTeam } from '@/api/team'

const toast = useToast()
const message = useMessage('join')
const applyMessage = useMessage('apply')
const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
const applyStatus = computed(() => userStore.applyStatus)
const fractionPopupRef = ref()
const joinData = ref<any>({})
const statusData = ref<any>({})
const badge = ref<number>(0)
const loading = ref<boolean>(false)
const dataTab = ref('1')

onShow(() => {
  getUserInfo().then((res) => {
    if (res.code === 0) {
      userStore.setUserInfo(res.data)
    }
  })
  getApplyStatus().then((res) => {
    if (res.code === 0) {
      statusData.value = res.data
      if (statusData.value) {
        if (statusData.value.status === '2') {
          badge.value = 0
        }
        else {
          if (statusData.value.status !== applyStatus.value) {
            badge.value = 1
          }
          else {
            badge.value = 0
          }
        }
      }
      else {
        badge.value = 0
      }
    }
  })
})

function showFraction() {
  fractionPopupRef.value.open()
}

function toWallet() {
  uni.navigateTo({
    url: '/pageMine/myWallet/index',
  })
}
function toTeam() {
  if (statusData.value.status === '1') {
    applyMessage.alert({
      msg: '工作人员将在3个工作日内为您处理',
      title: '审核中',
      confirmButtonText: '确 定',
      confirmButtonProps: {
        customClass: 'custom-apply',
      },
    }).then(() => {
      badge.value = 0
      userStore.setApplyStatus(statusData.value.status)
    })
    return
  }
  if (statusData.value.status === '3') {
    applyMessage.alert({
      msg: `拒绝原因 · ${statusData.value.auditRemark}`,
      title: '拒绝开通团队',
      confirmButtonText: '确 定',
      confirmButtonProps: {
        customClass: 'custom-apply',
      },
    }).then(() => {
      badge.value = 0
      userStore.setApplyStatus(statusData.value.status)
    })
    return
  }
  if (userInfo.value.userType === '03') {
    uni.navigateTo({
      url: '/pageMine/myTeam/index',
    })
  }
  else {
    uni.navigateTo({
      url: '/pageMine/myteamAdd/index',
    })
  }
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
      title: '星佣宝',
      path: `/pages/home/index?scene=${userInfo.value.userCode}`,
    }
  }
  return {
    title: '星佣宝',
    path: '/pages/home/index',
  }
})
onShareTimeline (() => {
  if (userInfo.value && userInfo.value.userCode && userInfo.value.userType === '03') {
    return {
      title: '星佣宝',
      path: `/pages/home/index?scene=${userInfo.value.userCode}`,
    }
  }
  return {
    title: '星佣宝',
    path: '/pages/home/index',
  }
})
</script>

<template>
  <view class="mine-page">
    <view class="banner-wrap">
      <wd-navbar safe-area-inset-top :left-arrow="false" :bordered="false" custom-class="my-navbar">
        <template #title>
          <view class="code-box">
            <view class="user-scan">
              <text class="iconfont icon-scan1" @click="scanCcode" />
            </view>
          </view>
        </template>
      </wd-navbar>
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
          </view>
          <view class="user-id">
            ID · {{ userInfo.userCode }}
            <text class="iconfont icon-copy" @click.stop="copyId" />
          </view>
          <!-- <view class="user-status">
            <view v-if="userInfo.inAuth || userInfo.enAuth" class="auth" @click="toAuth">
              <text class="iconfont icon-authentication" />
              <text>已认证</text>
            </view>
            <view v-else class="notauth" @click="toAuth">
              <text>未认证</text>
            </view>
            <view class="score">
              <text>星佣分</text>
              <text>{{ userInfo.score }}</text>
              <text class="iconfont icon-question" @click="showFraction" />
            </view>
          </view> -->
        </view>
        <view class="score" @click="showFraction">
          <view class="score-num">
            <DigitBold :value="userInfo.score" color="#8A0A28" int-size="56rpx" decimal-size="42rpx" />
          </view>
          <view class="score-desc">
            星佣分
          </view>
        </view>
      </view>
    </view>
    <view class="content">
      <SalesVolume v-model="dataTab" :user-info="userInfo" />
      <view class="team-box">
        <view class="team-item" @click="toWallet">
          <image src="../../static/svg/wallet.svg" />
          <view>
            <view class="team-title">
              我的钱包
            </view>
            <view class="team-desc">
              去查看
              <text class="iconfont icon-into" />
            </view>
          </view>
        </view>
        <view class="team-item" @click="toTeam">
          <image v-if="userInfo.userType === '03'" src="../../static/svg/team.svg" />
          <image v-else src="../../static/svg/teamAsh.svg" />
          <view>
            <view class="team-title">
              <wd-badge :model-value="badge">
                我的团队
              </wd-badge>
            </view>
            <view v-if="userInfo.userType === '03'" class="team-desc">
              去查看
              <text class="iconfont icon-into" />
            </view>
            <view v-else class="team-desc">
              {{ statusData.status === '1' ? '审核中' : '未开通' }}
              <wd-icon name="help" size="24rpx" color="#BABABA" />
            </view>
          </view>
        </view>
      </view>
      <CellOne />
      <CellTwo />
    </view>
    <view class="isbottom" />
    <FractionPopup ref="fractionPopupRef" :user-info="userInfo" />
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
  height: 100vh;
  overflow-y: auto;
  .isbottom{
    height: calc(var(--wot-tabbar-height) + env(safe-area-inset-bottom) + 16rpx);
  }
  .code-box{
    padding-left: 48rpx;
    display: flex;
    gap: 16rpx;
    .user-scan{
      text{
        font-size: 32rpx;
        color: #000000;
      }
    }
  }
  :deep(){
    .my-navbar{
      background-color: transparent !important;
      .wd-navbar__title{
        margin: 0 !important;
      }
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
        background: #FF0057 !important;
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

        .name{
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: 40rpx;
          color: #000000;
          line-height: 40rpx;
        }
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
      .user-status{
        display: flex;
        align-items: center;
        gap: 20rpx;
        margin-left: 20rpx;
        gap: 16rpx;
        .auth{
          display: flex;
          align-items: center;
          justify-content: center;
          width: 96rpx;
          height: 44rpx;
          background: #FF2457;
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
          height: 44rpx;
          background: rgba(255, 0, 87, 0.25);
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
  background-color: #FF0057 !important;
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
