import { alova } from '@/utils/request'

// 获取商品列表
export function getProductList(params: Record<string, any>) {
  return alova.Get<any>('/star/mini/index/product/list', {
    params: { ...params },
    meta: {
      ignoreToken: true,
    },
  })
}

// 获取商品列表
export function getTrafficList(params: Record<string, any>) {
  return alova.Get<any>('/star/mini/index/product/getTrafficList', {
    params: { ...params },
    meta: {
      ignoreToken: true,
    },
  })
}
// 商品详情
export function getProductDetail(params: Record<string, any>) {
  return alova.Get<any>('/star/mini/index/product/detail', {
    params: { ...params },
    meta: {
      ignoreToken: true,
    },
  })
}
// 添加橱窗
export function addShopStore(params: Record<string, any>) {
  return alova.Post<any>('/star/mini/index/product/addShopStore', {
    ...params,
  })
}

// 获取链接
export function getPickUrl(params: Record<string, any>) {
  return alova.Get<any>('/star/mini/index/product/getPickUrl', {
    params: { ...params },
  })
}
// 免费领样
export function applySample(params: Record<string, any>) {
  return alova.Post<any>('/star/mini/index/product/applySample', {
    ...params,
  })
}
// 报名投流
export function productTrafficSignup(params: Record<string, any>) {
  return alova.Post<any>('/star/mini/product-traffic/signup', {
    ...params,
  })
}
// 投流
export function uploadVideoUrl(params: Record<string, any>) {
  return alova.Post<any>('/star/mini/product-traffic/uploadVideoUrl', {
    ...params,
  })
}
// 再次投流
export function uploadVideoUrlAgent(params: Record<string, any>) {
  return alova.Post<any>('/star/mini/product-traffic/uploadVideoUrlAgent', {
    ...params,
  })
}
// 我的投流
export function trafficGetList(params: Record<string, any>) {
  return alova.Get<any>('/star/mini/product-traffic/getList', {
    params: { ...params },
  })
}
// 获取达人信息
export function getSampleKol(params: Record<string, any>) {
  return alova.Get<any>('/star/mini/index/product/getSampleKol', {
    params: { ...params },
  })
}
