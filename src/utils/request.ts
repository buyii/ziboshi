import type { uniappRequestAdapter } from '@alova/adapter-uniapp'
import AdapterUniapp from '@alova/adapter-uniapp'
import { createAlova } from 'alova'
import { createServerTokenAuthentication } from 'alova/client'
import type VueHook from 'alova/vue'
import { isString } from 'lodash-es'
import type { AjaxEntity } from '@/models/AjaxEntity'
import { isAjaxEntity } from '@/models/AjaxEntity'

let flagRedirect = false
const baseUrl = import.meta.env.VITE_REQUEST_BASE_URL
const baseModule = import.meta.env.VITE_REQUEST_BASE_MODULE

interface ResponseWithCookies {
  cookies: string[]
  // 其他字段
}

const { onAuthRequired, onResponseRefreshToken } = createServerTokenAuthentication<
  typeof VueHook,
  typeof uniappRequestAdapter
>({
  login: {
    metaMatches: {
      login: true,
    },
    handler(response) {
      const userStore = useUserStore()
      const { cookies } = response as ResponseWithCookies
      if (cookies && cookies.length > 0) {
        const cookiea = cookies[0]
        const cookieb = cookiea.split(';')[0]
        const token = cookieb.split('=')[1]
        userStore.setToken(token)
      }
    },
  },
  logout: {
    metaMatches: {
      logout: true,
    },
    handler() {
      const userStore = useUserStore()
      userStore.setToken(null)
      userStore.setUserInfo({})
    },
  },
  assignToken(method) {
    const userStore = useUserStore()
    const { meta = {} } = method
    const { token } = userStore
    const {
      ignoreToken = false,
      external = false,
    } = meta

    if ((ignoreToken || external) && isEmpty(token)) {
      return
    }

    if (isEmpty(token)) {
      return
    }

    method.config.headers.Authorization = `Bearer ${token}`
  },
  refreshTokenOnSuccess: {
    isExpired(response, method) {
      const { meta = {} } = method
      const { external = false } = meta

      if (external) {
        return false
      }

      if (response.statusCode === 401) {
        return true
      }

      const res = response as UniApp.RequestSuccessCallbackResult
      const data = res.data as AjaxEntity

      return data.code === 1001
    },
    handler(response, method) {
      const userStore = useUserStore()
      const { meta = {} } = method
      const { disableAuthRedirect = false } = meta
      userStore.setToken(null)
      userStore.clearProfile()
      if ((!disableAuthRedirect) && (!flagRedirect)) {
        flagRedirect = true
        uni.navigateTo({
          url: `/pages/authorizePage/index`,
          success() {
            setTimeout(() => {
              flagRedirect = false
            }, 500)
          },
        })
        throw response
      }
      throw response
    },
  },
})

function triggerError(type: false | 'toast' | 'alert', message: OptionalString) {
  if (type === false) {
    return
  }

  const msg = message || '未知错误'
  const globalToast = useGlobalToast()
  switch (type) {
    case 'toast': {
      if (msg.length > 7) {
        globalToast.show(msg)
      }
      else {
        globalToast.error(msg)
      }
      break
    }
    case 'alert': {
      uni.showModal({
        title: '错误',
        content: msg,
        showCancel: false,
      })
      break
    }
  }
}

function returnData<
  T extends UniApp.RequestSuccessCallbackResult | UniApp.UploadFileSuccessCallbackResult,
>(type: 'inner-data' | 'data' | 'response', response: T) {
  if (type === 'response') {
    return response
  }

  if (type === 'data' || !isAjaxEntity(response.data)) {
    return response.data
  }

  return response.data.data
}

export const alova = createAlova({
  baseURL: baseUrl + baseModule,
  ...AdapterUniapp({}),
  cacheFor: null,
  beforeRequest: onAuthRequired((method) => {
    method.config.headers = {
      ...method.config.headers,
      'Content-Type': 'application/json',
    }
    const { meta = {} } = method
    const {
      enableLoading = false,
      loadingText = '请稍候',
      loadingDelay = 500,
    } = meta

    if (enableLoading) {
      meta.loadingTimer = setTimeout(() => {
        uni.showLoading({
          title: loadingText,
          mask: true,
        })
      }, loadingDelay)
    }
  }),
  responded: onResponseRefreshToken({
    onSuccess(response, method) {
      if (!('data' in response)) {
        return response
      }

      const { meta = {} } = method
      const {
        external = false,
        errorType = 'toast',
        returnType = 'data',
      } = meta

      if (external) {
        return returnData(returnType, response)
      }
      const { statusCode, errMsg } = response

      if (statusCode !== 200) {
        triggerError(errorType, errMsg)
        throw response
      }

      if (response.data instanceof ArrayBuffer) {
        return returnData(returnType, response)
      }
      if (isString(response.data)) {
        try {
          response.data = JSON.parse(response.data)
        }
        catch (error) {
          const err = error as Error
          triggerError(errorType, err.message)
          throw response
        }
      }
      const { data } = response

      if (!isAjaxEntity(data)) {
        return returnData(returnType, response)
      }
      if (data.code !== 0) {
        triggerError(errorType, data.msg)
        throw response
      }

      return returnData(returnType, response)
    },
    onError(error, method) {
      const { meta = {} } = method
      const { errorType = 'toast' } = meta

      triggerError(errorType, error.message)
    },
    onComplete(method) {
      const { meta = {} } = method
      const {
        enableLoading = false,
        loadingTimer,
      } = meta

      if (enableLoading) {
        if (loadingTimer) {
          clearTimeout(loadingTimer)
          meta.loadingTimer = undefined
        }

        try {
          // #ifdef MP-WEIXIN
          wx.hideLoading({
            noConflict: true,
          })
          // #endif
          // #ifndef MP-WEIXIN
          uni.hideLoading()
          // #endif
        }
        catch (error) {
          console.log(error)
          // nothing
        }
      }
    },
  }),
})
