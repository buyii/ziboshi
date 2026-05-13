<script setup lang="ts">
import { useMessage, useToast } from 'wot-design-uni'

import { delMember } from '@/api/team'

interface Props {
  item: any
  showLine: boolean
  startTime?: string
  endTime?: string
}

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits(['onDelSuccess'])
const toast = useToast()
// const message = useMessage('tips')
const delmessage = useMessage('del')
const idValue = ref('')
function copyId() {
  uni.setClipboardData({
    data: props.item.userCode,
    success() {
      console.log('success')
    },
  })
}

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
    url: `/pageRank/incomeTeamDetails/index?userId=${userId}&isTeam=1&startTime=${props.startTime}&endTime=${props.endTime}`,
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
        loadingColor: '#FF0057',
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
              <text class="iconfont icon-copy" @click.stop="copyId" />
            </view>
            <view class="user-score">
              <wd-text :text="props.item.score">
                <template #prefix>
                  <text class="prefix1">星佣分</text>
                </template>
              </wd-text>
            </view>
          </view>
          <view class="user-income" :class="{ 'user-line': props.showLine }">
            <view class="income-left">
              <DigitBold :value="props.item.kolFocServiceFee" int-size="32rpx" decimal-size="28rpx" color="#111111" />
              <view class="income-label">
                用户全部收益
              </view>
            </view>
            <view class="income-right">
              <DigitBold :value="props.item.focAgentFee" int-size="32rpx" decimal-size="28rpx" color="#111111" />
              <view class="income-label">
                我的全部分红
              </view>
            </view>
            <view class="income-time">
              <view class="user-time">
                {{ props.item.joinTime }}
              </view>
              <view class="income-label">
                加入时间
              </view>
            </view>
          </view>
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
  background-color: #FF0057 !important;
}
</style>

<style scoped lang="scss">
.user-box{
  background-color: #fff;
  padding: 24rpx 0rpx 0 32rpx;
  .user-content{
    display: flex;
    // align-items: center;
    gap: 20rpx;
    .img{
      width: 96rpx;
      height: 96rpx;
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
          .iconfont{
            font-size: 26rpx;
            color: #999999;
            margin-left: 16rpx;
          }
        }
        .user-score{
          :deep(){
            .wd-text{
              font-family: DINAlternate, DINAlternate;
              font-weight: bold;
              font-size: 32rpx;
              color: #111111;
              line-height: 32rpx;
              font-style: normal;
            }
          }
          .prefix1{
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 20rpx;
            color: #999999;
            line-height: 20rpx;
            text-align: center;
            font-style: normal;
            margin-right: 10rpx;
          }
        }

      }
      .info-two{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 16rpx;
        .user-id{
          padding: 8rpx 20rpx;
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 24rpx;
          color: #666666;
          line-height: 24rpx;
          font-style: normal;
          background: #F8F8F8;
          text-align: center;
          border-radius: 24rpx;
          .iconfont{
            font-size: 24rpx;
            color: #999999;
            margin-left: 12rpx;
          }
        }
        .user-time{
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 24rpx;
          color: #666666;
          line-height: 24rpx;
          font-style: normal;
        }
      }
    }
  }
  .user-income{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 20rpx;
    padding-bottom: 24rpx;
    padding-right: 32rpx;
    .income-left{
      text-align: center;
      .income-label{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 20rpx;
        color: #999999;
        line-height: 20rpx;
        font-style: normal;
        margin-top: 8rpx;
      }
    }
    .income-right{
      text-align: center;
      .income-label{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 20rpx;
        color: #999999;
        line-height: 20rpx;
        font-style: normal;
        margin-top: 8rpx;
      }
    }
    .income-time{
      text-align: left;
      .income-label{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 20rpx;
        color: #999999;
        line-height: 20rpx;
        font-style: normal;
        margin-top: 8rpx;
      }
      .user-time{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #666666;
        line-height: 28rpx;
        text-align: left;
        font-style: normal;
      }
    }
  }
  .user-line{
    box-shadow: inset 0rpx -1rpx 0rpx 0rpx #DADADA, inset 140rpx 1rpx 2rpx 0rpx #FFFFFF;
  }
}
.action{
  height: 100%;
  width: 128rpx;
  background: #FF0057;
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
  background-color: #FF0057 !important;
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
    color: #FF0057;
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
