import { useAppStore } from '../..'

const initRoomsSocket = (socket) => {
  socket.on('connect', () => socket.emit('init'))

  socket.on('init', (data) => {
    console.log('Live Data:', data)
  })

  socket.on('send', (data) => {
    console.log(data)
  })

  socket.on('online', ({ online }) => {
    const store = useAppStore()

    // Populate Online Users
    store.online = online = online
      .filter(
        (profile, index, onlineArray) =>
          onlineArray.map((account) => account._id).indexOf(profile._id) == index
      )
      .filter((profile) => profile._id !== store.user.uid)
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
}

export default initRoomsSocket