export interface Props {
  /** 是否展示导航栏 */
  updateNavbarParam?: (params: { navbarColor: string }) => void
}

export interface Emits {
  /** 点击标题栏左侧 */
  (e: 'updateNavbarParam', payload: { navbarColor: string }): void

}

export interface Item {
  id: number
  name: string
  icon: string
}

export interface ProductItem {
  id: number
  introduce: string // 商品介绍
  frontCover: string // 商品封面
  price: number // 商品价格
  kickback: number // 商品佣金
  kickbackRate: number // 商商品佣金比例
  kickbackRate1: number // 商品佣金比例
  subsidyRate: number // 商品补贴比例
  subsidy: number // 商品补贴金额
}
