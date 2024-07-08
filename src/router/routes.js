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
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  }
]

export default routes
