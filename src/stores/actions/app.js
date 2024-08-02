import axios from 'axios'
import router from '../../router'
import { useAppStore } from '../app'

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

export function useApp() {
  const store = useAppStore()

  async function init() {
    console.log('App Initializing')

    // Initialize Chat Reciepts
    const chatReciepts = sessionStorage.getItem('reciepts')
    if (!chatReciepts) sessionStorage.setItem('reciepts', JSON.stringify([]))

    // Get User Data
    store.$patch({ user: { uid: JSON.parse(sessionStorage.getItem('uid')) } })
    if (!store.user.uid) return router.push('/auth/login')

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
  // Rooms
  async function openRoom(to) {
    const roomID = to.query.id
    let room = null

    try {
      let { data } = await axios.get('/rooms/enter-room', {
        params: { uid: store.user.uid, roomID }
      })
      room = new Room(data)
    } catch (error) {
      console.log(error)
    }

    store.$patch({ rooms: { active: room } })
    return
  }

  return {
    init,
    getProfile,

    // Rooms
    openRoom
  }
}

