// 可提现金额
export function getWalletAccountsBalance() {
  return alova.Get<any>('/star/mini/wallet-accounts/balance', {})
}
// 提现记录
export function getWithdrawList(params: Record<string, any>) {
  return alova.Get<any>('/star/mini/wallet-transaction/getWithdrawList', {
    params: { ...params },
  })
}
// 提现时间
export function getLastApplyTime() {
  return alova.Get<any>('/star/mini/wallet-transaction/getLastApplyTime', {})
}
// 提现
export function applyWithdraw(params: Record<string, any>) {
  return alova.Post<any>('/star/mini/wallet-transaction/applyWithdraw', {
    ...params,
  })
}
