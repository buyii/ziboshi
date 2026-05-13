import { getArea } from '@/api/common'

export function useColPickerData() {
  // 根据code查找子节点
  function findChildrenByCode(code: string): any {
    return getArea({ pCode: code })
  }

  return { findChildrenByCode }
}
