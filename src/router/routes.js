const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/home',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: '/home',
        component: () => import('../pages/Home.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('../pages/ErrorNotFound.vue')
  }
]

export default routes
