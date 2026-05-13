import { isObjectLike } from 'lodash-es'

export interface AjaxEntity<T = any> {
  code: number
  msg: string
  data: T
}

export function isAjaxEntity(value: any): value is AjaxEntity {
  return isObjectLike(value)
    && 'code' in value
    && 'msg' in value
}
