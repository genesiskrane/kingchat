import axios from 'axios'
import { useAppStore } from '..'

// Configs
axios.defaults.baseURL =
  process.env.NODE_ENV == 'production' && window.location.hostname !== 'localhost'
    ? 'https://www.kingchat.one/api'
    : 'http://localhost:3000/api'

class Room {
  constructor(data) {
    Object.assign(this, data)
  }
}

export function useRoom() {
  const store = useAppStore()

  // Rooms
  async function openRoom(to) {
    const roomID = to.query.id
    let room = null

    try {
      let { data } = await axios.get('/rooms/enter-room', {
        params: { uid: store.user.uid, roomID }
      })
      console.log(data.messages)
      room = new Room(data)
    } catch (error) {
      console.log(error)
    }

    store.$patch({ rooms: { active: room } })
    store.sockets.room.emit('enterRoom', { id: room.id, number: room.number })
    // sortChats()

    return
  }

  function sendToRoomChat(chatid, message, uid) {
    console.log('ahha', message)

    store.sockets.room.emit('send', chatid, message, uid)
  }

  function sendToPrivateChat(chatid, message, uid) {
    store.sockets.room.emit('send', { chatid, message, uid }, async (chatid, { message, reciept }) => {
      let chatIndex = store.chats.findIndex((chat) => chat._id == chatid)

      store.chats[chatIndex].messages.push(message)
      store.chats[chatIndex].lastMessage = {
        time: message.time,
        message: message.text,
        displayTime: store.formatTimeDisplay(message.time)
      }

      store.chats.sort((a, b) => b.lastMessage.time - a.lastMessage.time)
    })

    // Update Message Length
    // (This is to track new messages delivered by their length)
    let reciepts = JSON.parse(sessionStorage.getItem('reciepts'))
    let recieptIndex = reciepts.findIndex((reciept) => reciept.id == chatid)

    if (recieptIndex >= 0) reciepts[recieptIndex].length++
    else reciepts.push({ id: chatid, length: 1 })
    sessionStorage.setItem('reciepts', JSON.stringify(reciepts))
  }

  return {
    openRoom,
    sendToRoomChat
  }
}
