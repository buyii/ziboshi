// #ifndef H5
const fs = uni.getFileSystemManager()
// #endif

// 将Base64数据转换为图片并保存到本地
export async function base64ToImage(base64Data: string, filePath: string): Promise<string> {
  try {
    // 写入本地文件
    await base64WriteFile(filePath, base64Data)

    // 验证文件是否成功写入
    const fileInfo = await uni.getImageInfo({
      src: filePath,
    })
    console.log('图片已成功保存:', fileInfo.path)
    return fileInfo.path // 返回保存的图片路径
  }
  catch (error) {
    console.error('Base64 转图片失败:', error)
    throw error
  }
}

// 将Base64写入本地文件
function base64WriteFile(filePath: string, data: string) {
  return new Promise((resolve, reject) => {
    fs.writeFile({
      filePath,
      data,
      encoding: 'base64',
      success: (res) => {
        console.log('文件写入成功:', res)
        resolve(res)
      },
      fail: (err) => {
        console.log('文件写入失败:', err)
        reject(err)
      },
    })
  })
}

// 获取近N天的时间范围
export function getNDaysRange(n: number): { start: string, end: string } {
  const end = new Date()
  const start = new Date()
  start.setDate(start.getDate() - n + 1) // 包含今天

  // 格式化为YYYY-MM-DD
  const format = (date: Date) => {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
  }

  return {
    start: format(start),
    end: format(end),
  }
}

//  获取昨天、今天、本周一到今天、本月第一天到今天、本季第一天到今天、本年第一天到今天的时间范围
export function getRange(type: string): { start: string, end: string } {
  const end = new Date()
  const start = new Date()
  switch (type) {
    case 'yesterday': // 昨天
      start.setDate(start.getDate() - 1)
      end.setDate(end.getDate() - 1)
      break
    case 'today': // 今天
      break
    case 'week':{ // 本周
    // 获取本周一的日期
    // start.getDate()：获取当前日期（几号）。
    // start.getDay()：获取当前是星期几（0 表示周日，1 表示周一，依此类推）。
    // start.getDate() - start.getDay() + 1：计算出本周一的日期（因为周一是 1，减去当前是星期几，再加 1，就能回退到本周一）。
    // start.setDate(...)：把 start 这个日期对象设置为本周一。
      const day = start.getDay()
      const diff = day === 0 ? 6 : day - 1
      start.setDate(start.getDate() - diff)
      break
    }
    case 'month': // 本月
      // 获取本月第一天的日期
      start.setDate(1)
      break
    case 'quarter': // 本季
      // 获取本季度的第一天
      start.setDate(1)
      // 获取本季度的第一个月
      start.setMonth(start.getMonth() - start.getMonth() % 3)
      break
    case 'year': // 本年
    // 设置为一年的第一天
      start.setMonth(0)
      start.setDate(1)
      break
    default: // 无效的range类型
      throw new Error('Invalid range type')
  }

  // 格式化为YYYY-MM-DD
  const format = (date: Date) => {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
  }

  return {
    start: format(start),
    end: format(end),
  }
}

// 获取当前月份
export function getCurrentMonth() {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${year}-${month}`
}

// 获取月份有多少天

export function getDaysInMonth(month: string): number {
  const year = Number.parseInt(month.split('-')[0])
  const monthNumber = Number.parseInt(month.split('-')[1])
  const date = new Date(year, monthNumber, 0)
  return date.getDate()
}

// 格式化数字
export function formatNumber(num: number | string): string | number {
  const numValue = Number(num)
  // 如果数字大于1万
  if (numValue >= 10000) {
    return `${(numValue / 10000).toFixed(1)}万`
  }
  // 如果数字大于1千
  else if (numValue >= 1000) {
    return `${(numValue / 1000).toFixed(1)}千`
  }
  return num
}

// 格式化数字单位为万
export function formatNumberWan(num: number | string): any {
  const numValue = Number(num)
  // 如果数字大于100万
  if (numValue >= 1000000) {
    return {
      value: Math.floor(numValue / 10000),
      unit: '万',
    }
  }
  if (numValue >= 10000) {
    return {
      value: (numValue / 10000).toFixed(1),
      unit: '万',
    }
  }
  return {
    value: num,
    unit: '',
  }
}

// 格式化数字
export function formatMineNumber(num: number | string): string | number {
  const numValue = Number(num)
  // 如果数字大于1亿
  if (numValue >= 99999999) {
    // 去掉小数
    return `${Math.floor(numValue)}`
  }
  // 如果数字大于1千万
  if (numValue >= 9999999) {
    return `${numValue.toFixed(1)}`
  }
  return num
}

// 格式化小数
export function formatDecimal(num: number | string): string | number {
  const numValue = Number(num)
  // 如果数字大于10万
  if (numValue >= 100000) {
    // 去掉小数
    return `${Math.floor(numValue)}`
  }
  // 如果数字大于1万
  if (numValue >= 10000) {
    return `${numValue.toFixed(1)}`
  }
  // 如果数字大于1千
  else if (numValue >= 1000) {
    return `${numValue.toFixed(2)}`
  }
  return num
}

/**
 * 获取当前页面路径
 * @returns 当前页面路径
 */
export function getCurrentPath() {
  console.log('getCurrentPathgetCurrentPathgetCurrentPathgetCurrentPathgetCurrentPathgetCurrentPathgetCurrentPathgetCurrentPath')
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  console.log(currentPage)
  return currentPage.route || ''
}
