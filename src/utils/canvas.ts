// utils/canvas.ts
const fs = uni.getFileSystemManager()

// 将Base64写入本地文件
function base64WriteFile(filePath: string, data: string) {
  return new Promise((resolve, reject) => {
    fs.writeFile({
      filePath,
      data,
      encoding: 'base64',
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}
// 参数的类型校验
interface GetImgBase64Type {
  src: string// 图片地址(本地/在线地址)
  filePath: string// 临时路径
}
// 加载图片地址，生成base64并写入临时路径中
export async function getImgBase64(params: GetImgBase64Type) {
  const { src, filePath } = params
  try {
    // 获取图片信息：地址、宽高
    const imgInfo = await uni.getImageInfo({
      src,
    })
    // 生成base64
    const base64: any = fs.readFileSync(imgInfo.path, 'base64')
    // 写入本地
    await base64WriteFile(filePath, base64)
    const currentImgInfo = await uni.getImageInfo({
      src: filePath,
    })
    return {
      width: imgInfo.width,
      height: imgInfo.height,
      imgUrl: currentImgInfo.path,
    }
  }
  catch (err) {
    console.log('err', err)
  }
}

interface DrawRoundedRectParamsType {
  leftTop?: boolean
  leftBottom?: boolean
  rightTop?: boolean
  rightBottom?: boolean
  fillColor?: string
  r?: number
}
// canvas 绘制自定义圆角矩形
export function drawRoundedRect(ctx: any, x: number, y: number, w: number, h: number, params?: DrawRoundedRectParamsType) {
  const {
    leftTop = false,
    leftBottom = false,
    rightTop = false,
    rightBottom = false,
    fillColor = 'transparent',
    r = 0,
  } = params || {}
  ctx.save() // 保存当前绘图状态 防止虚线影响其他图形
  ctx.beginPath()
  ctx.setFillStyle(fillColor)
  ctx.setStrokeStyle('transparent')
  ctx.moveTo(x + r, y)
  // 绘制上边线和左上角圆弧
  if (leftTop) {
    ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)
    ctx.lineTo(x, y)
  }
  else {
    ctx.moveTo(x, y + r)
    ctx.lineTo(x, y)
    ctx.lineTo(x + r, y)
  }
  ctx.lineTo(x + w - r, y)
  // 绘制上边线和右上角圆弧
  if (rightTop) {
    ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)
  }
  else {
    ctx.lineTo(x + w - r, y)
    ctx.lineTo(x + w, y)
    ctx.lineTo(x + w, y + r)
  }

  ctx.lineTo(x + w, y + h - r)

  // 绘制下边线和右下角圆弧
  if (rightBottom) {
    ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)
  }
  else {
    ctx.lineTo(x + w, y + h - r)
    ctx.lineTo(x + w, y + h)
    ctx.lineTo(x + w - r, y + h)
  }

  ctx.lineTo(x + r, y + h)

  // 绘制下边线和左下角圆弧
  if (leftBottom) {
    ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)
  }
  else {
    ctx.lineTo(x + r, y + h)
    ctx.lineTo(x, y + h)
    ctx.lineTo(x, y + h - r)
  }

  ctx.lineTo(x, y + r)

  // 绘制左边线和左上角圆弧
  if (leftTop) {
    ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)
    ctx.moveTo(x + r, y)
  }
  else {
    ctx.moveTo(x, y + r)
    ctx.lineTo(x, y)
    ctx.lineTo(x + r, y)
  }
  ctx.fill()
  ctx.closePath()
  ctx.stroke()
  ctx.restore() // 恢复之前的绘图状态
}
interface DrawTextConfigType {
  ctx: any
  fillStyle: string// 填充颜色
  fontSize: number// 文字大小
  text: string// 在画布上输出的文本
  x: number// 绘制文本的左上角x坐标位置
  y: number// 绘制文本的左上角y坐标位置
  center?: boolean
  fontWeight?: string
  fontFamily?: string
}
// 绘制文本
export function drawText(config: DrawTextConfigType) {
  const { fillStyle, fontSize, x, y, text, ctx, center = false, fontWeight = 'normal', fontFamily = 'PingFang SC' } = config
  ctx.setFillStyle(fillStyle)
  ctx.setFontSize(fontSize)

  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`
  if (center) {
    ctx.textAlign = 'center'// 文字水平居中
  }
  ctx.fillText(text, x, y)
}

interface DrawClipConfigType {
  ctx: any
  x: number// 绘制文本的左上角x坐标位置
  y: number// 绘制文本的左上角y坐标位置
  r: number// 圆形半径
  imgUrl: any// 图片地址
}
// 绘制文本
export function drawClip(config: DrawClipConfigType) {
  const { x, y, ctx, r, imgUrl } = config

  ctx.save() // 保存当前绘图上下文
  ctx.beginPath()
  ctx.arc(x + r, y + r, r, 0, Math.PI * 2) // 定义圆形路径
  ctx.clip() // 裁剪圆形区域

  // 在裁剪区域内绘制头像图片
  ctx.drawImage(imgUrl, x, y, r * 2, r * 2)

  ctx.restore() // 恢复绘图上下文
}
// 获取当前设备信息
export function getSystemInfo() {
  return new Promise((resolve) => {
    uni.getSystemInfo({
      success(res) {
        resolve(res)
      },
    })
  })
}
