<script setup lang="ts">
interface MyProps {
  type?: string
  value: [number, string]
  currency?: string
  condition?: string
  title: string
  desc?: string
  validity?: string
  color?: string
  backgroundColor?: string
  cutoutColor?: string
  disabled?: boolean
  select?: boolean
  status?: string
  btnText?: string
  showBtn?: boolean
}

const props = withDefaults(defineProps<MyProps>(), {
  type: 'money',
  currency: '¥',
  title: '优惠券',
  color: '#ff5a5f',
  backgroundColor: '#ffffff',
  cutoutColor: '#f5f5f5',
  disabled: false,
  select: false, // 是否选中（仅影响样式）
  status: 'available', // available 可用 | used 已使用 | expired 已过期
  btnText: '立即使用',
  showBtn: true,
})

const emit = defineEmits(['click'])

const couponStyle = computed(() => ({
  '--theme-color': props.color,
  '--bg-color': props.backgroundColor,
}))
const statusText = computed(() => {
  const map: Record<string, string> = {
    used: '已失效',
    expired: '已失效',
    available: '',
  }
  return map[props.status || 'available'] || ''
})

function handleClick() {
  if (props.disabled || props.status !== 'available')
    return
  emit('click')
}
</script>

<template>
  <view class="x-coupon" :style="[couponStyle]" @click="handleClick">
    <!-- 左侧面值区域 -->
    <view class="x-coupon__left">
      <view class="x-coupon__value-box">
        <text v-if="type === 'money'" class="x-coupon__currency">{{ props.currency }}</text>
        <text class="x-coupon__value">{{ props.value }}</text>
        <text v-if="type === 'discount'" class="x-coupon__currency">折</text>
      </view>
      <view v-if="condition" class="x-coupon__condition">
        {{ props.condition }}
      </view>
    </view>

    <!-- 中间分割线 -->
    <view class="x-coupon__divider">
      <view class="x-coupon__divider-line" />
    </view>

    <!-- 右侧信息区域 -->
    <view class="x-coupon__right">
      <view class="x-coupon__info">
        <view class="x-coupon__title">
          {{ props.title }}
        </view>
        <view v-if="desc" class="x-coupon__desc">
          {{ props.desc }}
        </view>
        <view v-if="validity" class="x-coupon__validity">
          {{ props.validity }}
        </view>
      </view>
      <view class="x-coupon__action">
        <slot name="action">
          <view v-if="showBtn" class="x-coupon__btn" :class="{ 'x-coupon__btn--disabled': disabled }">
            {{ props.btnText }}
          </view>
        </slot>
      </view>

      <!-- 状态角标（可选） -->
      <view v-if="status !== 'available'" class="x-coupon__stamp">
        <text>{{ statusText }}</text>
      </view>
      <text v-if="select" class="iconfont icon-select x-coupon__select" />
    </view>

    <!-- 上下半圆缺口 -->
    <view class="x-coupon__cutout x-coupon__cutout--top" :style="{ backgroundColor: props.cutoutColor }" />
    <view class="x-coupon__cutout x-coupon__cutout--bottom" :style="{ backgroundColor: props.cutoutColor }" />
  </view>
</template>

<style lang="scss" scoped>
.x-coupon {
  position: relative;
  display: flex;
  align-items: stretch;
  width: 100%;
  height: 200rpx; // 固定高度（可按需调整）
  background-color: var(--bg-color);
  border-radius: 16rpx;
  overflow: hidden; // 需要裁切内部溢出
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.2);
  margin-bottom: 24rpx;
  transition: all 0.3s;
  // background-color: #24d192;

  &--disabled {
    opacity: 0.8;
  }

  &__left {
    width: 200rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, var(--theme-color), lighten(#000, 20%)); // 降级方案
    background: var(--theme-color);
    color: #fff;
    position: relative;
    padding: 20rpx;
    box-sizing: border-box;
    flex-shrink: 0;

    // 增加轻微质感（可按需调整）
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to bottom right, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.1));
      pointer-events: none;
    }
  }

  &__value-box {
    display: flex;
    align-items: baseline;
  }

  &__currency {
    font-size: 24rpx;
    margin-right: 4rpx;
  }

  &__value {
    font-size: 56rpx;
    font-weight: bold;
    line-height: 1;
  }

  &__condition {
    font-size: 20rpx;
    margin-top: 12rpx;
    opacity: 0.9;
    text-align: center;
  }

  &__divider {
    width: 0;
    position: relative;
    border-left: 2rpx dashed #eee;
    margin-top: 20rpx;
    margin-bottom: 20rpx;
    z-index: 1;
  }

  &__right {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 24rpx 30rpx 24rpx 24rpx; // 左侧预留缺口区域
    position: relative;
    box-sizing: border-box;
  }

  &__info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
  }

  &__title {
    font-size: 26rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 18rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__desc {
    font-size: 24rpx;
    color: #999;
    margin-bottom: 12rpx;
  }

  &__validity {
    font-size: 24rpx;
    color: #aaa;
  }

  &__action {
    margin-left: 20rpx;
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }

  &__btn {
    font-size: 24rpx;
    padding: 8rpx 24rpx;
    border-radius: 50rpx;
    background-color: var(--theme-color);
    color: #fff;
    text-align: center;

    &--disabled {
      background-color: #ccc;
    }
  }

  &__cutout {
    position: absolute;
    width: 30rpx;
    height: 30rpx;
    border-radius: 50%;
    z-index: 2;
    left: 185rpx; // 200rpx（左侧宽度）- 15rpx（半径）
  }

  &__cutout--top {
    top: -15rpx;
  }

  &__cutout--bottom {
    bottom: -15rpx;
  }

  &__stamp {
    position: absolute;
    right: 0;
    top: 0;
    width: 120rpx;
    height: 120rpx;
    overflow: hidden;
    opacity: 0.6;
    pointer-events: none;

    text {
      display: block;
      width: 200rpx;
      height: 40rpx;
      line-height: 40rpx;
      text-align: center;
      background-color: #ff0055;
      color: #fff;
      font-size: 20rpx;
      transform: rotate(45deg) translate(11rpx, -11rpx);
      transform-origin: center;
      position: absolute;
      top: 20rpx;
      right: -50rpx;
    }
  }
  &__select{
  position: absolute;
  top: 0;
  right: 0;
  font-size: 60rpx;
  color: var(--theme-color);
  z-index: 3;
}
}
</style>
