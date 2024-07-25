import axios from 'axios'
import { useAppStore } from '../app'

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
      chat.messages.sort((a, b) => b.time - a.time)

      chat.lastMessage = {
        message: chat.messages[0].text,
        time: chat.messages[0].time,
        displayTime: formatTimeDisplay(chat.messages[0].time)
      }

      chat.unread = 4

      chats[index] = chat
    }
    chats.sort((a, b) => b.lastMessage.time - a.lastMessage.time)

    // chats = updateDeliveryTimeDisplay(chats)
    store.$patch({ chats })
    store.$patch({ recent })
  }

  function formatTimeDisplay(timestamp) {
    // for (let [index, chat] of chats.entries()) {

    let displayTime
    let datetime = new Date(timestamp)
    console.log(datetime.getDay())
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
      // A Day
      case timestamp + 86400000 * 2 > Date.now():
        displayTime = `Yesterday`
        break
      case timestamp + 86400000 * 3 > Date.now():
        displayTime = days[datetime.getDay()]
        break
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
    store.socket.emit('send', { chatid, message, uid })
    console.log('Sent', chatid, message)
  }

  function sendToRoomChat(chatid, message) {}

  return {
    send,
    sendToPrivateChat,
    sendToRoomChat,
    sortChats
  }
}
