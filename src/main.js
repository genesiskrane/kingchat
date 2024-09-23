import './assets/css/main.css';
import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader

import { auth, onAuthStateChanged } from './func/firebase';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import router from './router';

import App from './App.vue';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

onAuthStateChanged(auth, async (user) => {
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

app.use(vuetify);
app.use(createPinia());
app.use(router);

app.mount('#webpage');
