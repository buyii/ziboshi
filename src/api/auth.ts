import { alova } from '@/utils/request'

// 认证
export function addAuth(params: Record<string, any>) {
  return alova.Post<any>('/mall/mini/user-real-name/add', {
    ...params,
  })
}
// 查询认证信息
export function getUserAuth(params: Record<string, any>) {
  return alova.Get<any>('/mall/mini/user-real-name/getUserAuth', {
    params: { ...params },
  })
}
