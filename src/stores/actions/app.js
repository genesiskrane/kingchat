import axios from 'axios'
import router from '../../router'
import { useAppStore } from '..'

// Configs
axios.defaults.baseURL =
  process.env.NODE_ENV == 'production' && window.location.hostname !== 'localhost'
    ? 'https://www.kingchat.one/api'
    : 'http://localhost:3000/api'

function useApp() {
  const store = useAppStore()

  async function init() {
    console.log('App Initializing')

    // Initialize Chat Reciepts
    const chatReciepts = sessionStorage.getItem('reciepts')
    if (!chatReciepts) sessionStorage.setItem('reciepts', JSON.stringify([]))

    // Get User Data
    store.$patch({ user: { uid: JSON.parse(sessionStorage.getItem('uid')) } })
    if (!store.user.uid) return router.push('/auth/login')

    // Initialize Socket
    store.initSockets(store.user.uid)

    if (!store.app.isInitialized) await store.initUser()

    console.log('App Initialized')
    return
  }

  async function getProfile(uid) {
    console.log(uid)
    try {
      let { data } = await axios.get(`/app/getProfile?uid=${uid}`)
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  function send(payload, message) {
    const chatid = payload.chatid
    const uid = store.user.uid
    const type = payload.type

    switch (type) {
      case 'Chat':
        store.sendToPrivateChat(chatid, message, uid)
        break
      case 'Room':
        store.sendToRoomChat(chatid, message, uid)
        break
      default:
        console.error('Message Type Unknown')
    }
  }

  return {
    init,
    getProfile,
    send
  }
}

export { useApp }
