// 申样统计
export function getSampleLogStatusCount() {
  return alova.Get<any>('/star/mini/sample-log/statusCount', {})
}
// 申样列表
export function getSampleLogList(params: Record<string, any>) {
  return alova.Get<any>('/star/mini/sample-log/list', {
    params: { ...params },
  })
}
// 申样详情
export function getSampleLogDetail(params: Record<string, any>) {
  return alova.Get<any>('/star/mini/sample-log/detail', {
    params: { ...params },
  })
}
// 申样已收货
export function getConfirmCount(params: Record<string, any>) {
  return alova.Get<any>('/star/mini/sample-log/getConfirmCount', {
    params: { ...params },
  })
}
