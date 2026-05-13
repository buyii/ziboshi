<script setup lang="ts">
import type { User } from '@/types/common'

interface MyProps {
  userInfo: User // tabs列表
}
const props = withDefaults(defineProps<MyProps>(), {})

const show = ref<boolean>(false)

function open() {
  show.value = true
}

function close() {
  show.value = false
}

// 暴露方法
defineExpose({
  open,
  close,
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
  <wd-overlay :show="show" :z-index="99999" custom-style="background: rgba(43,3,17,0.45);backdrop-filter: blur(10px);">
    <view class="fraction-wrapper">
      <view class="content">
        <image
          class="topimg"
          src="../../../static/svg/fenzhi.svg"
        />
        <view class="content-body">
          <view class="title-box">
            <image class="fractionTitle" src="../../../static/svg/fractionTitle.svg" />
          </view>
          <view class="describe">
            总分值为10分
          </view>
          <view class="describe">
            根据您近30天GMV及申样出单率综合评估
          </view>
          <view class="lineview" />
          <view class="describe">
            分值 ≤ 3.0分将不可免费领样
          </view>
          <view class="describe">
            只可进行成本购样
          </view>
          <view class="number-time">
            <view class="number-item">
              <view class="item-label">
                有效申样总次数
              </view>
              <view>
                <view class="item-value">
                  {{ props.userInfo.sampleCount }}
                </view>
                <view class="item-unit">
                  <text class="unit1">单位 · </text>
                  <text class="unit2">次</text>
                </view>
              </view>
            </view>
            <view class="number-item number-item2">
              <view class="item-label">
                出单商品总次数
              </view>
              <view>
                <view class="item-value">
                  {{ props.userInfo.orderCount }}
                </view>
                <view class="item-unit">
                  <text class="unit1">单位 · </text>
                  <text class="unit2">次</text>
                </view>
              </view>
            </view>
          </view>
          <view class="foot-box">
            <view class="foot-left" />
            <wd-button @click="close">
              知道了
            </wd-button>
          </view>
        </view>
      </view>
    </view>
  </wd-overlay>
</template>

<style lang="scss" scoped>
.fraction-wrapper{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .content{
    width: 636rpx;
    height: 780rpx;
    background: #FFFFFF;
    box-shadow: 0rpx 32rpx 112rpx 0rpx rgba(43,3,17,0.3);
    border-radius: 32rpx;
    position: relative;
    .topimg{
      width: 100%;
      height: 362rpx;
    }
    .content-body{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      .title-box{
        padding: 40rpx 40rpx 30rpx 40rpx;
        .fractionTitle{
          width: 192rpx;
          height: 44rpx;
        }
      }
      .describe{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #63293E;
        line-height: 40rpx;
        font-style: normal;
        padding-left: 40rpx;
      }
      .lineview{
        border-top: 4rpx dashed rgb(235 179 199);
        height: 0;
        margin: 18rpx 0 18rpx 120rpx;
      }
      .number-time{
        border: 1px solid #E8E8E8;
        padding: 32rpx 24rpx;
        border-radius: 16rpx;
        margin: 80rpx 40rpx 0 40rpx;
        .number-item{
          display: flex;
          align-items: center;
          justify-content: space-between;
          .item-label{
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 28rpx;
            color: #999999;
            line-height: 28rpx;
            font-style: normal;
          }
          .item-value{
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 36rpx;
            color: #000000;
            line-height: 36rpx;
            font-style: normal;
            text-align: right;
            margin-bottom: 12rpx;
          }
          .item-unit{
            display: flex;
            align-items: center;
            justify-content: flex-end;
            .unit1{
              font-family: PingFangSC, PingFang SC;
              font-weight: 400;
              font-size: 20rpx;
              color: #AAAAAA;
              line-height: 20rpx;
              font-style: normal;
            }
            .unit2{
              font-family: PingFangSC, PingFang SC;
              font-weight: 400;
              font-size: 20rpx;
              color: #666666;
              line-height: 20rpx;
              font-style: normal;
            }
          }
        }
        .number-item2{
          margin-top: 32rpx;
        }
      }
      .gongshi{
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 32rpx;
        color: #111111;
        line-height: 32rpx;
        font-style: normal;
        padding-left: 40rpx;
        margin: 32rpx 0 24rpx 0;
      }
      .jisuan{
        padding: 28rpx 30rpx;
        border-radius: 16rpx;
        border: 1rpx solid #E8E8E8;
        margin: 0 40rpx;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #444444;
        line-height: 24rpx;
        font-style: normal;
      }
      .foot-box{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 40rpx;
        margin-top: 48rpx;
        .foot-left{
          display: flex;
          align-items: baseline;
          .fen{
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 32rpx;
            color: #8A0A28;
            line-height: 32rpx;
            font-style: normal;
          }
        }
        :deep(){
          .wd-button{
            width: 324rpx;
            height: 80rpx;
            background: #FF0057;
            border-radius: 16rpx 40rpx 40rpx 16rpx;
          }
          .wd-button__text{
            font-family: PingFangSC, PingFang SC;
            font-weight: 500;
            font-size: 32rpx;
            color: #FFFFFF;
            line-height: 32rpx;
            font-style: normal;
          }
        }
      }
    }
  }
}
</style>
