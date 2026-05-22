import { alova } from '@/utils/request'

// 添加选品车
export function pickCarAdd(params: Record<string, any>) {
  return alova.Post<any>('/mall/mini/pick-car/add', {
    ...params,
  })
}

// 删除选品车
export function pickCarDel(params: Record<string, any>) {
  return alova.Get<any>(`/mall/mini/pick-car/remove`, {
    params: { ...params },
  })
}

// 批量删除选品车
export function batchDelCar(params: Record<string, any>) {
  return alova.Get<any>(`/mall/mini/pick-car/batchDel`, {
    params: { ...params },
  })
}

// 查询选品车列表
export function getMyCarList(params: Record<string, any>) {
  return alova.Get<any>('/mall/mini/pick-car/getMyCarList', {
    params: { ...params },
  })
}

// 查询选品车数量
export function getMyCarCount(params: Record<string, any>) {
  return alova.Get<any>('/mall/mini/pick-car/countPickCar', {
    params: { ...params },
  })
}
