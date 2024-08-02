import axios from 'axios'
import { useAppStore } from '../app'
import { socket } from '../actions/user'
import { Chat } from '../../classes'
// Configs
axios.defaults.baseURL =
  process.env.NODE_ENV == 'production' && window.location.hostname !== 'localhost'
    ? 'https://www.kingchat.one/api'
    : 'http://localhost:3000/api'

export function useChat() {
  const store = useAppStore()

  function sortChats() {
    const chats = store.chats
    const recent = store.recent
    console.log('Sorting Chats')

    // Sort Recent Active Users
    if (!store.app.isInitialized)
      for (let [index, user] of recent.entries())
        recent[index].chatid = [store.user.uid, user.profile._id].sort().join('')

    // Sort Main Chats
    for (let [index, chat] of chats.entries()) {
      chat.messages.sort((a, b) => a.time - b.time)

      chat.lastMessage = {
        message: chat.messages[chat.messages.length - 1].text,
        time: chat.messages[chat.messages.length - 1].time,
        displayTime: store.formatTimeDisplay(chat.messages[0].time)
      }

      chat.unread = 4

      chats[index] = chat
    }
    chats.sort((a, b) => b.lastMessage.time - a.lastMessage.time)

    // chats = updateDeliveryTimeDisplay(chats)
    store.$patch({ chats })
    store.$patch({ recent })
  }

  async function message({ chatid, message }) {
    console.log(chatid, message)

    let chatIndex = store.chats.findIndex((chat) => chat._id == chatid)
    let uid = store.user.uid

    if (chatIndex < 0) {
      let chat = new Chat(
        chatid,
        message,
        await store.getProfile(chatid.split(uid).find((id) => id.length > 0))
      )

      chat.lastMessage.displayTime = store.formatTimeDisplay(chat.lastMessage.time)
      store.chats.push(chat)
    } else {
      store.chats[chatIndex].messages.push(message)
      store.chats[chatIndex].lastMessage = {
        time: message.time,
        message: message.text,
        displayTime: store.formatTimeDisplay(message.time)
      }
    }

    socket.emit(
      'reciept',
      { uid, chatid, reciept: { lastDelivered: Date.now() } },
      ({ chatid, reciept }) => updateReciept(chatid, reciept)
    )
  }

  function formatTimeDisplay(timestamp) {
    let displayTime
    let datetime = new Date(timestamp)
    let hours = datetime.getHours()
    let minutes = datetime.getMinutes()
    let ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12 // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    switch (true) {
      // 24 Hours
      case timestamp + 86400000 > Date.now():
        displayTime = `${hours}:${minutes} ${ampm}`
        break
      // Yesterday
      case timestamp + 86400000 * 2 > Date.now():
        displayTime = `Yesterday`
        break
      // Day
      case timestamp + 86400000 * 3 > Date.now():
        displayTime = days[datetime.getDay()]
        break
      // Date
      default:
        datetime = new Date(timestamp)
        displayTime = `${datetime.getMonth()}/${datetime.getDate()}/${datetime.getFullYear().toString().substr(-2)}`
        break
    }

    return displayTime
  }

  function send(payload, message) {
    const chatid = payload.chatid
    const uid = store.user.uid
    const type = payload.type

    switch (type) {
      case 'Chat':
        sendToPrivateChat(chatid, message, uid)
        break
      case 'Room':
        sendToRoomChat(chatid, message, uid)
        break
      default:
        console.error('Message Type Unknown')
    }
  }

  function sendToPrivateChat(chatid, message, uid) {
    socket.emit('send', { chatid, message, uid }, async (chatid, { message, reciept }) => {
      let chatIndex = store.chats.findIndex((chat) => chat._id == chatid)

      if (chatIndex < 0) {
        let chat = new Chat(
          chatid,
          message,
          await store.getProfile(chatid.split(store.user.uid).find((id) => id.length > 0))
        )
        chat.lastMessage.displayTime = store.formatTimeDisplay(chat.lastMessage.time)
        store.chats.push(chat)
      } else {
        store.chats[chatIndex].messages.push(message)
        store.chats[chatIndex].lastMessage = {
          time: message.time,
          message: message.text,
          displayTime: store.formatTimeDisplay(message.time)
        }
      }

      store.chats.sort((a, b) => b.lastMessage.time - a.lastMessage.time)

      updateReciept(chatid, reciept)
    })

    // Update Message Length
    // (This is to track new messages delivered by their lenght)
    let reciepts = JSON.parse(sessionStorage.getItem('reciepts'))
    let recieptIndex = reciepts.findIndex((reciept) => reciept.id == chatid)

    reciepts[recieptIndex].length++
    sessionStorage.setItem('reciepts', JSON.stringify(reciepts))
  }

  function updateReciept(chatid, reciept) {
    let chatIndex = store.chats.findIndex((chat) => chat._id == chatid)

    Object.assign(store.chats[chatIndex].meta[store.user.uid], reciept)
  }

  function sendToRoomChat(chatid, message) {
    chatid, message
  }

  function sendReciept(chatid, reciept) {
    const uid = store.user.uid

    socket.emit('reciept', { uid, chatid, reciept }, ({ chatid, reciept }) => {
      let chatIndex = store.chats.findIndex((chat) => chat._id == chatid)

      if (chatIndex) {
        if (reciept.lastRead) {
          store.chats[chatIndex].meta[store.user.uid].lastRead = reciept.lastRead
        }
      }
    })

    console.log(chatid)
  }

  function sendChatDeliveryReciepts() {
    const chats = store.chats
    const lastDelivered = Date.now()

    let reciepts = JSON.parse(sessionStorage.getItem('reciepts'))
    console.log(reciepts)

    chats.forEach(({ _id, messages }) => {
      let chatInfoIndex = reciepts.findIndex((reciept) => reciept.id == _id)

      if (chatInfoIndex < 0) {
        reciepts.push({
          id: _id,
          length: messages.length
        })

        sendReciept(_id, { lastDelivered })
      }

      if (chatInfoIndex >= 0) {
        if (messages.length > reciepts[chatInfoIndex].length) sendReciept(_id, { lastDelivered })

        reciepts[chatInfoIndex] = {
          id: _id,
          length: messages.length
        }
      }

      sessionStorage.setItem('reciepts', JSON.stringify(reciepts))
    })
  }

  return {
    send,
    sendToPrivateChat,
    sendToRoomChat,
    sortChats,
    formatTimeDisplay,
    sendReciept,
    sendChatDeliveryReciepts,
    message
  }
}
