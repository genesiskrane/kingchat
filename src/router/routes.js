const routes = [
  {
    path: "/",
    component: () => import("../layouts/MainLayout.vue"),
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: () => import("../pages/Home.vue"),
      },
    ],
  },
  {
    path: "/chat/:username",
    component: () => import("../components/Navigation.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("../components/Navigation.vue"),
  },
];

export default routes;
