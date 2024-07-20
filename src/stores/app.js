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

class Room {
  constructor(data) {
    Object.assign(this, data)
  }
}

const getAppConfig = async (id) => {
  // Get App Data
  let { data } = await axios.get('/app', { params: { id } })
  return data
}

export const useAppStore = defineStore('app', () => {
  let app = reactive({
    name: 'King Chat',
    user: {},
    rooms: { active: '', all: [] }
  })

  async function init() {
    console.log('App Initialized')

    // Get User Data
    let user = JSON.parse(sessionStorage.getItem('user'))
    app.user = user

    // Get App Data
    let appConfig = await getAppConfig(app.user.id)
    app = Object.assign(app, appConfig)

    console.log(app)
    return
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

  async function initUser() {
    console.log('Reinitializing User Data')

    let { data } = await axios.post('/auth/get-user', {
      uid: app.user.uid
    })

    let user = data
    app.user = user

    console.log(app)
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

  function sendToRoom(message) {
    console.log(message)
  }

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
    sendToRoom
  }
})
