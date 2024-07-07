import { createApp } from "vue";
import { Quasar } from "quasar";

import "./style.css";
import App from "./App.vue";

import router from "./router";

import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

const app = createApp(App);
app.use(router);
app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
  config: {},
});
app.mount("#app");
