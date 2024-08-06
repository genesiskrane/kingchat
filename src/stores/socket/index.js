import { useAppStore } from '../app'

function initSockets(socket) {
  socket.on('connect', () => socket.emit('init'))

  socket.on('init', (data) => {
    console.log('Live Data:', data)
  })

  socket.on('online', ({ online }) => {
    const store = useAppStore()

    // Populate Online Users
    store.online = online = online
      .filter(
        (profile, index, onlineArray) =>
          onlineArray.map((account) => account._id).indexOf(profile._id) == index
      )
      .filter((profile)=>profile._id !== store.user.uid)
      .map((profile) => ({
        chatid: [store.user.uid, profile._id].sort().join(''),
        profile
      }))

    // Remove Found Online Users From Recent Users
    store.recent = store.recent.filter(({ profile }) => {
      let uid = profile._id
      let account = online.find(({ profile }) => profile._id == uid)
      if (!account) return true
    })
  })

  socket.on('message', (chatid, message) => {
    const store = useAppStore()
    store.message(chatid, message)
  })

  socket.on('reciept', ({ chatid, reciept }) => {
    const store = useAppStore()
    const uid = store.user.uid
    const splitChatID = chatid.split(uid)
    let senderID = uid
    let receiverID = splitChatID.find((id) => id.length > 0)

    let chatIndex = store.chats.findIndex((chat) => chat._id == chatid)

    console.log(chatid, reciept, chatIndex)
    if (chatIndex > -1) console.log(chatid, reciept, chatIndex)
    if (reciept.lastDelivered)
      store.chats[chatIndex].meta[senderID].lastDelivered = reciept.lastDelivered
    if (reciept.lastRead) store.chats[chatIndex].meta[receiverID].lastRead = reciept.lastRead
  })
}

export { initSockets }
