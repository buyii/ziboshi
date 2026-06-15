<script setup lang="ts">
import { useMessage, useToast } from 'wot-design-uni'
import { getMsgList, msgDelete } from '@/api/rank'

const msgStore = useMsgStore()
const message = useMessage()
const toast = useToast()

const noReadList = computed(() => msgStore.messages)

const imgBaseUrl = import.meta.env.VITE_IMG_URL
const readList = ref<any[]>([])

function getDataList() {
  getMsgList().then((res) => {
    if (res.code === 0) {
      msgStore.setMessagesAll(res.data.noRead)
      readList.value = res.data.read
    }
  })
}

function onDel(item: any) {
  message.confirm({
    title: '删除消息',
    msg: '确定要删除该消息吗？',
    confirmButtonProps: {
      customClass: 'custom-shadow',
    },
    beforeConfirm: ({ resolve }) => {
      toast.loading({
        loadingType: 'ring',
        loadingColor: '#089D39',
        msg: '删除中...',
      })
      resolve(true)
    },
  }).then(() => {
    msgDelete({ id: item.id }).then((res) => {
      toast.close()
      if (res.code === 0) {
        toast.success(res.msg)
        getDataList()
      }
    }).catch(() => {
      toast.close()
    })
  })
}

onShow(() => {
  getDataList()
})
</script>

<template>
  <wd-navbar title="消息" safe-area-inset-top fixed :placeholder="true" custom-class="my-navbar" :bordered="false" />
  <view class="msg-wrap">
    <view v-for="item in noReadList" :key="item.id">
      <wd-swipe-action>
        <view class="msg-item">
          <view class="title-box">
            <view class="title-left">
              <image class="newimg" src="../../static/svg/new.svg" mode="aspectFill" />
              <view class="item-title">
                {{ item.title }}
              </view>
            </view>
            <view class="msg-time">
              {{ item.createTime }}
            </view>
          </view>
          <view class="item-content">
            {{ item.content }}
          </view>
        </view>
        <template #right>
          <view class="action-box">
            <view class="action" @click="onDel(item)">
              <text class="iconfont icon-deletedSlide" />
              <view>删除</view>
            </view>
          </view>
        </template>
      </wd-swipe-action>
    </view>

    <wd-status-tip v-if="noReadList.length <= 0" tip="暂无新消息~">
      <template #image>
        <image style="width: 230rpx;height: 240rpx;margin-top: 20rpx;" :src="`${imgBaseUrl}/notData1.png`" />
      </template>
    </wd-status-tip>

    <wd-divider v-if="readList.length > 0">
      以下为历史消息
    </wd-divider>

    <view v-for="item in readList" :key="item.id">
      <wd-swipe-action>
        <view class="msg-item">
          <view class="title-box">
            <view class="title-left">
              <view class="item-title">
                {{ item.title }}
              </view>
            </view>
            <view class="msg-time">
              {{ item.createTime }}
            </view>
          </view>
          <view class="item-content">
            {{ item.content }}
          </view>
        </view>
        <template #right>
          <view class="action-box">
            <view class="action" @click="onDel(item)">
              <text class="iconfont icon-deletedSlide" />
              <view>删除</view>
            </view>
          </view>
        </template>
      </wd-swipe-action>
    </view>
  </view>
</template>

<style scoped lang="scss">
.msg-wrap{
  padding: 32rpx;
  .msg-item{
    padding: 32rpx;
    background: #FFFFFF;
    margin-bottom: 16rpx;
    .title-box{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title-left{
        display: flex;
        align-items: center;
        gap: 12rpx;
        .newimg{
          width: 64rpx;
          height: 32rpx;
        }
        .item-title{
          font-weight: 400;
          font-size: 32rpx;
          color: #111111;
          line-height: 32rpx;
        }
      }
      .msg-time{
        font-weight: 400;
        font-size: 24rpx;
        color: #999999;
        line-height: 24rpx;
      }
    }
    .item-content{
      font-weight: 400;
      font-size: 24rpx;
      color: #999999;
      line-height: 34rpx;
      margin-top: 14rpx;
    }
  }
  .action-box{
    height: 100%;
    display: flex;
  }
  .action{
    height: 100%;
    width: 128rpx;
    background: #ff0055;
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
}
</style>

<route lang="json">
{
  "layout": "tabbar",
  "name": "rank",
  "style": {
    "navigationBarTitleText": "消息"
  }
}
</route>
