import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'default',
      component: () => import('../layouts/Default.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/Home.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('../views/Profile.vue')
        }
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../layouts/Auth.vue'),
      children: [
        {
          path: '/login',
          component: () => import('../views/auth/Login.vue')
        },
        {
          path: '/signup',
          component: () => import('../views/auth/SignUp.vue')
        }
      ]
    }
  ]
})

export default router
