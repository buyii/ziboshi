import { defineStore } from 'pinia'

export const useMsgStore = defineStore(
  'msg',
  () => {
    const messages = ref<any[]>([])

    const setMessagesAll = (val: any) => {
      messages.value = val
    }

    const setMessages = (val: any) => {
      messages.value = [val, ...messages.value]
    }

    const clearMessages = () => {
      messages.value = []
    }

    return {
      messages,
      setMessages,
      clearMessages,
      setMessagesAll,
    }
  },
  {
    persist: true,
  },
)
