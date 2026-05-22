<script lang="ts" setup>
import type { ConfigProviderThemeVars } from 'wot-design-uni'
import { useTabbar } from '@/composables/useTabbar'
import { useLayoutStore } from '@/stores'

const router = useRouter()
const route = useRoute()
const layoutStore = useLayoutStore()

// #ifdef MP-WEIXIN
const accountInfo = uni.getAccountInfoSync()
const envVersion = accountInfo.miniProgram.envVersion
// #endif

const themeVars = reactive<ConfigProviderThemeVars>({
  tabbarHeight: '60px',
})

const { activeTabbar, getTabbarItemValue, setTabbarItemActive, tabbarList } = useTabbar()

function handleTabbarChange({ value }: { value: string }) {
  console.log('handleTabbarChange', value)
  setTabbarItemActive(value)
  router.pushTab({ name: value, animationType: 'none', animationDuration: 0 })
}

const themeVarscom = computed(() => {
  if (layoutStore.layoutStore.canSetColor) {
    return {
      ...themeVars,
      // navbarColor: layoutStore.layoutStore.navbarTColor,
    }
  }
  else {
    return {
      ...themeVars,
      // navbarColor: '#000',
    }
  }
})

onMounted(() => {
  nextTick(() => {
    if (route.name && route.name !== activeTabbar.value.name) {
      setTabbarItemActive(route.name)
    }
  })
})

onShow(() => {
  // #ifdef APP-PLUS
  uni.hideTabBar()
  // #endif
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
  <wd-config-provider :theme-vars="themeVarscom" custom-style="min-height: 100vh;background-color: #F8F8F8;">
    <wd-navbar v-if="activeTabbar.showNavbar" :title="activeTabbar.title" safe-area-inset-top :placeholder="false" fixed :bordered="false" />

    <!-- #ifdef MP-WEIXIN -->
    <!-- v-if="envVersion === 'release'" -->
    <template v-if="envVersion === 'release' || envVersion === 'develop'">
      <slot />
      <view class="custom-box">
        <wd-tabbar
          :model-value="activeTabbar.name"
          bordered safe-area-inset-bottom placeholder fixed active-color="#089D39"
          inactive-color="#999999"
          @change="handleTabbarChange"
        >
          <wd-tabbar-item v-for="(item, index) in tabbarList" :key="index" :name="item.name" custom-class="custom-tabbar" :value="getTabbarItemValue(item.name)" :title="item.title">
            <template #icon="{ active }">
              <text v-if="active" class="iconfont isActive" :class="item.activeIcon" />
              <text v-else class="iconfont" :class="item.icon" />
            </template>
          </wd-tabbar-item>
        </wd-tabbar>
      </view>
      <!-- <KefuBotton /> -->
    </template>
    <template v-else>
      <VehicleManage />
    </template>
    <!-- #endif -->

    <!-- #ifdef WEB -->
    <slot />
    <view class="custom-box">
      <wd-tabbar
        :model-value="activeTabbar.name"
        bordered safe-area-inset-bottom placeholder fixed active-color="#089D39"
        inactive-color="#999999"
        @change="handleTabbarChange"
      >
        <wd-tabbar-item v-for="(item, index) in tabbarList" :key="index" :name="item.name" custom-class="custom-tabbar" :value="getTabbarItemValue(item.name)" :title="item.title">
          <template #icon="{ active }">
            <text v-if="active" class="iconfont isActive" :class="item.activeIcon" />
            <text v-else class="iconfont" :class="item.icon" />
          </template>
        </wd-tabbar-item>
      </wd-tabbar>
    </view>
    <!-- #endif -->

    <wd-notify />
    <wd-toast />
    <wd-message-box />
    <privacy-popup />
    <GlobalToast />
  </wd-config-provider>
</template>

<style lang="scss" scoped>
.iconfont {
  font-size: 48rpx;
  color:#999999;
}
.custom-box{
  :deep(.wd-tabbar-item__body-title){
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 24rpx;
    margin-top: 7px !important;
  }
}
.isActive{
  color: #089D39;
}
</style>
