// 可提现金额
export function getPayouts() {
  return alova.Get<any>('/mall/mini/sale-income/getPayouts', {})
}
// 查询积分列表
export function getMyPoint() {
  return alova.Get<any>('/mall/mini/sale-income/getMyPoint', {})
}
// 查询积分列表
export function getPoints(params: Record<string, any>) {
  return alova.Get<any>('/mall/mini/sale-income/getPoints', {
    params: { ...params },
  })
}
// 查询积分兑换列表
export function getPointsRedemption(params: Record<string, any>) {
  return alova.Get<any>('/mall/mini/sale-income/getPointsRedemption', {
    params: { ...params },
  })
}
// 可提现金额
export function getWalletAccountsBalance() {
  return alova.Get<any>('/mall/mini/wallet-accounts/balance', {})
}
// 查询收益订单
export function getOrderList(params: Record<string, any>) {
  return alova.Get<any>('/mall/mini/sale-income/getOrderList', {
    params: { ...params },
  })
}
// 提现记录
export function getWithdrawList(params: Record<string, any>) {
  return alova.Get<any>('/mall/mini/wallet-transaction/getWithdrawList', {
    params: { ...params },
  })
}
// 提现时间
export function getLastApplyTime() {
  return alova.Get<any>('/mall/mini/wallet-transaction/getLastApplyTime', {})
}
// 提现
export function applyWithdraw(params: Record<string, any>) {
  return alova.Post<any>('/mall/mini/wallet-transaction/applyWithdraw', {
    ...params,
  })
}
