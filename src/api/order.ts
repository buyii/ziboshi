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

// 获取订单物流
export function getOrderLogistics(params: Record<string, any>) {
  return alova.Get<any>('/mall/mini/order/getOrderLogistics', {
    params: { ...params },
  })
}
// 退款
export function refund(params: Record<string, any>) {
  return alova.Post<any>('/mall/mini/order/refund', {
    ...params,
  })
}
// 退款
export function payOrder(params: Record<string, any>) {
  return alova.Post<any>('/mall/mini/order/payOrder', {
    ...params,
  })
}
// 退款
export function confirmOrder(params: Record<string, any>) {
  return alova.Post<any>('/mall/mini/order/confirm', {
    ...params,
  })
}
// 删除订单
export function closeOrder(params: Record<string, any>) {
  return alova.Post<any>('/mall/mini/order/closeOrder', {
    ...params,
  })
}
// 订单状态数量统计
export function countOrderStatus() {
  return alova.Get<any>('/mall/mini/order/countOrderStatus', {})
}
