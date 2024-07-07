import { createRouter, createMemoryHistory } from "vue-router";
import routes from "./routes.js";

const router = createRouter({
  history: createMemoryHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export default router;
