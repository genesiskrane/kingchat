import axios from 'axios'

import './assets/css/main.css'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

import { auth, onAuthStateChanged } from './firebase'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from './router'

import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

axios.defaults.baseURL =
  process.env.NODE_ENV == 'production' && window.location.hostname !== 'localhost'
    ? 'https://www.kingchat.one/api'
    : 'http://localhost:3000/api'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi' // This is already the default value - only for display purposes
  }
})

onAuthStateChanged(auth, async (user) => {
  console.log(user)
  if (user) {
    try {
      let { data } = await axios.post('/auth/get-user', { uid: user.uid })
      user = { ...user, ...data }
    } catch (error) {
      console.log(error)
    }
  }
  sessionStorage.setItem('user', JSON.stringify(user))

  const app = createApp(App)

  app.use(vuetify)
  app.use(createPinia())
  app.use(router)

  app.mount('#app')
})
