export interface TabbarItem {
  name: string
  value: number | null
  active: boolean
  title: string
  showNavbar: boolean // 是否显示布局navbar
  icon: string
  activeIcon: string
}

const tabbarItems = ref<TabbarItem[]>([
  { name: 'home', value: null, active: true, title: '首页', showNavbar: false, icon: 'icon-home_01', activeIcon: 'icon-home_11' },
  { name: 'rank', value: null, active: false, title: '消息', showNavbar: false, icon: 'icon-message_0', activeIcon: 'icon-message_1' },
  { name: 'mine', value: null, active: false, title: '我的', showNavbar: false, icon: 'icon-user_0', activeIcon: 'icon-user_1' },
])

export function useTabbar() {
  const tabbarList = computed(() => tabbarItems.value)

  const activeTabbar = computed(() => {
    const item = tabbarItems.value.find(item => item.active)
    return item || tabbarItems.value[0]
  })

  const getTabbarItemValue = (name: string) => {
    const item = tabbarItems.value.find(item => item.name === name)
    return item && item.value ? item.value : null
  }

  const setTabbarItem = (name: string, value: number) => {
    const tabbarItem = tabbarItems.value.find(item => item.name === name)
    if (tabbarItem) {
      tabbarItem.value = value
    }
  }

  const setTabbarItemActive = (name: string) => {
    tabbarItems.value.forEach((item) => {
      if (item.name === name) {
        item.active = true
      }
      else {
        item.active = false
      }
    })
  }

  return {
    tabbarList,
    activeTabbar,
    getTabbarItemValue,
    setTabbarItem,
    setTabbarItemActive,
  }
}
