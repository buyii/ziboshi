import { alova } from '@/utils/request'

// 智能匹配
export function onApplyMatch(params: Record<string, any>) {
  return alova.Post<any>('/star/mini/product-match-log/applyMatch', {
    ...params,
  })
}
// 智能匹配记录
export function getUserMatchList(params: Record<string, any>) {
  return alova.Get<any>('/star/mini/product-match-log/getUserMatchList', {
    params: { ...params },
  })
}
// 智能匹配记录详情
export function getUserMatchDetail(params: Record<string, any>) {
  return alova.Get<any>('/star/mini/product-match-log/getDetail', {
    params: { ...params },
  })
}
