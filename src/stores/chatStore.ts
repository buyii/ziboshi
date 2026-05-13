import { defineStore } from 'pinia'

interface MessagesType {
  id: number
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export const useChatStore = defineStore(
  'chat',
  () => {
    const useChatData = ref({
      messages: ref<MessagesType[]>([]),
    })

    const receiveMessage = (text: string) => {
      const newMessage: MessagesType = {
        id: useChatData.value.messages.length + 1,
        text,
        sender: 'bot',
        timestamp: new Date(),
      }
      useChatData.value.messages.push(newMessage)
    }

    const sendMessage = (text: string) => {
      console.log('Sending message:', text)
      const newMessage: MessagesType = {
        id: useChatData.value.messages.length + 1,
        text,
        sender: 'user',
        timestamp: new Date(),
      }
      useChatData.value.messages.push(newMessage)
      console.log('Messages:', useChatData.value.messages)
      // Simulate bot response
      setTimeout(() => {
        receiveMessage(`内容文字示意内容文字示意内容文字示意内容文字示意内容文字示意内容文字示意内容示意内容文字示意内容文字示意内容文字示意内容文字示意内容文字示意内容文字示意内容文字示意内容文字示意内容文字示意内容文字示意内容文字示意内容文字示意内容文字示意`)
      }, 1000)
    }

    return {
      useChatData,
      sendMessage,
    }
  },
  {
    persist: true,
  },
)

// export const useChatStore = defineStore('chat', {
//   state: () => ({
//     messages: ref<MessagesType[]>([]),
//   }),
//   actions: {
//     sendMessage(text: string) {
//       console.log('Sending message:', text)
//       const newMessage: MessagesType = {
//         id: this.messages.length + 1,
//         text,
//         sender: 'user',
//         timestamp: new Date(),
//       }
//       this.messages.push(newMessage)
//       console.log('Messages:', this.messages)
//       // Simulate bot response
//       setTimeout(() => {
//         this.receiveMessage(`Echo: ${text}`)
//       }, 1000)
//     },
//     receiveMessage(text: string) {
//       const newMessage: MessagesType = {
//         id: this.messages.length + 1,
//         text,
//         sender: 'bot',
//         timestamp: new Date(),
//       }
//       this.messages.push(newMessage)
//     },
//   },
// })
