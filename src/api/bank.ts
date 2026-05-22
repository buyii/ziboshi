import { alova } from '@/utils/request'

// 添加银行卡
export function addBankCard(params: Record<string, any>) {
  return alova.Post<any>('/mall/mini/user-bank-card/add', {
    ...params,
  })
}
// 编辑银行卡
export function editBankCard(params: Record<string, any>) {
  return alova.Put<any>('/mall/mini/user-bank-card/edit', {
    ...params,
  })
}
// 查询银行卡列表
export function getBankCardList() {
  return alova.Get<any>('/mall/mini/user-bank-card/list', {})
}

// 删除银行卡
export function delBankCard(params: Record<string, any>) {
  const id = params.id
  return alova.Delete<any>(`/mall/mini/user-bank-card/del/${id}`)
}
