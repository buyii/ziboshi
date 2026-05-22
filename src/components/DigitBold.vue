<script setup lang="ts">
interface MyProps {
  value: number | string
  intSize?: string
  decimalSize?: string
  prefixSize?: string
  suffixSize?: string
  color?: string
  suffix?: string
  prefix?: string
}
const props = withDefaults(defineProps<MyProps>(), {
  value: 0,
})
const objValue = computed(() => {
  let intPart = ''
  let decimalPart = ''
  if (typeof props.value === 'string' && props.value.includes('.')) {
    intPart = props.value.split('.')[0]
    decimalPart = props.value.split('.')[1]
  }
  else if (typeof props.value === 'number' && !Number.isInteger(props.value)) {
    const strValue = props.value?.toString()
    intPart = strValue.split('.')[0]
    decimalPart = strValue.split('.')[1]
  }
  else {
    intPart = props.value?.toString()
  }
  return {
    intPart,
    decimalPart,
  }
})
</script>

<template>
  <view class="yongj" :style="{ color, lineHeight: intSize }">
    <text v-if="prefix" class="prefix" :style="{ fontSize: prefixSize || decimalSize }">{{ prefix }}</text>
    <text class="integer" :style="{ fontSize: intSize }">
      {{ objValue.intPart }}
    </text>
    <text v-if="objValue.decimalPart" class="decimal" :style="{ fontSize: decimalSize }">
      .{{ objValue.decimalPart }}
    </text>
    <text v-if="suffix" class="prefix" :style="{ fontSize: suffixSize || decimalSize }">{{ suffix }}</text>
  </view>
</template>

<style lang="scss" scoped>
.yongj{
    font-family: DINAlternate, DINAlternate;
    font-weight: 500;
    color: #089D39;
    line-height: 36rpx;
    font-style: normal;
    display: flex;
    align-items: baseline;
    .prefix{
      margin-right: 8rpx;
    }
    .integer{
      font-size: 36rpx;
    }
    .decimal{
      font-size: 28rpx;
    }
    .prefix{
      margin-left: 8rpx;
    }
  }
</style>
