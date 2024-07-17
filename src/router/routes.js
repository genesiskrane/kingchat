const routes = [
  {
    path: '/',
    name: 'app',
    redirect: '/chats',
    meta: {
      requiresAuth: true
    },
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
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
    redirect: '/auth/login',
    children: [
      { path: 'signup', component: () => import('../pages/auth/SignUp.vue') },
      {
        path: 'login',
        component: () => import('../pages/auth/Login.vue')
      },
      {
        path: 'forgot-password',
        component: () => import('../pages/auth/ForgotPassword.vue')
      },
      {
        path: 'email-verification',
        component: () => import('../pages/auth/EmailVerification.vue')
      },
      {
        path: 'create-password',
        component: () => import('../pages/auth/CreatePassword.vue')
      },
      {
        path: 'pick-profile-picture',
        component: () => import('../pages/auth/PickProfilePicture.vue')
      },
      {
        path: 'create-username',
        component: () => import('../pages/auth/CreateUsername.vue')
      },
      {
        path: 'recovery-code-confirmation',
        component: () => import('../pages/auth/RecoveryCodeConfirmation.vue')
      },
      {
        path: 'reset-password',
        component: () => import('../pages/auth/ResetPassword.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('../pages/ErrorNotFound.vue')
  }
]

export default routes
