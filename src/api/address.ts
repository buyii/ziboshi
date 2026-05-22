import { alova } from '@/utils/request'
// 获取地址列表
export function getAddressList(params: Record<string, any>) {
  return alova.Get<any>('/mall/mini/user-address/list', {
    params: { ...params },
  })
}

// 获取地址详情
export function getAddressDetail(params: Record<string, any>) {
  const id = params.id
  return alova.Get<any>(`/mall/mini/user-address/detail/${id}`, {
  })
}

// 新增地址
export function addressAdd(params: Record<string, any>) {
  return alova.Post<any>('/mall/mini/user-address/add', {
    ...params,
  })
}
// 编辑地址
export function addressEdit(params: Record<string, any>) {
  return alova.Put<any>('/mall/mini/user-address/edit', {
    ...params,
  })
}

// 删除地址
export function delAddress(params: Record<string, any>) {
  const id = params.id
  return alova.Delete<any>(`/mall/mini/user-address/del/${id}`)
}
