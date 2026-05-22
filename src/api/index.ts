import { alova } from '@/utils/request'

// 登录
export function login(params: Record<string, any>) {
  return alova.Post<any>('/mall/mini/wechat/login', {
    ...params,
  }, { meta: { login: true } })
}

// 退出登录
export function logout() {
  return alova.Post<any>('/mall/mini/wechat/logout', {}, { meta: { logout: true } })
}

// 修改头像或昵称
export function changeAvatarOrUserName(params: Record<string, any>) {
  return alova.Post<any>('/mall/mini/setting/changeAvatarOrUserName', { ...params })
}

// 查询用户信息
export function getUserInfo() {
  return alova.Get<any>('/mall/mini/wechat/getUserInfo', {})
}

// 查询客服链接
export function getKeFuUrl() {
  return alova.Get<any>('/mall/mini/wechat/getKeFuUrl', {})
}
