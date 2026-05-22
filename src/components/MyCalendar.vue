<script setup lang="ts">
interface Props {
  isRange?: boolean
}
defineOptions({
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared',
  },
})

const { isRange = false } = defineProps<Props>()

const emit = defineEmits(['change'])

const eCalendarRef = ref()

const show = ref(false)
function onShow() {
  console.log(isRange, 'isRange')
  show.value = true
}

function change(value: any) {
  console.log(value)
  emit('change', value)
}

function close() {
  show.value = false
}
// 清除选项
function clear() {
  eCalendarRef.value.clear()
}

defineExpose({
  onShow,
  clear,
})
</script>

<template>
  <view class="calendar-box">
    <ECalendar
      ref="eCalendarRef"
      v-model="show"
      :is-range="isRange"
      title="选择日期"
      color="#222222"
      month-change-color="#000000"
      year-change-color="#999999"
      active-bg-color="#089D39"
      range-bg-color="rgba(255, 0, 87, 0.1)"
      @input="close"
      @change="change"
    />
  </view>
</template>

<style lang="scss" scoped>
.calendar-box{
  :deep(){
    .l-calendar-box{
      background-color: #fff;
      border-radius: 32rpx 32rpx 0 0;
      overflow: hidden;
    }
    .l-calendar-box .calendar-top {
      font-family: PingFangSC, PingFang SC !important;
      font-weight: 500 !important;
      font-size: 32rpx !important;
      color: #000000 !important;
      line-height: 100rpx !important;
      height: 100rpx !important;
      box-shadow: inset 0rpx -1rpx 0rpx 0rpx rgba(244,244,244,0.5);
      .l-icons{
        font-size: 28rpx !important;
        color: #000000 !important;
        top: 36rpx !important;
        right: 48rpx !important;
        transform: none !important;
        display: inline-block !important;
        line-height: 28rpx !important;
      }
    }
    .date-box{
      height: 112rpx !important;
      padding: 0 !important;
      .itle-datetime{
        font-size: 32rpx !important;
      }
      .l-icons{
        font-size: 32rpx !important;
      }
    }
    .date-weekday{
      height: 108rpx !important;
      line-height: 108rpx !important;
      box-shadow: inset 0rpx -1rpx 0rpx 0rpx #E4E4E4;
    }
    .calendar-text{
      padding-bottom: max(30rpx, calc(6rpx + env(safe-area-inset-bottom))) !important;
    }
    .calendar-btn{
      button{
        background-color: #089D39 !important;
        border-radius: 8rpx 32rpx 8rpx 32rpx !important;
        font-family: PingFangSC, PingFang SC !important;
        font-weight: 500 !important;
        font-size: 32rpx !important;
        color: #FFFFFF !important;
        height: 88rpx !important;
        line-height: 88rpx !important;
      }
    }
  }
}
</style>
