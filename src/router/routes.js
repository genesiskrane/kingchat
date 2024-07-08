const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/chats',
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
    path: '/:catchAll(.*)*',
    component: () => import('../pages/ErrorNotFound.vue')
  }
]

export default routes
