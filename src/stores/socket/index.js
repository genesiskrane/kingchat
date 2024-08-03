import { useAppStore } from '../app'

function initSockets(socket) {
  socket.on('message', (chatid, message) => {
    const store = useAppStore()
    store.message(chatid, message)
  })

  socket.on('reciept', ({ chatid, reciept }) => {
    const store = useAppStore()
    const uid = store.user.uid
    const splitChatID = chatid.split(uid)
    // let senderID = uid
    let receiverID = splitChatID.find((id) => id.length > 0)

    let chatIndex = store.chats.findIndex((chat) => chat._id == chatid)

    console.log(chatid, reciept, chatIndex)
    if (chatIndex > -1) console.log(chatid, reciept, chatIndex)
    if (reciept.lastDelivered)
      store.chats[chatIndex].meta[receiverID].lastDelivered = reciept.lastDelivered
    if (reciept.lastRead) store.chats[chatIndex].meta[receiverID].lastRead = reciept.lastRead
  })
}

export { initSockets }
