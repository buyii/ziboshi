import { alova } from '@/utils/request'

// 申请代理
export function agentTeamApply(params: Record<string, any>) {
  return alova.Post<any>('/star/mini/agent-team/apply', {
    ...params,
  })
}

// 我的团队数据
export function getMyTeamData() {
  return alova.Get<any>('/star/mini/agent-team/myTeamData', {})
}
// 我的团队列表
export function getMyTeamMemberList(params: Record<string, any>) {
  return alova.Get<any>('/star/mini/agent-team/myTeamMemberList', {
    params: { ...params },
  })
}

// 删除成员
export function delMember(params: Record<string, any>) {
  return alova.Delete<any>('/star/mini/agent-team/delMember', {
    ...params,
  })
}
// 添加成员二维码
export function myQRCode() {
  return alova.Get<any>('/star/mini/agent-team/myQRCode', {})
}

// 加入团队
export function joinAgentTeam(params: Record<string, any>) {
  return alova.Post<any>('/star/mini/agent-team/joinAgentTeam', {
    ...params,
  })
}
