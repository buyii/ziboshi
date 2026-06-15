import { alova } from '@/utils/request'

// 标记消息为已读
export function msgRead(params: Record<string, any>) {
  return alova.Get<any>('/mall/mini/user-msg/read', {
    params: { ...params },
  })
}

// 获取消息列表
export function getMsgList() {
  return alova.Get<any>('/mall/mini/user-msg/list', {})
}

// 删除消息
export function msgDelete(params: Record<string, any>) {
  return alova.Get<any>('/mall/mini/user-msg/delete', {
    params: { ...params },
  })
}
