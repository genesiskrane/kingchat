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
    component: () => import("../pages/Add.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("../pages/ErrorNotFound.vue"),
  },
];

export default routes;
