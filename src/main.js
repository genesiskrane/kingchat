// Plugins
import { registerPlugins } from "@/plugins";

import router from "./router";

// Components
import App from "./App.vue";

// CSS
import "./assets/css/main.css";

// Composables
import { createApp } from "vue";

const app = createApp(App);

// registerPlugins(app);

app.use(router);
app.mount("#app");
