import { alova } from '@/utils/request'
// 获取简要销售数据
export function getSaleIncomeBrief(params: Record<string, any>) {
  return alova.Get<any>('/star/mini/sale-income/brief', {
    params: { ...params },
  })
}
// 获取详细销售数据
export function getIncomeData(params: Record<string, any>) {
  return alova.Get<any>('/star/mini/sale-income/getIncomeData', {
    params: { ...params },
  })
}

// 获取个人数据收益记录
export function getSaleProductList(params: Record<string, any>) {
  return alova.Get<any>('/star/mini/sale-income/getSaleProductList', {
    params: { ...params },
  })
}

// 获取团队数据收益记录
export function getTeamMemberIncomeList(params: Record<string, any>) {
  return alova.Get<any>('/star/mini/sale-income/getTeamMemberIncomeList', {
    params: { ...params },
  })
}

// 获取个人收益明细
export function getSaleProductKolList(params: Record<string, any>) {
  return alova.Get<any>('/star/mini/sale-income/getSaleProductKolList', {
    params: { ...params },
  })
}

// 获取代理信息
export function getAgentInfo(params: Record<string, any>) {
  return alova.Get<any>('/star/mini/agent-team/getAgentInfo', {
    params: { ...params },
  })
}

// 获取审核状态
export function getApplyStatus() {
  return alova.Get<any>('/star/mini/agent-team/getApplyStatus', {})
}
