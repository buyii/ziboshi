// 获取授权二维码
export function getQRCode() {
  return alova.Post<any>('/mall/mini/user-kol/getQRCode', {})
}

// 获取授权达人
export function getUserKolList(params: Record<string, any>) {
  return alova.Get<any>('/mall/mini/user-kol/list', {
    params: { ...params },
  })
}
