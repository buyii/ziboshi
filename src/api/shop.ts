// 店铺数据
export function getShopDetail(params: Record<string, any>) {
  return alova.Get<any>('/star/mini/index/shop/detail', {
    params: { ...params },
  })
}
// 店铺商品列表
export function getShopProductList(params: Record<string, any>) {
  return alova.Get<any>('/star/mini/index/shop/product/list', {
    params: { ...params },
  })
}
