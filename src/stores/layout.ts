import { defineStore } from 'pinia'
import { ref } from 'vue'

// const initState = { navbarTColor: ref('#000') }

const statusBarHeight = computed(() => {
  const systemInfo = uni.getSystemInfoSync()
  return systemInfo.statusBarHeight ? systemInfo.statusBarHeight : 0
})

export const useLayoutStore = defineStore(
  'layout',
  () => {
    const layoutStore = ref({
      navbarTColor: ref('#fff'),
      // 是否可以设置颜色
      canSetColor: ref(false),

      // 是否不能滚动
      noScroll: ref(false),

      statusBarHeight: ref(statusBarHeight),
    })

    const setLayoutStore = (val: any) => {
      layoutStore.value = {
        ...layoutStore.value,
        ...val,
      }
    }

    return {
      layoutStore,
      setLayoutStore,
    }
  },
  {
    persist: true,
  },
)
