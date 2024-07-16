import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { auth, signInWithEmailAndPassword, signOut, storage, ref, uploadBytes } from '../firebase'
import router from '../router'
import axios from 'axios'

axios.defaults.baseURL =
  process.env.NODE_ENV == 'production' ? 'https://kingchat.one' : 'http://localhost:3000/api'

console.log(axios.defaults.baseURL)
export const useAppStore = defineStore('app', () => {
  let app = reactive({
    name: 'King Chat',
    user: {}
  })

  async function init() {
    console.log('App Initialized')

    let user = JSON.parse(sessionStorage.getItem('user'))
    app.user = user

    return
  }

  async function login(data) {
    if (data.id.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}$/)) {
      // This block is for email attempts
      try {
        let { user } = await signInWithEmailAndPassword(auth, data.id, data.password)
        app.user = user
        return user
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
        return user
      } catch (error) {
        if (error.response) return error.response.data.split('/')[1]
        console.log(error)
      }
    }
  }

  async function signup(data) {
    console.log('Sign Up Data:', data)
    try {
      let response = await axios.post('/auth/signup', data)

      console.log(response)
      app.user = response.data
      return response
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

  async function createPassword(password) {
    try {
      let { data } = await axios.post('/auth/create-password', {
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

    let { data } = await axios.post('/auth/update-profile-photo-image', {
      uid,
      imgURL
    })

    await initUser()

    return data
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
    updateUsername
  }
})
