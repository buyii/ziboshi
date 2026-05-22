<script setup lang="ts">
import { useMessage, useToast } from 'wot-design-uni'

import { delMember } from '@/api/team'

interface Props {
  item: any
  startTime?: string
  endTime?: string
}

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits(['onDelSuccess'])
const toast = useToast()
// const message = useMessage('tips')
const delmessage = useMessage('del')
const idValue = ref('')

function zhantie() {
  uni.getClipboardData({
    success(res) {
      console.log(res.data)
      idValue.value = res.data
    },
  })
}
// function fenhon() {
//   message.alert({
//     msg: '平台按照您团队成员收益的10%给予分红',
//     title: '提示',
//     confirmButtonProps: {
//       customClass: 'custom-taking-btn',
//     },
//   })
// }
function toTeamPerson() {
  const userId = props.item.userId
  uni.navigateTo({
    url: `/pageRank/incomeTeamDetails/index?userId=${userId}&startTime=${props.startTime}&endTime=${props.endTime}`,
  })
}

function onDel() {
  delmessage.confirm({
    title: '删除成员',
    confirmButtonProps: {
      customClass: 'custom-shadow',
    },
    beforeConfirm: ({ resolve }) => {
      toast.loading({
        loadingType: 'ring',
        loadingColor: '#089D39',
        msg: '删除中...',
      })
      if (!idValue.value) {
        toast.error('请输入成员ID')
        resolve(false)
      }
      else {
        resolve(true)
      }
    },
  }).then(() => {
    delMember({ memberId: idValue.value }).then((res) => {
      toast.close()
      if (res.code === 0) {
        toast.success(res.msg)
        emit('onDelSuccess')
      }
    }).catch(() => {
      toast.close()
    })
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
  <wd-swipe-action>
    <view class="user-box" @click="toTeamPerson">
      <view class="user-content">
        <image class="img" :src="props.item.avatar" mode="scaleToFill" />
        <view class="user-info">
          <view class="info-one">
            <view class="user-name">
              <text>{{ props.item.userName }}</text>
            </view>
          </view>
          <view class="user-time">
            {{ props.item.joinTime }}
          </view>
        </view>
        <view class="user-amount">
          <view class="user-num">
            {{ props.item.totalPayAmount }}
          </view>
          <view class="user-label">
            下单金额
          </view>
        </view>
        <view class="user-amount">
          <view class="user-num">
            {{ props.item.focAgentFee }}
          </view>
          <view class="user-label">
            我的收益
          </view>
        </view>
        <view class="user-icon">
          <text class="iconfont icon-into icon" />
        </view>
      </view>
    </view>
    <template #right>
      <view class="action" @click="onDel">
        <text class="iconfont icon-deletedSlide" />
        <view>删除</view>
      </view>
    </template>
  </wd-swipe-action>
  <wd-message-box />
  <wd-message-box custom-class="tipsmsg" selector="tips" />
  <wd-message-box custom-class="delmsg" selector="del">
    <wd-input
      v-model="idValue"
      placeholder-class="myPlaceholder"
      custom-input-class="myInput"
      :cursor-spacing="100"
      placeholder="请输入成员ID"
    >
      <template #suffix>
        <text class="suffixtext" @click="zhantie">粘贴</text>
      </template>
    </wd-input>
  </wd-message-box>
  <wd-toast />
</template>

<style lang="scss">
.custom-taking-btn{
  background-color: #089D39 !important;
}
</style>

<style scoped lang="scss">
.user-box{
  background-color: #fff;
  padding: 32rpx;
  .user-content{
    display: flex;
    align-items: center;
    gap: 20rpx;
    .img{
      width: 84rpx;
      height: 84rpx;
      border-radius: 48rpx;
    }
    .user-info{
      flex: 1;
      .info-one{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 32rpx;
        .user-name{
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: 32rpx;
          color: #000000;
          line-height: 32rpx;
          font-style: normal;
        }
      }
    }
  }
  .user-amount{
    .user-num{
      font-weight: 500;
      font-size: 32rpx;
      color: #131415;
      line-height: 32rpx;
    }
    .user-label{
      margin-top: 16rpx;
      font-weight: 400;
      font-size: 20rpx;
      color: #999999;
      line-height: 20rpx;
    }
  }
  .user-icon{
    .icon{
      color: #DADADA;
      font-size: 28rpx;
    }
  }
  .user-time{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 28rpx;
    color: #666666;
    line-height: 28rpx;
    font-style: normal;
    margin-top: 12rpx;
  }
  .user-line{
    box-shadow: inset 0rpx -1rpx 0rpx 0rpx #DADADA, inset 140rpx 1rpx 2rpx 0rpx #FFFFFF;
  }
}
.action{
  height: 100%;
  width: 128rpx;
  background: #089D39;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  text{
    font-size: 32rpx;
    color: #FFFFFF;
  }
  view{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 20rpx;
    color: rgba(255,255,255,0.85);
    line-height: 20rpx;
  }
}
</style>

<style lang="scss">
.custom-shadow{
  background-color: #089D39 !important;
}
.delmsg{
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
    line-height: 96rpx;
    &::after{
      display: none !important;
    }
    .myInput{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 32rpx;
      color: 111111;
      line-height: 96rpx;
      font-style: normal;
      width: 460rpx;
      height: 96rpx;

    }
  }
  .suffixtext{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 28rpx;
    color: #089D39;
    line-height: 28rpx;
    text-align: center;
    font-style: normal;
  }
}
.tipsmsg{
.wd-message-box__body{
  padding: 25rpx 20rpx 0 !important;
}
}
</style>
