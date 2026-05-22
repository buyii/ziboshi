import { alova } from '@/utils/request'

// 创建订单
export function createAndPayOrder(params: Record<string, any>) {
  return alova.Post<any>('/mall/mini/order/createAndPayOrder', {
    ...params,
  })
}

// 获取订单列表
export function getOrderList(params: Record<string, any>) {
  return alova.Get<any>('/mall/mini/order/list', {
    params: { ...params },
  })
}
// 退款
export function refund(params: Record<string, any>) {
  return alova.Post<any>('/mall/mini/order/refund', {
    ...params,
  })
}
