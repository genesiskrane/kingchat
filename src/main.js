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

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi' // This is already the default value - only for display purposes
  }
})

onAuthStateChanged(auth, (user) => {
  sessionStorage.setItem('user', JSON.stringify(user))

  const app = createApp(App)

  app.use(vuetify)
  app.use(createPinia())
  app.use(router)

  app.mount('#app')
})
