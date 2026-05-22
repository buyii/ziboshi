import { alova } from '@/utils/request'

// 找品申请
export function productFindAdd(params: Record<string, any>) {
  return alova.Post<any>('/mall/mini/product-find-log/apply', {
    ...params,
  })
}

// 找品申请列表
export function getProductLogList(params: Record<string, any>) {
  return alova.Get<any>('/mall/mini/product-find-log/list', {
    params: { ...params },
  })
}

// 加急
export function productLogUrgent(params: Record<string, any>) {
  return alova.Put<any>('/mall/mini/product-find-log/urgent', {
    ...params,
  })
}

// 删除
export function productLogDel(params: Record<string, any>) {
  return alova.Get<any>('/mall/mini/product-find-log/delete', {
    params: { ...params },
  })
}

// 查询找品记录数量
export function getUnViewCount(params: Record<string, any>) {
  return alova.Get<any>('/mall/mini/product-find-log/countUnView', {
    params: { ...params },
  })
}
// 记录查看找品记录
export function viewFindProduct(params: Record<string, any>) {
  return alova.Get<any>('/mall/mini/product-find-log/viewFindProduct', {
    params: { ...params },
  })
}
