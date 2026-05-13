import { onUnmounted, ref } from 'vue'

/**
 * WebSocket 配置参数类型
 */
interface WebSocketOptions {
  url: string // WebSocket服务端地址
  protocols?: string | string[] // 可选，协议
  onOpen?: (res: UniApp.OnSocketOpenCallbackResult) => void // 连接成功回调
  onMessage?: (msg: UniApp.OnSocketMessageCallbackResult) => void // 收到消息回调
  onError?: (err: UniApp.GeneralCallbackResult) => void // 连接错误回调
  onClose?: (res: any) => void // 连接关闭回调
  heartbeatMsg?: string // 心跳包内容（默认 'ping'）
  heartbeatInterval?: number // 心跳间隔（毫秒，默认 30000）
}

/**
 * 全局 WebSocket hooks 封装，带心跳检测
 * @param options WebSocket配置参数
 * @returns WebSocket相关响应式数据和方法
 */
export function useWebSocket(options: WebSocketOptions) {
  // 是否已连接
  const isConnected = ref(false)
  // 最新收到的消息
  const message = ref<any>(null)
  // WebSocket任务对象
  let socketTask: UniApp.SocketTask | null = null
  // 心跳定时器
  let heartbeatTimer: ReturnType<typeof setInterval> | null = null

  /**
   * 建立 WebSocket 连接
   */
  function connect() {
    socketTask = uni.connectSocket({
      url: options.url,
      protocols: options.protocols ? (Array.isArray(options.protocols) ? options.protocols : [options.protocols]) : undefined,
      success: () => {},
      fail: (err) => {
        options.onError?.(err)
      },
    })

    // 监听连接成功
    socketTask.onOpen((res) => {
      isConnected.value = true
      options.onOpen?.(res)
      startHeartbeat() // 连接成功后启动心跳
    })

    // 监听收到消息
    socketTask.onMessage((msg) => {
      message.value = msg.data
      options.onMessage?.(msg)
    })

    // 监听连接错误
    socketTask.onError((err) => {
      isConnected.value = false
      options.onError?.(err)
      stopHeartbeat() // 断开时停止心跳
    })

    // 监听连接关闭
    socketTask.onClose((res) => {
      isConnected.value = false
      options.onClose?.(res)
      stopHeartbeat() // 断开时停止心跳
    })
  }

  /**
   * 启动心跳检测
   */
  function startHeartbeat() {
    stopHeartbeat() // 防止重复启动
    const interval = options.heartbeatInterval ?? 30000 // 默认30秒
    heartbeatTimer = setInterval(() => {
      if (isConnected.value && socketTask) {
        send(options.heartbeatMsg ?? 'ping')
      }
    }, interval)
  }

  /**
   * 停止心跳检测
   */
  function stopHeartbeat() {
    if (heartbeatTimer) {
      clearInterval(heartbeatTimer)
      heartbeatTimer = null
    }
  }

  /**
   * 发送消息到服务端
   * @param data 消息内容（字符串或二进制）
   */
  function send(data: string | ArrayBuffer) {
    if (isConnected.value && socketTask) {
      socketTask.send({ data })
    }
  }

  /**
   * 主动关闭 WebSocket 连接
   * @param code 可选，关闭码
   * @param reason 可选，关闭原因
   */
  function close(code?: number, reason?: string) {
    if (socketTask) {
      socketTask.close({ code, reason })
    }
    stopHeartbeat()
  }

  // 组件卸载时自动关闭连接，避免内存泄漏
  onUnmounted(() => {
    close()
  })

  // 自动建立连接
  connect()

  // 返回响应式数据和方法
  return {
    isConnected, // 连接状态
    message, // 最新消息
    send, // 发送消息方法
    close, // 关闭连接方法
  }
}
