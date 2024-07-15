import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { useAppStore } from '../stores/app'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

router.beforeEach((to, from, next) => {
  const store = useAppStore()
  let user = store.app.user
console.log(user);
  if (to.meta.requiresAuth && !user) next({ path: '/auth/login' })
  else next()
})

export default router
