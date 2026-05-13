export interface Item {
  id: number | string
  productId: number | string // 商品id
  activityId: number | string // 活动id
  price: number // 价格
  productName: string // productName
  cover: string // 商品图片
  cosRatio: string // 公开佣金率
  cosFee: string // 公开佣金费
  kolCosRatio: string // 达人佣金率
  focKolCosFee: string // 达人佣金费
  kolServiceRatio: string // 达人每单补率
  focKolServiceFee: string // 达人每单补费
  kolSampleRequire: string // 申样要求
  checkbox: boolean
}
