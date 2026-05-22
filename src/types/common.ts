import type { BadgeProps } from 'wot-design-uni/components/wd-badge/types'

export interface Item {
  id: number
  name: string
  value?: any[]
  icon?: string
}

export interface TabsProps {
  itemList: Item[] // tabs列表
}

export interface ProductItem {
  cosFee: number | string // 公开佣金费用
  cosRatio: number | string // 公开佣金率
  cover: string // 商品图片
  focKolCosFee: number | string // 预估佣金
  kolFocServiceFee: number | string // 预估补贴
  kolCosRatio: number | string // 达人佣金率
  kolSampleRequire: number | string // 申样要求
  kolServiceRatio: number | string // 每单补率
  kolServiceFee: number | string // 每单补率
  price: number | string // 价格
  productId: string // 商品id
  activityId?: number | string // 商品id
  productName: string // 商品名称
  sales: number | string // 销量
  hasTraffic: string | number // 是否投流
  trafficType: string // 投流方式
  trafficWay: string // 投流方式
  joinTraffic: string | number // 投流方式
}

export interface Sample {
  activityId?: number | string // 活动id
  productId: number | string // 商品id
  productName: string // 商品名称
  cover: string // 商品封面
  price: number | string // 商品价格
  focKolCosFee: number | string // KOL佣金比例
  kolFocServiceFee: number | string // KOL推广比例
  kolLevel: number | string // 达人等级
  kolGmv: number | string // 达人总GMV
  monthShopSale: number | string // 月销量
  kolShopSale: number | string // 达人总橱销
  sampleStock: number | string // 样品库存
  sku: Skus | null | undefined // 商品规格
}

export interface ShopScores {
  id: number | string
  text: string
  score: number | string
  level: number | string
}
export interface Skus {
  bigPicture: number | string
  effectivePrice: number | string
  littlePicture: string
  skuId: number | string
  specIds: string
  specName: string
  stockNum: number | string
}
export interface ProductDetail {
  schema: ProductItem
  imgs: string // 商品轮播图片
  promotionEndTime: number | string // 促销结束时间
  categoryId: number | string // 目录id
  categoryName: number | string // 目录名称
  sales: number | string // 销量
  shopId: number | string // 店铺id
  shopName: number | string // 店铺名称
  shopSales: number | string // 店铺销量
  shopScores: ShopScores[] // 店铺评分
  productStock: number | string // 库存
  sampleStock: number | string // 样品库存
  sampleType: number | string //
  isAssured: number | string // 是否提供安心购服务
  hasSxt: number | string // 是否具有短视频随心推资质
  kolLevel: number | string // 达人等级
  kolGmv: number | string // 达人总gmv
  kolShopSale: number | string // 达人店铺销量
  monthShopSale: number | string // 月销量
  monthSaleNum: number | string // 商品近30天销量
  inPickCar: number | string // 是否加入选品车
  logisticsText: string // 物流信息
  fedex: string // 发货快递
  nonShippingArea: string // 不发货地区
  safeguardService: string
  merchantNickName: string
  merchantKefuUrl: string
  remark: string
  skus: Skus[] // 商品规格
  specs: any[] // 商品规格
}

export interface Product {
  productList: ProductItem[] // tabs列表
}

export interface SelectionType {
  label: string // 选择框的名称
  keys: Array<keyof Comprehensive> // 选择框的绑定值
  labels: string[]
}

export interface Comprehensive {
  maxPrice: string // 最大价格
  minPrice: string // 最小价格
  maxCosRatio: string // 最大佣金率
  minCosRatio: string // 最小佣金率
  maxKolServiceRatio: string // 最大每单补率
  minKolServiceRatio: string // 最小每单补率
  maxSales: string // 最大销量
  minSales: string // 最小销量
}

export interface SelectionTabList {
  isSingle?: boolean // 是否单选
  label: string // 选择框的名称
  tabList: Item[]
  keys: Array<keyof Comprehensive> // 选择框的绑定值
}

export interface LineTabItem {
  title: string
  key: string
  badgeProps?: Partial<BadgeProps>
}

export interface LineTabProps {
  tabs: LineTabItem[]
  showCount?: boolean
  countData?: any
}

export interface CompanyAuth {
  type: number // 认证类型
  realName: string // 真实姓名，企业认证填法人信息
  idCard: string // 身份证号码，企业认证填法人信息
  frontImg: string // 身份证正面照片，企业认证填法人信息
  backImg: string // 身份证反面照片，企业认证填法人信息
  businessNumber: string | number // 营业执照号码
  businessImg: string // 营业执照照片
  companyName: string // 公司名称
  cardNumber: string | number // 账号号码
  bank: string // 开户银行
}

export interface User {
  userId: number | string
  userName: string
  phone: string
  avatar: string
  userCode: string
  sampleOther: number | string
  inAuth: number | string
  enAuth: number | string
  score: number | string
  user_type: number | string
  userType: number | string
  sampleCount: number | string
  orderCount: number | string
  agentId: number | string
  amountType: any
}
