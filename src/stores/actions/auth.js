import { auth as FBAuth, signInWithEmailAndPassword, signOut } from '../../func/firebase'
import axios from 'axios'
import router from '../../router'
import { useAppStore } from '..'

// Configs
axios.defaults.baseURL =
  process.env.NODE_ENV == 'production' && window.location.hostname !== 'localhost'
    ? 'https://www.kingchat.one/api'
    : 'http://localhost:3000/api'

export function useAuth() {
  const store = useAppStore()

  async function login(data) {
    if (data.id.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}$/)) {
      // This block is for email attempts
      try {
        let userRecord = await signInWithEmailAndPassword(FBAuth, data.id, data.password)
        store.$patch({ user: { uid: userRecord.user.uid } })
        store.app.isLoggedIn = true

        await store.initUser()

        return true
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
        let userRecord = await signInWithEmailAndPassword(FBAuth, email, data.password)
        store.$patch({ user: { uid: userRecord.user.uid } })
        store.app.isLoggedIn = true

        await store.initUser()

        return true
      } catch (error) {
        console.log(error)
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

      await this.login(data)

      delete store.user.auth

      return store.user
    } catch (error) {
      console.log(error)
    }
  }

  async function logout() {
    await signOut(FBAuth)
    router.push('/games')
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

  async function generateRecoveryCode(id) {
    try {
      let { data } = await axios.post('/auth/generate-recovery-code', { id })
      if (data.uid) store.$patch({ user: { ...data } })
      else return false
      return true
    } catch (error) {
      return error
    }
  }

  return {
    login,
    signup,
    logout,
    verifyUsername,
    createPassword,
    verifyEmail,
    verifyOTP,
    generateRecoveryCode
  }
}
