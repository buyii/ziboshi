// ./utils/index.ts
export interface ImageListType {
  id: number
  name: string
  desc: string
  imageSrc: string
  bgColor: string
  pageColor: string
}
export const imageList: ImageListType[] = [
  {
    id: 0,
    name: '那维莱特',
    desc: '潮水啊，我已归来！',
    imageSrc: '../static/logo.jpg',
    bgColor: 'rgba(255,255,255,0.85)',
    pageColor: '#d9e9ff',
  },
]
