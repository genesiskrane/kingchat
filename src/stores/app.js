import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { auth, signInWithEmailAndPassword, signOut, storage, ref, uploadBytes } from '../firebase'
import router from '../router'
import axios from 'axios'
import { io } from 'socket.io-client'

// Configs
axios.defaults.baseURL =
  process.env.NODE_ENV == 'production' && window.location.hostname !== 'localhost'
    ? 'https://www.kingchat.one/api'
    : 'http://localhost:3000/api'

const ioURL =
  process.env.NODE_ENV == 'production' && window.location.hostname !== 'localhost'
    ? 'https://www.kingchat.one/'
    : 'http://localhost:3000/'

const socket = io(ioURL)
const roomsSocket = io(`${ioURL}rooms`)

class Chat {
  constructor(payload) {
    Object.assign(this, payload)
  }
}

class User {}
class Room {
  constructor(data) {
    Object.assign(this, data)
  }
}

socket.on('message', (payload) => {
  const store = useAppStore()
  const { chatid, message } = payload

  let chatIndex = store.app.chats.findIndex((chat) => chat.id == chatid)

  if (chatIndex < 0) store.app.chats.push(new Chat(payload))
  else {
    store.app.chats[chatIndex].message = message
    console.log(chatIndex)
    console.log('New Message', message)
  }

  store.app.chats.sort((a, b) => b.lastMessage.time - a.lastMessage.time)
  console.log(store.app.chats)
})

const getAppConfig = async (id) => {
  // Get App Data
  let { data } = await axios.get('/app', { params: { id } })
  return data
}

const updateDeliveryTimeDisplay = (chats) => {
  for (let [index, chat] of chats.entries()) {
    const timestamp = chat.lastMessage.time

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

    chats[index].lastMessage.displayTime = displayTime
  }
  return chats
}

const sortChats = (chats) => {
  console.log('Sorting Chats')

  for (let [index, chat] of chats.entries()) {
    chat.messages.sort((a, b) => b.time - a.time)

    chat.lastMessage = {
      message: chat.messages[0].text,
      time: chat.messages[0].time
    }
    chat.unread = 4

    chats[index] = chat
  }

  return chats
}

const useAppStore = defineStore('app', () => {
  let app = reactive({
    name: 'King Chat',
    user: {},
    chats: [],
    online: [],
    rooms: { active: '', all: [] },
    isInitialized: false
  })

  async function init() {
    console.log('App Initialized')

    // Get User Data
    let user = JSON.parse(sessionStorage.getItem('user'))
    if (user) app.user = user
    else return router.push('/auth/login')

    console.log('Getting User Data')
    // Get App Data
    let { online, chats, rooms } = await getAppConfig(app.user.uid)
    chats = sortChats(chats)
    chats = updateDeliveryTimeDisplay(chats)
    for (let [index, user] of online.entries())
      online[index].chatid = [app.user.uid, user._id].sort().join('')

    app.online = online
    app.chats = chats
    app.rooms = rooms

    app.isInitialized = true

    console.log(app)

    return
  }

  async function initUser() {
    console.log('Reinitializing User Data')
    if (app.user.uid) {
      let { data } = await axios.post('/auth/get-user', {
        uid: app.user.uid
      })
      let user = data
      app.user = user
      console.log(app)
    } else console.log('No User Authenticated')
  }

  async function login(data) {
    if (data.id.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}$/)) {
      // This block is for email attempts
      try {
        let { user } = await signInWithEmailAndPassword(auth, data.id, data.password)
        app.user = user

        await initUser()

        return app.user
      } catch (error) {
        let message = error.message
          .substring(error.message.indexOf('(') + 1, error.message.indexOf(')'))
          .split('/')[1]
        return message
      }
    } else {
      // This block is for username attemts
      try {
        let result = await axios.post('/auth/login', {
          username: data.id
        })
        let email = result.data.email
        let { user } = await signInWithEmailAndPassword(auth, email, data.password)
        app.user = user

        await initUser()

        return user
      } catch (error) {
        let message = error.message
          .substring(error.message.indexOf('(') + 1, error.message.indexOf(')'))
          .split('/')[1]

        return message
      }
    }
  }

  async function signup(data) {
    console.log('Sign Up Data:', data)
    try {
      await axios.post('/auth/signup', data)

      data.id = data.email
      data.password = '12345678'

      await login(data)

      delete app.user.auth

      return app.user
    } catch (error) {
      console.log(error)
    }
  }

  async function logout() {
    await signOut(auth)
    router.push('/auth/login')
  }

  async function verifyEmail(email) {
    try {
      let response = await axios.post('/auth/verify-email', { email })
      return response
    } catch (error) {
      return error
    }
  }

  async function verifyOTP(data) {
    try {
      let result = await axios.post('/auth/verify-otp', data)

      return result.data
    } catch (error) {
      return error.message
    }
  }

  async function verifyUsername(username) {
    try {
      let { data } = await axios.post('/auth/verify-username', {
        username
      })
      return data
    } catch (error) {
      return error
    }
  }

  async function createPassword(uid, password) {
    try {
      let { data } = await axios.post('/auth/create-password', {
        uid,
        password
      })
      return data
    } catch (error) {
      return error.message
    }
  }

  async function updateUsername(uid, username) {
    try {
      let isUsernameUpdated = await axios.post('/auth/update-username', {
        uid,
        username
      })
      initUser()
      return isUsernameUpdated
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async function upload(file, imgPath) {
    const imgRef = ref(storage, imgPath)
    const snapshot = await uploadBytes(imgRef, file)

    let bucket = snapshot.metadata.bucket
    let path = snapshot.metadata.fullPath
    let imgURL = `https://storage.googleapis.com/${bucket}/${path}`
    return imgURL
  }

  async function updateProfilePhotoImage(uid, imgURL) {
    app.user.photoURL = imgURL

    try {
      let { data } = await axios.post('/auth/update-profile-photo-image', {
        uid,
        imgURL
      })
      await initUser()
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async function generateRecoveryCode(id) {
    try {
      let { data } = await axios.post('/auth/generate-recovery-code', { id })
      if (data.uid) app.user = { ...data }
      else return false
      return true
    } catch (error) {
      return error
    }
  }

  // Rooms
  async function openRoom(to) {
    const roomID = to.query.id
    let room = null

    if (app.user) {
      let { data } = await axios.get('/rooms/enter-room', {
        params: { uid: app.user.uid, roomID }
      })
      room = new Room(data)
    }

    app.rooms.active = room
    return
  }

  function send(payload, message) {
    const chatid = payload.chatid
    const uid = app.user.uid
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

  // function sendAsNewChat(chatid, message, uid) {
  //   console.log('New Chat', chatid)
  //   socket.emit('message', { chatid, message })
  // }

  function sendToPrivateChat(chatid, message, uid) {
    socket.emit('message', { chatid, message, uid })
    console.log('New Chat', chatid)
  }

  function sendToRoomChat(chatid, message) {}
  return {
    app,
    init,
    login,
    signup,
    logout,
    verifyEmail,
    verifyUsername,
    verifyOTP,
    createPassword,
    initUser,
    upload,
    updateProfilePhotoImage,
    updateUsername,
    generateRecoveryCode,
    openRoom,
    send
  }
})

export { useAppStore }
