import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { auth, signInWithEmailAndPassword, signOut } from '../firebase'
import router from '../router'
import axios from 'axios'

export const useAppStore = defineStore('app', () => {
  let app = reactive({
    name: 'King Chat',
    user: {}
  })

  function init() {
    console.log('App Initialized')
    let user = JSON.parse(sessionStorage.getItem('user'))
    console.log(user)
    app.user = user
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
        let result = await axios.post('http://localhost:3000/api/auth/login', {
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
      let response = await axios.post('http://localhost:3000/api/auth/signup', data)

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
      let response = await axios.post('http://localhost:3000/api/auth/verify-email', { email })
      return response
    } catch (error) {
      return error
    }
  }
  async function verifyOTP(data) {
    try {
      let result = await axios.post('http://localhost:3000/api/auth/verify-otp', data)

      return result.data
    } catch (error) {
      return error.message
    }
  }

  async function initUser() {
    console.log('Getting All User Data')
  }
  return { app, init, login, signup, logout, verifyEmail, verifyOTP, initUser }
})
