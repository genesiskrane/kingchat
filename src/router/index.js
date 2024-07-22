import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { useAppStore } from '../stores/app'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

router.beforeEach(async (to, from, next) => {
  const store = useAppStore()

  let isInitialized = store.app.isInitialized

  if (!isInitialized) await store.init()

  if (to.meta.requiresAuth && !store.app.user.uid) next({ path: '/auth/login' })
  else next()
})

export default router
