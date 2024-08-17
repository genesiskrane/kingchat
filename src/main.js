import axios from 'axios';

import './assets/css/main.css';
import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader

import { auth, onAuthStateChanged } from './func/firebase';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import router from './router';

import App from './App.vue';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import Button from 'primevue/button';

axios.defaults.baseURL =
  process.env.NODE_ENV == 'production' && window.location.hostname !== 'localhost'
    ? 'https://www.kingchat.one/api'
    : 'http://localhost:3000/api';

onAuthStateChanged(auth, async (user) => {
  if (user) console.log('Auth Changed', user.uid);
  else console.log(user);

  let uid = user ? user.uid : '';

  sessionStorage.setItem('uid', JSON.stringify(uid));
});

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi' // This is already the default value - only for display purposes
  }
});

const app = createApp(App);
app.component('Button', Button);

app.use(vuetify);
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
});
app.use(createPinia());
app.use(router);

app.mount('#app');
