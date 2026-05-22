import { alova } from '@/utils/request'

const baseURL = import.meta.env.VITE_REQUEST_BASE_URL
const baseModule = import.meta.env.VITE_REQUEST_BASE_MODULE

export const action = `${baseURL}${baseModule}/mall/common/uploadFile`

export function uploadFile(tempFilePath: string, params: Record<string, any>) {
  const userStore = useUserStore()
  const { token } = userStore
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: action,
      filePath: tempFilePath,
      name: 'file',
      header: {
        Authorization: `Bearer ${token}`,
      },
      formData: {
        ...params,
      },
      success: (uploadRes) => {
        console.log('上传成功', uploadRes)
        resolve(JSON.parse(uploadRes.data))
      },
      fail: (err) => {
        console.error('上传失败', err)
        reject(err)
      },
    })
  })

  // return alova.Post<any>('/mall/common/uploadFile', {
  //   params: { ...params },
  // })
}

// 获取区域联动
export function getArea(params: Record<string, any>) {
  return alova.Get<any>('/mall/match/sys/area/sub', {
    params: { ...params },
  })
}

// 获取申样达人
export function getKoList(params: Record<string, any>) {
  return alova.Get<any>('/mall/mini/index/product/kol/list', {
    params: { ...params },
  })
}

// 授权二维码
export function getDouYinQRCode(params: Record<string, any>) {
  return alova.Get<any>('/mall/mini/index/getDouYinQRCode', {
    params: { ...params },
  })
}
// 查询字典
export function getDictList(params: Record<string, any>) {
  return alova.Get<any>('/mall/match/sys/dictData/getDictList', {
    params: { ...params },
  })
}
// 查询配置
export function getByKey(params: Record<string, any>) {
  return alova.Get<any>('/mall/match/sys/config/getByKey', {
    params: { ...params },
    meta: {
      ignoreToken: true,
    },
  })
}
// 查询类目
export function getCategoryList() {
  return alova.Get<any>('/mall/mini/index/getCategoryList', {})
}
// 查询类目
export function miniQRCode(params: Record<string, any>) {
  return alova.Get<any>('/mall/mini/index/miniQRCode', {
    params: { ...params },
  })
}
// 查询搜索历史
export function getSearchLog() {
  return alova.Get<any>('/mall/mini/index/getSearchLog', {})
}
// 查询搜索历史
export function removeSearchLog() {
  return alova.Get<any>('/mall/mini/index/removeSearchLog', {})
}
// 查询红包活动
export function getRedPacket() {
  return alova.Get<any>('/mall/mini/activity/getRedPacket', {})
}
// 领取活动红包
export function claimRedPacket() {
  return alova.Get<any>('/mall/mini/activity/claimRedPacket', {})
}

export function getCarList() {
  return alova.Get<any>('/mall/inventory/getCarList', {})
}

export function getLogList(params: Record<string, any>) {
  return alova.Get<any>('/mall/inventory/getLogList', {
    params: { ...params },
  })
}

export function addCar(params: Record<string, any>) {
  return alova.Post<any>('/mall/inventory/addCar', {
    ...params,
  })
}

export function productInOrOut(params: Record<string, any>) {
  return alova.Post<any>('/mall/inventory/productInOrOut', {
    ...params,
  })
}

export function getParentCode(params: Record<string, any>) {
  return alova.Get<any>('/mall/match/sys/area/getParentCode', {
    params: { ...params },
  })
}
