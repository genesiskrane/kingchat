import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { useAppStore } from '../stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

router.beforeEach(async (to, from, next) => {
  const store = useAppStore()
  let isInitialized = store.app.isInitialized

  // All Non-Auth Routes Pass Through Here
  if (to.matched[0].path !== '/auth' && !isInitialized) await store.init()

  next()
  // if (to.meta.requiresAuth && !store.$state.user.uid) next({ path: '/auth/login' })
  // else next()
})

export default router
