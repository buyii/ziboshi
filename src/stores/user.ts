import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { User } from '@/types/common'

const initState = {
  userId: '',
  userName: '',
  phone: '',
  avatar: '',
  userCode: '',
  inAuth: '',
  sampleOther: '',
  enAuth: '',
  score: '',
  user_type: '',
  userType: '',
  sampleCount: '',
  orderCount: '',
  agentId: '',
  amountType: '',
}

export const useUserStore = defineStore(
  'user',
  () => {
    const token = shallowRef<NullableString>(null)
    const userInfo = ref<User>({ ...initState })
    const paymentData = ref<any | null>(null)
    const orderData = ref<any | null>(null)
    const applyStatus = ref<string>('0')
    const showCopyTip = ref<boolean>(true)
    const couponList = ref<any[]>([])

    const setShowCopyTip = (val: any) => {
      showCopyTip.value = val
    }

    const setApplyStatus = (val: any) => {
      applyStatus.value = val
    }

    const setPaymentData = (val: any) => {
      paymentData.value = { ...val }
    }

    const setOrderData = (val: any) => {
      orderData.value = { ...val }
    }

    const setCouponList = (val: any) => {
      couponList.value = val
    }

    const setToken = (val: any) => {
      token.value = val
    }

    const setUserInfo = (val: any) => {
      userInfo.value = { ...val }
    }

    const upDataUserInfo = (val: any) => {
      userInfo.value = { ...userInfo.value, ...val }
    }

    const clearUserInfo = () => {
      userInfo.value = { ...initState }
      token.value = ''
    }
    const reset = () => {
      userInfo.value = { ...initState }
    }
    // const isLogined = computed(() => !!userInfo.value.token)

    /**
     * 拉取用户信息
     */
    async function fetchProfile() {

    }

    /**
     * 清除用户信息
     */
    function clearProfile() {
      userInfo.value = { ...initState }
    }
    return {
      token,
      userInfo,
      orderData,
      couponList,
      setCouponList,
      setOrderData,
      paymentData,
      setPaymentData,
      setToken,
      setUserInfo,
      upDataUserInfo,
      clearUserInfo,
      reset,
      clearProfile,
      fetchProfile,
      applyStatus,
      setApplyStatus,
      showCopyTip,
      setShowCopyTip,
    }
  },
  {
    persist: true,
  },
)
