import { alova } from '@/utils/request'
// 排行榜
export function getProductSales(params: Record<string, any>) {
  return alova.Get<any>('/star/mini/ranking/productRanking', {
    params: { ...params },
    meta: {
      ignoreToken: true,
    },
  })
}
