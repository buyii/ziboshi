<script lang="ts" setup>
import type { ConfigProviderThemeVars } from 'wot-design-uni'

const themeVars = reactive<ConfigProviderThemeVars>({
  // navbarColor: '#ffffff',
})

// #ifdef MP-WEIXIN
const accountInfo = uni.getAccountInfoSync()
const envVersion = accountInfo.miniProgram.envVersion
// #endif
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
  <wd-config-provider :theme-vars="themeVars" custom-style="background-color: #F8F8F8;min-height: 100vh">
    <!-- #ifdef MP-WEIXIN -->
    <!-- <slot v-if="envVersion === 'release'" /> -->
    <template v-if="envVersion === 'release' || envVersion === 'develop'">
      <slot />
      <!-- <KefuBotton /> -->
    </template>
    <template v-else>
      <VehicleManage />
    </template>
    <!-- #endif -->

    <!-- #ifdef WEB -->
    <slot />
    <!-- #endif -->
    <wd-notify />
    <wd-toast />
    <wd-message-box />
    <privacy-popup />
    <GlobalToast />
  </wd-config-provider>
</template>

<style lang="scss">

</style>
