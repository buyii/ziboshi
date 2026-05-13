// 获取授权二维码
export function getQRCode() {
  return alova.Post<any>('/star/mini/user-kol/getQRCode', {})
}

// 获取授权达人
export function getUserKolList(params: Record<string, any>) {
  return alova.Get<any>('/star/mini/user-kol/list', {
    params: { ...params },
  })
}
