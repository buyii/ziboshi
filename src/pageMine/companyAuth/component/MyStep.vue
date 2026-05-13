<script setup lang="ts">
import { getCurrentInstance } from 'vue'

interface Props {
  list: Array<{
    id: number
    name: string
    img: string
    activeImg: string
  }>
}

const props = withDefaults(defineProps<Props>(), {})
const instance = getCurrentInstance()

const query = uni.createSelectorQuery().in(instance?.proxy)
const lineStyle = ref({
  left: '0px',
  right: '0px',
})
const stepIndex = defineModel<number>({
  required: true,
})
const bgWidth = computed(() => {
  const num = (props.list.length - 1) * 2 // 分成多少份
  const num1 = 100 / num // 每一份的宽度
  if (props.list.length === stepIndex.value) {
    return 100
  }
  return stepIndex.value * num1 + (stepIndex.value - 1) * num1
})
onMounted(() => {
  const { windowWidth }: any = uni.getSystemInfoSync()
  query.selectAll('.icon-img').boundingClientRect((rects: any) => {
    console.log('rects', rects)
    const left = rects[0].left
    const right = rects[rects.length - 1].right
    lineStyle.value = {
      left: `${left}px`,
      right: `${windowWidth - right}px`,
    }
  }).exec()
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
  <view class="step-box">
    <view class="line-box" :style="lineStyle">
      <view class="step-line">
        <view class="line-bg" :style="{ width: `${bgWidth}%` }" />
      </view>
    </view>
    <view class="step-content">
      <view v-for="(item, index) in props.list" :key="item.id" class="step-item">
        <image v-if="stepIndex > index" class="icon-img" :src="item.activeImg" />
        <image v-else class="icon-img" :src="item.img" />
        <view class="item-label">
          {{ item.name }}
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.step-box{
  height: 172rpx;
  position: relative;
  .line-box{
    position: absolute;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .step-line{
      height: 4rpx;
      background-color: #F2ECEE;
      margin-bottom: 32rpx;
      width: 100%;
      overflow: hidden;
      .line-bg{
        height: 100%;
        // width: 125%;
        background-color: #EC6593;
      }
    }
  }
  .step-content{
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    left: 0rpx;
    top: 0rpx;
    width: 100%;
    height: 100%;
    .step-item{
      text-align: center;
      .icon-img{
        width: 56rpx;
        height: 56rpx;
      }
      .item-label{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 20rpx;
        color: #111111;
        line-height: 20rpx;
        font-style: normal;
        margin-top: 8rpx;
      }
    }
  }

}
</style>
