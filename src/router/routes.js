const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/chats',
    meta: {
      requiresAuth: true
    },
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: '/home',
        component: () => import('../pages/Home.vue')
      },
      {
        path: '/chats',
        component: () => import('../pages/Chats.vue')
      },
      {
        path: '/rooms',
        component: () => import('../pages/Rooms.vue')
      },
      {
        path: '/explore',
        component: () => import('../pages/Explore.vue')
      },
      {
        path: '/notifications',
        component: () => import('../pages/Notifications.vue')
      },
      {
        path: '/bookmarks',
        component: () => import('../pages/Bookmarks.vue')
      },
      {
        path: '/communities',
        component: () => import('../pages/Communities.vue')
      },
      {
        path: '/spaces',
        component: () => import('../pages/Spaces.vue')
      },
      {
        path: '/profile',
        component: () => import('../pages/Profile.vue')
      },
      {
        path: '/recharge',
        component: () => import('../pages/Recharge.vue')
      }
    ]
  },
  {
    path: '/auth',
    component: () => import('../layouts/Auth.vue'),
    children: [
      { path: 'signup', component: () => import('../pages/auth/SignUp.vue') },
      {
        path: 'login',
        component: () => import('../pages/auth/Login.vue')
      },
      {
        path: 'email-verification',
        component: () => import('../pages/auth/EmailVerification.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('../pages/ErrorNotFound.vue')
  }
]

export default routes
