import { useAppStore } from '../app'
import { Chat } from '../../classes'

export function initSocket(socket) {
  socket.on('sent', async ({ chatid, message }) => {
    const store = useAppStore()
    console.log(chatid, message)
    let chatIndex = store.chats.findIndex((chat) => chat._id == chatid)

    console.log(chatIndex)
    if (chatIndex < 0)
      store.chats.push(
        new Chat(
          chatid,
          message,
          await store.getProfile(chatid.split(store.user.uid).find((id) => id.length > 0))
        )
      )
    else {
      store.chats[chatIndex].messages.push(message)
      store.chats[chatIndex].lastMessage = {
        time: message.time,
        message: message.text
      }
      console.log('New Message', message)
    }

    store.chats.sort((a, b) => b.lastMessage.time - a.lastMessage.time)
    console.log(store.chats)
  })

  return socket
}
